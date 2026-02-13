<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reviews = Review::with(['user', 'product'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Reviews/Index', [
            'reviews' => $reviews
        ]);
    }

    /**
     * Approve the specified review.
     */
    public function approve(Review $review)
    {
        $review->update(['approved' => true]);

        return back()->with('message', 'Review approved successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        $review->delete();

        return back()->with('message', 'Review deleted successfully.');
    }
}
