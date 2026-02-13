import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Trash2, User as UserIcon, Shield, Mail, Calendar } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { format } from "date-fns";
import { route } from 'ziggy-js';

interface User {
    id: number;
    name: string;
    email: string;
    role?: {
        name: string;
        slug: string;
    };
    created_at: string;
}

interface Props {
    users: {
        data: User[];
        links: any[];
    };
}

export default function Index({ users }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="User Management" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">User Management</h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage your store's users and their roles</p>
                </div>
            </div>

            <div className="bg-card rounded-lg shadow overflow-hidden border border-border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.length > 0 ? (
                            users.data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground mr-3">
                                                <UserIcon size={18} />
                                            </div>
                                            <div className="font-medium text-foreground">{user.name}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-muted-foreground">
                                            <Mail size={14} className="mr-2" />
                                            {user.email}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role?.slug === 'admin'
                                            ? 'bg-purple-500/10 text-purple-500'
                                            : 'bg-green-500/10 text-green-500'
                                            }`}>
                                            <Shield size={12} className="mr-1" />
                                            {user.role?.name || 'Customer'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-muted-foreground text-sm">
                                            <Calendar size={14} className="mr-2" />
                                            {format(new Date(user.created_at), 'MMM dd, yyyy')}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => handleDelete(user.id)}
                                            disabled={user.role?.slug === 'admin'}
                                        >
                                            <Trash2 size={18} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {users.links.length > 3 && (
                    <div className="p-4 border-t flex justify-center gap-1">
                        {users.links.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                asChild
                                disabled={!link.url}
                                className={!link.url ? "opacity-50 pointer-events-none" : ""}
                            >
                                <a href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
