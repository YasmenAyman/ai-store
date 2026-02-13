import { Layout } from "@/Components/layout/Layout";
import { Hero } from "@/Components/home/Hero";
import { Categories } from "@/Components/home/Categories";
import { Featured } from "@/Components/home/Featured";
import { PromoBanner } from "@/Components/home/PromoBanner";
import { CTAHome } from "@/Components/home/CTAHome";
import { BlogPreview } from "@/Components/home/BlogPreview";
import { Testimonials } from "@/Components/home/Testimonials";

import { usePage, Head } from "@inertiajs/react";

const Index = ({ hero, categories, featuredProducts, bestSellers, recentPosts, testimonials }: {
  hero?: any,
  categories: any[],
  featuredProducts?: any[],
  bestSellers?: any[],
  recentPosts?: any[],
  testimonials?: any[]
}) => {
  const { props } = usePage();
  const settings = props.settings as any;
  const siteName = settings?.site_name || "Lumière";

  return (
    <Layout>
      <Head title={siteName} />
      <Hero data={hero} />
      <Categories data={categories} />
      <Featured data={featuredProducts} bestSellers={bestSellers} />
      <PromoBanner />
      <CTAHome />
      <BlogPreview posts={recentPosts} />
      <Testimonials reviews={testimonials || []} />
    </Layout>
  );
};

export default Index;
