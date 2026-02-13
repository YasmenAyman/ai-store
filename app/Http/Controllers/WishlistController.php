<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlistItems = Wishlist::where('user_id', auth()->id())
            ->with(['product.images', 'product.category'])
            ->get();

        $products = $wishlistItems->map(function ($item) {
            return $item->product;
        });

        return Inertia::render('Favorites', [
            'products' => $products
        ]);
    }

    public function toggle(Request $request, Product $product)
    {
        $userId = auth()->id();
        
        $wishlist = Wishlist::where('user_id', $userId)
            ->where('product_id', $product->id)
            ->first();

        if ($wishlist) {
            $wishlist->delete();
            $status = 'removed';
        } else {
            Wishlist::create([
                'user_id' => $userId,
                'product_id' => $product->id,
            ]);
            $status = 'added';
        }

        return redirect()->back()->with('message', "Product $status from favorites.");
    }
}
