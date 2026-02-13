<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;

class OrderService
{
    public function getAllOrders()
    {
        return Order::with('user')->latest()->paginate(20);
    }

    public function createOrder(array $data)
    {
        return DB::transaction(function () use ($data) {
            $order = Order::create([
                'user_id' => $data['user_id'] ?? null,
                'order_number' => 'ORD-' . strtoupper(Str::random(10)),
                'total_amount' => 0, // Will calculate below
                'shipping_address' => $data['shipping_address'],
                'billing_address' => $data['billing_address'] ?? $data['shipping_address'],
                'notes' => $data['notes'] ?? null,
            ]);

            $total = 0;
            foreach ($data['items'] as $item) {
                $product = \App\Models\Product::find($item['product_id']);
                $price = $product->price;
                $quantity = $item['quantity'];
                
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'price' => $price,
                    'quantity' => $quantity,
                ]);

                $total += ($price * $quantity);
            }

            $order->update(['total_amount' => $total]);
            return $order;
        });
    }

    public function updateStatus(Order $order, string $status)
    {
        $order->update(['status' => $status]);
        return $order;
    }
}
