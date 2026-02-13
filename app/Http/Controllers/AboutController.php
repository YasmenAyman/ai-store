<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function __invoke()
    {
        $page = Page::where('slug', 'about')->where('is_active', true)->first();

        // Fallback or Initial Data if not found
        if (!$page) {
            return Inertia::render('About', [
                'page' => null
            ]);
        }

        return Inertia::render('About', [
            'page' => $page
        ]);
    }
}
