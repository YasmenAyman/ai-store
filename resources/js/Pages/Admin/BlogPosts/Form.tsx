import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/UI';
import { useForm, Head, router } from '@inertiajs/react';
import { Save, X, Upload } from 'lucide-react';
import { route } from 'ziggy-js';

export default function BlogPostForm({ post = null }) {
    const isEditing = !!post;

    const { data, setData, post: postRequest, put, processing, errors } = useForm({
        title: post?.title || '',
        title_ar: post?.title_ar || '',
        excerpt: post?.excerpt || '',
        excerpt_ar: post?.excerpt_ar || '',
        content: post?.content || '',
        content_ar: post?.content_ar || '',
        is_published: post?.is_published ?? false,
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(post?.featured_image || null);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use POST with _method spoofing for multipart updates
        if (isEditing) {
            router.post(route('admin.blog-posts.update', post.id), {
                ...data,
                _method: 'PUT'
            }, {
                forceFormData: true,
            });
        } else {
            postRequest(route('admin.blog-posts.store'));
        }
    };

    return (
        <AdminLayout>
            <Head title={isEditing ? `Edit ${post.title}` : 'New Blog Post'} />

            <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
                        <p className="text-muted-foreground">Share your story with the world.</p>
                    </div>
                    <div className="flex space-x-3">
                        <Button type="button" variant="secondary" onClick={() => window.history.back()}>
                            <X size={18} className="mr-2" /> Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="flex items-center">
                            <Save size={18} className="mr-2" /> {isEditing ? 'Update Post' : 'Publish Post'}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* English Content */}
                        <div className="bg-card p-6 rounded-xl shadow-sm border border-border space-y-4">
                            <h3 className="font-bold text-foreground border-b border-border pb-2 mb-4">English Content</h3>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-accent outline-none bg-muted/50 text-foreground focus:bg-card ${errors.title ? 'border-destructive' : 'border-border'}`}
                                />
                                {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Excerpt</label>
                                <textarea
                                    rows={2}
                                    value={data.excerpt}
                                    onChange={e => setData('excerpt', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-accent outline-none bg-muted/50 text-foreground focus:bg-card"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Content</label>
                                <textarea
                                    rows={10}
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-accent outline-none bg-muted/50 text-foreground focus:bg-card ${errors.content ? 'border-destructive' : 'border-border'}`}
                                ></textarea>
                                {errors.content && <p className="mt-1 text-xs text-destructive">{errors.content}</p>}
                            </div>
                        </div>

                        {/* Arabic Content */}
                        <div className="bg-card p-6 rounded-xl shadow-sm border border-border space-y-4">
                            <h3 className="font-bold text-foreground border-b border-border pb-2 mb-4 text-right">المحتوى العربي</h3>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1 text-right">العنوان</label>
                                <input
                                    type="text"
                                    dir="rtl"
                                    value={data.title_ar}
                                    onChange={e => setData('title_ar', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-accent outline-none bg-muted/50 text-foreground focus:bg-card"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1 text-right">نبذة مختصرة</label>
                                <textarea
                                    rows={2}
                                    dir="rtl"
                                    value={data.excerpt_ar}
                                    onChange={e => setData('excerpt_ar', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-accent outline-none bg-muted/50 text-foreground focus:bg-card"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1 text-right">المحتوى</label>
                                <textarea
                                    rows={10}
                                    dir="rtl"
                                    value={data.content_ar}
                                    onChange={e => setData('content_ar', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-accent outline-none bg-muted/50 text-foreground focus:bg-card"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-card p-6 rounded-xl shadow-sm border border-border space-y-4">
                            <h3 className="font-bold text-foreground mb-4">Settings</h3>
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-sm font-medium text-foreground">Published</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={data.is_published}
                                        onChange={e => setData('is_published', e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-primary-foreground after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        </div>

                        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                            <h3 className="font-bold text-foreground mb-4">Featured Image</h3>
                            {imagePreview && (
                                <div className="mb-4 relative group">
                                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-border" />
                                    <button
                                        type="button"
                                        onClick={() => { setImagePreview(null); setData('image', null); }}
                                        className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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
                                    id="featured_image"
                                    accept="image/*"
                                />
                                <label
                                    htmlFor="featured_image"
                                    className="border-2 border-dashed border-border rounded-xl p-8 hover:border-accent transition-colors cursor-pointer group flex flex-col items-center"
                                >
                                    <Upload className="h-10 w-10 text-muted-foreground/30 group-hover:text-accent mb-2" />
                                    <span className="text-sm text-muted-foreground group-hover:text-foreground font-medium text-center">
                                        {imagePreview ? 'Change Image' : 'Select Image'}
                                    </span>
                                    <span className="text-xs text-muted-foreground/50 mt-1">PNG, JPG up to 10MB</span>
                                </label>
                            </div>
                            {errors.image && <p className="mt-1 text-xs text-destructive">{errors.image}</p>}
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
