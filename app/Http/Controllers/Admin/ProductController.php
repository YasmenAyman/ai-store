<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(\App\Services\ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        $products = $this->productService->getAllProducts();
        return Inertia::render('Admin/Products/Index', [
            'products' => $products
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Products/Form', [
            'categories' => \App\Models\Category::all(),
        ]);
    }

    public function store(\App\Http\Requests\StoreProductRequest $request)
    {
        $product = $this->productService->createProduct($request->validated());
        return redirect()->route('admin.products.index')->with('message', 'Product created successfully.');
    }

    public function show(\App\Models\Product $product)
    {
        return response()->json($product->load(['category', 'images']));
    }

    public function edit(\App\Models\Product $product)
    {
        return Inertia::render('Admin/Products/Form', [
            'product' => $product->load('images'),
            'categories' => \App\Models\Category::all(),
        ]);
    }

    public function update(\App\Http\Requests\UpdateProductRequest $request, \App\Models\Product $product)
    {
        $product = $this->productService->updateProduct($product, $request->validated());
        return redirect()->route('admin.products.index')->with('message', 'Product updated successfully.');
    }

    public function destroy(\App\Models\Product $product)
    {
        $this->productService->deleteProduct($product);
        return redirect()->route('admin.products.index')->with('message', 'Product deleted successfully.');
    }

    public function toggleActive(\App\Models\Product $product)
    {
        $product = $this->productService->toggleActive($product);
        return response()->json($product);
    }
}
