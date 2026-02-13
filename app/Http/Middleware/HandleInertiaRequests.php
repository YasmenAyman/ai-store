<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role->slug ?? 'customer',
                ] : null,
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'cart' => function () use ($request) {
                $cart = $request->session()->get('cart', []);
                if (empty($cart)) return ['items' => [], 'total' => 0];

                $products = \App\Models\Product::whereIn('id', array_keys($cart))->with('images')->get();
                $items = [];
                $total = 0;
                
                foreach ($products as $product) {
                    $quantity = $cart[$product->id];
                    $items[] = [
                        'id' => (string)$product->id,
                        'name' => $product->name,
                        'price' => (float)$product->price,
                        'image' => $product->images->first()?->image_path,
                        'quantity' => (int)$quantity,
                    ];
                    $total += $product->price * $quantity;
                }
                
                return [
                    'items' => $items,
                    'total' => $total,
                ];
            },
            'wishlistIds' => $request->user()
                ? \App\Models\Wishlist::where('user_id', $request->user()->id)->pluck('product_id')->map(fn($id) => (string)$id)->toArray()
                : [],
            'pages' => [
                'about' => \App\Models\Page::where('slug', 'about')->value('is_active') ?? false,
                'contact' => \App\Models\Page::where('slug', 'contact')->value('is_active') ?? false,
            ],
            'settings' => \App\Models\Setting::all()->pluck('value', 'key'),
            'footerLinks' => \App\Models\FooterLink::active()->orderBy('section')->orderBy('sort_order')->get()->groupBy('section'),
            'socialLinks' => \App\Models\SocialMediaLink::active()->orderBy('sort_order')->get(),
        ];
    }
}
