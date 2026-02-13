<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SocialMediaLink;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SocialMediaLinkController extends Controller
{
    public function index()
    {
        $links = SocialMediaLink::orderBy('sort_order')->get();
        
        return Inertia::render('Admin/SocialLinks/Index', [
            'links' => $links,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'platform' => 'required|string|max:255',
            'url' => 'required|url|max:255',
            'icon' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        SocialMediaLink::create($validated);

        return redirect()->route('admin.social-links.index')->with('success', 'Social media link created successfully.');
    }

    public function update(Request $request, SocialMediaLink $socialMediaLink)
    {
        $validated = $request->validate([
            'platform' => 'required|string|max:255',
            'url' => 'required|url|max:255',
            'icon' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $socialMediaLink->update($validated);

        return redirect()->route('admin.social-links.index')->with('success', 'Social media link updated successfully.');
    }

    public function destroy(SocialMediaLink $socialMediaLink)
    {
        $socialMediaLink->delete();

        return redirect()->route('admin.social-links.index')->with('success', 'Social media link deleted successfully.');
    }
}
