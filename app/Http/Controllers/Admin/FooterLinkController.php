<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FooterLink;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FooterLinkController extends Controller
{
    public function index()
    {
        $links = FooterLink::orderBy('section')->orderBy('sort_order')->get();
        
        return Inertia::render('Admin/FooterLinks/Index', [
            'links' => $links,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'section' => 'required|in:quick_links,customer_service',
            'label_en' => 'required|string|max:255',
            'label_ar' => 'required|string|max:255',
            'url' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        FooterLink::create($validated);

        return redirect()->route('admin.footer-links.index')->with('success', 'Footer link created successfully.');
    }

    public function update(Request $request, FooterLink $footerLink)
    {
        $validated = $request->validate([
            'section' => 'required|in:quick_links,customer_service',
            'label_en' => 'required|string|max:255',
            'label_ar' => 'required|string|max:255',
            'url' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $footerLink->update($validated);

        return redirect()->route('admin.footer-links.index')->with('success', 'Footer link updated successfully.');
    }

    public function destroy(FooterLink $footerLink)
    {
        $footerLink->delete();

        return redirect()->route('admin.footer-links.index')->with('success', 'Footer link deleted successfully.');
    }
}
