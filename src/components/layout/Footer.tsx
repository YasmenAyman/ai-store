import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/50 bg-card">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">{t.footer.brand}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.tagline}</p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">{t.footer.quickLinks}</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.nav.home}</Link>
              <Link to="/store" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.nav.store}</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.nav.about}</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.nav.contact}</Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">{t.footer.customerService}</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">{t.footer.shippingReturns}</span>
              <span className="text-sm text-muted-foreground">{t.footer.faq}</span>
              <span className="text-sm text-muted-foreground">{t.footer.privacyPolicy}</span>
              <span className="text-sm text-muted-foreground">{t.footer.terms}</span>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">{t.footer.newsletter}</h4>
            <p className="text-sm text-muted-foreground">{t.footer.newsletterSub}</p>
            <div className="flex gap-2">
              <Input placeholder={t.cta.placeholder} className="bg-background" />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">{t.cta.subscribe}</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Lumière. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
