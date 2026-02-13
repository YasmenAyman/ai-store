export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  commentAr: string;
}

export const reviews: Review[] = [
  { id: "r1", productId: "1", author: "Sarah M.", rating: 5, date: "2025-12-10", comment: "Absolutely beautiful candle. The scent fills the whole room without being overwhelming. Will definitely repurchase!", commentAr: "شمعة رائعة حقاً. الرائحة تملأ الغرفة بأكملها دون أن تكون مفرطة. سأشتريها مرة أخرى بالتأكيد!" },
  { id: "r2", productId: "1", author: "James K.", rating: 4, date: "2025-11-28", comment: "Great quality and long burn time. Packaging was luxurious too.", commentAr: "جودة رائعة ووقت احتراق طويل. التغليف كان فاخراً أيضاً." },
  { id: "r3", productId: "1", author: "Amina R.", rating: 5, date: "2025-11-15", comment: "Perfect gift! My friend loved it. The amber and vanilla notes are divine.", commentAr: "هدية مثالية! صديقتي أحبتها. نفحات العنبر والفانيليا إلهية." },
  { id: "r4", productId: "2", author: "David L.", rating: 5, date: "2025-12-05", comment: "The oud scent is incredibly rich and authentic. Lasts for weeks.", commentAr: "رائحة العود غنية وأصيلة بشكل لا يصدق. تدوم لأسابيع." },
  { id: "r5", productId: "2", author: "Fatima A.", rating: 5, date: "2025-11-20", comment: "Elegant design and the fragrance is unmatched. A true luxury experience.", commentAr: "تصميم أنيق والعطر لا مثيل له. تجربة فاخرة حقيقية." },
  { id: "r6", productId: "3", author: "Emily T.", rating: 4, date: "2025-12-01", comment: "Stunning piece. The organic shape adds such character to my shelf.", commentAr: "قطعة مذهلة. الشكل العضوي يضيف الكثير من الشخصية لرفّي." },
  { id: "r7", productId: "4", author: "Omar H.", rating: 5, date: "2025-11-18", comment: "Amazing value for a set of five premium oils. Each scent is pure and potent.", commentAr: "قيمة مذهلة لمجموعة من خمسة زيوت فاخرة. كل رائحة نقية وقوية." },
  { id: "r8", productId: "5", author: "Lisa N.", rating: 4, date: "2025-12-08", comment: "Beautiful candle set. The beeswax quality is evident. Burns cleanly.", commentAr: "مجموعة شموع جميلة. جودة شمع العسل واضحة. تحترق بنظافة." },
  { id: "r9", productId: "7", author: "Rachel P.", rating: 5, date: "2025-11-25", comment: "These wax melts are incredible! The seasonal scents are so cozy.", commentAr: "هذا الشمع الذائب رائع! الروائح الموسمية مريحة جداً." },
  { id: "r10", productId: "8", author: "Yusuf B.", rating: 5, date: "2025-12-12", comment: "The ceramic holder is a work of art. Japanese incense is top quality.", commentAr: "حامل السيراميك هو عمل فني. البخور الياباني بأعلى جودة." },
];
