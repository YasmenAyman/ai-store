import { Layout } from "@/Components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { Link } from "@inertiajs/react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { t } = useLanguage();
  const { items, updateQuantity, removeItem, total } = useCart();

  const shipping = items.length > 0 ? 10 : 0;
  const grandTotal = total + shipping;

  return (
    <Layout>
      <div className="container py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-center mb-10">
          {t.cart.title}
        </h1>

        {items.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-0">
              {items.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-4 py-6">
                    {/* Image */}
                    <Link href={`/product/${item.id}`} className="shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 md:h-28 md:w-28 rounded-md object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <Link
                          href={`/product/${item.id}`}
                          className="font-serif font-semibold text-sm md:text-base hover:text-accent transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm font-medium text-muted-foreground">
                          ${item.price}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center border border-border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1.5 hover:bg-muted transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-3 py-1.5 text-sm font-medium border-x border-border min-w-[2.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1.5 hover:bg-muted transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-sm">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            aria-label={t.cart.remove}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < items.length - 1 && <Separator />}
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border border-border bg-card p-6 sticky top-28">
                <h2 className="font-serif text-lg font-bold mb-4">{t.checkout.summary}</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.cart.subtotal}</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.cart.shipping}</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base">
                    <span className="font-semibold">{t.cart.total}</span>
                    <span className="font-bold">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button asChild className="w-full mt-6" size="lg">
                  <Link href="/checkout">{t.cart.checkout}</Link>
                </Button>

                <Button asChild variant="ghost" className="w-full mt-2" size="sm">
                  <Link href="/store">{t.cart.continueShopping}</Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-serif font-semibold">{t.cart.empty}</h2>
            <Button asChild className="mt-6">
              <Link href="/store">{t.cart.continueShopping}</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
