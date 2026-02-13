import { useLanguage } from "@/contexts/LanguageContext";
import { TestimonialCard } from "@/Components/shared/TestimonialCard";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface Review {
  id: number;
  rating: number;
  comment: string;
  user_name: string;
  product_name: string;
  initials: string;
}

interface TestimonialsProps {
  reviews: Review[];
}

export function Testimonials({ reviews }: TestimonialsProps) {
  const { t, language } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      direction: language === 'ar' ? 'rtl' : 'ltr',
      slidesToScroll: 1,
    }
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Update carousel direction when language changes
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit({ direction: language === 'ar' ? 'rtl' : 'ltr' });
    }
  }, [language, emblaApi]);

  if (!reviews || reviews.length === 0) {
    return null; // Hide section if no reviews
  }

  return (
    <section className="bg-card py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">{t.testimonials.title}</h2>
        </div>

        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(25%-18px)]">
                  <TestimonialCard testimonial={review} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {reviews.length > 4 && (
            <>
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent hover:text-white transition-colors z-10"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent hover:text-white transition-colors z-10"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
