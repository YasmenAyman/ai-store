import { useLanguage } from "@/contexts/LanguageContext";
import { categories as localCategories } from "@/data/categories";
import { CategoryCard } from "@/Components/shared/CategoryCard";

export function Categories({ data }: { data?: any[] }) {
  const { t } = useLanguage();
  const displayCategories = data && data.length > 0 ? data : localCategories;

  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold">{t.categories.title}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {displayCategories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}
