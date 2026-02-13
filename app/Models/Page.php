<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = ['title', 'slug', 'content', 'is_active'];

    protected $casts = [
        'content' => 'json',
        'is_active' => 'boolean',
    ];

    public function getTranslation($field, $lang)
    {
        $content = $this->content;
        return $content[$field.'_'.$lang] ?? $content[$field] ?? '';
    }
}
