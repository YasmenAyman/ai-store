import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ShoppingCart, User, Menu, X, Search, Heart } from 'lucide-react';

const Navbar = () => {
    const { props } = usePage();
    const { auth, cartCount = 0 } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-black text-blue-600 tracking-tighter uppercase italic">LUXURY</span>
                        </Link>
                        <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                            <Link href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">Home</Link>
                            <Link href="/shop" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-blue-600 transition-all">Shop</Link>
                            <Link href="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-blue-600 transition-all">Categories</Link>
                            <Link href="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-blue-600 transition-all">About</Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="hidden md:block relative">
                            <input type="text" placeholder="Search luxury..." className="pl-10 pr-4 py-2 bg-gray-50 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                                <Heart size={22} />
                            </Link>
                            <Link href={route('cart.index')} className="text-gray-400 hover:text-blue-600 relative transition-colors">
                                <ShoppingCart size={22} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            {auth.user ? (
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-xs">
                                            {auth.user.name.charAt(0)}
                                        </div>
                                        <span className="hidden lg:block text-sm font-medium">{auth.user.name.split(' ')[0]}</span>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-2xl shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60]">
                                        {auth.user.role_id === 1 && ( // Assuming 1 is Admin
                                            <Link href={route('admin.dashboard')} className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors uppercase tracking-widest">
                                                Dashboard
                                            </Link>
                                        )}
                                        <Link href="#" className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors uppercase tracking-widest">
                                            My Profile
                                        </Link>
                                        <Link href={route('logout')} method="post" as="button" className="w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors uppercase tracking-widest">
                                            Logout
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link href={route('login')} className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors">Login</Link>
                                    <Link href={route('register')} className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-900/10">Join</Link>
                                </div>
                            )}
                        </div>
                        <div className="sm:hidden flex items-center">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500">
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="sm:hidden bg-white border-t p-4 space-y-2">
                    <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Home</Link>
                    <Link href="/shop" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Shop</Link>
                    <Link href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Categories</Link>
                </div>
            )}
        </nav>
    );
};

const Footer = () => (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
                <span className="text-2xl font-black text-blue-500 italic mb-6 block tracking-tighter italic uppercase">LUXURY</span>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Premium shopping experience for elite customers. We curate only the finest goods worldwide.
                </p>
            </div>
            <div>
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-blue-500">Shop</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li><Link href="/shop" className="hover:text-white transition-colors">Browse Products</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Categories</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">New Arrivals</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-blue-500">Support</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li><Link href="#" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-blue-500">Newsletter</h4>
                <div className="flex">
                    <input type="email" placeholder="Email address" className="bg-gray-800 border-none rounded-l-lg py-2 px-4 text-sm w-full focus:ring-1 focus:ring-blue-500 outline-none" />
                    <button className="bg-blue-600 hover:bg-blue-700 rounded-r-lg px-4 transition-colors">Join</button>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
            © 2026 LUXURY Store. All rights reserved. Built with Passion.
        </div>
    </footer>
);

export default function StoreLayout({ children }) {
    const { props } = usePage();
    const { flash = {} } = props;

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 antialiased underline-offset-4">
            <Navbar />

            {/* Flash Messages */}
            {flash.message && (
                <div className="bg-blue-600 text-white p-3 text-center text-sm font-medium animate-pulse">
                    {flash.message}
                </div>
            )}
            {flash.error && (
                <div className="bg-red-600 text-white p-3 text-center text-sm font-medium">
                    {flash.error}
                </div>
            )}

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
}
