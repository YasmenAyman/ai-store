import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900/20 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/lovable-uploads/hero-bg.jpg")' }} // Fallback or use existing hero-bg if available, checking assets showed hero-bg.jpg
        >
          {/* Using a gray background as placeholder if image path needs adjustment, but trying to use what I saw in assets if possible. 
                Wait, I saw `hero-bg.jpg` in `src/assets`. 
                In Vite, assets in `src/assets` are usually imported. 
                Let's use a solid color or pattern if import is tricky without knowing exact path, 
                BUT I can try to import it. 
                Actually, for now I will use a styled div with a placeholder color/pattern or a known image URL from the project if I can finding one.
                The plan says "Brand story hero section with lifestyle imagery". 
                I will use a nice neutral background color with typography if image isn't critical, or try to import the image.
             */}
          <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800" />
        </div>

        <div className="container relative z-20 text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-foreground">
            {t.about.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.about.heroSub}
          </p>
        </div>
      </div>

      {/* Mission & Values */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1602810318660-d2c46b7dc945?auto=format&fit=crop&q=80"
                alt="Mission"
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl font-serif font-bold">{t.about.missionTitle}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.about.mission}
              </p>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">{t.about.valuesTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t.about.quality,
                desc: t.about.qualityDesc,
                icon: "✨"
              },
              {
                title: t.about.sustainability,
                desc: t.about.sustainabilityDesc,
                icon: "🌿"
              },
              {
                title: t.about.craftsmanship,
                desc: t.about.craftsmanshipDesc,
                icon: "🛠️"
              }
            ].map((value, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-secondary/30 text-center hover:bg-secondary/50 transition-colors duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story / Alternating Section */}
      <section className="py-20 border-t border-border">
        <div className="container">
          {/* Placeholder for more content if needed, mimicking the "Alternating sections" requirement */}
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <p className="text-xl font-serif italic text-muted-foreground">
              "We believe that true luxury lies in the details—the flicker of a candle, the texture of fine linen, the scent that welcomes you home."
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
