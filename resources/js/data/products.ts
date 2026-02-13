import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  description: string;
  descriptionAr: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Golden Hour Soy Candle",
    nameAr: "شمعة الساعة الذهبية",
    price: 48,
    originalPrice: 60,
    image: product1,
    category: "candles",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    description: "Hand-poured soy candle with notes of warm amber, sandalwood, and vanilla. Burns for up to 60 hours.",
    descriptionAr: "شمعة صويا مصبوبة يدوياً بنفحات العنبر الدافئ وخشب الصندل والفانيليا. تحترق لمدة تصل إلى 60 ساعة.",
  },
  {
    id: "2",
    name: "Noir Reed Diffuser",
    nameAr: "ناشر القصب نوار",
    price: 65,
    image: product2,
    category: "fragrances",
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    description: "Elegant reed diffuser with a rich blend of oud, black pepper, and cedarwood. Fills any room with luxury.",
    descriptionAr: "ناشر قصب أنيق بمزيج غني من العود والفلفل الأسود وخشب الأرز.",
  },
  {
    id: "3",
    name: "Luna Ceramic Vase",
    nameAr: "مزهرية لونا السيراميك",
    price: 85,
    image: product3,
    category: "decor",
    rating: 4.7,
    reviewCount: 56,
    inStock: true,
    description: "Handcrafted ceramic vase with an organic, flowing shape. Perfect as a statement piece.",
    descriptionAr: "مزهرية سيراميك مصنوعة يدوياً بشكل عضوي انسيابي.",
  },
  {
    id: "4",
    name: "Essential Oil Collection",
    nameAr: "مجموعة الزيوت العطرية",
    price: 120,
    originalPrice: 150,
    image: product4,
    category: "fragrances",
    rating: 4.6,
    reviewCount: 203,
    inStock: true,
    description: "A curated set of five premium essential oils: lavender, eucalyptus, peppermint, tea tree, and lemon.",
    descriptionAr: "مجموعة منسقة من خمسة زيوت عطرية فاخرة.",
  },
  {
    id: "5",
    name: "Serenity Pillar Candle Set",
    nameAr: "مجموعة شموع سيرينيتي",
    price: 72,
    image: product5,
    category: "candles",
    rating: 4.8,
    reviewCount: 67,
    inStock: true,
    description: "Set of three pillar candles in graduated sizes. Made with natural beeswax and cotton wicks.",
    descriptionAr: "مجموعة من ثلاث شموع عمودية بأحجام متدرجة.",
  },
  {
    id: "6",
    name: "Velvet Room Spray",
    nameAr: "بخاخ الغرفة المخملي",
    price: 38,
    image: product6,
    category: "fragrances",
    rating: 4.5,
    reviewCount: 145,
    inStock: false,
    description: "Instant luxury in a bottle. Notes of rose, jasmine, and white musk create an unforgettable atmosphere.",
    descriptionAr: "فخامة فورية في زجاجة. نفحات الورد والياسمين والمسك الأبيض.",
  },
  {
    id: "7",
    name: "Artisan Wax Melts",
    nameAr: "شمع ذائب حرفي",
    price: 28,
    image: product7,
    category: "candles",
    rating: 4.4,
    reviewCount: 312,
    inStock: true,
    description: "Premium wax melts in four seasonal scents. Long-lasting fragrance for your wax warmer.",
    descriptionAr: "شمع ذائب فاخر بأربع روائح موسمية.",
  },
  {
    id: "8",
    name: "Zen Incense Set",
    nameAr: "مجموعة بخور زن",
    price: 42,
    image: product8,
    category: "decor",
    rating: 4.7,
    reviewCount: 98,
    inStock: true,
    description: "Handmade ceramic incense holder with a selection of premium Japanese incense sticks.",
    descriptionAr: "حامل بخور سيراميك مصنوع يدوياً مع مجموعة من أعواد البخور اليابانية الفاخرة.",
  },
];
