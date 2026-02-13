<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    public function index()
    {
        $cart = Session::get('cart', []);
        if (empty($cart)) return redirect()->route('store.index')->with('error', 'Your cart is empty.');

        $products = Product::whereIn('id', array_keys($cart))->get();
        $total = 0;
        foreach ($products as $product) {
            $total += $product->price * $cart[$product->id];
        }

        return Inertia::render('Checkout', [
            'total' => $total,
            'user' => auth()->user(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required|string',
            'payment_method' => 'required|string',
        ]);

        $cart = Session::get('cart', []);
        if (empty($cart)) return redirect()->route('store.index')->with('error', 'Your cart is empty.');

        return DB::transaction(function () use ($request, $cart) {
            $products = Product::whereIn('id', array_keys($cart))->get();
            $total = 0;
            foreach ($products as $product) {
                $total += $product->price * $cart[$product->id];
            }

            $order = Order::create([
                'user_id' => auth()->id(),
                'order_number' => 'ORD-' . strtoupper(Str::random(10)),
                'total_amount' => $total,
                'status' => 'pending',
                'payment_status' => 'pending',
                'payment_method' => $request->payment_method,
                'shipping_address' => $request->shipping_address,
                'billing_address' => $request->shipping_address, // Simplification
            ]);

            foreach ($products as $product) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'price' => $product->price,
                    'quantity' => $cart[$product->id],
                ]);
                
                // Update stock
                $product->decrement('stock', $cart[$product->id]);
            }

            Session::forget('cart');

            return redirect()->route('home')->with('message', 'Order placed successfully! Your order number is ' . $order->order_number);
        });
    }
}
