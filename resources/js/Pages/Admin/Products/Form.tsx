import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/UI';
import { useForm, Head, Link, router } from '@inertiajs/react';
import { Save, X, Upload, Trash2 } from 'lucide-react';
import { route } from 'ziggy-js';

export default function ProductForm({ product = null, categories }) {
    const isEditing = !!product;

    const { data, setData, post: postRequest, put, processing, errors, setError, clearErrors } = useForm({
        category_id: product?.category_id || '',
        name: product?.name || '',
        name_ar: product?.name_ar || '',
        slug: product?.slug || '',
        description: product?.description || '',
        description_ar: product?.description_ar || '',
        price: product?.price || 0,
        compare_at_price: product?.compare_at_price || '',
        stock: product?.stock || 0,
        rating: product?.rating || 0,
        review_count: product?.review_count || 0,
        is_active: product?.is_active ?? true,
        is_featured: product?.is_featured ?? false,
        is_best_seller: product?.is_best_seller ?? false,
        images: [],
        deleted_image_ids: [],
    });

    const [newImagePreviews, setNewImagePreviews] = useState([]);
    const [existingImages, setExistingImages] = useState(product?.images || []);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setData('images', [...data.images, ...files]);

            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewImagePreviews(prev => [...prev, reader.result]);
                };
                reader.readAsDataURL(file as any);
            });
        }
    };

    const removeNewImage = (index) => {
        const updatedFiles = [...data.images];
        updatedFiles.splice(index, 1);
        setData('images', updatedFiles);

        const updatedPreviews = [...newImagePreviews];
        updatedPreviews.splice(index, 1);
        setNewImagePreviews(updatedPreviews);
    };

    const removeExistingImage = (id) => {
        setData('deleted_image_ids', [...data.deleted_image_ids, id]);
        setExistingImages(prev => prev.filter(img => img.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            router.post(route('admin.products.update', product.id), {
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
            postRequest(route('admin.products.store'));
        }
    };

    return (
        <AdminLayout>
            <Head title={isEditing ? `Edit ${product.name}` : 'New Product'} />

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">{isEditing ? 'Edit Product' : 'Create New Product'}</h1>
                        <p className="text-muted-foreground">Fill in the details to {isEditing ? 'update' : 'publish'} your product.</p>
                    </div>
                    <div className="flex space-x-3">
                        <Button type="button" variant="secondary" onClick={() => window.history.back()}>
                            <X size={18} className="mr-2" /> Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="flex items-center">
                            <Save size={18} className="mr-2" /> {isEditing ? 'Update Product' : 'Save Product'}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-card p-6 rounded-xl shadow-sm border border-border space-y-4">
                            <h3 className="font-bold text-foreground border-b border-border pb-2 mb-4">Basic Information</h3>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Product Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-ring outline-none ${errors.name ? 'border-destructive' : 'border-border'}`}
                                />
                                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1 text-right">الاسم بالعربي</label>
                                <input
                                    type="text"
                                    dir="rtl"
                                    value={data.name_ar}
                                    onChange={e => setData('name_ar', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-ring outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                                <textarea
                                    rows={4}
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-ring outline-none"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1 text-right">الوصف بالعربي</label>
                                <textarea
                                    rows={4}
                                    dir="rtl"
                                    value={data.description_ar}
                                    onChange={e => setData('description_ar', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-ring outline-none"
                                ></textarea>
                            </div>
                        </div>

                        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                            <h3 className="font-bold text-foreground border-b border-border pb-2 mb-4">Pricing & Inventory</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={e => setData('price', parseFloat(e.target.value))}
                                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-ring"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Compare at Price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.compare_at_price}
                                        onChange={e => setData('compare_at_price', parseFloat(e.target.value))}
                                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-muted-foreground focus:ring-2 focus:ring-ring"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Stock Quantity</label>
                                    <input
                                        type="number"
                                        value={data.stock}
                                        onChange={e => setData('stock', parseInt(e.target.value))}
                                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-ring"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-6">
                        <div className="bg-card p-6 rounded-xl shadow-sm border border-border space-y-4">
                            <h3 className="font-bold text-foreground">Organization</h3>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                                <select
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-ring"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center justify-between pt-4">
                                <span className="text-sm font-medium text-foreground">Display Status</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={data.is_active}
                                        onChange={e => setData('is_active', e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-foreground">Featured</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={data.is_featured}
                                        onChange={e => setData('is_featured', e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-foreground">Best Seller</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={data.is_best_seller}
                                        onChange={e => setData('is_best_seller', e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                                </label>
                            </div>
                        </div>

                        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                            <h3 className="font-bold text-foreground mb-4">Product Images</h3>

                            {/* Existing Images */}
                            {existingImages.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {existingImages.map((img) => (
                                        <div key={img.id} className="relative group rounded-lg overflow-hidden border border-border h-32">
                                            <img src={img.image_path} className="w-full h-full object-cover" alt="Product" />
                                            <button
                                                type="button"
                                                onClick={() => removeExistingImage(img.id)}
                                                className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* New Image Previews */}
                            {newImagePreviews.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {newImagePreviews.map((preview, idx) => (
                                        <div key={idx} className="relative group rounded-lg overflow-hidden border border-accent/20 h-32">
                                            <img src={preview as string} className="w-full h-full object-cover" alt="New Preview" />
                                            <div className="absolute top-1 left-1 bg-accent text-accent-foreground text-[10px] px-1.5 py-0.5 rounded">NEW</div>
                                            <button
                                                type="button"
                                                onClick={() => removeNewImage(idx)}
                                                className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="relative">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="product_images"
                                    accept="image/*"
                                />
                                <label
                                    htmlFor="product_images"
                                    className="border-2 border-dashed border-border rounded-xl p-8 hover:border-accent transition-colors cursor-pointer group flex flex-col items-center"
                                >
                                    <Upload className="h-10 w-10 text-muted-foreground/50 group-hover:text-accent mb-2" />
                                    <span className="text-sm text-muted-foreground group-hover:text-foreground font-medium text-center">Click to upload images</span>
                                    <span className="text-xs text-muted-foreground/60 mt-1 text-center">PNG, JPG up to 10MB</span>
                                </label>
                            </div>
                            {errors.images && <p className="mt-2 text-xs text-destructive">{errors.images}</p>}
                            {Object.keys(errors).map(key => key.startsWith('images.') && (
                                <p key={key} className="mt-1 text-xs text-red-500">Image {parseInt(key.split('.')[1]) + 1}: {errors[key]}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
