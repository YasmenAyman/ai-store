import React, { useState } from 'react';
import { Layout } from '@/Components/layout/Layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import {
    User,
    Package,
    Heart,
    Settings,
    ChevronRight,
    ShoppingBag,
    Clock,
    CheckCircle2,
    Truck,
    XCircle,
    Calendar,
    Mail,
    Edit2
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/Components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface OrderItem {
    id: number;
    product_id: number;
    product_name: string;
    price: number;
    quantity: number;
    product?: {
        images: { image_path: string }[];
    };
}

interface Order {
    id: number;
    order_number: string;
    total_amount: number;
    status: string;
    created_at: string;
    items: OrderItem[];
}

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
    };
    orders: {
        data: Order[];
        links: any[];
        total: number;
    };
}

const StatCard = ({ icon: Icon, label, value, colorClass }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 flex items-center gap-4">
        <div className={`p-3 rounded-xl ${colorClass}`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-sm text-muted-foreground font-medium">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const StatusBadge = ({ status }: { status: string }) => {
    const statusMap: any = {
        pending: { color: 'bg-amber-100 text-amber-700', icon: Clock },
        processing: { color: 'bg-blue-100 text-blue-700', icon: Truck },
        shipped: { color: 'bg-indigo-100 text-indigo-700', icon: Truck },
        delivered: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
        cancelled: { color: 'bg-rose-100 text-rose-700', icon: XCircle },
    };

    const config = statusMap[status] || statusMap.pending;
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
            <Icon size={12} className="mr-1" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default function Profile({ user, orders }: Props) {
    const { t, language } = useLanguage();
    const { count: favCount, favorites } = useFavorites();
    const { props } = usePage();
    // Assuming we might have a list of all products or similar, but for now we rely on the ProductCard taking an ID or similar
    // Actually, Favorites are just IDs. We'd need the product data to show them.
    // For now, let's focus on Overview and Orders.

    const { data, setData, patch, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <Layout>
            <Head title={t.profile.title} />

            <div className="container py-12 max-w-6xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
                    <div className="relative">
                        <div className="h-24 w-24 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center text-accent">
                            <User size={48} />
                        </div>
                        <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-border hover:bg-muted transition-colors">
                            <Edit2 size={14} className="text-muted-foreground" />
                        </button>
                    </div>
                    <div className={`text-center flex-1 ${language === 'ar' ? 'md:text-right' : 'md:text-left'}`}>
                        <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                        <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 mt-1">
                            <Mail size={16} />
                            {user.email}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" asChild>
                            <Link href="/store">
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                {t.profile.orders.browse}
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    <StatCard
                        icon={Package}
                        label={t.profile.stats.orders}
                        value={orders.total}
                        colorClass="bg-blue-50 text-blue-600"
                    />
                    <StatCard
                        icon={Calendar}
                        label={t.profile.stats.memberSince}
                        value="Feb 2026" // Placeholder
                        colorClass="bg-amber-50 text-amber-600"
                    />
                </div>

                {/* Tabbed Content */}
                <Tabs defaultValue="overview" className="space-y-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    <TabsList className="bg-muted/50 p-1 rounded-xl w-full md:w-auto h-auto grid grid-cols-2 md:inline-flex">
                        <TabsTrigger value="overview" className="rounded-lg py-2.5 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <User size={16} className="mr-2" />
                            {t.profile.tabs.overview}
                        </TabsTrigger>
                        <TabsTrigger value="orders" className="rounded-lg py-2.5 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <Package size={16} className="mr-2" />
                            {t.profile.tabs.orders}
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="rounded-lg py-2.5 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <Settings size={16} className="mr-2" />
                            {t.profile.tabs.settings}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <div className="grid gap-8">
                            {/* Recent Orders Preview */}
                            <div className="bg-white rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                                <div className="p-6 border-b border-border/50 flex justify-between items-center">
                                    <h3 className="font-bold text-lg">{t.profile.tabs.orders}</h3>
                                    <Link href="#" className="text-sm font-medium text-accent hover:underline">
                                        {t.profile.orders.details}
                                    </Link>
                                </div>
                                <div className="p-0">
                                    <Table>
                                        <TableHeader className="bg-muted/30">
                                            <TableRow>
                                                <TableHead>{t.profile.orders.id}</TableHead>
                                                <TableHead>{t.profile.orders.date}</TableHead>
                                                <TableHead>{t.profile.orders.total}</TableHead>
                                                <TableHead>{t.profile.orders.status}</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {orders.data.slice(0, 3).map((order) => (
                                                <TableRow key={order.id} className="hover:bg-muted/20">
                                                    <TableCell className="font-medium text-accent">#{order.order_number}</TableCell>
                                                    <TableCell>{format(new Date(order.created_at), 'MMM dd, yyyy')}</TableCell>
                                                    <TableCell className="font-bold">${order.total_amount}</TableCell>
                                                    <TableCell><StatusBadge status={order.status} /></TableCell>
                                                </TableRow>
                                            ))}
                                            {orders.data.length === 0 && (
                                                <TableRow>
                                                    <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                                                        {t.profile.orders.empty}
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="orders">
                        <div className="bg-white rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-border/50">
                                <h3 className="font-bold text-lg">{t.profile.tabs.orders}</h3>
                            </div>
                            <Table>
                                <TableHeader className="bg-muted/30">
                                    <TableRow>
                                        <TableHead>{t.profile.orders.id}</TableHead>
                                        <TableHead>{t.profile.orders.date}</TableHead>
                                        <TableHead>{t.profile.orders.total}</TableHead>
                                        <TableHead>{t.profile.orders.status}</TableHead>
                                        <TableHead className="text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.data.map((order) => (
                                        <TableRow key={order.id} className="hover:bg-muted/20">
                                            <TableCell className="font-medium text-accent">#{order.order_number}</TableCell>
                                            <TableCell>{format(new Date(order.created_at), 'MMM dd, yyyy')}</TableCell>
                                            <TableCell className="font-bold">${order.total_amount}</TableCell>
                                            <TableCell><StatusBadge status={order.status} /></TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" className="text-accent hover:text-accent hover:bg-accent/5">
                                                    {t.profile.orders.details}
                                                    <ChevronRight size={14} className="ml-1" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {orders.data.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-64 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-3">
                                                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                                        <Package size={24} />
                                                    </div>
                                                    <p className="font-medium text-muted-foreground">{t.profile.orders.empty}</p>
                                                    <Button variant="outline" asChild>
                                                        <Link href="/store">{t.profile.orders.browse}</Link>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="settings">
                        <div className="max-w-2xl">
                            <div className="bg-white p-8 rounded-2xl border border-border/50 shadow-sm">
                                <h3 className="text-xl font-bold mb-6">{t.profile.settings.personalInfo}</h3>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">{t.profile.settings.name}</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="pl-10 h-12 rounded-xl"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">{t.profile.settings.email}</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className="pl-10 h-12 rounded-xl"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <Button type="submit" size="lg" className="w-full md:w-auto px-10 h-12 rounded-xl" disabled={processing}>
                                            {processing ? "..." : t.profile.settings.update}
                                        </Button>

                                        <AnimatePresence>
                                            {recentlySuccessful && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="mt-4 text-sm font-medium text-emerald-600 flex items-center gap-2"
                                                >
                                                    <CheckCircle2 size={16} />
                                                    {t.profile.settings.success}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
}
