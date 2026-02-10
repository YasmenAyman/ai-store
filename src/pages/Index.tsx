import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background/60" />
        <div className="relative z-10 container text-center space-y-6 py-20">
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight animate-fade-in">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t.hero.subtitle}
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link to="/store">{t.hero.cta}</Link>
          </Button>
        </div>
      </section>

      {/* Categories placeholder */}
      <section className="container py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t.categories.title}</h2>
        <p className="text-muted-foreground">Category cards coming in Phase 2...</p>
      </section>

      {/* Featured placeholder */}
      <section className="bg-card py-20">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">{t.featured.title}</h2>
          <p className="text-muted-foreground">{t.featured.subtitle}</p>
          <p className="mt-8 text-muted-foreground">Product cards coming in Phase 2...</p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
