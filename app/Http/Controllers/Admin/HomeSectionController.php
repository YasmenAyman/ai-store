<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeSection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class HomeSectionController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/HomeSections/Index', [
            'sections' => HomeSection::orderBy('sort_order')->get(),
        ]);
    }

    public function edit(HomeSection $homeSection)
    {
        return Inertia::render('Admin/HomeSections/Edit', [
            'section' => $homeSection,
        ]);
    }

    public function update(Request $request, HomeSection $homeSection)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|array',
            'is_active' => 'boolean',
        ]);

        $homeSection->update([
            'title' => $request->title,
            'content' => $request->content,
            'is_active' => $request->is_active,
        ]);

        return redirect()->route('admin.home-sections.index')->with('message', 'Section updated successfully.');
    }
}
