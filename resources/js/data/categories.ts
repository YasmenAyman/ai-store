import categoryCandles from "@/assets/category-candles.jpg";
import categoryFragrances from "@/assets/category-fragrances.jpg";
import categoryDecor from "@/assets/category-decor.jpg";
import categoryGifts from "@/assets/category-gifts.jpg";

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  image: string;
  slug: string;
}

export const categories: Category[] = [
  { id: "1", name: "Candles", nameAr: "شموع", image: categoryCandles, slug: "candles" },
  { id: "2", name: "Fragrances", nameAr: "عطور", image: categoryFragrances, slug: "fragrances" },
  { id: "3", name: "Home Décor", nameAr: "ديكور منزلي", image: categoryDecor, slug: "decor" },
  { id: "4", name: "Gift Sets", nameAr: "أطقم هدايا", image: categoryGifts, slug: "gifts" },
];
