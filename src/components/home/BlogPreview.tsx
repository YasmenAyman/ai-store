import { useLanguage } from "@/contexts/LanguageContext";
import { blogPosts } from "@/data/blogs";
import { BlogCard } from "@/components/shared/BlogCard";

export function BlogPreview() {
  const { t } = useLanguage();

  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold">{t.blog.title}</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
