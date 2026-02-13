import { useState } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import { Layout } from "@/Components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductCard } from "@/Components/shared/ProductCard";
import { StoreFilters } from "@/Components/store/StoreFilters";
import { StoreSorting, type SortOption } from "@/Components/store/StoreSorting";
import { Button } from "@/Components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/Components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { route } from "ziggy-js";

// maxPrice should be dynamic or fixed high enough
const DEFAULT_MAX_PRICE = 1000;

const Store = ({ products: initialProducts, categories: initialCategories, filters: initialFilters }: any) => {
  const products = initialProducts || { data: [], total: 0, links: [] };
  const categories = initialCategories || [];
  const filters = initialFilters || {};

  console.log("Store Render Props:", { products, categories, filters });

  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const [selectedCategory, setSelectedCategory] = useState(() => {
    try {
      return filters?.category || "";
    } catch (e) {
      console.error("Error initializing selectedCategory:", e);
      return "";
    }
  });

  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    try {
      return [
        filters?.min_price || 0,
        filters?.max_price || DEFAULT_MAX_PRICE
      ];
    } catch (e) {
      console.error("Error initializing priceRange:", e);
      return [0, DEFAULT_MAX_PRICE];
    }
  });

  const [minRating, setMinRating] = useState(() => {
    try {
      return filters?.rating || 0;
    } catch (e) {
      console.error("Error initializing minRating:", e);
      return 0;
    }
  });

  const [sortBy, setSortBy] = useState<SortOption>(() => {
    try {
      return filters?.sort || "newest";
    } catch (e) {
      console.error("Error initializing sortBy:", e);
      return "newest";
    }
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const applyFilters = (newFilters: any) => {
    router.get(route('store.index'), {
      ...filters,
      ...newFilters
    }, {
      preserveState: true,
      preserveScroll: true,
      replace: true
    });
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    applyFilters({ category: val });
  };

  const handlePriceChange = (val: [number, number]) => {
    setPriceRange(val);
    applyFilters({ min_price: val[0], max_price: val[1] });
  };

  const handleRatingChange = (val: number) => {
    setMinRating(val);
    applyFilters({ rating: val });
  };

  const handleSortChange = (val: SortOption) => {
    console.log("handleSortChange:", val);
    setSortBy(val);
    applyFilters({ sort: val });
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, DEFAULT_MAX_PRICE]);
    setMinRating(0);
    setSortBy("newest");
    router.get(route('store.index'), {}, {
      preserveState: true,
      preserveScroll: true
    });
  };

  const productData = products.data || [];

  const filterProps = {
    selectedCategory,
    setSelectedCategory: handleCategoryChange,
    priceRange,
    setPriceRange: setPriceRange, // Set raw state
    onPriceCommit: (val: [number, number]) => applyFilters({ min_price: val[0], max_price: val[1] }),
    minRating,
    setMinRating: handleRatingChange,
    maxPrice: DEFAULT_MAX_PRICE,
    categories: categories,
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
                <span className="font-semibold text-foreground">{products.total}</span>{" "}
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
                <StoreSorting value={sortBy} onChange={handleSortChange} />
              </div>
            </div>

            {/* Product Grid */}
            {productData.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {productData.map((product) => (
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
            {/* Pagination */}
            {products.links && products.links.length > 3 && (
              <div className="mt-12 flex justify-center gap-2">
                {products.links.map((link: any, i: number) => (
                  <Link
                    key={i}
                    href={link.url || "#"}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${link.active
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-background text-foreground border-border hover:bg-muted"
                      } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
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
