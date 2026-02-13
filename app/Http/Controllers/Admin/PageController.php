<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Pages/Index', [
            'pages' => Page::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Pages/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages',
            'content' => 'required|array',
            'is_active' => 'boolean',
            'hero_bg_file' => 'nullable|image|max:10240',
        ]);

        if ($request->hasFile('hero_bg_file')) {
            $path = $request->file('hero_bg_file')->store('pages', 'public');
            $validated['content']['hero_bg'] = '/storage/' . $path;
        }

        Page::create($validated);

        return redirect()->route('admin.pages.index')->with('message', 'Page created successfully.');
    }

    public function edit(Page $page)
    {
        return Inertia::render('Admin/Pages/Edit', [
            'page' => $page
        ]);
    }

    public function update(Request $request, Page $page)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages,slug,' . $page->id,
            'content' => 'required|array',
            'is_active' => 'boolean',
            'hero_bg_file' => 'nullable|image|max:10240',
        ]);

        if ($request->hasFile('hero_bg_file')) {
            // Delete old background if it exists
            $oldBg = $page->content['hero_bg'] ?? null;
            if ($oldBg && str_starts_with($oldBg, '/storage/')) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace('/storage/', '', $oldBg));
            }

            $path = $request->file('hero_bg_file')->store('pages', 'public');
            $validated['content']['hero_bg'] = '/storage/' . $path;
        }

        $page->update($validated);

        return redirect()->route('admin.pages.index')->with('message', 'Page updated successfully.');
    }

    public function destroy(Page $page)
    {
        $page->delete();

        return redirect()->route('admin.pages.index')->with('message', 'Page deleted successfully.');
    }
}
