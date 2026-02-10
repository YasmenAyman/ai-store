import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const Store = () => {
  const { t } = useLanguage();
  return (
    <Layout>
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-serif font-bold">{t.nav.store}</h1>
        <p className="mt-4 text-muted-foreground">Coming soon...</p>
      </div>
    </Layout>
  );
};

export default Store;
