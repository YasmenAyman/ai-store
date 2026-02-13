<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    public function index()
    {
        $cart = Session::get('cart', []);
        $cartItems = [];
        $total = 0;

        if (!empty($cart)) {
            $products = Product::whereIn('id', array_keys($cart))->with('images')->get();
            foreach ($products as $product) {
                $quantity = $cart[$product->id];
                $subtotal = $product->price * $quantity;
                $total += $subtotal;
                $cartItems[] = [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'quantity' => $quantity,
                    'subtotal' => $subtotal,
                    'image' => $product->images->first()?->image_path,
                ];
            }
        }

        return Inertia::render('Cart', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

    public function store(Request $request, Product $product)
    {
        $cart = Session::get('cart', []);
        $quantity = $request->input('quantity', 1);

        if (isset($cart[$product->id])) {
            $cart[$product->id] += $quantity;
        } else {
            $cart[$product->id] = $quantity;
        }

        Session::put('cart', $cart);

        return redirect()->back()->with('message', 'Product added to cart.');
    }

    public function update(Request $request, Product $product)
    {
        $cart = Session::get('cart', []);
        $quantity = $request->input('quantity', 1);

        if ($quantity > 0) {
            $cart[$product->id] = $quantity;
        } else {
            unset($cart[$product->id]);
        }

        Session::put('cart', $cart);

        return redirect()->back()->with('message', 'Cart updated.');
    }

    public function destroy(Product $product)
    {
        $cart = Session::get('cart', []);
        unset($cart[$product->id]);
        Session::put('cart', $cart);

        return redirect()->back()->with('message', 'Product removed from cart.');
    }

    public function sync(Request $request)
    {
        $items = $request->input('items', []);
        $cart = [];
        
        foreach ($items as $item) {
            $cart[$item['id']] = $item['quantity'];
        }

        Session::put('cart', $cart);

        return redirect()->back();
    }
}
