import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { Trash2, Mail } from 'lucide-react';
import { route } from 'ziggy-js';
import { format } from 'date-fns';

interface Subscriber {
    id: number;
    email: string;
    subscribed_at: string;
    is_active: boolean;
}

interface PaginatedSubscribers {
    data: Subscriber[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export default function Index({ subscribers }: { subscribers: PaginatedSubscribers }) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to remove this subscriber?')) {
            router.delete(route('admin.newsletter.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Newsletter Subscribers" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Newsletter Subscribers</h1>
                        <p className="text-muted-foreground mt-1">Total: {subscribers.total} subscribers</p>
                    </div>
                </div>

                <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Subscribed Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscribers.data.map(subscriber => (
                                <TableRow key={subscriber.id}>
                                    <TableCell className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-foreground">{subscriber.email}</span>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {format(new Date(subscriber.subscribed_at), 'MMM dd, yyyy')}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={subscriber.is_active ? 'green' : 'gray'}>
                                            {subscriber.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(subscriber.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {subscribers.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: subscribers.last_page }, (_, i) => i + 1).map(page => (
                            <Button
                                key={page}
                                variant={page === subscribers.current_page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => router.get(route('admin.newsletter.index', { page }))}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
