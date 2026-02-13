import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Badge, Button } from '@/Components/UI';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { format } from 'date-fns';
import { ArrowLeft, Printer, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

export default function Show({ order }) {
    const { patch, processing } = useForm();

    const updateStatus = (status: string) => {
        router.patch(route('admin.orders.status', order.id), { status }, {
            preserveScroll: true,
        });
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'completed': return 'green';
            case 'pending': return 'yellow';
            case 'processing': return 'blue';
            case 'shipped': return 'blue';
            case 'cancelled': return 'red';
            default: return 'gray';
        }
    };

    return (
        <AdminLayout>
            <Head title={`Order #${order.order_number}`} />

            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <Link href={route('admin.orders.index')} className="p-2 hover:bg-muted rounded-full transition-colors text-foreground">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <div className="flex items-center space-x-3">
                                <h1 className="text-2xl font-bold text-foreground">Order #{order.order_number}</h1>
                                <Badge variant={getStatusVariant(order.status)}>{order.status.toUpperCase()}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Placed on {format(new Date(order.created_at), 'MMMM dd, yyyy at HH:mm')}</p>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <Button variant="secondary" className="flex items-center">
                            <Printer size={18} className="mr-2" /> Print Order
                        </Button>
                        <div className="flex border border-border rounded-lg overflow-hidden bg-card">
                            {order.status === 'pending' && (
                                <button onClick={() => updateStatus('processing')} disabled={processing} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Process</button>
                            )}
                            {order.status === 'processing' && (
                                <button onClick={() => updateStatus('shipped')} disabled={processing} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Ship</button>
                            )}
                            {order.status === 'shipped' && (
                                <button onClick={() => updateStatus('completed')} disabled={processing} className="px-4 py-2 bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors">Complete</button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Items */}
                        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                            <div className="px-6 py-4 border-b border-border">
                                <h3 className="font-bold text-foreground">Order Items</h3>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Product</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Price</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase text-center">Qty</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {order.items.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 text-sm text-foreground font-medium">{item.product_name}</td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">${parseFloat(item.price).toLocaleString()}</td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground text-center">{item.quantity}</td>
                                            <td className="px-6 py-4 text-sm text-foreground text-right font-bold">${(item.price * item.quantity).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-muted/50">
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Subtotal</td>
                                        <td className="px-6 py-4 text-right text-sm font-bold text-foreground">${parseFloat(order.total_amount).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Shipping</td>
                                        <td className="px-6 py-4 text-right text-sm font-bold text-foreground">$0.00</td>
                                    </tr>
                                    <tr className="border-t border-border">
                                        <td colSpan={3} className="px-6 py-5 text-right text-lg font-bold text-foreground">Total</td>
                                        <td className="px-6 py-5 text-right text-2xl font-black text-accent">${parseFloat(order.total_amount).toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Customer Info */}
                        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                            <h3 className="font-bold text-foreground mb-4 pb-2 border-b border-border">Customer Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Contact</p>
                                    <p className="text-sm font-medium text-foreground">{order.user?.name || 'Guest Customer'}</p>
                                    <p className="text-sm text-muted-foreground">{order.user?.email || 'No email provided'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Shipping Address</p>
                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{order.shipping_address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Order Status Timeline */}
                        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                            <h3 className="font-bold text-foreground mb-4 pb-2 border-b border-border">Timeline</h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-accent ring-4 ring-accent/20"></div>
                                    <div>
                                        <p className="text-sm font-bold text-foreground">Order Placed</p>
                                        <p className="text-xs text-muted-foreground">{format(new Date(order.created_at), 'MMM dd, HH:mm')}</p>
                                    </div>
                                </div>
                                {/* Additional timeline steps could be added here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
