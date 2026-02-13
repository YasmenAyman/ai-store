import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/DataTable';
import { Button, Badge } from '@/Components/UI';
import { Eye, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { route } from 'ziggy-js';

export default function Index({ orders }) {
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

    const columns = [
        { key: 'order_number', label: 'Order #' },
        {
            key: 'user',
            label: 'Customer',
            render: (user) => user ? user.name : <span className="text-muted-foreground italic">Guest</span>
        },
        {
            key: 'total_amount',
            label: 'Total',
            render: (amount) => `$${parseFloat(amount).toLocaleString()}`
        },
        {
            key: 'status',
            label: 'Status',
            render: (status) => (
                <Badge variant={getStatusVariant(status)}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
            )
        },
        {
            key: 'created_at',
            label: 'Date',
            render: (date) => format(new Date(date), 'MMM dd, yyyy')
        }
    ];

    const handleStatusUpdate = (orderId, status) => {
        router.patch(route('admin.orders.status', orderId), { status }, {
            preserveScroll: true,
            onSuccess: () => {
                // Optional: Show success notification
            }
        });
    };

    const actions = (order) => (
        <div className="flex justify-end space-x-1">
            <Link href={route('admin.orders.show', order.id)}>
                <Button variant="secondary" className="p-2 h-auto" title="View details">
                    <Eye size={16} />
                </Button>
            </Link>
            {order.status === 'pending' && (
                <Button
                    variant="secondary"
                    className="p-2 h-auto text-green-500 border-green-500/20 hover:bg-green-500/10"
                    title="Process Order"
                    onClick={() => handleStatusUpdate(order.id, 'processing')}
                >
                    <CheckCircle size={16} />
                </Button>
            )}
        </div>
    );

    return (
        <AdminLayout>
            <Head title="Orders" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">Orders</h1>
                <p className="text-muted-foreground">Track and manage customer orders and fulfillment.</p>
            </div>

            <DataTable
                columns={columns}
                data={orders.data || orders}
                actions={actions}
            />
        </AdminLayout>
    );
}
