import { useLanguage } from "@/contexts/LanguageContext";
import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/shared/TestimonialCard";

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="bg-card py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">{t.testimonials.title}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
