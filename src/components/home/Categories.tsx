import { useLanguage } from "@/contexts/LanguageContext";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/shared/CategoryCard";

export function Categories() {
  const { t } = useLanguage();

  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold">{t.categories.title}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}
