import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBgDefault from "@/assets/hero-bg.jpg";

export function Hero({ data }: { data?: any }) {
  const { t } = useLanguage();

  const content = data?.content || {
    title: t.hero.title,
    subtitle: t.hero.subtitle,
    cta_text: t.hero.cta,
    cta_link: "/store",
    image: heroBgDefault
  };

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <img
        src={content.image || heroBgDefault}
        alt={content.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-background/10" />
      <div className="relative z-10 container text-center space-y-6 py-20">
        <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight animate-fade-in text-primary-foreground drop-shadow-lg">
          {content.title}
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto animate-fade-in drop-shadow" style={{ animationDelay: "0.2s" }}>
          {content.subtitle}
        </p>
        <Button
          asChild
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 animate-fade-in shadow-lg"
          style={{ animationDelay: "0.4s" }}
        >
          <Link href={content.cta_link}>{content.cta_text}</Link>
        </Button>
      </div>
    </section>
  );
}
