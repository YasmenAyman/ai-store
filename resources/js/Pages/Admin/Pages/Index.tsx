import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/DataTable';
import { Button, Badge } from '@/Components/UI';
import { Plus, Edit2, Trash2, FileText } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Index({ pages }) {
    const columns = [
        {
            key: 'title',
            label: 'Title',
            render: (value, item) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                        <FileText size={20} />
                    </div>
                    <div>
                        <div className="font-medium text-foreground">{value}</div>
                        <div className="text-xs text-muted-foreground">{item.slug}</div>
                    </div>
                </div>
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
        },
        {
            key: 'updated_at',
            label: 'Last Updated',
            render: (date) => new Date(date).toLocaleDateString()
        }
    ];

    const actions = (page) => (
        <div className="flex justify-end space-x-2">
            <Link
                href={route('admin.pages.edit', page.id)}
                className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors border border-accent/20 bg-card"
                title="Edit"
            >
                <Edit2 size={16} />
            </Link>
            <Link
                href={route('admin.pages.destroy', page.id)}
                method="delete"
                as="button"
                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors border border-destructive/20 bg-card"
                title="Delete"
                onBefore={() => confirm('Are you sure you want to delete this page?')}
            >
                <Trash2 size={16} />
            </Link>
        </div>
    );

    return (
        <AdminLayout>
            <Head title="Pages" />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Pages</h1>
                    <p className="text-muted-foreground">Manage your static pages like About and Contact.</p>
                </div>
                <Link href={route('admin.pages.create')}>
                    <Button className="flex items-center">
                        <Plus size={18} className="mr-2" />
                        New Page
                    </Button>
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={pages}
                actions={actions}
            />
        </AdminLayout>
    );
}
