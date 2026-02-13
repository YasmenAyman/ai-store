<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Str;

class ProductService
{
    public function getAllProducts()
    {
        return Product::with(['category', 'images'])->latest()->paginate(20);
    }

    public function createProduct(array $data)
    {
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $images = $data['images'] ?? [];
        unset($data['images']);

        $product = Product::create($data);

        foreach ($images as $index => $image) {
            if ($image instanceof \Illuminate\Http\UploadedFile) {
                $path = $image->store('products', 'public');
                $product->images()->create([
                    'image_path' => '/storage/' . $path,
                    'is_primary' => $index === 0,
                    'sort_order' => $index
                ]);
            }
        }

        return $product;
    }

    public function updateProduct(Product $product, array $data)
    {
        if (isset($data['name']) && empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        // Handle deletions
        if (!empty($data['deleted_image_ids'])) {
            $deletedImages = \App\Models\ProductImage::whereIn('id', $data['deleted_image_ids'])
                ->where('product_id', $product->id)
                ->get();
            foreach ($deletedImages as $image) {
                if (str_starts_with($image->image_path, '/storage/')) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $image->image_path));
                }
                $image->delete();
            }
        }

        // Handle new uploads
        if (!empty($data['images'])) {
            foreach ($data['images'] as $image) {
                if ($image instanceof \Illuminate\Http\UploadedFile) {
                    $path = $image->store('products', 'public');
                    $product->images()->create([
                        'image_path' => '/storage/' . $path,
                        'is_primary' => false,
                        'sort_order' => $product->images()->count()
                    ]);
                }
            }
        }

        unset($data['images'], $data['deleted_image_ids']);

        $product->update($data);
        return $product;
    }

    public function deleteProduct(Product $product)
    {
        return $product->delete();
    }

    public function toggleActive(Product $product)
    {
        $product->is_active = !$product->is_active;
        $product->save();
        return $product;
    }
}
