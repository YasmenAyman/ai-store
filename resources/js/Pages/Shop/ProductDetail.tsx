import React, { useState } from 'react';
import StoreLayout from '@/Layouts/StoreLayout';
import ProductCard from '@/Components/ProductCard';
import { Head, Link, useForm } from '@inertiajs/react';
import { ShoppingCart, Heart, Share2, ShieldCheck, Truck, RefreshCw, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function ProductDetail({ product, relatedProducts }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const { data, setData, post, processing } = useForm({
        quantity: 1,
    });

    const addToCart = (e) => {
        e.preventDefault();
        post(route('cart.add', product.id));
    };

    return (
        <StoreLayout>
            <Head title={product.name} />

            <div className="bg-white pb-24">
                {/* Breadcrumbs */}
                <div className="bg-gray-50 border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <nav className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-gray-400">
                            <Link href="/" className="hover:text-blue-600">Home</Link>
                            <ChevronRight size={12} />
                            <Link href="/shop" className="hover:text-blue-600">Shop</Link>
                            <ChevronRight size={12} />
                            <span className="text-gray-900">{product.name}</span>
                        </nav>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Gallery */}
                        <div className="space-y-6">
                            <div className="aspect-square bg-gray-50 rounded-[3rem] overflow-hidden relative group">
                                {product.images && product.images[selectedImage] ? (
                                    <img
                                        src={`/storage/${product.images[selectedImage].image_path}`}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                                )}
                            </div>
                            <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                                {product.images?.map((img, i) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setSelectedImage(i)}
                                        className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-blue-600 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={`/storage/${img.image_path}`} className="w-full h-full object-cover" alt="thumb" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col">
                            <div className="mb-8">
                                <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                                    {product.category?.name || 'Exclusive Edition'}
                                </span>
                                <h1 className="text-5xl font-black text-gray-900 italic tracking-tighter uppercase mb-4 leading-none">{product.name}</h1>
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">4.9 (128 Reviews)</span>
                                </div>
                                <div className="flex items-baseline space-x-4">
                                    <span className="text-4xl font-black text-blue-600 tracking-tighter">${parseFloat(product.price).toLocaleString()}</span>
                                    {product.compare_at_price && (
                                        <span className="text-xl text-gray-400 line-through decoration-blue-600/30 font-bold decoration-2">
                                            ${parseFloat(product.compare_at_price).toLocaleString()}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium">
                                {product.description}
                            </p>

                            <div className="border-y border-gray-100 py-10 mb-10">
                                <form onSubmit={addToCart} className="flex space-x-4">
                                    <div className="flex items-center bg-gray-50 rounded-full border px-2 py-1">
                                        <button
                                            type="button"
                                            onClick={() => setData('quantity', Math.max(1, data.quantity - 1))}
                                            className="p-3 text-gray-500 hover:text-blue-600 transition-colors"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <input
                                            type="number"
                                            value={data.quantity}
                                            className="w-12 text-center bg-transparent font-black text-gray-900 outline-none p-0 border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            readOnly
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setData('quantity', data.quantity + 1)}
                                            className="p-3 text-gray-500 hover:text-blue-600 transition-colors"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing || product.stock === 0}
                                        className="flex-1 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-all flex items-center justify-center shadow-xl shadow-blue-600/30 disabled:opacity-50"
                                    >
                                        <ShoppingCart size={20} className="mr-2" />
                                        {product.stock === 0 ? 'Out of Stock' : 'Add to Collection'}
                                    </button>
                                    <button type="button" className="p-5 border rounded-full text-gray-400 hover:text-red-500 hover:border-red-100 transition-all">
                                        <Heart size={20} />
                                    </button>
                                </form>
                                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-center">
                                    Free shipping on all orders over $5,000
                                </p>
                            </div>

                            {/* Trust Panels */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { icon: Truck, title: 'Global Delivery', desc: 'Arrives in 2-4 days' },
                                    { icon: RefreshCw, title: 'Elite Concierge', desc: '24/7 Priority support' },
                                    { icon: ShieldCheck, title: 'Extended Warranty', desc: 'Secure your investment' }
                                ].map((item, i) => (
                                    <div key={i} className="p-4 rounded-3xl bg-gray-50 flex flex-col items-center text-center">
                                        <item.icon className="h-6 w-6 text-blue-600 mb-2" />
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-900">{item.title}</h4>
                                        <p className="text-[10px] text-gray-500 font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <h2 className="text-4xl font-black text-gray-900 italic tracking-tighter leading-none uppercase">Complete the set</h2>
                                <p className="text-gray-400 font-medium mt-2">Recommended pieces that pair perfectly with this selection.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map(rp => (
                                <ProductCard key={rp.id} product={rp} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </StoreLayout>
    );
}
