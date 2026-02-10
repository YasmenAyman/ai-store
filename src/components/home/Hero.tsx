import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Luxury living room with candles"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-background/10" />
      <div className="relative z-10 container text-center space-y-6 py-20">
        <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight animate-fade-in text-primary-foreground drop-shadow-lg">
          {t.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto animate-fade-in drop-shadow" style={{ animationDelay: "0.2s" }}>
          {t.hero.subtitle}
        </p>
        <Button
          asChild
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 animate-fade-in shadow-lg"
          style={{ animationDelay: "0.4s" }}
        >
          <Link to="/store">{t.hero.cta}</Link>
        </Button>
      </div>
    </section>
  );
}
