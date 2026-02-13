import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Link, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";

export function CTAHome() {
  const { t } = useLanguage();
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

  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Newsletter */}
          <div className="space-y-4 text-center md:text-start">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">{t.cta.newsletter}</h2>
            <p className="text-primary-foreground/80">{t.cta.newsletterSub}</p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex gap-2 max-w-md mx-auto md:mx-0">
                <Input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder={t.cta.placeholder}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                  required
                />
                <Button
                  type="submit"
                  disabled={processing}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0"
                >
                  {processing ? '...' : t.cta.subscribe}
                </Button>
              </div>
              {showSuccess && (
                <p className="text-sm text-green-300">
                  ✓ {t.footer.subscribeSuccess || 'Successfully subscribed!'}
                </p>
              )}
              {errors.email && (
                <p className="text-sm text-red-300">{errors.email}</p>
              )}
            </form>
          </div>

          {/* Shop Now CTA */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">{t.featured.title}</h2>
            <p className="text-primary-foreground/80">{t.featured.subtitle}</p>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href={route('store.index')}>{t.cta.shopNow}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
