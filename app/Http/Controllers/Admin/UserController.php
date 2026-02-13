<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => User::with('role')->latest()->paginate(10),
        ]);
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete yourself.');
        }

        if ($user->isAdmin()) {
            return back()->with('error', 'Admin users cannot be deleted through this interface.');
        }

        $user->delete();

        return back()->with('message', 'User deleted successfully.');
    }
}
