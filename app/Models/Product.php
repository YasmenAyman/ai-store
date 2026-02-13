<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{

    protected $fillable = [
        'category_id', 'name', 'name_ar', 'slug', 'description', 'description_ar', 'price', 
        'compare_at_price', 'stock', 'rating', 'review_count', 'is_active', 'is_featured', 'is_best_seller'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function primaryImage()
    {
        return $this->hasOne(ProductImage::class)->where('is_primary', true);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }

    /**
     * Get the reviews for the product.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Calculate the average rating for the product.
     */
    public function averageRating()
    {
        return $this->reviews()->where('approved', true)->avg('rating') ?? 0;
    }
}
