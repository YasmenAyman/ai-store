<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function __invoke()
    {
        $page = Page::where('slug', 'contact')->where('is_active', true)->first();

        return Inertia::render('Contact', [
            'page' => $page
        ]);
    }
}
