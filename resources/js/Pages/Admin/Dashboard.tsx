import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card } from '@/Components/UI';
import { Users, Box, ShoppingCart, DollarSign } from 'lucide-react';
import { Head } from '@inertiajs/react';

export default function Dashboard({ users_count, products_count, orders_count, total_sales }) {
    const stats = [
        { title: 'Total Users', value: users_count, icon: Users, color: 'blue' },
        { title: 'Total Products', value: products_count, icon: Box, color: 'green' },
        { title: 'Total Orders', value: orders_count, icon: ShoppingCart, color: 'purple' },
        { title: 'Total Sales', value: `$${total_sales?.toLocaleString()}`, icon: DollarSign, color: 'orange' },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome to your luxury e-commerce management panel.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <Card key={stat.title} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                    <h3 className="text-lg font-bold text-foreground mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <p className="text-muted-foreground italic text-sm text-center py-8">No recent activity found.</p>
                    </div>
                </div>
                <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                    <h3 className="text-lg font-bold text-foreground mb-4">System Status</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                            <span className="text-sm font-medium text-green-500">Database Connection</span>
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                            <span className="text-sm font-medium text-green-500">Storage Service</span>
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
