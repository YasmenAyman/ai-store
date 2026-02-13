import React from 'react';
import { Layout } from "@/Components/layout/Layout";
import { Head } from '@inertiajs/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Truck, RotateCcw, HelpCircle } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";

interface PageProps {
    page: {
        title: string;
        slug: string;
        content: {
            hero_bg?: string;
            hero_title?: string;
            hero_title_ar?: string;
            intro_text?: string;
            intro_text_ar?: string;
            shipping_title?: string;
            shipping_title_ar?: string;
            shipping_text?: string;
            shipping_text_ar?: string;
            returns_title?: string;
            returns_title_ar?: string;
            returns_text?: string;
            returns_text_ar?: string;
            faq_items?: Array<{
                question: string;
                question_ar: string;
                answer: string;
                answer_ar: string;
            }>;
        };
    };
}

export default function Page({ page }: PageProps) {
    const { language } = useLanguage();
    const isRtl = language === 'ar';

    const title = isRtl
        ? (page.content.hero_title_ar || page.title)
        : (page.content.hero_title || page.title);

    const content = isRtl
        ? (page.content.intro_text_ar || '')
        : (page.content.intro_text || '');

    return (
        <Layout>
            <Head title={title} />

            {/* Hero Section */}
            <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
                {page.content.hero_bg && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={page.content.hero_bg}
                            alt={title}
                            className="w-full h-full object-cover opacity-60"
                        />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                <div className="relative z-10 container text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">{title}</h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="container py-20 max-w-5xl">
                {page.slug === 'shipping-returns' ? (
                    <div className="grid md:grid-cols-2 gap-16">
                        <div className="space-y-8 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 text-blue-600">
                                <div className="p-3 bg-blue-50 rounded-xl">
                                    <Truck size={32} />
                                </div>
                                <h2 className="text-2xl font-serif font-bold text-gray-900">
                                    {isRtl ? (page.content.shipping_title_ar || 'سياسة الشحن') : (page.content.shipping_title || 'Shipping Policy')}
                                </h2>
                            </div>
                            <div className="prose prose-lg text-gray-600 whitespace-pre-wrap leading-relaxed">
                                {isRtl ? page.content.shipping_text_ar : page.content.shipping_text}
                            </div>
                        </div>

                        <div className="space-y-8 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 text-blue-600">
                                <div className="p-3 bg-blue-50 rounded-xl">
                                    <RotateCcw size={32} />
                                </div>
                                <h2 className="text-2xl font-serif font-bold text-gray-900">
                                    {isRtl ? (page.content.returns_title_ar || 'سياسة الإرجاع') : (page.content.returns_title || 'Returns Policy')}
                                </h2>
                            </div>
                            <div className="prose prose-lg text-gray-600 whitespace-pre-wrap leading-relaxed">
                                {isRtl ? page.content.returns_text_ar : page.content.returns_text}
                            </div>
                        </div>
                    </div>
                ) : page.slug === 'faq' ? (
                    <div className="max-w-3xl mx-auto space-y-12">
                        <div className="text-center space-y-4 mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                                <HelpCircle size={16} />
                                <span>{isRtl ? 'الأسئلة المتكررة' : 'Support Center'}</span>
                            </div>
                            <h2 className="text-3xl font-serif font-bold text-gray-900">
                                {isRtl ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
                            </h2>
                        </div>

                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {(page.content.faq_items || []).map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="bg-white border rounded-xl px-6 data-[state=open]:border-blue-200 data-[state=open]:shadow-sm transition-all"
                                >
                                    <AccordionTrigger className="text-lg font-medium hover:no-underline py-6">
                                        <span className={isRtl ? 'text-right w-full pr-4' : 'text-left w-full pl-0'}>
                                            {isRtl ? item.question_ar : item.question}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600 prose prose-slate pb-6">
                                        <div className={isRtl ? 'pr-4 text-right' : ''}>
                                            {isRtl ? item.answer_ar : item.answer}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 md:p-16">
                            <div className="prose prose-blue lg:prose-xl max-w-none">
                                <div dir={isRtl ? 'rtl' : 'ltr'} className="whitespace-pre-wrap leading-relaxed text-gray-600">
                                    {content}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
