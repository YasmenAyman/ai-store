import { Heart } from "lucide-react";
import { Star } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { language, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addItem } = useCart();

  if (!product) return null;

  // Handle both frontend and database product structures
  const name = language === "ar"
    ? ((product as any).name_ar || (product as any).nameAr || product.name)
    : product.name;

  const description = language === "ar"
    ? ((product as any).description_ar || (product as any).descriptionAr)
    : (product as any).description;

  const image = (product as any).images?.[0]?.image_path || (product as any).image || product.image;
  const originalPrice = (product as any).compare_at_price || (product as any).originalPrice;
  const inStock = (product as any).stock !== undefined ? (product as any).stock > 0 : (product as any).inStock;
  const rating = (product as any).reviews_avg_rating || product.rating || 0;
  const reviewCount = (product as any).reviews_count || (product as any).review_count || (product as any).reviewCount || 0;

  const liked = isFavorite(product.id);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border/50 bg-card transition-shadow hover:shadow-lg">
      {/* Image */}
      <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {originalPrice && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            -{Math.round(((originalPrice - product.price) / originalPrice) * 100)}%
          </Badge>
        )}
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <Badge variant="secondary">{t.product.outOfStock}</Badge>
          </div>
        )}
      </Link>

      {/* Wishlist button */}
      <button
        onClick={() => toggleFavorite(product.id)}
        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
        aria-label="Toggle favorite"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${liked ? "fill-accent text-accent" : "text-foreground/60"}`}
        />
      </button>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/product/${product.id}`} className="font-serif text-sm font-semibold leading-snug hover:text-accent transition-colors">
          {name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-accent text-accent" : "text-border"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ms-1">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center gap-2 pt-1">
          <span className="font-semibold text-foreground">${product.price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>
          )}
        </div>

        <Button
          size="sm"
          className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={!inStock}
          onClick={() => addItem({ id: product.id, name, price: product.price, image })}
        >
          {t.product.addToCart}
        </Button>
      </div>
    </div>
  );
}
