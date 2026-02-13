<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FooterLink;

class FooterLinksSeeder extends Seeder
{
    public function run(): void
    {
        $links = [
            // Quick Links
            [
                'section' => 'quick_links',
                'label_en' => 'Home',
                'label_ar' => 'الرئيسية',
                'url' => '/',
                'sort_order' => 1,
            ],
            [
                'section' => 'quick_links',
                'label_en' => 'Store',
                'label_ar' => 'المتجر',
                'url' => '/store',
                'sort_order' => 2,
            ],
            [
                'section' => 'quick_links',
                'label_en' => 'About Us',
                'label_ar' => 'من نحن',
                'url' => '/about',
                'sort_order' => 3,
            ],
            [
                'section' => 'quick_links',
                'label_en' => 'Contact',
                'label_ar' => 'اتصل بنا',
                'url' => '/contact',
                'sort_order' => 4,
            ],
            // Customer Service
            [
                'section' => 'customer_service',
                'label_en' => 'Shipping & Returns',
                'label_ar' => 'الشحن والإرجاع',
                'url' => null,
                'sort_order' => 1,
            ],
            [
                'section' => 'customer_service',
                'label_en' => 'FAQ',
                'label_ar' => 'الأسئلة الشائعة',
                'url' => null,
                'sort_order' => 2,
            ],
            [
                'section' => 'customer_service',
                'label_en' => 'Privacy Policy',
                'label_ar' => 'سياسة الخصوصية',
                'url' => null,
                'sort_order' => 3,
            ],
            [
                'section' => 'customer_service',
                'label_en' => 'Terms of Service',
                'label_ar' => 'شروط الخدمة',
                'url' => null,
                'sort_order' => 4,
            ],
        ];

        foreach ($links as $link) {
            FooterLink::create($link);
        }
    }
}
