import { useLanguage } from "@/contexts/LanguageContext";
import { blogPosts } from "@/data/blogs";
import { BlogCard } from "@/Components/shared/BlogCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";

export function BlogPreview({ posts }: { posts?: any[] }) {
  const { t } = useLanguage();
  const displayPosts = posts && posts.length > 0 ? posts : blogPosts;

  return (
    <section className="container py-20 px-12 md:px-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold">{t.blog.title}</h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {displayPosts.map((post) => (
            <CarouselItem key={post.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
              <BlogCard post={post} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  );
}
