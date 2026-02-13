import React from 'react';
import StoreLayout from '@/Layouts/StoreLayout';
import ProductCard from '@/Components/ProductCard';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, ShieldCheck, Truck, RefreshCw, Zap } from 'lucide-react';

export default function Home({ featuredProducts, categories }) {
    return (
        <StoreLayout>
            <Head title="Premium Luxury Store" />

            {/* Hero Section */}
            <section className="relative h-[85vh] bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 opacity-50">
                    <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Hero" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                    <span className="text-blue-500 font-black uppercase tracking-[0.3em] mb-4 animate-fade-in">New Collection 2026</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-8 max-w-3xl italic tracking-tighter">
                        REDEFINE YOUR <span className="text-blue-600 not-italic">STYLE</span>.
                    </h1>
                    <p className="text-gray-300 text-xl max-w-xl mb-10 leading-relaxed">
                        Experience elegance like never before. Shop our exclusive range of luxury items designed for the modern connoisseur.
                    </p>
                    <div className="flex space-x-4">
                        <Link href="/shop" className="bg-blue-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-all transform hover:scale-105 shadow-2xl shadow-blue-600/40">
                            Shop Now
                        </Link>
                        <Link href="#" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white/20 transition-all">
                            View Lookbook
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-12 bg-white border-b overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: Truck, text: 'Global Shipping' },
                            { icon: ShieldCheck, text: 'Secure Payments' },
                            { icon: RefreshCw, text: 'Simple Returns' },
                            { icon: Zap, text: 'Express Delivery' }
                        ].map((badge, i) => (
                            <div key={i} className="flex items-center space-x-3 justify-center md:justify-start">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <badge.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-gray-900">{badge.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between mb-16">
                        <div>
                            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Departments</span>
                            <h2 className="text-5xl font-black text-gray-900 italic tracking-tighter leading-none uppercase">Curated Collections</h2>
                        </div>
                        <Link href="/shop" className="text-sm font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-1 transition-all">
                            Explore All
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map((cat, i) => (
                            <Link
                                key={cat.id}
                                href={route('shop.index', { category: cat.slug })}
                                className="group relative h-80 rounded-3xl overflow-hidden shadow-xl"
                            >
                                <img
                                    src={`https://images.unsplash.com/photo-${1500 + i * 10}?q=80&w=1000&auto=format&fit=crop`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    alt={cat.name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-8 left-8">
                                    <h3 className="text-white text-3xl font-black italic tracking-tighter mb-2">{cat.name}</h3>
                                    <div className="flex items-center text-blue-400 font-black uppercase text-[10px] tracking-widest group-hover:translate-x-2 transition-transform">
                                        Shop This Collection <ChevronRight size={14} className="ml-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Staff Picks</span>
                        <h2 className="text-5xl font-black text-gray-900 italic tracking-tighter leading-none uppercase mb-6">Featured This Week</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto font-medium">Discover the peak of craftsmanship. Hand-selected items that define the premium life.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Overlay Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-blue-600 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center shadow-2xl shadow-blue-600/30">
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-8 uppercase">Join the Inner Circle</h2>
                            <p className="text-blue-100 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
                                Subscribe to receive exclusive early access, luxury insights, and private event invitations.
                            </p>
                            <form className="max-w-md mx-auto flex">
                                <input type="email" placeholder="Enter your email" className="flex-1 px-8 py-5 rounded-l-full bg-white text-gray-900 font-medium focus:outline-none" />
                                <button className="bg-gray-900 text-white px-10 py-5 rounded-r-full font-black uppercase tracking-widest hover:bg-black transition-all">Submit</button>
                            </form>
                        </div>
                        <div className="absolute top-0 right-0 p-24 opacity-10">
                            <Zap size={400} className="text-white" />
                        </div>
                    </div>
                </div>
            </section>
        </StoreLayout>
    );
}
