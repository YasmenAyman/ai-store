import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { ChevronLeft, Save } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { route } from 'ziggy-js';

export default function Edit({ section }) {
    const { data, setData, put, processing, errors } = useForm({
        title: section.title,
        is_active: section.is_active,
        content: section.content || {
            title: '',
            subtitle: '',
            cta_text: '',
            cta_link: '',
            image: '',
        },
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.home-sections.update', section.id));
    };

    const updateContentField = (field, value) => {
        setData('content', {
            ...data.content,
            [field]: value
        });
    };

    return (
        <AdminLayout>
            <Head title={`Edit Section: ${section.title}`} />

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Link
                        href={route('admin.home-sections.index')}
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-2"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Sections
                    </Link>
                    <h1 className="text-2xl font-bold text-foreground">Edit {section.title}</h1>
                </div>
            </div>

            <form onSubmit={submit} className="max-w-4xl bg-card p-8 rounded-2xl shadow-sm border border-border">
                <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Display Title</label>
                            <input
                                type="text"
                                value={data.title}
                                className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50"
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Status</label>
                            <select
                                className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all"
                                value={data.is_active ? '1' : '0'}
                                onChange={(e) => setData('is_active', e.target.value === '1')}
                            >
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="border-t border-border pt-6">
                        <h3 className="font-bold text-foreground mb-4">Content Configuration</h3>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Hero Heading</label>
                                <input
                                    type="text"
                                    value={data.content.title}
                                    className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all"
                                    onChange={(e) => updateContentField('title', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Sub-heading / Description</label>
                                <textarea
                                    rows={3}
                                    value={data.content.subtitle}
                                    className="w-full p-4 rounded-xl border border-border bg-muted/50 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all resize-none"
                                    onChange={(e) => updateContentField('subtitle', e.target.value)}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">CTA Button Text</label>
                                    <input
                                        type="text"
                                        value={data.content.cta_text}
                                        className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all"
                                        onChange={(e) => updateContentField('cta_text', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">CTA Link URL</label>
                                    <input
                                        type="text"
                                        value={data.content.cta_link}
                                        className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all"
                                        onChange={(e) => updateContentField('cta_link', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Background Image URL</label>
                                <input
                                    type="text"
                                    value={data.content.image}
                                    className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all"
                                    onChange={(e) => updateContentField('image', e.target.value)}
                                />
                                <p className="text-[10px] text-muted-foreground italic">Provide a relative path (e.g., /assets/hero-bg.jpg) or absolute URL.</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <Button
                            type="submit"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 h-12 text-base font-bold shadow-lg shadow-accent/20"
                            disabled={processing}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
