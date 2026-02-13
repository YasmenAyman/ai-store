import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button, Badge } from '@/Components/UI';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { route } from 'ziggy-js';

interface FooterLink {
    id: number;
    section: string;
    label_en: string;
    label_ar: string;
    url: string | null;
    sort_order: number;
    is_active: boolean;
}

export default function Index({ links }: { links: FooterLink[] }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingLink, setEditingLink] = useState<FooterLink | null>(null);

    const { data, setData, post, patch, reset, processing, errors } = useForm({
        section: 'quick_links',
        label_en: '',
        label_ar: '',
        url: '',
        sort_order: 0,
        is_active: true,
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.footer-links.store'), {
            onSuccess: () => {
                reset();
                setIsCreateOpen(false);
            },
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingLink) {
            patch(route('admin.footer-links.update', editingLink.id), {
                onSuccess: () => {
                    reset();
                    setEditingLink(null);
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this link?')) {
            router.delete(route('admin.footer-links.destroy', id));
        }
    };

    const openEdit = (link: FooterLink) => {
        setData({
            section: link.section,
            label_en: link.label_en,
            label_ar: link.label_ar,
            url: link.url || '',
            sort_order: link.sort_order,
            is_active: link.is_active,
        });
        setEditingLink(link);
    };

    const quickLinks = links.filter(l => l.section === 'quick_links');
    const customerService = links.filter(l => l.section === 'customer_service');

    return (
        <AdminLayout>
            <Head title="Footer Links Management" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-foreground">Footer Links</h1>
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Link
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Footer Link</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <Label>Section</Label>
                                    <Select value={data.section} onValueChange={(value) => setData('section', value as any)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="quick_links">Quick Links</SelectItem>
                                            <SelectItem value="customer_service">Customer Service</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Label (English)</Label>
                                    <Input value={data.label_en} onChange={e => setData('label_en', e.target.value)} required />
                                </div>
                                <div>
                                    <Label>Label (Arabic)</Label>
                                    <Input value={data.label_ar} onChange={e => setData('label_ar', e.target.value)} required />
                                </div>
                                <div>
                                    <Label>URL (optional)</Label>
                                    <Input value={data.url} onChange={e => setData('url', e.target.value)} />
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

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Quick Links</h2>
                    <div className="bg-card rounded-lg border border-border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Label (EN)</TableHead>
                                    <TableHead>Label (AR)</TableHead>
                                    <TableHead>URL</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {quickLinks.map(link => (
                                    <TableRow key={link.id}>
                                        <TableCell className="text-foreground">{link.label_en}</TableCell>
                                        <TableCell className="text-muted-foreground">{link.label_ar}</TableCell>
                                        <TableCell className="text-muted-foreground">{link.url || '-'}</TableCell>
                                        <TableCell className="text-muted-foreground">{link.sort_order}</TableCell>
                                        <TableCell>
                                            <Badge variant={link.is_active ? 'green' : 'gray'}>
                                                {link.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
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
                    </div>
                </div>

                {/* Customer Service */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Customer Service</h2>
                    <div className="bg-card rounded-lg border border-border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Label (EN)</TableHead>
                                    <TableHead>Label (AR)</TableHead>
                                    <TableHead>URL</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customerService.map(link => (
                                    <TableRow key={link.id}>
                                        <TableCell className="text-foreground">{link.label_en}</TableCell>
                                        <TableCell className="text-muted-foreground">{link.label_ar}</TableCell>
                                        <TableCell className="text-muted-foreground">{link.url || '-'}</TableCell>
                                        <TableCell className="text-muted-foreground">{link.sort_order}</TableCell>
                                        <TableCell>
                                            <Badge variant={link.is_active ? 'green' : 'gray'}>
                                                {link.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
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
                    </div>
                </div>

                {/* Edit Dialog */}
                <Dialog open={!!editingLink} onOpenChange={() => setEditingLink(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Footer Link</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <Label>Section</Label>
                                <Select value={data.section} onValueChange={(value) => setData('section', value as any)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="quick_links">Quick Links</SelectItem>
                                        <SelectItem value="customer_service">Customer Service</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Label (English)</Label>
                                <Input value={data.label_en} onChange={e => setData('label_en', e.target.value)} required />
                            </div>
                            <div>
                                <Label>Label (Arabic)</Label>
                                <Input value={data.label_ar} onChange={e => setData('label_ar', e.target.value)} required />
                            </div>
                            <div>
                                <Label>URL (optional)</Label>
                                <Input value={data.url} onChange={e => setData('url', e.target.value)} />
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
