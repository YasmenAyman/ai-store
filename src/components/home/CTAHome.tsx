import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTAHome() {
  const { t } = useLanguage();

  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Newsletter */}
          <div className="space-y-4 text-center md:text-start">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">{t.cta.newsletter}</h2>
            <p className="text-primary-foreground/80">{t.cta.newsletterSub}</p>
            <div className="flex gap-2 max-w-md mx-auto md:mx-0">
              <Input
                placeholder={t.cta.placeholder}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">
                {t.cta.subscribe}
              </Button>
            </div>
          </div>

          {/* Shop Now CTA */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">{t.featured.title}</h2>
            <p className="text-primary-foreground/80">{t.featured.subtitle}</p>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/store">{t.cta.shopNow}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
