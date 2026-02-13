import { Star } from "lucide-react";

interface Review {
  id: number;
  rating: number;
  comment: string;
  user_name: string;
  product_name: string;
  initials: string;
}

interface TestimonialCardProps {
  testimonial: Review;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-card p-6 h-full">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < testimonial.rating ? "fill-accent text-accent" : "text-border"}`}
          />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground italic">"{testimonial.comment}"</p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
          {testimonial.initials}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{testimonial.user_name}</span>
          {testimonial.product_name && (
            <span className="text-xs text-muted-foreground">{testimonial.product_name}</span>
          )}
        </div>
      </div>
    </div>
  );
}
