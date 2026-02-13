<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Str;

class CategoryService
{
    public function getAllCategories()
    {
        return Category::with('parent')->orderBy('sort_order')->get();
    }

    public function createCategory(array $data)
    {
        if (isset($data['image']) && $data['image'] instanceof \Illuminate\Http\UploadedFile) {
            $path = $data['image']->store('categories', 'public');
            $data['image'] = '/storage/' . $path;
        }

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        return Category::create($data);
    }

    public function updateCategory(Category $category, array $data)
    {
        if (isset($data['image']) && $data['image'] instanceof \Illuminate\Http\UploadedFile) {
            // Delete old image if it exists
            if ($category->image && str_starts_with($category->image, '/storage/')) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $category->image));
            }
            $path = $data['image']->store('categories', 'public');
            $data['image'] = '/storage/' . $path;
        } elseif (array_key_exists('image', $data) && $data['image'] === null) {
            // If image is explicitly set to null but not a file, it means don't update it (keep old)
            // or if we wanted to delete it, we'd handle it here. 
            // For now, let's keep the old image unless a new file is provided.
            unset($data['image']);
        }

        if (isset($data['name']) && empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        $category->update($data);
        return $category;
    }

    public function deleteCategory(Category $category)
    {
        return $category->delete();
    }
}
