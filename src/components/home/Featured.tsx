import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";

export function Featured() {
  const { t } = useLanguage();
  const featured = products.slice(0, 8);

  return (
    <section className="bg-card py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">{t.featured.title}</h2>
          <p className="mt-2 text-muted-foreground">{t.featured.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
