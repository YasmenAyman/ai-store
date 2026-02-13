import { ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CursorEffect } from "../CursorEffect";
import { usePage, Head } from "@inertiajs/react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCart } from "@/contexts/CartContext";

export function Layout({ children }: { children: ReactNode }) {
  const { props } = usePage();
  const { setFavorites } = useFavorites();
  const { setItems: setCartItems } = useCart();

  const wishlistIds = (props.wishlistIds as string[]) || [];
  const serverCart = (props.cart as any) || { items: [], total: 0 };
  const auth = props.auth as any;
  const settings = props.settings as any;
  const userId = auth?.user?.id || null;

  // Session handling: Sync data when user changes
  useEffect(() => {
    const lastUserId = localStorage.getItem('last_user_id');

    // Check if user has changed (login, logout, or account switch)
    if (String(userId) !== lastUserId) {
      console.log("Session changed. Syncing data...", { from: lastUserId, to: userId });

      if (!userId) {
        // User logged out: Clear localStorage only (backend session persists)
        localStorage.removeItem('cart');
        localStorage.removeItem('favorites');
        // Don't clear cart state - it will be restored from backend on next login
        setFavorites([]);
      } else {
        // User logged in or switched: Load from server props
        if (serverCart.items) {
          setCartItems(serverCart.items);
        }
        if (wishlistIds) {
          setFavorites(wishlistIds);
        }
      }

      // Update last known user ID
      localStorage.setItem('last_user_id', String(userId || 'guest'));
    }
  }, [userId, serverCart.items, wishlistIds, setCartItems, setFavorites]);

  // Regular sync for favorites (when data updates without user change)
  useEffect(() => {
    if (userId && wishlistIds.length > 0) {
      setFavorites(wishlistIds);
    }
  }, [wishlistIds, userId, setFavorites]);

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        {settings?.favicon && <link rel="icon" type="image/x-icon" href={settings.favicon} />}
      </Head>
      <Navbar />
      <CursorEffect />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
