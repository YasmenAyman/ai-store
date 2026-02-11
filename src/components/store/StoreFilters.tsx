import { useLanguage } from "@/contexts/LanguageContext";
import { categories } from "@/data/categories";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Star, X } from "lucide-react";

interface StoreFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (r: number) => void;
  maxPrice: number;
  onClear: () => void;
  onClose?: () => void;
}

export function StoreFilters({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  maxPrice,
  onClear,
  onClose,
}: StoreFiltersProps) {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Header (mobile only) */}
      {onClose && (
        <div className="flex items-center justify-between md:hidden">
          <h3 className="font-serif text-lg font-bold">{t.store.filters}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Category */}
      <div>
        <h4 className="font-serif text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
          {t.store.category}
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory("")}
            className={`block w-full text-start px-3 py-2 rounded-md text-sm transition-colors ${
              selectedCategory === ""
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {t.store.allCategories}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`block w-full text-start px-3 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === cat.slug
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {language === "ar" ? cat.nameAr : cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-serif text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
          {t.store.priceRange}
        </h4>
        <Slider
          min={0}
          max={maxPrice}
          step={1}
          value={[priceRange[1]]}
          onValueChange={(v) => setPriceRange([0, v[0]])}
          className="mb-3"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>$0</span>
          <span className="font-medium text-foreground">${priceRange[1]}</span>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-serif text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
          {t.store.rating}
        </h4>
        <div className="space-y-1">
          {[4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(minRating === r ? 0 : r)}
              className={`flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                minRating === r
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < r
                        ? minRating === r
                          ? "fill-primary-foreground text-primary-foreground"
                          : "fill-accent text-accent"
                        : minRating === r
                          ? "text-primary-foreground/40"
                          : "text-border"
                    }`}
                  />
                ))}
              </span>
              <span className="text-xs">& {t.store.starsUp}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      <Button variant="outline" className="w-full" onClick={onClear}>
        {t.store.clearFilters}
      </Button>
    </div>
  );
}
