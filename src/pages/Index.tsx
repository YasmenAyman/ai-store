import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { Featured } from "@/components/home/Featured";
import { PromoBanner } from "@/components/home/PromoBanner";
import { CTAHome } from "@/components/home/CTAHome";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Testimonials } from "@/components/home/Testimonials";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Categories />
      <Featured />
      <PromoBanner />
      <CTAHome />
      <BlogPreview />
      <Testimonials />
    </Layout>
  );
};

export default Index;
