<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Store a newly created review in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $userId = Auth::id();
        $productId = $validated['product_id'];

        // Check if user already reviewed this product
        $exists = Review::where('user_id', $userId)
            ->where('product_id', $productId)
            ->exists();

        if ($exists) {
            return back()->with('error', 'You have already reviewed this product.');
        }

        Review::create([
            'user_id' => $userId,
            'product_id' => $productId,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'approved' => false, // Always false by default for moderation
        ]);

        return back()->with('message', 'Thank you! Your review has been submitted and is awaiting approval.');
    }
}
