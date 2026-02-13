import { useEffect, FormEventHandler } from 'react';
import { Layout } from "@/Components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/Components/ui/button";
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Login() {
    const { t } = useLanguage();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <Layout>
            <Head title={t.nav.login} />
            <div className="container py-20 flex flex-col items-center">
                <div className="w-full max-w-md bg-card p-8 md:p-10 rounded-3xl shadow-xl border border-border">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-serif font-bold tracking-tight text-foreground">{t.auth.loginTitle}</h1>
                        <p className="mt-2 text-muted-foreground font-light">{t.auth.loginSub}</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
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
                            />
                            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium text-foreground">{t.auth.password}</label>
                                <Link href="#" className="text-xs text-accent hover:underline font-bold">
                                    {t.auth.forgotPassword}
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full h-12 px-4 rounded-xl border border-border bg-muted/10 text-foreground focus:bg-card focus:ring-2 focus:ring-accent outline-none transition-all"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-border bg-muted/10 text-accent shadow-sm focus:ring-accent"
                            />
                            <label htmlFor="remember" className="ms-2 text-sm text-muted-foreground cursor-pointer select-none">Remember me</label>
                        </div>

                        <Button className="w-full h-14 text-lg bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg shadow-accent/20" disabled={processing}>
                            {t.auth.login}
                        </Button>

                        <div className="text-center pt-4">
                            <p className="text-sm text-muted-foreground">
                                {t.auth.noAccount}{' '}
                                <Link href={route('register')} className="text-accent font-bold hover:underline">
                                    {t.auth.register}
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
