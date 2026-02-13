import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/DataTable';
import { Button, Badge } from '@/Components/UI';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Index({ categories }) {
    const columns = [
        {
            key: 'name',
            label: 'Name',
            render: (value, item) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        {item.image ? (
                            <img src={item.image} alt={value} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                <Plus size={16} />
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-foreground">{value}</div>
                        <div className="text-xs text-muted-foreground">{item.name_ar}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'slug',
            label: 'Slug',
            render: (slug) => <code className="text-xs bg-muted px-1 py-0.5 rounded text-muted-foreground">{slug}</code>
        },
        {
            key: 'parent',
            label: 'Parent',
            render: (parent) => parent ? parent.name : <span className="text-muted-foreground">None</span>
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

    const actions = (category) => (
        <div className="flex justify-end space-x-2">
            <Link
                href={route('admin.categories.edit', category.id)}
                className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors border border-accent/20 bg-card"
                title="Edit"
            >
                <Edit2 size={16} />
            </Link>
            <Link
                href={route('admin.categories.destroy', category.id)}
                method="delete"
                as="button"
                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors border border-destructive/20 bg-card"
                title="Delete"
                onBefore={() => confirm('Are you sure you want to delete this category?')}
            >
                <Trash2 size={16} />
            </Link>
        </div>
    );

    return (
        <AdminLayout>
            <Head title="Categories" />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Categories</h1>
                    <p className="text-muted-foreground">Organize your products with hierarchical categories.</p>
                </div>
                <Link href={route('admin.categories.create')}>
                    <Button className="flex items-center">
                        <Plus size={18} className="mr-2" />
                        New Category
                    </Button>
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={categories.data || categories}
                actions={actions}
            />
        </AdminLayout>
    );
}
