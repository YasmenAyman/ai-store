import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  return (
    <Layout>
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-serif font-bold">{t.contact.title}</h1>
        <p className="mt-4 text-muted-foreground">{t.contact.subtitle}</p>
      </div>
    </Layout>
  );
};

export default Contact;
