export interface Testimonial {
  id: string;
  name: string;
  nameAr: string;
  quote: string;
  quoteAr: string;
  rating: number;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    nameAr: "سارة ميتشل",
    quote: "The Golden Hour candle has become a staple in my evening routine. The quality is unmatched.",
    quoteAr: "أصبحت شمعة الساعة الذهبية جزءاً أساسياً من روتيني المسائي. الجودة لا مثيل لها.",
    rating: 5,
    initials: "SM",
  },
  {
    id: "2",
    name: "James Carter",
    nameAr: "جيمس كارتر",
    quote: "Lumière products transformed my living space. Every piece feels intentional and luxurious.",
    quoteAr: "منتجات لوميير حولت مساحة معيشتي. كل قطعة تبدو مقصودة وفاخرة.",
    rating: 5,
    initials: "JC",
  },
  {
    id: "3",
    name: "Amira Hassan",
    nameAr: "أميرة حسن",
    quote: "The gift set I ordered was beautifully packaged. It made the perfect anniversary present.",
    quoteAr: "مجموعة الهدايا التي طلبتها كانت مغلفة بشكل جميل. كانت هدية ذكرى زواج مثالية.",
    rating: 5,
    initials: "AH",
  },
  {
    id: "4",
    name: "David Park",
    nameAr: "ديفيد بارك",
    quote: "I've tried many luxury candle brands, but Lumière stands out for its clean ingredients and long burn time.",
    quoteAr: "جربت العديد من ماركات الشموع الفاخرة، لكن لوميير تتميز بمكوناتها النظيفة ووقت احتراقها الطويل.",
    rating: 4,
    initials: "DP",
  },
];
