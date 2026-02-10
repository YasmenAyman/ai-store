import { useLanguage } from "@/contexts/LanguageContext";
import type { BlogPost } from "@/data/blogs";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const { language, t } = useLanguage();
  const title = language === "ar" ? post.titleAr : post.title;
  const excerpt = language === "ar" ? post.excerptAr : post.excerpt;

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border/50 bg-card transition-shadow hover:shadow-lg">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={post.image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-medium text-muted-foreground">{post.date}</span>
        <h3 className="font-serif text-lg font-semibold leading-snug">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{excerpt}</p>
        <span className="mt-auto pt-2 text-sm font-medium text-accent hover:underline cursor-pointer">
          {t.blog.readMore} →
        </span>
      </div>
    </article>
  );
}
