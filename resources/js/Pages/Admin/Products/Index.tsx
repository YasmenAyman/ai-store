import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/DataTable';
import { Button, Badge } from '@/Components/UI';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Index({ products }) {
    const columns = [
        {
            key: 'name',
            label: 'Product',
            render: (name, product) => (
                <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded bg-muted mr-3 overflow-hidden">
                        {product.images && product.images[0] ? (
                            <img src={product.images[0].image_path} alt={name} className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-muted-foreground">Box</div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-foreground">{name}</div>
                        <div className="text-xs text-muted-foreground">{product.category?.name || 'Uncategorized'}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'price',
            label: 'Price',
            render: (price) => `$${parseFloat(price).toLocaleString()}`
        },
        {
            key: 'stock',
            label: 'Stock',
            render: (stock) => (
                <span className={stock < 10 ? 'text-destructive font-bold' : 'text-foreground'}>{stock} in stock</span>
            )
        },
        {
            key: 'is_active',
            label: 'Status',
            render: (isActive) => (
                <Badge variant={isActive ? 'green' : 'gray'}>
                    {isActive ? 'Active' : 'Inactive'}
                </Badge>
            )
        }
    ];

    const actions = (product) => (
        <div className="flex justify-end space-x-2">
            <Link
                href={route('admin.products.edit', product.id)}
                className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors border border-accent/20 bg-card"
                title="Edit"
            >
                <Edit2 size={16} />
            </Link>
            <Link
                href={route('admin.products.destroy', product.id)}
                method="delete"
                as="button"
                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors border border-destructive/20 bg-card"
                title="Delete"
                onBefore={() => confirm('Are you sure you want to delete this product?')}
            >
                <Trash2 size={16} />
            </Link>
        </div>
    );

    return (
        <AdminLayout>
            <Head title="Products" />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Products</h1>
                    <p className="text-muted-foreground">Manage your product catalog and inventory.</p>
                </div>
                <Link href={route('admin.products.create')}>
                    <Button className="flex items-center">
                        <Plus size={18} className="mr-2" />
                        New Product
                    </Button>
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={products.data || products}
                actions={actions}
            />
        </AdminLayout>
    );
}
