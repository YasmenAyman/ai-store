import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Heart, ShoppingBag, User, Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { LanguageToggle } from "@/Components/shared/LanguageToggle";
import { ThemeToggle } from "@/Components/shared/ThemeToggle";

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
  const { url: pathname, props } = usePage();
  const { auth, pages } = props as any;
  const pagesStatus = (pages as Record<string, boolean>) || {};

  const filteredNavLinks = navLinks.filter(link => {
    // If the link key exists in pagesStatus, check if it's active
    if (Object.prototype.hasOwnProperty.call(pagesStatus, link.key)) {
      return pagesStatus[link.key];
    }
    // Default to true for home and store
    return true;
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-bold tracking-wide">
          {(props.settings as any)?.site_logo ? (
            <img
              src={(props.settings as any).site_logo}
              alt={(props.settings as any).site_name || 'Lumière'}
              className="h-10 w-auto object-contain"
            />
          ) : (
            'Lumière'
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {filteredNavLinks.map((link) => (
            <Link
              key={link.key}
              href={link.path}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${pathname === link.path ? "text-accent" : "text-foreground/80"
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

          <Button variant="ghost" size="icon" asChild className="relative hidden sm:inline-flex">
            <Link href="/favorites" aria-label={t.nav.favorites}>
              <Heart className="h-5 w-5" />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {favCount}
                </span>
              )}
            </Link>
          </Button>

          {pathname.startsWith('/admin') ? (
            <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
              <Link href="/" aria-label="Go to Store">
                <ShoppingBag className="h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart" aria-label={t.nav.cart}>
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                    {itemCount}
                  </span>
                )}
              </Link>
            </Button>
          )}

          {/* User / Dashboard Link */}
          {auth?.user ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full bg-muted">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{auth.user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{auth.user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {auth.user.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link href={route('admin.dashboard')} className="cursor-pointer w-full">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer w-full">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href={route('logout')}
                      method="post"
                      as="button"
                      className="w-full text-left cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
              <Link href="/login" aria-label={t.nav.profile}>
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}

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
            {filteredNavLinks.map((link) => (
              <Link
                key={link.key}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium tracking-wide ${pathname === link.path ? "text-accent" : "text-foreground/80"
                  }`}
              >
                {t.nav[link.key]}
              </Link>
            ))}
            <div className="flex gap-4 pt-2 border-t border-border/50">
              <Link href="/favorites" onClick={() => setMobileOpen(false)} className="text-sm font-medium">
                {t.nav.favorites}
              </Link>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="text-sm font-medium">
                {t.nav.login}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
