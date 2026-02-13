import { Link, usePage, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { useState } from "react";
import { route } from "ziggy-js";

const iconMap: Record<string, any> = {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
};

export function Footer() {
  const { t, language } = useLanguage();
  const { settings, footerLinks, socialLinks, flash } = usePage().props as any;
  const [showSuccess, setShowSuccess] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('newsletter.subscribe'), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      },
    });
  };

  const quickLinks = footerLinks?.quick_links || [];
  const customerServiceLinks = footerLinks?.customer_service || [];

  return (
    <footer className="border-t border-border/50 bg-card">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">
              {settings?.site_logo ? (
                <img src={settings.site_logo} alt={settings?.site_name || "Lumière"} className="h-10 w-auto object-contain" />
              ) : (
                settings?.site_name || t.footer.brand
              )}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.tagline}</p>
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((link: any) => {
                  const Icon = iconMap[link.icon] || Instagram;
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                      aria-label={link.platform}
                    >
                      <Button variant="ghost" size="icon">
                        <Icon className="h-4 w-4" />
                      </Button>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">{t.footer.quickLinks}</h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link: any) => (
                <Link
                  key={link.id}
                  href={link.url || '#'}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {language === 'ar' ? link.label_ar : link.label_en}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">{t.footer.customerService}</h4>
            <div className="flex flex-col gap-2">
              {customerServiceLinks.map((link: any) => (
                link.url ? (
                  <Link
                    key={link.id}
                    href={link.url}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {language === 'ar' ? link.label_ar : link.label_en}
                  </Link>
                ) : (
                  <span key={link.id} className="text-sm text-muted-foreground">
                    {language === 'ar' ? link.label_ar : link.label_en}
                  </span>
                )
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">{t.footer.newsletter}</h4>
            <p className="text-sm text-muted-foreground">{t.footer.newsletterSub}</p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t.cta.placeholder}
                  className="bg-background"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  disabled={processing}
                  required
                />
                <Button
                  type="submit"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  disabled={processing}
                >
                  {processing ? '...' : t.cta.subscribe}
                </Button>
              </div>
              {showSuccess && flash?.success && (
                <p className="text-sm text-green-600">{flash.success}</p>
              )}
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {settings?.site_name || "Tqnia"}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
