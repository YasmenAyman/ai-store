<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(\App\Services\OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function index()
    {
        $orders = $this->orderService->getAllOrders();
        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders
        ]);
    }

    public function store(\App\Http\Requests\StoreOrderRequest $request)
    {
        $order = $this->orderService->createOrder($request->validated());
        return response()->json($order, 201);
    }

    public function show(\App\Models\Order $order)
    {
        return Inertia::render('Admin/Orders/Show', [
            'order' => $order->load(['user', 'items'])
        ]);
    }

    public function updateStatus(Request $request, \App\Models\Order $order)
    {
        $request->validate(['status' => 'required|string']);
        $order = $this->orderService->updateStatus($order, $request->status);
        return redirect()->back()->with('message', 'Order status updated successfully.');
    }
}
