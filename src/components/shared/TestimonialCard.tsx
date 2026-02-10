import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { language } = useLanguage();
  const name = language === "ar" ? testimonial.nameAr : testimonial.name;
  const quote = language === "ar" ? testimonial.quoteAr : testimonial.quote;

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-card p-6">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < testimonial.rating ? "fill-accent text-accent" : "text-border"}`}
          />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground italic">"{quote}"</p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
          {testimonial.initials}
        </div>
        <span className="text-sm font-medium">{name}</span>
      </div>
    </div>
  );
}
