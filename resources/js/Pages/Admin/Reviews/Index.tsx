import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/DataTable';
import { Button, Badge } from '@/Components/UI';
import {
    CheckCircle,
    Trash2,
    Star,
    ExternalLink,
    MessageSquare
} from 'lucide-react';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { format } from 'date-fns';

interface Review {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    comment: string | null;
    approved: boolean;
    created_at: string;
    user: {
        name: string;
        email: string;
    };
    product: {
        id: number;
        name: string;
    };
}

interface Props {
    reviews: {
        data: Review[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        prev_page_url: string | null;
        next_page_url: string | null;
    };
}

export default function Index({ reviews }: Props) {
    const { post, delete: destroy } = useForm();
    const reviewData = reviews.data || [];

    const handleApprove = (id: number) => {
        if (confirm('Are you sure you want to approve this review?')) {
            post(route('admin.reviews.approve', id));
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this review?')) {
            destroy(route('admin.reviews.destroy', id));
        }
    };

    const columns = [
        {
            key: 'user',
            label: 'User',
            render: (_, review) => (
                <div>
                    <div className="font-medium text-foreground">{review.user.name}</div>
                    <div className="text-xs text-muted-foreground">{review.user.email}</div>
                </div>
            )
        },
        {
            key: 'product',
            label: 'Product',
            render: (_, review) => (
                <Link
                    href={route('store.show', review.product.id)}
                    className="text-accent hover:underline flex items-center gap-1"
                >
                    {review.product.name}
                    <ExternalLink size={12} />
                </Link>
            )
        },
        {
            key: 'rating',
            label: 'Rating',
            render: (rating) => (
                <div className="flex items-center gap-1">
                    <span className="font-medium text-foreground">{rating}</span>
                    <Star size={14} className="fill-gold text-gold" />
                </div>
            )
        },
        {
            key: 'comment',
            label: 'Comment',
            render: (comment) => (
                <p className="max-w-xs truncate text-foreground" title={comment || ''}>
                    {comment || <span className="italic text-muted-foreground">No comment</span>}
                </p>
            )
        },
        {
            key: 'approved',
            label: 'Status',
            render: (approved) => (
                <Badge variant={approved ? 'green' : 'yellow'}>
                    {approved ? 'Approved' : 'Pending'}
                </Badge>
            )
        },
        {
            key: 'created_at',
            label: 'Date',
            render: (date) => (
                <span className="text-muted-foreground">
                    {format(new Date(date), 'MMM d, yyyy')}
                </span>
            )
        }
    ];

    const actions = (review) => (
        <div className="flex justify-end space-x-2">
            {!review.approved && (
                <button
                    onClick={() => handleApprove(review.id)}
                    className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors border border-green-500/20 bg-card"
                    title="Approve"
                >
                    <CheckCircle size={16} />
                </button>
            )}
            <button
                onClick={() => handleDelete(review.id)}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors border border-destructive/20 bg-card"
                title="Delete"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );

    return (
        <AdminLayout>
            <Head title="Manage Reviews" />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Product Reviews</h1>
                    <p className="text-muted-foreground">Moderate and manage customer feedback.</p>
                </div>
            </div>

            {reviewData.length > 0 ? (
                <>
                    <DataTable
                        columns={columns}
                        data={reviewData}
                        actions={actions}
                    />

                    {reviews.links && reviews.links.length > 3 && (
                        <div className="mt-8 flex justify-center">
                            <div className="flex gap-1">
                                {reviews.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        onClick={(e) => !link.url && e.preventDefault()}
                                        className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${link.active
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'bg-card text-muted-foreground border-border hover:bg-muted'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-12 bg-card rounded-xl border border-dashed border-border">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mt-2 text-sm font-medium text-foreground">No reviews found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Reviews will appear here once customers submit them.</p>
                </div>
            )}
        </AdminLayout>
    );
}
