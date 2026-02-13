<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Page;
use App\Models\FooterLink;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'title' => 'Shipping & Returns',
                'slug' => 'shipping-returns',
                'content' => [
                    'hero_title' => 'Shipping & Returns',
                    'hero_title_ar' => 'الشحن والمرتجعات',
                    'shipping_title' => 'Shipping Policy',
                    'shipping_title_ar' => 'سياسة الشحن',
                    'shipping_text' => "We offer fast and reliable shipping options.\n\nDomestic Shipping:\nStandard shipping takes 3-5 business days. Express shipping is available for an additional fee.\n\nInternational Shipping:\nWe ship to select countries worldwide. Delivery times vary by location.",
                    'shipping_text_ar' => "نقدم خيارات شحن سريعة وموثوقة.\n\nالشحن المحلي:\nيستغرق الشحن القياسي من 3 إلى 5 أيام عمل. يتوفر الشحن السريع مقابل رسوم إضافية.\n\nالشحن الدولي:\nنقوم بالشحن إلى دول مختارة حول العالم. تختلف أوقات التسليم حسب الموقع.",
                    'returns_title' => 'Returns Policy',
                    'returns_title_ar' => 'سياسة الإرجاع',
                    'returns_text' => "You can return items within 30 days of receipt for a full refund.\n\nConditions:\n- Items must be unused and in original packaging.\n- Proof of purchase is required.\n\nRefunds:\nRefunds will be processed to the original payment method within 5-7 business days of receiving the return.",
                    'returns_text_ar' => "يمكنك إرجاع المنتجات خلال 30 يومًا من استلامها واسترداد المبلغ بالكامل.\n\nالشروط:\n- يجب أن تكون المنتجات غير مستخدمة وفي عبواتها الأصلية.\n- مطلوب إثبات الشراء.\n\nالمبالغ المستردة:\nستتم معالجة المبالغ المستردة إلى طريقة الدفع الأصلية خلال 5-7 أيام عمل من استلام المرتجع."
                ]
            ],
            [
                'title' => 'FAQ',
                'slug' => 'faq',
                'content' => [
                    'hero_title' => 'Frequently Asked Questions',
                    'hero_title_ar' => 'الأسئلة الشائعة',
                    'faq_items' => [
                        [
                            'question' => 'How do I track my order?',
                            'question_ar' => 'كيف يمكنني تتبع طلبي؟',
                            'answer' => 'You will receive a tracking number via email once your order ships.',
                            'answer_ar' => 'ستتلقى رقم تتبع عبر البريد الإلكتروني بمجرد شحن طلبك.'
                        ],
                        [
                            'question' => 'Do you ship internationally?',
                            'question_ar' => 'هل تشحنون دوليًا؟',
                            'answer' => 'Yes, we ship to select countries worldwide. Delivery times vary by location.',
                            'answer_ar' => 'نعم، نقوم بالشحن إلى دول مختارة حول العالم. تختلف أوقات التسليم حسب الموقع.'
                        ],
                        [
                            'question' => 'What is your return policy?',
                            'question_ar' => 'ما هي سياسة الإرجاع الخاصة بكم؟',
                            'answer' => 'You can return any item within 30 days of receipt. Please see our Shipping & Returns page for more details.',
                            'answer_ar' => 'يمكنك إرجاع أي منتج خلال 30 يومًا من استلامه. يرجى مراجعة صفحة الشحن والمرتجعات لمزيد من التفاصيل.'
                        ]
                    ]
                ]
            ],
            [
                'title' => 'Privacy Policy',
                'slug' => 'privacy-policy',
                'content' => [
                    'hero_title' => 'Privacy Policy',
                    'hero_title_ar' => 'سياسة الخصوصية',
                    'intro_text' => "Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information when you use our website.",
                    'intro_text_ar' => "خصوصيتك مهمة بالنسبة لنا. توضح هذه السياسة كيفية جمعنا واستخدامنا وحماية معلوماتك الشخصية عند استخدام موقعنا الإلكتروني."
                ]
            ],
            [
                'title' => 'Terms of Service',
                'slug' => 'terms-of-service',
                'content' => [
                    'hero_title' => 'Terms of Service',
                    'hero_title_ar' => 'شروط الخدمة',
                    'intro_text' => "By accessing and using this website, you agree to comply with and be bound by the following terms and conditions.",
                    'intro_text_ar' => "من خلال الوصول إلى هذا الموقع واستخدامه، فإنك توافق على الامتثال للشروط والأحكام التالية والالتزام بها."
                ]
            ]
        ];

        foreach ($pages as $pageData) {
            Page::updateOrCreate(
                ['slug' => $pageData['slug']],
                [
                    'title' => $pageData['title'],
                    'content' => $pageData['content'],
                    'is_active' => true
                ]
            );

            // Add to footer links if not exists
            $section = in_array($pageData['slug'], ['shipping-returns', 'faq']) ? 'customer_service' : 'quick_links';
            
            FooterLink::updateOrCreate(
                ['url' => '/pages/' . $pageData['slug']],
                [
                    'section' => $section,
                    'label_en' => $pageData['title'],
                    'label_ar' => $pageData['content']['hero_title_ar'],
                    'sort_order' => 10,
                    'is_active' => true
                ]
            );
        }
    }
}
