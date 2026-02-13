<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'users_count' => \App\Models\User::count(),
            'products_count' => \App\Models\Product::count(),
            'orders_count' => \App\Models\Order::count(),
            'total_sales' => \App\Models\Order::where('status', 'completed')->sum('total_amount'),
        ]);
    }
}
