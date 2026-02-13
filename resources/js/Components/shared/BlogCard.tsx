import { useLanguage } from "@/contexts/LanguageContext";
import type { BlogPost } from "@/data/blogs";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const { language, t } = useLanguage();
  const title = language === "ar" ? (post.title_ar || post.titleAr || post.title) : (post.title || post.titleAr);
  const excerpt = language === "ar" ? (post.excerpt_ar || post.excerptAr || post.excerpt) : (post.excerpt || post.excerptAr);
  const image = post.featured_image || post.image;
  const date = post.published_at ? new Date(post.published_at).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : (post.date || '');

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border/50 bg-card transition-shadow hover:shadow-lg">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-medium text-muted-foreground">{date}</span>
        <h3 className="font-serif text-lg font-semibold leading-snug line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{excerpt}</p>
        <span className="mt-auto pt-2 text-sm font-medium text-accent hover:underline cursor-pointer">
          {t.blog.readMore} →
        </span>
      </div>
    </article>
  );
}
