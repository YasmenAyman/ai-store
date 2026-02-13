<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Index', [
            'hero' => \App\Models\HomeSection::where('slug', 'hero')->where('is_active', true)->first(),
            'featuredProducts' => Product::where('is_featured', true)->where('is_active', true)->with('images')->take(8)->get(),
            'bestSellers' => Product::where('is_best_seller', true)->where('is_active', true)->with('images')->take(4)->get(),
            'categories' => Category::where('is_active', true)->whereNull('parent_id')->orderBy('sort_order')->take(6)->get(),
            'recentPosts' => \App\Models\BlogPost::where('is_published', true)->latest('published_at')->take(3)->get(),
            'testimonials' => \App\Models\Review::where('approved', true)
                ->with(['user', 'product'])
                ->latest()
                ->take(12)
                ->get()
                ->map(function ($review) {
                    return [
                        'id' => $review->id,
                        'rating' => $review->rating,
                        'comment' => $review->comment,
                        'user_name' => $review->user->name ?? 'Anonymous',
                        'product_name' => $review->product->name ?? '',
                        'initials' => $review->user ? strtoupper(substr($review->user->name, 0, 1) . substr(explode(' ', $review->user->name)[1] ?? '', 0, 1)) : 'A',
                    ];
                }),
        ]);
    }
}
