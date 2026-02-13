<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key');
        $socialLinks = \App\Models\SocialMediaLink::orderBy('sort_order')->get();

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
            'socialLinks' => $socialLinks,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'site_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'dashboard_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'favicon' => 'nullable|image|mimes:ico,png,jpg|max:512',
            'site_name' => 'nullable|string|max:255',
        ]);

        $settings = $request->except(['site_logo', 'dashboard_logo', 'favicon']);

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value, 'type' => 'text', 'group' => 'general']);
        }

        if ($request->hasFile('site_logo')) {
            $path = $request->file('site_logo')->store('settings', 'public');
            Setting::updateOrCreate(['key' => 'site_logo'], ['value' => '/storage/' . $path, 'type' => 'image', 'group' => 'general']);
        }

        if ($request->hasFile('dashboard_logo')) {
            $path = $request->file('dashboard_logo')->store('settings', 'public');
            Setting::updateOrCreate(['key' => 'dashboard_logo'], ['value' => '/storage/' . $path, 'type' => 'image', 'group' => 'general']);
        }

        if ($request->hasFile('favicon')) {
            $path = $request->file('favicon')->store('settings', 'public');
            Setting::updateOrCreate(['key' => 'favicon'], ['value' => '/storage/' . $path, 'type' => 'image', 'group' => 'general']);
        }

        return redirect()->back()->with('message', 'Settings updated successfully');
    }
}
