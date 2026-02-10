

# Luxury E-Commerce Storefront — Implementation Plan

## Design System & Theme
- **Palette**: Warm neutral luxury tones — beige (#F5F0EB), soft cream, charcoal black, warm gray, gold accents
- **Typography**: Elegant serif font for headings (Playfair Display), clean sans-serif for body (Inter)
- **Style**: Minimal, airy layouts with generous whitespace, rounded cards, subtle shadows, smooth hover transitions
- **Dark mode**: Rich dark backgrounds with warm accent tones

---

## Phase 1: Foundation & Layout

### Global Infrastructure
- **i18n system** with mock translation objects (EN/AR), RTL support via `dir` attribute, React Context for language state
- **Theme toggle** (light/dark) using `next-themes` + Tailwind dark mode
- **Shared layout** with sticky Navbar and Footer on all pages
- **Routing** for all pages: `/`, `/store`, `/product/:id`, `/favorites`, `/cart`, `/checkout`, `/about`, `/contact`, `/login`, `/register`

### Navbar
- Logo (left), nav links (Home, Store, About Us, Contact), icon group (language toggle, theme toggle, favorites heart, cart with badge counter, profile icon)
- Sticky on scroll, responsive with mobile hamburger menu
- RTL-aware layout

### Footer
- Multi-column footer with brand info, quick links, social icons, newsletter input
- Luxury brand aesthetic

---

## Phase 2: Home Page

- **Hero section** — Full-width lifestyle image with overlay text, CTA button to shop collection
- **Categories grid** — 3-4 elegant cards (e.g., Candles, Fragrances, Home Décor, Gift Sets) with hover effects
- **Featured / Best Sellers** — Product card grid (4-8 items) with image, name, price, rating, wishlist heart
- **Promotional banner** — Full-width image/text split section with a seasonal or sale promotion
- **CTA section** — Newsletter signup + "Shop Now" dual CTA with branded background
- **Blog preview** — 3 blog cards with image, date, title, excerpt
- **Testimonials** — Customer quotes in a carousel or grid, with avatars and ratings

---

## Phase 3: Store Page

- Product grid with **ProductCard** components (image, name, price, rating, wishlist toggle)
- Sidebar or top-bar filters: category, price range (slider), rating
- Sorting dropdown (price low-high, high-low, newest, popular)
- Responsive: filters collapse into a drawer on mobile

---

## Phase 4: Product Details Page

- **Image gallery** — Main image + thumbnails
- Product info: name, price (with discount/original), stock badge, rating stars
- **Add to Cart** button with quantity selector
- **Tabs**: Description, Reviews (mock data)
- Related products section at bottom

---

## Phase 5: Favorites, Cart & Checkout

### Favorites (Wishlist)
- Grid of saved products with remove button
- Empty state with illustration and CTA to browse store

### Cart
- List of cart items with product image, name, price, quantity controls (+/−), remove button
- Order summary sidebar (subtotal, shipping, total)
- "Proceed to Checkout" button

### Checkout (UI only)
- Form layout: shipping info, payment info (mock), order summary
- Clean stepped or single-page layout

---

## Phase 6: About Us & Contact

### About Us
- Brand story hero section with lifestyle imagery
- Mission & values in an elegant grid
- Image + text alternating sections with luxury brand tone

### Contact
- Contact form (name, email, subject, message)
- Company info (address, phone, email) with icons
- Map placeholder (styled div)

---

## Phase 7: Login & Register

- Clean minimal auth UI
- Login form (email, password, "forgot password" link, social login buttons)
- Register form (name, email, password, confirm password)
- Toggle between login/register or separate routes

---

## Reusable Components
- `ProductCard` — Image, name, price, rating, wishlist heart
- `CategoryCard` — Image with overlay text
- `BlogCard` — Image, date, title, excerpt
- `CTASection` — Configurable background, heading, subtext, button
- `LanguageToggle` — EN/AR switcher
- `ThemeToggle` — Light/dark mode button
- `TestimonialCard` — Avatar, quote, name, rating

---

## Mock Data
- All product, category, blog, testimonial, and review data stored in JSON/TS files under `src/data/`
- Translation strings in `src/i18n/` with `en.ts` and `ar.ts` objects

---

## Folder Structure
```
src/
├── components/
│   ├── layout/ (Navbar, Footer, Layout)
│   ├── home/ (Hero, Categories, Featured, Promo, CTA, Blog, Testimonials)
│   ├── store/ (ProductGrid, Filters, Sorting)
│   ├── product/ (ImageGallery, ProductInfo, Tabs)
│   ├── cart/ (CartItem, OrderSummary)
│   ├── shared/ (ProductCard, CategoryCard, BlogCard, CTASection)
│   └── ui/ (existing shadcn components)
├── contexts/ (ThemeContext, LanguageContext, CartContext, FavoritesContext)
├── data/ (products, categories, blogs, testimonials, reviews)
├── i18n/ (en.ts, ar.ts)
├── hooks/
├── pages/ (Home, Store, ProductDetails, Favorites, Cart, Checkout, About, Contact, Login, Register)
└── lib/
```

> **Note**: This is a large project. I recommend implementing it in phases — starting with the foundation and home page, then adding pages incrementally. Each phase will be a separate prompt to keep quality high.

