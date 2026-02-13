<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors(['newsletter' => 'Please enter a valid email address.']);
        }

        $email = $request->email;

        // Check if already subscribed
        $existing = NewsletterSubscriber::where('email', $email)->first();
        
        if ($existing) {
            if ($existing->is_active) {
                return back()->withErrors(['newsletter' => 'This email is already subscribed.']);
            } else {
                // Reactivate subscription
                $existing->update(['is_active' => true]);
                return back()->with('success', 'Welcome back! Your subscription has been reactivated.');
            }
        }

        // Create new subscriber
        NewsletterSubscriber::create([
            'email' => $email,
            'is_active' => true,
        ]);

        return back()->with('success', 'Thank you for subscribing to our newsletter!');
    }
}
