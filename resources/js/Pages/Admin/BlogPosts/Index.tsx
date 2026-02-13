import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/DataTable';
import { Button, Badge } from '@/Components/UI';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Index({ posts }) {
    const columns = [
        {
            key: 'title',
            label: 'Post',
            render: (title, post) => (
                <div className="flex items-center">
                    <div className="h-10 w-16 flex-shrink-0 rounded bg-muted mr-3 overflow-hidden">
                        {post.featured_image ? (
                            <img src={post.featured_image} alt={title} className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">No Image</div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-foreground line-clamp-1">{title}</div>
                        <div className="text-xs text-muted-foreground">{post.author?.name || 'Unknown Author'}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'is_published',
            label: 'Status',
            render: (isPublished) => (
                <Badge variant={isPublished ? 'green' : 'gray'}>
                    {isPublished ? 'Published' : 'Draft'}
                </Badge>
            )
        },
        {
            key: 'published_at',
            label: 'Published Date',
            render: (date) => (
                <span className="text-muted-foreground">
                    {date ? new Date(date).toLocaleDateString() : '-'}
                </span>
            )
        }
    ];

    const actions = (post) => (
        <div className="flex justify-end space-x-2">
            <Link
                href={route('admin.blog-posts.edit', post.id)}
                className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors border border-accent/20 bg-card"
                title="Edit"
            >
                <Edit2 size={16} />
            </Link>
            <Link
                href={route('admin.blog-posts.destroy', post.id)}
                method="delete"
                as="button"
                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors border border-destructive/20 bg-card"
                title="Delete"
                onBefore={() => confirm('Are you sure you want to delete this post?')}
            >
                <Trash2 size={16} />
            </Link>
        </div>
    );

    return (
        <AdminLayout>
            <Head title="Blog Posts" />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
                    <p className="text-muted-foreground">Manage your journal articles and stories.</p>
                </div>
                <Link href={route('admin.blog-posts.create')}>
                    <Button className="flex items-center">
                        <Plus size={18} className="mr-2" />
                        New Post
                    </Button>
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={posts}
                actions={actions}
            />
        </AdminLayout>
    );
}
