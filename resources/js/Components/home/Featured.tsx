import { useLanguage } from "@/contexts/LanguageContext";
import { products as localProducts } from "@/data/products";
import { ProductCard } from "@/Components/shared/ProductCard";

export function Featured({ data, bestSellers }: { data?: any[], bestSellers?: any[] }) {
  const { t } = useLanguage();
  const featured = data && data.length > 0 ? data : localProducts.slice(0, 8);
  const bestSellerProducts = bestSellers || [];

  return (
    <>
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

      {/* Best Sellers Section - Only show if there are best sellers */}
      {bestSellerProducts.length > 0 && (
        <section className="bg-background py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">{t.bestSellers.title}</h2>
              <p className="mt-2 text-muted-foreground">{t.bestSellers.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {bestSellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
