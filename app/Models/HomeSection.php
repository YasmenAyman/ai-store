<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeSection extends Model
{
    protected $fillable = ['title', 'slug', 'content', 'sort_order', 'is_active'];

    protected $casts = [
        'content' => 'array',
        'is_active' => 'boolean',
    ];
}
