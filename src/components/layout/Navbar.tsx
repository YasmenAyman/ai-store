import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const navLinks = [
  { key: "home" as const, path: "/" },
  { key: "store" as const, path: "/store" },
  { key: "about" as const, path: "/about" },
  { key: "contact" as const, path: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();
  const { itemCount } = useCart();
  const { count: favCount } = useFavorites();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-serif text-2xl font-bold tracking-wide">
          Lumière
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                location.pathname === link.path ? "text-accent" : "text-foreground/80"
              }`}
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>

        {/* Icon group */}
        <div className="flex items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />

          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
            <Link to="/favorites" aria-label={t.nav.favorites}>
              <Heart className="h-5 w-5" />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {favCount}
                </span>
              )}
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/cart" aria-label={t.nav.cart}>
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {itemCount}
                </span>
              )}
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
            <Link to="/login" aria-label={t.nav.profile}>
              <User className="h-5 w-5" />
            </Link>
          </Button>

          {/* Mobile menu trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border/50 bg-background p-4 animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium tracking-wide ${
                  location.pathname === link.path ? "text-accent" : "text-foreground/80"
                }`}
              >
                {t.nav[link.key]}
              </Link>
            ))}
            <div className="flex gap-4 pt-2 border-t border-border/50">
              <Link to="/favorites" onClick={() => setMobileOpen(false)} className="text-sm font-medium">
                {t.nav.favorites}
              </Link>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm font-medium">
                {t.nav.login}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
