import { Link } from "@inertiajs/react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { language } = useLanguage();
  const name = language === "ar" ? (category as any).name_ar || (category as any).nameAr : category.name;

  return (
    <Link
      href={`/store?category=${category.slug}`}
      className="group relative aspect-square overflow-hidden rounded-lg"
    >
      <img
        src={category.image}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent transition-opacity group-hover:from-foreground/80" />
      <div className="absolute inset-0 flex items-end p-6">
        <h3 className="font-serif text-xl font-bold text-primary-foreground drop-shadow-md">
          {name}
        </h3>
      </div>
    </Link>
  );
}
