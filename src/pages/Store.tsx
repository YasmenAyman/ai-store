import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";
import { StoreFilters } from "@/components/store/StoreFilters";
import { StoreSorting, type SortOption } from "@/components/store/StoreSorting";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

const maxPrice = Math.max(...products.map((p) => p.price));

const Store = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortOption>("popular");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, maxPrice]);
    setMinRating(0);
  };

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (p.price > priceRange[1]) return false;
      if (minRating && p.rating < minRating) return false;
      return true;
    });

    switch (sort) {
      case "priceLow":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = [...result].reverse();
        break;
      default:
        result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [selectedCategory, priceRange, minRating, sort]);

  const filterProps = {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    maxPrice,
    onClear: clearFilters,
  };

  return (
    <Layout>
      <section className="container py-12 md:py-20">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold">{t.store.title}</h1>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <aside className="w-60 shrink-0">
              <StoreFilters {...filterProps} />
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <p className="text-sm text-muted-foreground">
                {t.store.showing}{" "}
                <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                {t.store.products}
              </p>

              <div className="flex items-center gap-2">
                {isMobile && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDrawerOpen(true)}
                    className="gap-1.5"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    {t.store.filters}
                  </Button>
                )}
                <StoreSorting value={sort} onChange={setSort} />
              </div>
            </div>

            {/* Product Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-lg font-serif font-semibold">{t.store.noProducts}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t.store.noProductsDesc}</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  {t.store.clearFilters}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="left" className="w-[300px] overflow-y-auto">
          <SheetTitle className="sr-only">{t.store.filters}</SheetTitle>
          <StoreFilters {...filterProps} onClose={() => setDrawerOpen(false)} />
        </SheetContent>
      </Sheet>
    </Layout>
  );
};

export default Store;
