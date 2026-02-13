<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\AuthController;

// Public Storefront Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/store', [ShopController::class, 'index'])->name('store.index');
Route::get('/product/{product}', [ShopController::class, 'show'])->name('store.show');
Route::get('/about', \App\Http\Controllers\AboutController::class)->name('about');
Route::get('/contact', \App\Http\Controllers\ContactController::class)->name('contact');
Route::get('/pages/{slug}', [\App\Http\Controllers\PageController::class, 'show'])->name('pages.show');
Route::get('/favorites', [\App\Http\Controllers\WishlistController::class, 'index'])->name('favorites')->middleware('auth');
Route::post('/wishlist/toggle/{product}', [\App\Http\Controllers\WishlistController::class, 'toggle'])->name('wishlist.toggle')->middleware('auth');

// Auth Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// Newsletter Subscription
Route::post('/newsletter/subscribe', [\App\Http\Controllers\NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');

// Cart Routes
Route::prefix('cart')->name('cart.')->group(function () {
    Route::get('/', [CartController::class, 'index'])->name('index');
    Route::post('/add/{product}', [CartController::class, 'store'])->name('add');
    Route::patch('/update/{product}', [CartController::class, 'update'])->name('update');
    Route::delete('/remove/{product}', [CartController::class, 'destroy'])->name('remove');
    Route::post('/sync', [CartController::class, 'sync'])->name('sync');
});

// Checkout Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [App\Http\Controllers\ProfileController::class, 'index'])->name('profile');
    Route::patch('/profile', [App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::post('/reviews', [\App\Http\Controllers\ReviewController::class, 'store'])->name('reviews.store');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class);
    Route::resource('products', \App\Http\Controllers\Admin\ProductController::class);
    Route::resource('orders', \App\Http\Controllers\Admin\OrderController::class);
    Route::resource('home-sections', \App\Http\Controllers\Admin\HomeSectionController::class)->only(['index', 'edit', 'update']);
    Route::resource('blog-posts', \App\Http\Controllers\Admin\BlogPostController::class);
    Route::resource('pages', \App\Http\Controllers\Admin\PageController::class);
    Route::patch('orders/{order}/status', [\App\Http\Controllers\Admin\OrderController::class, 'updateStatus'])->name('orders.status');

    // Review Moderation
    Route::get('/reviews', [\App\Http\Controllers\Admin\ReviewController::class, 'index'])->name('reviews.index');
    Route::post('/reviews/{review}/approve', [\App\Http\Controllers\Admin\ReviewController::class, 'approve'])->name('reviews.approve');
    // User Management
    Route::get('/users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
    Route::delete('/users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('users.destroy');

    // Footer Links Management
    Route::get('/footer-links', [\App\Http\Controllers\Admin\FooterLinkController::class, 'index'])->name('footer-links.index');
    Route::post('/footer-links', [\App\Http\Controllers\Admin\FooterLinkController::class, 'store'])->name('footer-links.store');
    Route::patch('/footer-links/{footerLink}', [\App\Http\Controllers\Admin\FooterLinkController::class, 'update'])->name('footer-links.update');
    Route::delete('/footer-links/{footerLink}', [\App\Http\Controllers\Admin\FooterLinkController::class, 'destroy'])->name('footer-links.destroy');

    // Social Media Links Management
    Route::get('/social-links', [\App\Http\Controllers\Admin\SocialMediaLinkController::class, 'index'])->name('social-links.index');
    Route::post('/social-links', [\App\Http\Controllers\Admin\SocialMediaLinkController::class, 'store'])->name('social-links.store');
    Route::patch('/social-links/{socialMediaLink}', [\App\Http\Controllers\Admin\SocialMediaLinkController::class, 'update'])->name('social-links.update');
    Route::delete('/social-links/{socialMediaLink}', [\App\Http\Controllers\Admin\SocialMediaLinkController::class, 'destroy'])->name('social-links.destroy');

    // Newsletter Subscribers Management
    Route::get('/newsletter', [\App\Http\Controllers\Admin\NewsletterController::class, 'index'])->name('newsletter.index');
    Route::delete('/newsletter/{subscriber}', [\App\Http\Controllers\Admin\NewsletterController::class, 'destroy'])->name('newsletter.destroy');

    // Settings
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
});

// Temporary route to setup pages
Route::get('/admin-setup-pages', function () {
    \Illuminate\Support\Facades\Artisan::call('db:seed', ['--class' => 'PageSeeder']);
    return 'Pages seeded successfully! <a href="/admin/pages">Go to Admin Pages</a>';
});
