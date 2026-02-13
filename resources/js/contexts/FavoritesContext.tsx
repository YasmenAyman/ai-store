import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string | number) => void;
  isFavorite: (id: string | number) => boolean;
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children, auth }: { children: ReactNode, auth?: any }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            // Deduplicate and ensure all IDs are strings
            return Array.from(new Set(parsed.map((id) => String(id))));
          }
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const toggleFavorite = (id: string | number) => {
    const idStr = String(id);
    setFavorites((prev) =>
      prev.includes(idStr) ? prev.filter((f) => f !== idStr) : [...prev, idStr]
    );

    if (auth?.user) {
      router.post(route('wishlist.toggle', idStr), {}, {
        preserveState: true,
        preserveScroll: true,
      });
    }
  };

  const isFavorite = (id: string | number) => favorites.includes(String(id));

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, setFavorites, count: favorites.length }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
}
