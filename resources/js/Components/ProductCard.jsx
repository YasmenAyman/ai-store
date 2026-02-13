import React from 'react';
import { Link } from '@inertiajs/react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

export default function ProductCard({ product }) {
    return (
        <div className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            {/* Image Container */}
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden relative">
                {product.images && product.images[0] ? (
                    <img
                        src={`/storage/${product.images[0].image_path}`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                )}

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                    <button className="p-3 bg-white rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110">
                        <Heart size={20} />
                    </button>
                    <Link href={route('shop.show', product.slug)} className="p-3 bg-white rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110">
                        <Eye size={20} />
                    </Link>
                    <Link
                        href={route('cart.add', product.id)}
                        method="post"
                        as="button"
                        className="p-3 bg-white rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
                    >
                        <ShoppingCart size={20} />
                    </Link>
                </div>

                {product.is_featured && (
                    <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                        Featured
                    </span>
                )}
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <span className="bg-black text-white px-4 py-2 font-black uppercase text-xs">Out of Stock</span>
                    </div>
                )}
            </div>

            {/* Details */}
            <div className="p-6">
                <Link href={route('shop.show', product.slug)}>
                    <h3 className="text-gray-900 font-bold text-lg group-hover:text-blue-600 transition-colors truncate">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-xs text-blue-500 font-black uppercase tracking-widest mt-1">
                    {product.category?.name || 'Luxury Collection'}
                </p>
                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <span className="text-xl font-black text-gray-900">${parseFloat(product.price).toLocaleString()}</span>
                        {product.compare_at_price && (
                            <span className="ml-2 text-sm text-gray-400 line-through">${parseFloat(product.compare_at_price).toLocaleString()}</span>
                        )}
                    </div>
                    <Link
                        href={route('cart.add', product.id)}
                        method="post"
                        as="button"
                        className="text-xs font-black uppercase text-gray-400 hover:text-blue-600 tracking-widest border-b-2 border-transparent hover:border-blue-600 pb-1 flex items-center transition-all"
                    >
                        Add to Cart
                    </Link>
                </div>
            </div>
        </div>
    );
}
