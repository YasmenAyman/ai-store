import React from 'react';
import StoreLayout from '@/Layouts/StoreLayout';
import ProductCard from '@/Components/ProductCard';
import { Head, Link, router } from '@inertiajs/react';
import { Filter, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { route } from 'ziggy-js';

export default function Index({ products, categories, filters }) {
    const applyFilter = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        if (value === filters[key]) delete newFilters[key]; // Toggle off if clicked again

        router.get(route('store.index'), newFilters, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    return (
        <StoreLayout>
            <Head title="Shop Premium Collection" />

            <div className="bg-gray-50 pt-16 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0 text-center md:text-left">
                        <div>
                            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Premium Catalog</span>
                            <h1 className="text-6xl font-black text-gray-900 italic tracking-tighter leading-none uppercase">The Collection</h1>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            <div className="relative group">
                                <button className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full border text-sm font-bold text-gray-700 hover:border-blue-600 transition-all">
                                    <SlidersHorizontal size={16} className="text-blue-600" />
                                    <span>Sort: {filters.sort === 'price_low' ? 'Low to High' : filters.sort === 'price_high' ? 'High to Low' : 'Newest First'}</span>
                                    <ChevronDown size={14} />
                                </button>
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    {[
                                        { label: 'Newest First', value: 'newest' },
                                        { label: 'Price: Low to High', value: 'price_low' },
                                        { label: 'Price: High to Low', value: 'price_high' },
                                        { label: 'Alphabetical', value: 'name_asc' }
                                    ].map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => applyFilter('sort', opt.value)}
                                            className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium hover:bg-blue-50 hover:text-blue-600 flex justify-between items-center transition-colors"
                                        >
                                            {opt.label}
                                            {filters.sort === opt.value && <Check size={14} />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Sidebar Filters */}
                        <aside className="space-y-12">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 mb-6 flex items-center">
                                    <Filter size={16} className="mr-2 text-blue-600" /> Categories
                                </h3>
                                <div className="space-y-3">
                                    <button
                                        onClick={() => applyFilter('category', null)}
                                        className={`block w-full text-left text-sm font-bold uppercase tracking-widest transition-all ${!filters.category ? 'text-blue-600' : 'text-gray-400 hover:text-gray-900'}`}
                                    >
                                        All Products
                                    </button>
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => applyFilter('category', cat.slug)}
                                            className={`block w-full text-left text-sm font-bold uppercase tracking-widest transition-all ${filters.category === cat.slug ? 'text-blue-600' : 'text-gray-400 hover:text-gray-900'}`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 mb-6">Price Range</h3>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            className="bg-white border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full shadow-inner"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            className="bg-white border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full shadow-inner"
                                        />
                                    </div>
                                    <button className="w-full bg-gray-900 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
                                        Apply Range
                                    </button>
                                </div>
                            </div>
                        </aside>

                        {/* Main Grid */}
                        <div className="lg:col-span-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.data.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {products.links && (
                                <div className="mt-20 flex justify-center space-x-2">
                                    {products.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${link.active ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'bg-white border text-gray-600 hover:bg-gray-50'}`}
                                        />
                                    ))}
                                </div>
                            )}

                            {products.data.length === 0 && (
                                <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
                                    <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tighter">No items found</h3>
                                    <p className="text-gray-400 font-medium">Try adjusting your filters or refining your search.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </StoreLayout>
    );
}
