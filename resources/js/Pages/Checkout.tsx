import { Layout } from "@/Components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { Link, useForm, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

const Checkout = () => {
  const { props } = usePage<any>();
  const { auth } = props;
  const { t } = useLanguage();
  const { items, total, clearCart } = useCart();

  const shipping = items.length > 0 ? 10 : 0;
  const grandTotal = total + shipping;

  const { data, setData, post, processing, errors, transform } = useForm({
    first_name: '',
    last_name: '',
    email: auth.user.email || '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    payment_method: 'cod',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    transform((data) => ({
      ...data,
      shipping_address: `${data.first_name} ${data.last_name}\n${data.phone}\n${data.address}\n${data.city}, ${data.zip}\n${data.country}`,
    }));

    post(route('checkout.store'), {
      onSuccess: () => {
        clearCart();
      },
    });
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-serif font-bold">{t.checkout.title}</h1>
          <p className="mt-4 text-muted-foreground">{t.cart.empty}</p>
          <Button asChild className="mt-6">
            <Link href="/store">{t.cart.continueShopping}</Link>
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

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping */}
              <section>
                <h2 className="font-serif text-lg font-bold mb-4">{t.checkout.shipping}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t.checkout.firstName}</Label>
                    <Input
                      id="firstName"
                      value={data.first_name}
                      onChange={e => setData('first_name', e.target.value)}
                      required
                    />
                    {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t.checkout.lastName}</Label>
                    <Input
                      id="lastName"
                      value={data.last_name}
                      onChange={e => setData('last_name', e.target.value)}
                      required
                    />
                    {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="email">{t.checkout.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={e => setData('email', e.target.value)}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="phone">{t.checkout.phone}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={data.phone}
                      onChange={e => setData('phone', e.target.value)}
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="address">{t.checkout.address}</Label>
                    <Input
                      id="address"
                      value={data.address}
                      onChange={e => setData('address', e.target.value)}
                      required
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">{t.checkout.city}</Label>
                    <Input
                      id="city"
                      value={data.city}
                      onChange={e => setData('city', e.target.value)}
                      required
                    />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">{t.checkout.zip}</Label>
                    <Input
                      id="zip"
                      value={data.zip}
                      onChange={e => setData('zip', e.target.value)}
                      required
                    />
                    {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="country">{t.checkout.country}</Label>
                    <Input
                      id="country"
                      value={data.country}
                      onChange={e => setData('country', e.target.value)}
                      required
                    />
                    {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                  </div>
                </div>
              </section>

              <Separator />

              {/* Payment */}
              <section>
                <h2 className="font-serif text-lg font-bold mb-4">{t.checkout.payment}</h2>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="cod" name="payment_method" value="cod" checked readOnly className="h-4 w-4 border-gray-300 text-primary focus:ring-primary" />
                  <Label htmlFor="cod" className="font-medium">{t.checkout.cod}</Label>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {t.checkout.cod}: Pay when you receive your order.
                </p>
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

                <Button className="w-full mt-6" size="lg" disabled={processing} type="submit">
                  {processing ? 'Processing...' : t.checkout.placeOrder}
                </Button>
                {Object.keys(errors).length > 0 && (
                  <div className="text-red-500 text-sm mt-2">
                    Please check the form for errors.
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
