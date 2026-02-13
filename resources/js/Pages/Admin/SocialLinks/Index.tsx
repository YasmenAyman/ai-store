import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { route } from 'ziggy-js';

interface SocialLink {
    id: number;
    platform: string;
    url: string;
    icon: string | null;
    sort_order: number;
    is_active: boolean;
}

export default function Index({ links }: { links: SocialLink[] }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingLink, setEditingLink] = useState<SocialLink | null>(null);

    const { data, setData, post, patch, reset, processing } = useForm({
        platform: '',
        url: '',
        icon: '',
        sort_order: 0,
        is_active: true,
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.social-links.store'), {
            onSuccess: () => {
                reset();
                setIsCreateOpen(false);
            },
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingLink) {
            patch(route('admin.social-links.update', editingLink.id), {
                onSuccess: () => {
                    reset();
                    setEditingLink(null);
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this social media link?')) {
            router.delete(route('admin.social-links.destroy', id));
        }
    };

    const openEdit = (link: SocialLink) => {
        setData({
            platform: link.platform,
            url: link.url,
            icon: link.icon || '',
            sort_order: link.sort_order,
            is_active: link.is_active,
        });
        setEditingLink(link);
    };

    return (
        <AdminLayout>
            <Head title="Social Media Links" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Social Media Links</h1>
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Social Link
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Social Media Link</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <Label>Platform</Label>
                                    <Input value={data.platform} onChange={e => setData('platform', e.target.value)} placeholder="Instagram" required />
                                </div>
                                <div>
                                    <Label>URL</Label>
                                    <Input value={data.url} onChange={e => setData('url', e.target.value)} placeholder="https://instagram.com/..." required />
                                </div>
                                <div>
                                    <Label>Icon (Lucide name)</Label>
                                    <Input value={data.icon} onChange={e => setData('icon', e.target.value)} placeholder="Instagram" />
                                    <p className="text-xs text-muted-foreground mt-1">e.g., Instagram, Facebook, Twitter, Linkedin, Youtube</p>
                                </div>
                                <div>
                                    <Label>Sort Order</Label>
                                    <Input type="number" value={data.sort_order} onChange={e => setData('sort_order', parseInt(e.target.value))} />
                                </div>
                                <Button type="submit" disabled={processing}>Create</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Platform</TableHead>
                            <TableHead>URL</TableHead>
                            <TableHead>Icon</TableHead>
                            <TableHead>Order</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {links.map(link => (
                            <TableRow key={link.id}>
                                <TableCell className="font-medium">{link.platform}</TableCell>
                                <TableCell>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                                        {link.url.substring(0, 40)}...
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                </TableCell>
                                <TableCell>{link.icon || '-'}</TableCell>
                                <TableCell>{link.sort_order}</TableCell>
                                <TableCell>{link.is_active ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell className="space-x-2">
                                    <Button size="sm" variant="outline" onClick={() => openEdit(link)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => handleDelete(link.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Edit Dialog */}
                <Dialog open={!!editingLink} onOpenChange={() => setEditingLink(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Social Media Link</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <Label>Platform</Label>
                                <Input value={data.platform} onChange={e => setData('platform', e.target.value)} required />
                            </div>
                            <div>
                                <Label>URL</Label>
                                <Input value={data.url} onChange={e => setData('url', e.target.value)} required />
                            </div>
                            <div>
                                <Label>Icon (Lucide name)</Label>
                                <Input value={data.icon} onChange={e => setData('icon', e.target.value)} />
                                <p className="text-xs text-muted-foreground mt-1">e.g., Instagram, Facebook, Twitter, Linkedin, Youtube</p>
                            </div>
                            <div>
                                <Label>Sort Order</Label>
                                <Input type="number" value={data.sort_order} onChange={e => setData('sort_order', parseInt(e.target.value))} />
                            </div>
                            <Button type="submit" disabled={processing}>Update</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
