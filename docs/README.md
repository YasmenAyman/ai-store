# 🏪 Luxury E-Commerce Platform

A **production-ready**, full-stack luxury e-commerce platform built with **Laravel 11**, **Inertia.js**, **React**, and **Tailwind CSS**.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Laravel](https://img.shields.io/badge/Laravel-11.x-red.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-cyan.svg)

---

## ✨ Features

### 🛍️ Customer Features
- **Product Catalog** with advanced filtering and sorting
- **Session-based Shopping Cart** (no login required)
- **Database-based Wishlist** (requires authentication)
- **Product Search** with full-text indexing
- **Responsive Design** - Mobile, tablet, desktop optimized
- **Customer Dashboard** with order history
- **Guest Checkout** available
- **Multiple Payment Methods** ready (Stripe, PayPal)

### 👨‍💼 Admin Features
- **Complete CMS Dashboard** at `/admin`
- **Product Management** - CRUD with multiple images
- **Category Management** - Hierarchical categories
- **Order Management** - Track and update order status
- **Customer Management** - User accounts and roles
- **Blog/Content Management** - SEO-optimized posts
- **Media Library** - Centralized file management
- **Homepage Sections** - Dynamic hero, CTA, testimonials
- **Settings Panel** - Site-wide configuration

### 🔒 Security & Performance
- **Role-Based Access Control** (Admin, Editor, Customer)
- **Policy-Based Authorization**
- **CSRF & XSS Protection**
- **Input Validation** via Form Requests
- **Rate Limiting** ready
- **Secure File Uploads**
- **Optimized Database Queries** with eager loading
- **Caching** strategies implemented

### 🏗️ Architecture
- **Service Layer Pattern** for business logic
- **Repository Pattern** for data access (where needed)
- **Form Request Validation**
- **API Resources** for data transformation
- **Clean Component Structure**
- **Reusable React Components**
- **Custom Hooks** (useCart, useWishlist)

---

## 🛠️ Tech Stack

**Backend:**
- Laravel 11.x
- MySQL 8.0+
- Redis (optional, recommended)

**Frontend:**
- React 18.x
- Inertia.js
- Tailwind CSS 3.x
- Vite

**Additional:**
- Lucide Icons
- Axios for API calls

---

## 📋 Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ & NPM
- MySQL 8.0+
- Git

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone <your-repository-url>
cd luxury-ecommerce
```

### 2. Install Dependencies

```bash
# Backend dependencies
composer install

# Frontend dependencies
npm install
```

### 3. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env
DB_DATABASE=luxury_ecommerce
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 4. Database Setup

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE luxury_ecommerce"

# Run migrations
php artisan migrate

# Seed initial data
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=UserSeeder
php artisan db:seed --class=SettingSeeder

# Create storage link
php artisan storage:link
```

### 5. Build Assets

```bash
# Development
npm run dev

# Production
npm run build
```

### 6. Start Server

```bash
php artisan serve
```

Visit: **http://localhost:8000**

---

## 🔑 Default Credentials

### Admin Access
- **URL:** http://localhost:8000/admin
- **Email:** admin@luxury.com
- **Password:** password

### Customer Access
- **Email:** customer@example.com
- **Password:** password

---

## 📁 Project Structure

```
luxury-ecommerce/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/          # Admin panel controllers
│   │   │   ├── Api/            # API controllers (cart, wishlist)
│   │   │   ├── Auth/           # Authentication
│   │   │   └── Customer/       # Customer dashboard
│   │   ├── Middleware/         # Custom middleware
│   │   ├── Requests/           # Form validation
│   │   └── Resources/          # API resources
│   ├── Models/                 # Eloquent models
│   ├── Policies/               # Authorization policies
│   ├── Services/               # Business logic layer
│   └── Repositories/           # Data access layer
├── database/
│   ├── migrations/             # Database migrations
│   └── seeders/                # Database seeders
├── resources/
│   ├── js/
│   │   ├── Components/         # React components
│   │   │   ├── Admin/          # Admin components
│   │   │   └── Frontend/       # Frontend components
│   │   ├── Hooks/              # Custom React hooks
│   │   ├── Pages/              # Inertia pages
│   │   └── app.jsx             # Main app entry
│   └── views/
│       └── app.blade.php       # Inertia root template
├── routes/
│   ├── web.php                 # Web routes
│   └── api.php                 # API routes
└── public/
    └── storage/                # Symlinked storage
```

---

## 🎯 Key Routes

### Frontend Routes
- `/` - Homepage
- `/shop` - Product catalog
- `/products/{slug}` - Product detail
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/customer/dashboard` - Customer dashboard
- `/customer/orders` - Order history
- `/customer/wishlist` - Wishlist

### Admin Routes (Protected)
- `/admin` - Dashboard
- `/admin/products` - Product management
- `/admin/categories` - Category management
- `/admin/orders` - Order management
- `/admin/blog` - Blog management
- `/admin/media` - Media library
- `/admin/users` - User management
- `/admin/settings` - Settings

### API Routes
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/{id}` - Update cart item
- `DELETE /api/cart/{id}` - Remove from cart
- `GET /api/wishlist` - Get wishlist (auth)
- `POST /api/wishlist` - Add to wishlist (auth)
- `DELETE /api/wishlist/{id}` - Remove from wishlist (auth)

---

## 🗃️ Database Schema

### Core Tables

**users** - User accounts
- Roles: admin, editor, customer
- Soft deletes enabled

**products** - Product catalog
- Categories, pricing, inventory
- Multiple images support
- SEO fields

**categories** - Hierarchical categories
- Parent-child relationships
- SEO optimization

**orders** - Customer orders
- Complete order lifecycle
- Payment tracking
- Shipping information

**wishlists** - User wishlists
- User-product relationship

**blog_posts** - Blog/content
- Publishing workflow
- SEO optimization

**settings** - Site configuration
- Key-value storage
- Grouped settings

---

## 🔧 Configuration

### File Uploads

Configure in `.env`:
```env
MAX_IMAGE_SIZE=5120
ALLOWED_IMAGE_TYPES=jpeg,jpg,png,webp
```

### Pagination

```env
PRODUCTS_PER_PAGE=12
```

### Shipping & Tax

```env
FREE_SHIPPING_THRESHOLD=100
FLAT_RATE_SHIPPING=10
TAX_RATE=0
```

---

## 🧪 Testing

```bash
# Run tests
php artisan test

# Run specific test
php artisan test --filter ProductTest
```

---

## 📦 Deployment

See **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** for detailed production deployment instructions.

Quick deployment steps:
1. Configure production environment
2. Setup web server (Nginx/Apache)
3. Install SSL certificate
4. Configure queue workers
5. Setup cron jobs
6. Enable caching

---

## 🔐 Security Best Practices

✅ All user input validated
✅ CSRF protection enabled
✅ XSS protection implemented
✅ SQL injection prevented (Eloquent ORM)
✅ Secure password hashing (bcrypt)
✅ Rate limiting configured
✅ File upload validation
✅ HTTPS recommended in production

---

## 🎨 Customization

### Adding New Product Fields

1. Create migration:
```bash
php artisan make:migration add_custom_field_to_products
```

2. Update `Product` model's `$fillable` array

3. Update `StoreProductRequest` validation rules

4. Update admin form component

### Creating Custom Roles

1. Add role in `RoleSeeder`
2. Update policies
3. Configure middleware

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Storage link broken
```bash
php artisan storage:link
```

**Issue:** Cache causing issues
```bash
php artisan optimize:clear
```

**Issue:** Assets not loading
```bash
npm run build
php artisan optimize
```

---

## 📚 Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete setup instructions
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Production deployment
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Architecture overview

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is open-sourced software licensed under the [MIT license](LICENSE).

---

## 👥 Support

For issues and questions:
- Open an issue on GitHub
- Email: support@luxury.com

---

## 🎉 Acknowledgments

- Laravel Framework
- React & Inertia.js teams
- Tailwind CSS
- Open source community

---

**Built with ❤️ for luxury e-commerce**
