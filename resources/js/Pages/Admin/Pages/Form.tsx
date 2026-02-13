import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button, Card } from '@/Components/UI';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { ChevronLeft, Save, Upload, X } from 'lucide-react';

export default function Form({ page = null }) {
    const isEdit = !!page;

    const { data, setData, post: postRequest, processing, errors, setError, clearErrors } = useForm({
        title: page?.title || '',
        slug: page?.slug || '',
        is_active: page?.is_active ?? true,
        hero_bg_file: null,
        content: {
            hero_bg: '',
            hero_title: '',
            hero_title_ar: '',
            hero_subtitle: '',
            hero_subtitle_ar: '',
            intro_text: '',
            intro_text_ar: '',
            mission_title: '',
            mission_title_ar: '',
            mission_text: '',
            mission_text_ar: '',
            values_title: '',
            values_title_ar: '',
            value1_title: '',
            value1_title_ar: '',
            value1_desc: '',
            value1_desc_ar: '',
            value2_title: '',
            value2_title_ar: '',
            value2_desc: '',
            value2_desc_ar: '',
            value3_title_ar: '',
            value3_desc: '',
            value3_desc_ar: '',
            address: '',
            address_ar: '',
            phone: '',
            email: '',
            /* Shipping & Returns */
            shipping_title: '',
            shipping_title_ar: '',
            shipping_text: '',
            shipping_text_ar: '',
            returns_title: '',
            returns_title_ar: '',
            returns_text: '',
            returns_text_ar: '',
            faq_items: [],
            ...(page?.content || {}),
        },
    });

    const [heroPreview, setHeroPreview] = React.useState(page?.content?.hero_bg || null);

    const handleHeroBgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('hero_bg_file', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setHeroPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            router.post(route('admin.pages.update', page.id), {
                ...data,
                _method: 'PUT'
            }, {
                forceFormData: true,
                onSuccess: () => { /* Success */ },
                onError: (err) => {
                    clearErrors();
                    Object.keys(err).forEach(key => setError(key as any, err[key]));
                }
            });
        } else {
            postRequest(route('admin.pages.store'));
        }
    };

    const updateContent = (key, value) => {
        setData('content', {
            ...data.content,
            [key]: value
        });
    };

    const addFaqItem = () => {
        const newItems = [...(data.content.faq_items || []), { question: '', answer: '', question_ar: '', answer_ar: '' }];
        updateContent('faq_items', newItems);
    };

    const removeFaqItem = (index) => {
        const newItems = data.content.faq_items.filter((_, i) => i !== index);
        updateContent('faq_items', newItems);
    };

    const updateFaqItem = (index, key, value) => {
        const newItems = [...data.content.faq_items];
        newItems[index] = { ...newItems[index], [key]: value };
        updateContent('faq_items', newItems);
    };

    return (
        <AdminLayout>
            <Head title={isEdit ? `Edit Page: ${page.title}` : 'New Page'} />

            <div className="flex items-center gap-4 mb-8">
                <Link
                    href={route('admin.pages.index')}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                    <ChevronLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {isEdit ? 'Edit Page' : 'New Page'}
                    </h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl">
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold border-b border-border pb-2">General Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-ring"
                                    />
                                    {errors.title && <p className="text-destructive text-xs mt-1">{errors.title}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Slug</label>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={e => setData('slug', e.target.value)}
                                        className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-ring"
                                    />
                                    {errors.slug && <p className="text-destructive text-xs mt-1">{errors.slug}</p>}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    className=" rounded text-accent focus:ring-ring"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-foreground">Active</label>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                        <div className="p-6 space-y-6">
                            <h3 className="text-lg font-bold border-b border-border pb-2">
                                {data.slug === 'about' ? 'About Page Content' :
                                    data.slug === 'contact' ? 'Contact Page Content' :
                                        data.slug === 'shipping-returns' ? 'Shipping & Returns Content' :
                                            'Page Content'}
                            </h3>

                            {/* Hero Section */}
                            <div className="space-y-4 pt-2">
                                <h4 className="font-semibold text-accent">Hero Section</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-2">Hero Background Image</label>
                                        <div className="flex flex-col gap-4">
                                            {heroPreview && (
                                                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-border group">
                                                    <img src={heroPreview} className="w-full h-full object-cover" alt="Preview" />
                                                    <button
                                                        type="button"
                                                        onClick={() => { setHeroPreview(null); setData('hero_bg_file', null); }}
                                                        className="absolute top-2 right-2 p-1.5 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            )}
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    onChange={handleHeroBgChange}
                                                    className="hidden"
                                                    id="hero_bg_file"
                                                    accept="image/*"
                                                />
                                                <label
                                                    htmlFor="hero_bg_file"
                                                    className="flex flex-col items-center justify-center w-full min-h-[100px] border-2 border-dashed border-border rounded-xl hover:border-accent hover:bg-accent/5 transition-all cursor-pointer group"
                                                >
                                                    <Upload className="w-8 h-8 text-muted-foreground/50 group-hover:text-accent mb-2" />
                                                    <span className="text-sm font-medium text-muted-foreground group-hover:text-accent">
                                                        {heroPreview ? 'Change Background' : 'Upload Background'}
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        {errors.hero_bg_file && <p className="text-xs text-red-500 mt-1">{errors.hero_bg_file}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1">Hero Title (EN)</label>
                                        <input type="text" value={data.content.hero_title} onChange={e => updateContent('hero_title', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-ring" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1">Hero Title (AR)</label>
                                        <input type="text" value={data.content.hero_title_ar} onChange={e => updateContent('hero_title_ar', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg text-right focus:ring-2 focus:ring-ring" dir="rtl" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1">Hero Subtitle (EN)</label>
                                        <textarea value={data.content.hero_subtitle} onChange={e => updateContent('hero_subtitle', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg h-20 focus:ring-2 focus:ring-ring" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1">Hero Subtitle (AR)</label>
                                        <textarea value={data.content.hero_subtitle_ar} onChange={e => updateContent('hero_subtitle_ar', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg h-20 text-right focus:ring-2 focus:ring-ring" dir="rtl" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1">Intro Text (EN)</label>
                                        <textarea value={data.content.intro_text} onChange={e => updateContent('intro_text', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg h-32 focus:ring-2 focus:ring-ring" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1">Intro Text (AR)</label>
                                        <textarea value={data.content.intro_text_ar} onChange={e => updateContent('intro_text_ar', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg h-32 text-right focus:ring-2 focus:ring-ring" dir="rtl" />
                                    </div>
                                </div>
                            </div>

                            {data.slug === 'faq' && (
                                <div className="space-y-6 pt-4 border-t border-border">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-accent">FAQ Items</h4>
                                        <Button type="button" onClick={addFaqItem} variant="outline" size="sm">
                                            Add Question
                                        </Button>
                                    </div>

                                    <div className="space-y-6">
                                        {(data.content.faq_items || []).map((item, index) => (
                                            <div key={index} className="p-4 bg-muted rounded-xl space-y-4 relative border border-border group">
                                                <button
                                                    type="button"
                                                    onClick={() => removeFaqItem(index)}
                                                    className="absolute top-2 right-2 p-1.5 bg-destructive/10 text-destructive rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20"
                                                >
                                                    <X size={14} />
                                                </button>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-medium text-muted-foreground mb-1">Question (EN)</label>
                                                        <input
                                                            type="text"
                                                            value={item.question}
                                                            onChange={e => updateFaqItem(index, 'question', e.target.value)}
                                                            className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-ring"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-muted-foreground mb-1 text-right">Question (AR)</label>
                                                        <input
                                                            type="text"
                                                            value={item.question_ar}
                                                            onChange={e => updateFaqItem(index, 'question_ar', e.target.value)}
                                                            className="w-full px-3 py-2 border border-border bg-background rounded-lg text-right focus:ring-2 focus:ring-ring"
                                                            dir="rtl"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-medium text-muted-foreground mb-1">Answer (EN)</label>
                                                        <textarea
                                                            value={item.answer}
                                                            onChange={e => updateFaqItem(index, 'answer', e.target.value)}
                                                            className="w-full px-3 py-2 border border-border bg-background rounded-lg h-24 focus:ring-2 focus:ring-ring"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-muted-foreground mb-1 text-right">Answer (AR)</label>
                                                        <textarea
                                                            value={item.answer_ar}
                                                            onChange={e => updateFaqItem(index, 'answer_ar', e.target.value)}
                                                            className="w-full px-3 py-2 border border-border bg-background rounded-lg h-24 text-right focus:ring-2 focus:ring-ring"
                                                            dir="rtl"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {(!data.content.faq_items || data.content.faq_items.length === 0) && (
                                            <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                <p className="text-sm text-gray-500">No FAQ items added yet. Click "Add Question" to start.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {data.slug === 'contact' && (
                                <div className="space-y-4 pt-4 border-t border-border">
                                    <h4 className="font-semibold text-accent">Contact Details</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-muted-foreground mb-1">Address (EN)</label>
                                            <input type="text" value={data.content.address} onChange={e => updateContent('address', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-ring" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-muted-foreground mb-1">Address (AR)</label>
                                            <input type="text" value={data.content.address_ar} onChange={e => updateContent('address_ar', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg text-right focus:ring-2 focus:ring-ring" dir="rtl" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-muted-foreground mb-1">Phone Number</label>
                                            <input type="text" value={data.content.phone} onChange={e => updateContent('phone', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-ring" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-muted-foreground mb-1">Email Address</label>
                                            <input type="text" value={data.content.email} onChange={e => updateContent('email', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-ring" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {data.slug === 'shipping-returns' && (
                                <div className="space-y-6 pt-4 border-t border-border">
                                    {/* Shipping Section */}
                                    <div>
                                        <h4 className="font-semibold text-accent mb-3">Shipping Policy</h4>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">Title (EN)</label>
                                                <input type="text" value={data.content.shipping_title} onChange={e => updateContent('shipping_title', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-ring" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">Title (AR)</label>
                                                <input type="text" value={data.content.shipping_title_ar} onChange={e => updateContent('shipping_title_ar', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg text-right focus:ring-2 focus:ring-ring" dir="rtl" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">Details (EN)</label>
                                                <textarea value={data.content.shipping_text} onChange={e => updateContent('shipping_text', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg h-32 focus:ring-2 focus:ring-ring" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">Details (AR)</label>
                                                <textarea value={data.content.shipping_text_ar} onChange={e => updateContent('shipping_text_ar', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg h-32 text-right focus:ring-2 focus:ring-ring" dir="rtl" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Returns Section */}
                                    <div>
                                        <h4 className="font-semibold text-accent mb-3">Returns Policy</h4>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">Title (EN)</label>
                                                <input type="text" value={data.content.returns_title} onChange={e => updateContent('returns_title', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-ring" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">Title (AR)</label>
                                                <input type="text" value={data.content.returns_title_ar} onChange={e => updateContent('returns_title_ar', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg text-right focus:ring-2 focus:ring-ring" dir="rtl" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">Details (EN)</label>
                                                <textarea value={data.content.returns_text} onChange={e => updateContent('returns_text', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg h-32 focus:ring-2 focus:ring-ring" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">Details (AR)</label>
                                                <textarea value={data.content.returns_text_ar} onChange={e => updateContent('returns_text_ar', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg h-32 text-right focus:ring-2 focus:ring-ring" dir="rtl" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {data.slug === 'about' && (
                                <>
                                    {/* Mission Section */}
                                    <div className="space-y-4 pt-4 border-t border-border">
                                        <h4 className="font-semibold text-accent">Mission Section</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">Mission Title (EN)</label>
                                                <input type="text" value={data.content.mission_title} onChange={e => updateContent('mission_title', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-ring" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">Mission Title (AR)</label>
                                                <input type="text" value={data.content.mission_title_ar} onChange={e => updateContent('mission_title_ar', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg text-right focus:ring-2 focus:ring-ring" dir="rtl" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">Mission Text (EN)</label>
                                                <textarea value={data.content.mission_text} onChange={e => updateContent('mission_text', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg h-32 focus:ring-2 focus:ring-ring" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1">Mission Text (AR)</label>
                                                <textarea value={data.content.mission_text_ar} onChange={e => updateContent('mission_text_ar', e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg h-32 text-right focus:ring-2 focus:ring-ring" dir="rtl" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Values */}
                                    <div className="space-y-4 pt-4 border-t border-border">
                                        <h4 className="font-semibold text-accent">Values Section</h4>
                                        <div className="grid grid-cols-1 gap-6">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="p-4 bg-muted rounded-lg space-y-3 border border-border">
                                                    <h5 className="text-sm font-bold text-foreground">Value {i}</h5>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-medium text-muted-foreground mb-1">Title (EN)</label>
                                                            <input type="text" value={data.content[`value${i}_title`]} onChange={e => updateContent(`value${i}_title`, e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-ring" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-muted-foreground mb-1">Title (AR)</label>
                                                            <input type="text" value={data.content[`value${i}_title_ar`]} onChange={e => updateContent(`value${i}_title_ar`, e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg text-right focus:ring-2 focus:ring-ring" dir="rtl" />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-medium text-muted-foreground mb-1">Description (EN)</label>
                                                            <textarea value={data.content[`value${i}_desc`]} onChange={e => updateContent(`value${i}_desc`, e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg h-20 focus:ring-2 focus:ring-ring" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-muted-foreground mb-1">Description (AR)</label>
                                                            <textarea value={data.content[`value${i}_desc_ar`]} onChange={e => updateContent(`value${i}_desc_ar`, e.target.value)} className="w-full px-3 py-2 border border-border bg-background rounded-lg h-20 text-right focus:ring-2 focus:ring-ring" dir="rtl" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>


                    <div className="flex justify-end gap-3">
                        <Link href={route('admin.pages.index')}>
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="flex items-center">
                            <Save size={18} className="mr-2" />
                            {isEdit ? 'Update Page' : 'Create Page'}
                        </Button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
