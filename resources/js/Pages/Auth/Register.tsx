import { useEffect, FormEventHandler } from 'react';
import { Layout } from "@/Components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/Components/ui/button";
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Register() {
    const { t } = useLanguage();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <Layout>
            <Head title={t.nav.register} />
            <div className="container py-20 flex flex-col items-center">
                <div className="w-full max-w-md bg-card p-8 md:p-10 rounded-3xl shadow-xl border border-border">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-serif font-bold tracking-tight text-foreground">{t.auth.registerTitle}</h1>
                        <p className="mt-2 text-muted-foreground font-light">{t.auth.registerSub}</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-foreground">{t.auth.name}</label>
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                className="w-full h-12 px-4 rounded-xl border border-border bg-muted/10 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/30"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground">{t.auth.email}</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full h-12 px-4 rounded-xl border border-border bg-muted/10 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/30"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-foreground">{t.auth.password}</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full h-12 px-4 rounded-xl border border-border bg-muted/10 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password_confirmation" className="text-sm font-medium text-foreground">{t.auth.confirmPassword}</label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="w-full h-12 px-4 rounded-xl border border-border bg-muted/10 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            {errors.password_confirmation && <p className="text-xs text-destructive mt-1">{errors.password_confirmation}</p>}
                        </div>

                        <Button className="w-full h-14 text-lg bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg shadow-accent/20" disabled={processing}>
                            {t.auth.register}
                        </Button>

                        <div className="text-center pt-4">
                            <p className="text-sm text-muted-foreground">
                                {t.auth.hasAccount}{' '}
                                <Link href={route('login')} className="text-accent font-bold hover:underline">
                                    {t.auth.login}
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
