import React from 'react';
import StoreLayout from '@/Layouts/StoreLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ShoppingCart, Trash2, ArrowRight, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function Cart({ cartItems, total }) {
    const updateQuantity = (id, quantity) => {
        router.patch(route('cart.update', id), { quantity }, {
            preserveScroll: true
        });
    };

    const removeItem = (id) => {
        router.delete(route('cart.remove', id), {
            preserveScroll: true
        });
    };

    return (
        <StoreLayout>
            <Head title="Your Luxury Collection" />

            <div className="bg-white min-h-[70vh] py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Checkout Journey</span>
                        <h1 className="text-6xl font-black text-gray-900 italic tracking-tighter leading-none uppercase">The Cart</h1>
                    </div>

                    {cartItems.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            {/* Items List */}
                            <div className="lg:col-span-8">
                                <div className="space-y-8">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-500">
                                            <div className="h-32 w-32 bg-white rounded-3xl overflow-hidden shadow-inner flex-shrink-0">
                                                {item.image ? (
                                                    <img src={`/storage/${item.image}`} className="w-full h-full object-cover" alt={item.name} />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300 italic text-xs">No Image</div>
                                                )}
                                            </div>
                                            <div className="flex-1 text-center sm:text-left">
                                                <h3 className="text-xl font-black text-gray-900 tracking-tight mb-1 uppercase italic">{item.name}</h3>
                                                <p className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4">${parseFloat(item.price).toLocaleString()}</p>
                                                <div className="flex items-center justify-center sm:justify-start space-x-6">
                                                    <div className="flex items-center bg-white rounded-full p-1 border shadow-sm">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-2 text-gray-400 hover:text-blue-600"
                                                        >
                                                            <Minus size={16} />
                                                        </button>
                                                        <span className="w-8 text-center font-black text-xs">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-2 text-gray-400 hover:text-blue-600"
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-gray-400 hover:text-red-500 flex items-center text-[10px] font-black uppercase tracking-widest transition-colors"
                                                    >
                                                        <Trash2 size={14} className="mr-2" /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="text-center sm:text-right">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Subtotal</p>
                                                <p className="text-2xl font-black text-gray-900 tracking-tighter">${item.subtotal.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-4">
                                <div className="bg-gray-900 rounded-[3rem] p-10 text-white sticky top-32 shadow-2xl shadow-blue-600/20">
                                    <h3 className="text-2xl font-black italic tracking-tighter mb-8 uppercase border-b border-gray-800 pb-6">Summary</h3>
                                    <div className="space-y-6 mb-10">
                                        <div className="flex justify-between text-sm font-medium text-gray-400">
                                            <span>Subtotal</span>
                                            <span className="text-white">${total.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-medium text-gray-400">
                                            <span>Shipping</span>
                                            <span className="text-blue-500 font-black uppercase tracking-widest text-[10px]">Complimentary</span>
                                        </div>
                                        <div className="pt-6 border-t border-gray-800 flex justify-between items-end">
                                            <span className="text-sm font-black uppercase tracking-widest">Total</span>
                                            <span className="text-4xl font-black italic text-blue-500 tracking-tighter">${total.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <Link
                                        href={route('checkout.index')}
                                        className="w-full bg-blue-600 text-white flex items-center justify-center py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/40 group"
                                    >
                                        Proceed to Checkout <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <p className="mt-8 text-[10px] text-center text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                                        Duties and taxes included at checkout. <br /> Secure white-glove delivery guaranteed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-gray-50 rounded-[4rem] border border-dashed border-gray-200">
                            <div className="bg-white h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                                <ShoppingBag className="text-gray-200" size={40} />
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 italic tracking-tighter uppercase mb-6 leading-none">Your bag is empty</h2>
                            <p className="text-gray-500 max-w-sm mx-auto font-medium mb-12">Your collection is waiting for its first masterpiece. Start exploring our premium selections.</p>
                            <Link href="/shop" className="inline-block bg-blue-600 text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30">
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </StoreLayout>
    );
}
