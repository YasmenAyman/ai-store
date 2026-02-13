import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Card } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
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
import { Save, Upload, Image as ImageIcon, Plus, Edit, Trash2, ExternalLink, Link2 } from 'lucide-react';
import { route } from 'ziggy-js';

interface SocialLink {
    id: number;
    platform: string;
    url: string;
    icon: string | null;
    sort_order: number;
    is_active: boolean;
}

interface SettingsProps {
    settings: {
        site_name?: string;
        site_logo?: string;
        dashboard_logo?: string;
        favicon?: string;
    };
    socialLinks: SocialLink[];
}

export default function Index({ settings, socialLinks }: SettingsProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingLink, setEditingLink] = useState<SocialLink | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        site_name: settings.site_name || '',
        site_logo: null as File | null,
        dashboard_logo: null as File | null,
        favicon: null as File | null,
    });

    const socialForm = useForm({
        platform: '',
        url: '',
        icon: '',
        sort_order: 0,
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const handleCreateSocial = (e: React.FormEvent) => {
        e.preventDefault();
        socialForm.post(route('admin.social-links.store'), {
            onSuccess: () => {
                socialForm.reset();
                setIsCreateOpen(false);
            },
        });
    };

    const handleUpdateSocial = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingLink) {
            socialForm.patch(route('admin.social-links.update', editingLink.id), {
                onSuccess: () => {
                    socialForm.reset();
                    setEditingLink(null);
                },
            });
        }
    };

    const handleDeleteSocial = (id: number) => {
        if (confirm('Are you sure you want to delete this social media link?')) {
            router.delete(route('admin.social-links.destroy', id));
        }
    };

    const openEdit = (link: SocialLink) => {
        socialForm.setData({
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
            <Head title="Site Settings" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">Site Settings</h1>
                <p className="text-muted-foreground">Manage your website's identity and global configurations.</p>
            </div>

            <Tabs defaultValue="general" className="max-w-6xl">
                <TabsList>
                    <TabsTrigger value="general">General Settings</TabsTrigger>
                    <TabsTrigger value="social">Social Media Links</TabsTrigger>
                </TabsList>

                {/* General Settings Tab */}
                <TabsContent value="general">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-6 flex items-center">
                                <ImageIcon className="mr-2 h-5 w-5 text-accent" />
                                Branding & Identity
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Site Name */}
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="site_name">Site Name</Label>
                                    <Input
                                        id="site_name"
                                        value={data.site_name}
                                        onChange={(e) => setData('site_name', e.target.value)}
                                        placeholder="Enter your store name"
                                    />
                                    {errors.site_name && <p className="text-sm text-destructive">{errors.site_name}</p>}
                                </div>

                                {/* Site Logo */}
                                <div className="space-y-4">
                                    <Label>Site Logo</Label>
                                    <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-border rounded-lg bg-muted/30">
                                        {settings.site_logo && !data.site_logo && (
                                            <img src={settings.site_logo} alt="Site Logo" className="h-16 object-contain" />
                                        )}
                                        {data.site_logo && (
                                            <div className="text-sm text-accent font-medium italic">New file selected</div>
                                        )}
                                        <label className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-md cursor-pointer hover:bg-muted transition-colors">
                                            <Upload size={16} />
                                            <span>Choose Logo</span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => setData('site_logo', e.target.files?.[0] || null)}
                                                accept="image/*"
                                            />
                                        </label>
                                        <p className="text-xs text-muted-foreground text-center">Recommended: 250x100px PNG or SVG. Used in Header, Footer, and Dashboard.</p>
                                    </div>
                                    {errors.site_logo && <p className="text-sm text-destructive">{errors.site_logo}</p>}
                                </div>

                                {/* Favicon */}
                                <div className="space-y-4">
                                    <Label>Favicon</Label>
                                    <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-border rounded-lg bg-muted/30">
                                        {settings.favicon && !data.favicon && (
                                            <img src={settings.favicon} alt="Favicon" className="h-12 w-12 object-contain" />
                                        )}
                                        {data.favicon && (
                                            <div className="text-sm text-accent font-medium italic">New file selected</div>
                                        )}
                                        <label className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-md cursor-pointer hover:bg-muted transition-colors">
                                            <Upload size={16} />
                                            <span>Choose Favicon</span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => setData('favicon', e.target.files?.[0] || null)}
                                                accept="image/*"
                                            />
                                        </label>
                                        <p className="text-xs text-muted-foreground text-center">Recommended: 32x32px ICO or PNG.</p>
                                    </div>
                                    {errors.favicon && <p className="text-sm text-destructive">{errors.favicon}</p>}
                                </div>
                            </div>
                        </Card>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing} className="px-8">
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Saving...' : 'Save Settings'}
                            </Button>
                        </div>
                    </form>
                </TabsContent>

                {/* Social Media Links Tab */}
                <TabsContent value="social">
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                                <Link2 className="mr-2 h-5 w-5 text-accent" />
                                <h3 className="text-lg font-semibold text-foreground">Social Media Links</h3>
                            </div>
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
                                    <form onSubmit={handleCreateSocial} className="space-y-4">
                                        <div>
                                            <Label>Platform</Label>
                                            <Input value={socialForm.data.platform} onChange={e => socialForm.setData('platform', e.target.value)} placeholder="Instagram" required />
                                        </div>
                                        <div>
                                            <Label>URL</Label>
                                            <Input value={socialForm.data.url} onChange={e => socialForm.setData('url', e.target.value)} placeholder="https://instagram.com/..." required />
                                        </div>
                                        <div>
                                            <Label>Icon (Lucide name)</Label>
                                            <Input value={socialForm.data.icon} onChange={e => socialForm.setData('icon', e.target.value)} placeholder="Instagram" />
                                            <p className="text-xs text-muted-foreground mt-1">e.g., Instagram, Facebook, Twitter, Linkedin, Youtube</p>
                                        </div>
                                        <div>
                                            <Label>Sort Order</Label>
                                            <Input type="number" value={socialForm.data.sort_order} onChange={e => socialForm.setData('sort_order', parseInt(e.target.value))} />
                                        </div>
                                        <Button type="submit" disabled={socialForm.processing}>Create</Button>
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
                                {socialLinks.map(link => (
                                    <TableRow key={link.id}>
                                        <TableCell className="font-medium text-foreground">{link.platform}</TableCell>
                                        <TableCell>
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-accent hover:underline">
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
                                            <Button size="sm" variant="destructive" onClick={() => handleDeleteSocial(link.id)}>
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
                                <form onSubmit={handleUpdateSocial} className="space-y-4">
                                    <div>
                                        <Label>Platform</Label>
                                        <Input value={socialForm.data.platform} onChange={e => socialForm.setData('platform', e.target.value)} required />
                                    </div>
                                    <div>
                                        <Label>URL</Label>
                                        <Input value={socialForm.data.url} onChange={e => socialForm.setData('url', e.target.value)} required />
                                    </div>
                                    <div>
                                        <Label>Icon (Lucide name)</Label>
                                        <Input value={socialForm.data.icon} onChange={e => socialForm.setData('icon', e.target.value)} />
                                        <p className="text-xs text-muted-foreground mt-1">e.g., Instagram, Facebook, Twitter, Linkedin, Youtube</p>
                                    </div>
                                    <div>
                                        <Label>Sort Order</Label>
                                        <Input type="number" value={socialForm.data.sort_order} onChange={e => socialForm.setData('sort_order', parseInt(e.target.value))} />
                                    </div>
                                    <Button type="submit" disabled={socialForm.processing}>Update</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </Card>
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
}
