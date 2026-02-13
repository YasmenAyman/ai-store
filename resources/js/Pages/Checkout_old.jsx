import React from 'react';
import StoreLayout from '@/Layouts/StoreLayout';
import { Head, useForm } from '@inertiajs/react';
import { ShieldCheck, Truck, CreditCard, Lock, ArrowRight } from 'lucide-react';

export default function Checkout({ total, user }) {
    const { data, setData, post, processing, errors } = useForm({
        shipping_address: '',
        payment_method: 'credit_card',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('checkout.store'));
    };

    return (
        <StoreLayout>
            <Head title="Secure Checkout" />

            <div className="bg-gray-50 min-h-screen py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Final Step</span>
                        <h1 className="text-6xl font-black text-gray-900 italic tracking-tighter leading-none uppercase">Secure Checkout</h1>
                    </div>

                    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-8 space-y-8">
                            {/* Shipping Info */}
                            <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100">
                                <h3 className="text-2xl font-black italic tracking-tighter mb-8 uppercase flex items-center">
                                    <Truck className="mr-4 text-blue-600" /> Delivery Information
                                </h3>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Recipient Name</label>
                                            <input type="text" value={user.name} disabled className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-gray-500 cursor-not-allowed" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                                            <input type="email" value={user.email} disabled className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-gray-500 cursor-not-allowed" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Complete Shipping Address</label>
                                        <textarea
                                            rows="4"
                                            value={data.shipping_address}
                                            onChange={e => setData('shipping_address', e.target.value)}
                                            placeholder="Enter your full street address, apartment, city, and zip code..."
                                            className={`w-full bg-gray-50 border-none rounded-[2rem] py-4 px-6 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.shipping_address ? 'ring-2 ring-red-500' : ''}`}
                                        ></textarea>
                                        {errors.shipping_address && <p className="mt-2 text-[10px] text-red-500 font-black uppercase tracking-widest">{errors.shipping_address}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100">
                                <h3 className="text-2xl font-black italic tracking-tighter mb-8 uppercase flex items-center">
                                    <CreditCard className="mr-4 text-blue-600" /> Payment Selection
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { id: 'credit_card', label: 'Credit Card', icon: CreditCard },
                                        { id: 'bank_transfer', label: 'Bank Transfer', icon: ShieldCheck }
                                    ].map((method) => (
                                        <button
                                            key={method.id}
                                            type="button"
                                            onClick={() => setData('payment_method', method.id)}
                                            className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center text-center group ${data.payment_method === method.id ? 'border-blue-600 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200 bg-gray-50'}`}
                                        >
                                            <method.icon className={`h-8 w-8 mb-4 transition-colors ${data.payment_method === method.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                            <span className={`text-sm font-black uppercase tracking-widest ${data.payment_method === method.id ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                                {method.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4">
                            <div className="bg-gray-900 rounded-[3rem] p-10 text-white sticky top-32 shadow-2xl shadow-blue-600/20">
                                <h3 className="text-2xl font-black italic tracking-tighter mb-8 uppercase border-b border-gray-800 pb-6">Checkout Total</h3>
                                <div className="space-y-6 mb-12">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Amount Due</span>
                                        <span className="text-5xl font-black italic tracking-tighter text-blue-500">${total.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-600 text-white flex items-center justify-center py-6 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/40 group disabled:opacity-50"
                                >
                                    Confirm & Pay <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <div className="mt-12 space-y-6">
                                    <div className="flex items-center space-x-4 bg-gray-800/50 p-4 rounded-2xl">
                                        <Lock size={20} className="text-blue-500" />
                                        <p className="text-[10px] text-gray-400 font-bold leading-tight uppercase tracking-widest">
                                            Your transaction is encrypted with 256-bit SSL security.
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-4 bg-gray-800/50 p-4 rounded-2xl">
                                        <ShieldCheck size={20} className="text-blue-500" />
                                        <p className="text-[10px] text-gray-400 font-bold leading-tight uppercase tracking-widest">
                                            Trusted by over 1,000 elite clients worldwide.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </StoreLayout>
    );
}
