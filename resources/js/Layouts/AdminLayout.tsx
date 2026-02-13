import React, { useState } from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import {
    LayoutDashboard,
    Box,
    Folders,
    ShoppingCart,
    FileText,
    Image as ImageIcon,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight,
    MessageSquare,
    Link2,
    Mail
} from 'lucide-react';
import { route } from 'ziggy-js';
import { ThemeToggle } from '@/Components/shared/ThemeToggle';

const SidebarItem = ({ href, icon: Icon, label, active }) => (
    <Link
        href={href}
        className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${active
            ? 'bg-accent/10 text-accent border-r-4 border-accent'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
    >
        <Icon className={`mr-3 h-5 w-5 ${active ? 'text-accent' : 'text-muted-foreground'}`} />
        {label}
        {active && <ChevronRight className="ml-auto h-4 w-4" />}
    </Link>
);

export default function AdminLayout({ children }) {
    const { url, props } = usePage();
    const { auth, settings } = props as any;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navigation = [
        { label: 'Dashboard', href: route('admin.dashboard'), icon: LayoutDashboard, active: url === '/admin/dashboard' },
        { label: 'Products', href: route('admin.products.index'), icon: Box, active: url.startsWith('/admin/products') },
        { label: 'Categories', href: route('admin.categories.index'), icon: Folders, active: url.startsWith('/admin/categories') },
        { label: 'Orders', href: route('admin.orders.index'), icon: ShoppingCart, active: url.startsWith('/admin/orders') },
        { label: 'Pages', href: route('admin.pages.index'), icon: FileText, active: url.startsWith('/admin/pages') },
        { label: 'Home Sections', href: route('admin.home-sections.index'), icon: LayoutDashboard, active: url.startsWith('/admin/home-sections') },
        { label: 'Blog', href: route('admin.blog-posts.index'), icon: FileText, active: url.startsWith('/admin/blog-posts') },
        { label: 'Reviews', href: route('admin.reviews.index'), icon: MessageSquare, active: url.startsWith('/admin/reviews') },
        { label: 'Footer Links', href: route('admin.footer-links.index'), icon: Link2, active: url.startsWith('/admin/footer-links') },
        { label: 'Newsletter', href: route('admin.newsletter.index'), icon: Mail, active: url.startsWith('/admin/newsletter') },
        { label: 'Settings', href: route('admin.settings.index'), icon: Settings, active: url.startsWith('/admin/settings') },
        { label: 'Users', href: route('admin.users.index'), icon: Users, active: url.startsWith('/admin/users') },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <Head>
                {settings?.favicon && <link rel="icon" type="image/x-icon" href={settings.favicon} />}
            </Head>
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-card border-r border-border shadow-sm transition-all duration-300 flex flex-col fixed inset-y-0 z-50`}>
                <div className="h-16 flex items-center px-6 border-b border-border">
                    <div className={`transition-opacity duration-300 ${!isSidebarOpen && 'opacity-0 hidden'}`}>
                        {settings?.site_logo ? (
                            <img src={settings.site_logo} alt={settings?.site_name || "Admin"} className="h-8 w-auto object-contain" />
                        ) : (
                            <span className="text-xl font-bold text-accent">
                                {settings?.site_name || "Luxury Shop"}
                            </span>
                        )}
                    </div>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="ml-auto text-muted-foreground hover:text-foreground">
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 py-4 overflow-y-auto">
                    {navigation.map((item) => (
                        <SidebarItem key={item.label} {...item} />
                    ))}
                </nav>

                <div className="p-4 border-t border-border">
                    <div className="flex items-center px-4 py-2">
                        <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                            {(auth as any).user.name.charAt(0)}
                        </div>
                        {isSidebarOpen && (
                            <div className="ml-3 overflow-hidden">
                                <p className="text-sm font-medium text-foreground truncate">{(auth as any).user.name}</p>
                                <p className="text-xs text-muted-foreground truncate capitalize">{(auth as any).user.role}</p>
                            </div>
                        )}
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex items-center px-4 py-2 mt-2 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        {isSidebarOpen && 'Logout'}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
                <header className="h-16 bg-card shadow-sm flex items-center px-8 border-b border-border sticky top-0 z-40">
                    <h2 className="text-lg font-semibold text-foreground">Admin Panel</h2>
                    <div className="ml-auto flex items-center space-x-6">
                        <ThemeToggle />
                        <Link href="/" className="text-sm text-muted-foreground hover:text-accent font-medium">View Shop</Link>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
