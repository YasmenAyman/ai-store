<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::where('is_active', true)
            ->with(['category', 'images'])
            ->withAvg(['reviews' => function($q) { $q->where('approved', true); }], 'rating')
            ->withCount(['reviews' => function($q) { $q->where('approved', true); }]);

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('rating')) {
            $query->having('reviews_avg_rating', '>=', $request->rating);
        }

        $sort = $request->get('sort', 'newest');
        switch ($sort) {
            case 'price_low': $query->orderBy('price', 'asc'); break;
            case 'price_high': $query->orderBy('price', 'desc'); break;
            case 'name_asc': $query->orderBy('name', 'asc'); break;
            default: $query->latest(); break;
        }

        return Inertia::render('Store', [
            'products' => $query->paginate(12)->withQueryString(),
            'categories' => Category::where('is_active', true)->get(),
            'filters' => $request->only(['category', 'min_price', 'max_price', 'search', 'sort', 'rating']),
        ]);
    }

    public function show(Product $product)
    {
        if (!$product->is_active) abort(404);

        $product->load(['category', 'images', 'reviews' => function ($query) {
            $query->where('approved', true)->with('user')->latest();
        }]);

        // Append average_rating and total_reviews dynamically
        $product->average_rating = (float) $product->averageRating();
        $product->total_reviews = $product->reviews->count();

        return Inertia::render('ProductDetails', [
            'product' => $product,
            'relatedProducts' => Product::where('category_id', $product->category_id)
                ->where('id', '!=', $product->id)
                ->where('is_active', true)
                ->with('images')
                ->take(4)
                ->get(),
        ]);
    }
}
