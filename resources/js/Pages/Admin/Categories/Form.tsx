import React, { useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { ChevronLeft, Save, Upload, X } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { route } from 'ziggy-js';

export default function Form({ category, categories }) {
    const isEdit = !!category;

    const { data, setData, post: postRequest, processing, errors, setError, clearErrors } = useForm({
        name: category?.name || '',
        name_ar: category?.name_ar || '',
        slug: category?.slug || '',
        image: null,
        parent_id: category?.parent_id || '',
        description: category?.description || '',
        sort_order: category?.sort_order || 0,
        is_active: category ? !!category.is_active : true,
    });

    const [imagePreview, setImagePreview] = React.useState(category?.image || null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            router.post(route('admin.categories.update', category.id), {
                ...data,
                _method: 'PUT'
            }, {
                forceFormData: true,
                onSuccess: () => { /* Inertia handles redirect */ },
                onError: (err) => {
                    clearErrors();
                    Object.keys(err).forEach(key => setError(key as any, err[key]));
                }
            });
        } else {
            postRequest(route('admin.categories.store'));
        }
    };

    // Auto-slugify name
    useEffect(() => {
        if (!isEdit && data.name) {
            const slug = data.name
                .toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-');
            setData('slug', slug);
        }
    }, [data.name]);

    return (
        <AdminLayout>
            <Head title={isEdit ? `Edit Category: ${category.name}` : 'Create Category'} />

            <div className="mb-8">
                <Link
                    href={route('admin.categories.index')}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-2"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Categories
                </Link>
                <h1 className="text-2xl font-bold text-foreground">
                    {isEdit ? `Edit "${category.name}"` : 'Create New Category'}
                </h1>
            </div>

            <form onSubmit={submit} className="max-w-4xl bg-card p-8 rounded-2xl shadow-sm border border-border">
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Name (English)</label>
                            <input
                                type="text"
                                value={data.name}
                                className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-right block text-foreground">الاسم (بالعربي)</label>
                            <input
                                type="text"
                                dir="rtl"
                                value={data.name_ar}
                                className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all"
                                onChange={(e) => setData('name_ar', e.target.value)}
                            />
                            {errors.name_ar && <p className="text-xs text-destructive text-right">{errors.name_ar}</p>}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Slug</label>
                            <input
                                type="text"
                                value={data.slug}
                                className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all"
                                onChange={(e) => setData('slug', e.target.value)}
                            />
                            {errors.slug && <p className="text-xs text-destructive">{errors.slug}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Parent Category</label>
                            <select
                                className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all"
                                value={data.parent_id || ''}
                                onChange={(e) => setData('parent_id', e.target.value)}
                            >
                                <option value="">None (Top Level)</option>
                                {Array.isArray(categories) && categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.parent_id && <p className="text-xs text-destructive">{errors.parent_id}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Category Image</label>
                        <div className="flex flex-col gap-4">
                            {imagePreview && (
                                <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-border group">
                                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                                    <button
                                        type="button"
                                        onClick={() => { setImagePreview(null); setData('image', null); }}
                                        className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                            <div className="relative">
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="category_image"
                                    accept="image/*"
                                />
                                <label
                                    htmlFor="category_image"
                                    className="flex flex-col items-center justify-center w-full min-h-[120px] border-2 border-dashed border-border rounded-2xl hover:border-accent hover:bg-accent/5 transition-all cursor-pointer group"
                                >
                                    <Upload className="w-8 h-8 text-muted-foreground/30 group-hover:text-accent mb-2" />
                                    <span className="text-sm font-medium text-muted-foreground group-hover:text-accent">
                                        {imagePreview ? 'Change Category Image' : 'Upload Category Image'}
                                    </span>
                                    <span className="text-xs text-muted-foreground/50 mt-1">Recommended: 800x800px (PNG, JPG)</span>
                                </label>
                            </div>
                        </div>
                        {errors.image && <p className="text-xs text-destructive mt-1">{errors.image}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Description</label>
                        <textarea
                            rows={3}
                            value={data.description || ''}
                            className="w-full p-4 rounded-xl border border-border bg-muted/50 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all resize-none"
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Sort Order</label>
                            <input
                                type="number"
                                value={data.sort_order}
                                className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all"
                                onChange={(e) => setData('sort_order', parseInt(e.target.value))}
                            />
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

                    <div className="pt-6">
                        <Button
                            type="submit"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 h-12 text-base font-bold shadow-lg shadow-accent/20"
                            disabled={processing}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isEdit ? 'Update Category' : 'Create Category'}
                        </Button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
