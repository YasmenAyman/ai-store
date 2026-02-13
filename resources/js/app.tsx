import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { route } from 'ziggy-js';
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { Toaster } from "@/Components/ui/toaster";
import { Toaster as Sonner } from "@/Components/ui/sonner";

window.route = route;

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';
const queryClient = new QueryClient();

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
                <LanguageProvider>
                    <CartProvider>
                        <FavoritesProvider auth={props.initialPage.props.auth}>
                            <QueryClientProvider client={queryClient}>
                                <TooltipProvider>
                                    <Toaster />
                                    <Sonner />
                                    <App {...props} />
                                </TooltipProvider>
                            </QueryClientProvider>
                        </FavoritesProvider>
                    </CartProvider>
                </LanguageProvider>
            </ThemeProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
