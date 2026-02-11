import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { t } = useLanguage();
  const { items, total } = useCart();

  const shipping = items.length > 0 ? 10 : 0;
  const grandTotal = total + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-serif font-bold">{t.checkout.title}</h1>
          <p className="mt-4 text-muted-foreground">{t.cart.empty}</p>
          <Button asChild className="mt-6">
            <Link to="/store">{t.cart.continueShopping}</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-center mb-10">
          {t.checkout.title}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping */}
            <section>
              <h2 className="font-serif text-lg font-bold mb-4">{t.checkout.shipping}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t.checkout.firstName}</Label>
                  <Input id="firstName" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t.checkout.lastName}</Label>
                  <Input id="lastName" />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="email">{t.checkout.email}</Label>
                  <Input id="email" type="email" />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="address">{t.checkout.address}</Label>
                  <Input id="address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">{t.checkout.city}</Label>
                  <Input id="city" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">{t.checkout.zip}</Label>
                  <Input id="zip" />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="country">{t.checkout.country}</Label>
                  <Input id="country" />
                </div>
              </div>
            </section>

            <Separator />

            {/* Payment */}
            <section>
              <h2 className="font-serif text-lg font-bold mb-4">{t.checkout.payment}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="cardNumber">{t.checkout.cardNumber}</Label>
                  <Input id="cardNumber" placeholder="•••• •••• •••• ••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry">{t.checkout.expiry}</Label>
                  <Input id="expiry" placeholder="MM / YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">{t.checkout.cvv}</Label>
                  <Input id="cvv" placeholder="•••" />
                </div>
              </div>
            </section>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-border bg-card p-6 sticky top-28">
              <h2 className="font-serif text-lg font-bold mb-4">{t.checkout.summary}</h2>

              {/* Items */}
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

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

              <Button className="w-full mt-6" size="lg">
                {t.checkout.placeOrder}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
