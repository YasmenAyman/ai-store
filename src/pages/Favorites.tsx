import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { t } = useLanguage();
  const { favorites } = useFavorites();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <Layout>
      <div className="container py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-center mb-10">
          {t.favorites.title}
        </h1>

        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-serif font-semibold">{t.favorites.empty}</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              {t.favorites.emptyDesc}
            </p>
            <Button asChild className="mt-6">
              <Link to="/store">{t.favorites.browse}</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;
