import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CTASectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  children?: ReactNode;
  variant?: "default" | "accent";
}

export function CTASection({ title, subtitle, ctaText, ctaLink, children, variant = "default" }: CTASectionProps) {
  const bg = variant === "accent" ? "bg-primary text-primary-foreground" : "bg-secondary";

  return (
    <section className={`${bg} py-20`}>
      <div className="container text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold">{title}</h2>
        <p className={`max-w-xl mx-auto ${variant === "accent" ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
        {children}
        <div>
          <Button asChild size="lg" className={variant === "accent" ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}>
            <Link to={ctaLink}>{ctaText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
