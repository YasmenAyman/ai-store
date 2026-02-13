<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Inertia\Inertia;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(\App\Services\CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        return Inertia::render('Admin/Categories/Index', [
            'categories' => $this->categoryService->getAllCategories()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Categories/Form', [
            'categories' => $this->categoryService->getAllCategories()
        ]);
    }

    public function store(\App\Http\Requests\StoreCategoryRequest $request)
    {
        $this->categoryService->createCategory($request->validated());
        return redirect()->route('admin.categories.index')->with('message', 'Category created successfully.');
    }

    public function edit(\App\Models\Category $category)
    {
        return Inertia::render('Admin/Categories/Form', [
            'category' => $category,
            'categories' => $this->categoryService->getAllCategories()->where('id', '!=', $category->id)->values()
        ]);
    }

    public function update(\App\Http\Requests\UpdateCategoryRequest $request, \App\Models\Category $category)
    {
        $this->categoryService->updateCategory($category, $request->validated());
        return redirect()->route('admin.categories.index')->with('message', 'Category updated successfully.');
    }

    public function destroy(\App\Models\Category $category)
    {
        $this->categoryService->deleteCategory($category);
        return redirect()->route('admin.categories.index')->with('message', 'Category deleted successfully.');
    }
}
