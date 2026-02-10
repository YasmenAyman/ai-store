import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import promoBg from "@/assets/promo-winter.jpg";

export function PromoBanner() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[400px]">
        <div className="relative">
          <img
            src={promoBg}
            alt="Winter collection"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-secondary p-12 md:p-16 text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">{t.promo.title}</h2>
          <p className="text-muted-foreground max-w-md">{t.promo.subtitle}</p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/store">{t.promo.cta}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
