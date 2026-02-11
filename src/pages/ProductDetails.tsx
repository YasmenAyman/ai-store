import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { products } from "@/data/products";
import { reviews } from "@/data/reviews";
import { ProductCard } from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Minus, Plus, Star, ArrowLeft, ArrowRight } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  const productReviews = useMemo(
    () => reviews.filter((r) => r.productId === id),
    [id]
  );

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-serif font-bold">Product not found</h1>
          <Link to="/store" className="mt-4 inline-block text-accent hover:underline">
            {t.product.backToStore}
          </Link>
        </div>
      </Layout>
    );
  }

  const name = language === "ar" ? product.nameAr : product.name;
  const description = language === "ar" ? product.descriptionAr : product.description;
  const liked = isFavorite(product.id);
  const BackArrow = language === "ar" ? ArrowRight : ArrowLeft;

  return (
    <Layout>
      <div className="container py-8 md:py-16">
        {/* Breadcrumb */}
        <Link
          to="/store"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <BackArrow className="h-4 w-4" />
          {t.product.backToStore}
        </Link>

        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-6">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={name}
              className="h-full w-full object-cover"
            />
            {product.originalPrice && (
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm px-3 py-1">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </Badge>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold leading-tight">
                {name}
              </h1>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} {t.product.reviews.toLowerCase()})
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Stock */}
            <Badge
              variant={product.inStock ? "default" : "secondary"}
              className={`w-fit ${product.inStock ? "bg-green-600/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800" : ""}`}
            >
              {product.inStock ? t.product.inStock : t.product.outOfStock}
            </Badge>

            {/* Description excerpt */}
            <p className="text-muted-foreground leading-relaxed">{description}</p>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2">
              <div className="flex items-center border border-border rounded-md">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2.5 hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-5 py-2.5 min-w-[3rem] text-center font-medium border-x border-border">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2.5 hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                size="lg"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!product.inStock}
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addItem({ id: product.id, name, price: product.price, image: product.image });
                  }
                }}
              >
                {t.product.addToCart}
              </Button>

              <button
                onClick={() => toggleFavorite(product.id)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border hover:bg-muted transition-colors"
                aria-label="Toggle favorite"
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${liked ? "fill-accent text-accent" : "text-foreground/60"}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mt-16">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 h-auto">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 pb-3 font-serif"
            >
              {t.product.description}
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 pb-3 font-serif"
            >
              {t.product.reviews} ({productReviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="pt-6">
            <p className="max-w-2xl leading-relaxed text-muted-foreground">
              {description}
            </p>
          </TabsContent>

          <TabsContent value="reviews" className="pt-6">
            {productReviews.length > 0 ? (
              <div className="space-y-6 max-w-2xl">
                {productReviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">{review.author}</span>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < review.rating
                              ? "fill-accent text-accent"
                              : "text-border"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {language === "ar" ? review.commentAr : review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">{t.product.noReviews}</p>
            )}
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-serif font-bold mb-8">{t.product.related}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
