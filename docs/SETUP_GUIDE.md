# 🚀 Luxury E-Commerce - Complete Setup Guide

## Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+ & NPM
- MySQL 8.0+
- Git

---

## 📦 Step 1: Initial Setup

### Clone or Create Project

```bash
# Create new Laravel project
composer create-project laravel/laravel luxury-ecommerce
cd luxury-ecommerce

# Install required packages
composer require inertiajs/inertia-laravel tightenco/ziggy
composer require intervention/image --dev
```

### Install Inertia.js

```bash
# Install Inertia server-side
php artisan inertia:middleware

# Install client dependencies
npm install @inertiajs/react react react-dom
npm install -D @vitejs/plugin-react
npm install lucide-react axios
```

---

## 🗄️ Step 2: Database Configuration

### Update `.env`

```env
APP_NAME="Luxury Store"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=luxury_ecommerce
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=database
QUEUE_CONNECTION=database

FILESYSTEM_DISK=public
```

### Create Database

```bash
mysql -u root -p
CREATE DATABASE luxury_ecommerce;
exit;
```

---

## 📁 Step 3: Copy Project Files

Copy all the generated files to your Laravel project:

### Migration Files
Copy all files from `/database/migrations/` to your project's `database/migrations/`

### Models
Copy all files from `/app/Models/` to your project's `app/Models/`

### Controllers
Copy all files from `/app/Http/Controllers/` to your project's `app/Http/Controllers/`

### Services
Copy all files from `/app/Services/` to your project's `app/Services/`

### Requests
Copy all files from `/app/Http/Requests/` to your project's `app/Http/Requests/`

### Middleware
Copy all files from `/app/Http/Middleware/` to your project's `app/Http/Middleware/`

### Policies
Copy all files from `/app/Policies/` to your project's `app/Policies/`

### Seeders
Copy all files from `/database/seeders/` to your project's `database/seeders/`

### Routes
Replace `routes/web.php` and `routes/api.php` with the generated files

### React Components & Pages
Copy all files from `/resources/js/` to your project's `resources/js/`

---

## ⚙️ Step 4: Configuration Files

### Update `app/Providers/AuthServiceProvider.php`

```php
<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Product;
use App\Models\Order;
use App\Models\BlogPost;
use App\Models\User;
use App\Policies\ProductPolicy;
use App\Policies\OrderPolicy;
use App\Policies\BlogPolicy;
use App\Policies\UserPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Product::class => ProductPolicy::class,
        Order::class => OrderPolicy::class,
        BlogPost::class => BlogPolicy::class,
        User::class => UserPolicy::class,
    ];

    public function boot(): void
    {
        //
    }
}
```

### Register Middleware in `bootstrap/app.php`

```php
<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'admin' => \App\Http\Middleware\AdminMiddleware::class,
            'role' => \App\Http\Middleware\RoleMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
```

### Create `app/Http/Middleware/HandleInertiaRequests.php`

```php
<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role?->name,
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ]);
    }
}
```

### Update `vite.config.js`

```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});
```

### Update `resources/js/app.jsx`

```javascript
import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
```

### Create `resources/views/app.blade.php`

```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
```

### Update `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
```

---

## 🏃 Step 5: Run Migrations & Seeders

```bash
# Run migrations
php artisan migrate

# Run seeders
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=UserSeeder
php artisan db:seed --class=SettingSeeder

# Create storage link
php artisan storage:link

# Clear caches
php artisan optimize:clear
```

---

## 🎨 Step 6: Build Frontend Assets

```bash
# Install dependencies
npm install

# Build for development
npm run dev

# Or build for production
npm run build
```

---

## 🚀 Step 7: Start Development Server

```bash
# Start Laravel server
php artisan serve

# In another terminal, run Vite
npm run dev
```

Visit: http://localhost:8000

---

## 🔐 Default Credentials

**Admin:**
- Email: admin@luxury.com
- Password: password

**Customer:**
- Email: customer@example.com
- Password: password

---

## 📝 Step 8: Create Sample Data (Optional)

### Categories Seeder

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Watches',
                'slug' => 'watches',
                'description' => 'Luxury timepieces',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Handbags',
                'slug' => 'handbags',
                'description' => 'Designer handbags',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Jewelry',
                'slug' => 'jewelry',
                'description' => 'Fine jewelry',
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
```

Run: `php artisan db:seed --class=CategorySeeder`

---

## 🔧 Additional Configuration

### Rate Limiting (API)

In `app/Providers/RouteServiceProvider.php` or `bootstrap/app.php`:

```php
RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});
```

### File Upload Configuration

Update `config/filesystems.php`:

```php
'disks' => [
    'public' => [
        'driver' => 'local',
        'root' => storage_path('app/public'),
        'url' => env('APP_URL').'/storage',
        'visibility' => 'public',
    ],
],
```

---

## ✅ Verification Checklist

- [ ] Database connected and migrated
- [ ] Storage link created
- [ ] Admin login works
- [ ] Frontend displays correctly
- [ ] Can create products in admin
- [ ] Shop page shows products
- [ ] Cart functionality works
- [ ] Wishlist requires authentication
- [ ] File uploads work

---

## 🎯 Next Steps

1. **Add Payment Integration:**
   - Stripe: `composer require stripe/stripe-php`
   - PayPal: `composer require paypal/rest-api-sdk-php`

2. **Add Email Notifications:**
   - Configure mail in `.env`
   - Create order confirmation emails

3. **Add Search:**
   - Laravel Scout with Algolia or Meilisearch

4. **Performance Optimization:**
   - Enable caching
   - Add Redis for sessions
   - Implement queue workers

5. **Security Enhancements:**
   - Enable 2FA
   - Add CAPTCHA to forms
   - Implement API rate limiting

---

## 📚 Key Features Implemented

✅ **Backend:**
- Role-based access control (Admin, Editor, Customer)
- Product management with images
- Category management (hierarchical)
- Order management system
- Blog/CMS functionality
- Media library
- Settings management
- Form request validation
- Service layer architecture
- Policy-based authorization

✅ **Frontend:**
- Responsive design with Tailwind CSS
- Product catalog with filters
- Session-based shopping cart
- Database-based wishlist
- Customer dashboard
- Admin panel
- Inertia.js SPA experience

✅ **Security:**
- CSRF protection
- XSS protection
- Input validation
- File upload validation
- Rate limiting ready
- Secure authentication

---

## 🐛 Troubleshooting

### Issue: Inertia not loading
```bash
php artisan optimize:clear
npm run build
```

### Issue: Storage link not working
```bash
php artisan storage:link
```

### Issue: Permission denied on storage
```bash
chmod -R 775 storage bootstrap/cache
```

---

## 📞 Support

For issues or questions, check:
- Laravel Documentation: https://laravel.com/docs
- Inertia.js Documentation: https://inertiajs.com
- React Documentation: https://react.dev

---

**Happy Coding! 🎉**
