import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/DataTable';
import { Head, Link } from '@inertiajs/react';
import { Edit2, Layout } from 'lucide-react';
import { route } from 'ziggy-js';

export default function Index({ sections }) {
    const columns = [
        {
            key: 'title',
            label: 'Section Title',
            render: (value, item) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center text-accent">
                        <Layout className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-foreground">{value}</span>
                </div>
            )
        },
        { key: 'slug', label: 'Identifier', render: (value) => <span className="text-muted-foreground">{value}</span> },
        {
            key: 'is_active',
            label: 'Status',
            render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${value ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'
                    }`}>
                    {value ? 'Active' : 'Inactive'}
                </span>
            )
        },
        {
            key: 'updated_at',
            label: 'Last Updated',
            render: (value) => <span className="text-muted-foreground">{new Date(value).toLocaleDateString()}</span>
        },
    ];

    const actions = (item) => (
        <Link
            href={route('admin.home-sections.edit', item.id)}
            className="inline-flex items-center px-3 py-1 bg-card border border-border rounded-lg text-sm font-medium text-accent hover:bg-accent/10 transition-colors"
        >
            <Edit2 className="w-3.5 h-3.5 mr-1.5" />
            Edit
        </Link>
    );

    return (
        <AdminLayout>
            <Head title="Home Sections" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">Homepage Sections</h1>
                <p className="text-muted-foreground">Manage dynamic content patterns for your homepage components.</p>
            </div>

            <DataTable
                columns={columns}
                data={sections}
                actions={actions}
            />
        </AdminLayout>
    );
}
