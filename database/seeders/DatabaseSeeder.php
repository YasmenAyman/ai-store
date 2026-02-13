<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminRole = \App\Models\Role::firstOrCreate(['slug' => 'admin'], [
            'name' => 'Admin',
        ]);

        \App\Models\Role::firstOrCreate(['slug' => 'editor'], [
            'name' => 'Editor',
        ]);

        \App\Models\Role::firstOrCreate(['slug' => 'customer'], [
            'name' => 'Customer',
        ]);

        \App\Models\User::updateOrCreate(
            ['email' => 'admin@ai-store.com'],
            [
                'role_id' => $adminRole->id,
                'name' => 'Admin User',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
            ]
        );

        \App\Models\HomeSection::updateOrCreate(
            ['slug' => 'hero'],
            [
                'title' => 'Main Hero',
                'content' => [
                    'title' => 'Elevate Your Space',
                    'subtitle' => 'Discover our curated collection of luxury candles, fragrances, and home décor',
                    'cta_text' => 'Shop Collection',
                    'cta_link' => '/store',
                    'image' => '/assets/hero-bg.jpg',
                ],
                'sort_order' => 1,
                'is_active' => true,
            ]
        );

        $categories = [
            ['name' => 'Candles', 'name_ar' => 'شموع', 'image' => '/assets/category-candles.jpg', 'slug' => 'candles', 'sort_order' => 1],
            ['name' => 'Fragrances', 'name_ar' => 'عطور', 'image' => '/assets/category-fragrances.jpg', 'slug' => 'fragrances', 'sort_order' => 2],
            ['name' => 'Home Décor', 'name_ar' => 'ديكور منزلي', 'image' => '/assets/category-decor.jpg', 'slug' => 'decor', 'sort_order' => 3],
            ['name' => 'Gift Sets', 'name_ar' => 'أطقم هدايا', 'image' => '/assets/category-gifts.jpg', 'slug' => 'gifts', 'sort_order' => 4],
        ];

        foreach ($categories as $cat) {
            \App\Models\Category::updateOrCreate(
                ['slug' => $cat['slug']],
                [
                    'name' => $cat['name'],
                    'name_ar' => $cat['name_ar'],
                    'image' => $cat['image'],
                    'sort_order' => $cat['sort_order'],
                    'is_active' => true,
                ]
            );
        }

        // Seed Products
        $candlesCategory = \App\Models\Category::where('slug', 'candles')->first();
        $fragrancesCategory = \App\Models\Category::where('slug', 'fragrances')->first();
        $decorCategory = \App\Models\Category::where('slug', 'decor')->first();

        $products = [
            [
                'category_id' => $candlesCategory->id,
                'name' => 'Golden Hour Soy Candle',
                'name_ar' => 'شمعة الساعة الذهبية',
                'slug' => 'golden-hour-soy-candle',
                'description' => 'Hand-poured soy candle with notes of warm amber, sandalwood, and vanilla. Burns for up to 60 hours.',
                'description_ar' => 'شمعة صويا مصبوبة يدوياً بنفحات العنبر الدافئ وخشب الصندل والفانيليا. تحترق لمدة تصل إلى 60 ساعة.',
                'price' => 48.00,
                'compare_at_price' => 60.00,
                'stock' => 50,
                'rating' => 4.8,
                'review_count' => 124,
                'is_featured' => true,
                'is_best_seller' => true,
            ],
            [
                'category_id' => $fragrancesCategory->id,
                'name' => 'Noir Reed Diffuser',
                'name_ar' => 'ناشر القصب نوار',
                'slug' => 'noir-reed-diffuser',
                'description' => 'Elegant reed diffuser with a rich blend of oud, black pepper, and cedarwood. Fills any room with luxury.',
                'description_ar' => 'ناشر قصب أنيق بمزيج غني من العود والفلفل الأسود وخشب الأرز.',
                'price' => 65.00,
                'stock' => 30,
                'rating' => 4.9,
                'review_count' => 89,
                'is_featured' => true,
                'is_best_seller' => true,
            ],
            [
                'category_id' => $decorCategory->id,
                'name' => 'Luna Ceramic Vase',
                'name_ar' => 'مزهرية لونا السيراميك',
                'slug' => 'luna-ceramic-vase',
                'description' => 'Handcrafted ceramic vase with an organic, flowing shape. Perfect as a statement piece.',
                'description_ar' => 'مزهرية سيراميك مصنوعة يدوياً بشكل عضوي انسيابي.',
                'price' => 85.00,
                'stock' => 20,
                'rating' => 4.7,
                'review_count' => 56,
                'is_featured' => true,
            ],
            [
                'category_id' => $fragrancesCategory->id,
                'name' => 'Essential Oil Collection',
                'name_ar' => 'مجموعة الزيوت العطرية',
                'slug' => 'essential-oil-collection',
                'description' => 'A curated set of five premium essential oils: lavender, eucalyptus, peppermint, tea tree, and lemon.',
                'description_ar' => 'مجموعة منسقة من خمسة زيوت عطرية فاخرة.',
                'price' => 120.00,
                'compare_at_price' => 150.00,
                'stock' => 40,
                'rating' => 4.6,
                'review_count' => 203,
                'is_featured' => true,
                'is_best_seller' => true,
            ],
            [
                'category_id' => $candlesCategory->id,
                'name' => 'Serenity Pillar Candle Set',
                'name_ar' => 'مجموعة شموع سيرينيتي',
                'slug' => 'serenity-pillar-candle-set',
                'description' => 'Set of three pillar candles in graduated sizes. Made with natural beeswax and cotton wicks.',
                'description_ar' => 'مجموعة من ثلاث شموع عمودية بأحجام متدرجة.',
                'price' => 72.00,
                'stock' => 35,
                'rating' => 4.8,
                'review_count' => 67,
                'is_featured' => true,
            ],
            [
                'category_id' => $fragrancesCategory->id,
                'name' => 'Velvet Room Spray',
                'name_ar' => 'بخاخ الغرفة المخملي',
                'slug' => 'velvet-room-spray',
                'description' => 'Instant luxury in a bottle. Notes of rose, jasmine, and white musk create an unforgettable atmosphere.',
                'description_ar' => 'فخامة فورية في زجاجة. نفحات الورد والياسمين والمسك الأبيض.',
                'price' => 38.00,
                'stock' => 0,
                'rating' => 4.5,
                'review_count' => 145,
                'is_featured' => false,
            ],
            [
                'category_id' => $candlesCategory->id,
                'name' => 'Artisan Wax Melts',
                'name_ar' => 'شمع ذائب حرفي',
                'slug' => 'artisan-wax-melts',
                'description' => 'Premium wax melts in four seasonal scents. Long-lasting fragrance for your wax warmer.',
                'description_ar' => 'شمع ذائب فاخر بأربع روائح موسمية.',
                'price' => 28.00,
                'stock' => 60,
                'rating' => 4.4,
                'review_count' => 312,
                'is_featured' => false,
            ],
            [
                'category_id' => $decorCategory->id,
                'name' => 'Zen Incense Set',
                'name_ar' => 'مجموعة بخور زن',
                'slug' => 'zen-incense-set',
                'description' => 'Handmade ceramic incense holder with a selection of premium Japanese incense sticks.',
                'description_ar' => 'حامل بخور سيراميك مصنوع يدوياً مع مجموعة من أعواد البخور اليابانية الفاخرة.',
                'price' => 42.00,
                'stock' => 25,
                'rating' => 4.7,
                'review_count' => 98,
                'is_featured' => true,
            ],
        ];

        foreach ($products as $index => $productData) {
            $product = \App\Models\Product::updateOrCreate(
                ['slug' => $productData['slug']],
                $productData
            );

            // Add product image
            $imageNumber = $index + 1;
            \App\Models\ProductImage::updateOrCreate(
                ['product_id' => $product->id, 'is_primary' => true],
                [
                    'image_path' => "/assets/product-{$imageNumber}.jpg",
                    'sort_order' => 0,
                ]
            );
        }

        // Seed Blog Posts
        $admin = \App\Models\User::where('email', 'admin@ai-store.com')->first();
        $blogPosts = [
            [
                'title' => 'The Art of Candle Making',
                'title_ar' => 'فن صناعة الشموع',
                'slug' => 'the-art-of-candle-making',
                'excerpt' => 'Discover the centuries-old craft behind our hand-poured luxury candles and the artisans who make them.',
                'excerpt_ar' => 'اكتشف الحرفة العريقة وراء شموعنا الفاخرة المصبوبة يدوياً والحرفيين الذين يصنعونها.',
                'content' => 'Full content for the art of candle making...',
                'content_ar' => 'المحتوى الكامل لصناعة الشموع...',
                'featured_image' => '/assets/blog-1.jpg',
                'is_published' => true,
                'published_at' => now()->subDays(10),
            ],
            [
                'title' => 'Styling Your Home with Intention',
                'title_ar' => 'تصميم منزلك بعناية',
                'slug' => 'styling-your-home-with-intention',
                'excerpt' => 'Learn how to create meaningful spaces that reflect your personality using our curated décor pieces.',
                'excerpt_ar' => 'تعلم كيفية إنشاء مساحات ذات معنى تعكس شخصيتك باستخدام قطع الديكور المنسقة لدينا.',
                'content' => 'Full content for styling your home...',
                'content_ar' => 'المحتوى الكامل لتصميم المنزل...',
                'featured_image' => '/assets/blog-2.jpg',
                'is_published' => true,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'The Power of Scent in Self-Care',
                'title_ar' => 'قوة العطر في العناية الذاتية',
                'slug' => 'the-power-of-scent-in-self-care',
                'excerpt' => 'How incorporating luxury fragrances into your daily routine can transform your wellbeing.',
                'excerpt_ar' => 'كيف يمكن لإدراج العطور الفاخرة في روتينك اليومي أن يغير رفاهيتك.',
                'content' => 'Full content for the power of scent...',
                'content_ar' => 'المحتوى الكامل لقوة العطر...',
                'featured_image' => '/assets/blog-3.jpg',
                'is_published' => true,
                'published_at' => now()->subDays(2),
            ],
        ];

        foreach ($blogPosts as $postData) {
            \App\Models\BlogPost::updateOrCreate(
                ['slug' => $postData['slug']],
                array_merge($postData, ['author_id' => $admin->id])
            );
        }

        $this->call(\Database\Seeders\PageSeeder::class);
    }
}
