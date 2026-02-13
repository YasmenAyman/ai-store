import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

export interface BlogPost {
  id: string | number;
  title: string;
  title_ar?: string;
  titleAr?: string;
  excerpt?: string;
  excerpt_ar?: string;
  excerptAr?: string;
  content?: string;
  content_ar?: string;
  image?: string;
  featured_image?: string;
  date?: string;
  published_at?: string;
  is_published?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Candle Making",
    titleAr: "فن صناعة الشموع",
    excerpt: "Discover the centuries-old craft behind our hand-poured luxury candles and the artisans who make them.",
    excerptAr: "اكتشف الحرفة العريقة وراء شموعنا الفاخرة المصبوبة يدوياً والحرفيين الذين يصنعونها.",
    image: blog1,
    date: "Jan 15, 2026",
  },
  {
    id: "2",
    title: "Styling Your Home with Intention",
    titleAr: "تصميم منزلك بعناية",
    excerpt: "Learn how to create meaningful spaces that reflect your personality using our curated décor pieces.",
    excerptAr: "تعلم كيفية إنشاء مساحات ذات معنى تعكس شخصيتك باستخدام قطع الديكور المنسقة لدينا.",
    image: blog2,
    date: "Jan 28, 2026",
  },
  {
    id: "3",
    title: "The Power of Scent in Self-Care",
    titleAr: "قوة العطر في العناية الذاتية",
    excerpt: "How incorporating luxury fragrances into your daily routine can transform your wellbeing.",
    excerptAr: "كيف يمكن لإدراج العطور الفاخرة في روتينك اليومي أن يغير رفاهيتك.",
    image: blog3,
    date: "Feb 5, 2026",
  },
];
