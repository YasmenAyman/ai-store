import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const Register = () => {
  const { t } = useLanguage();
  return (
    <Layout>
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-serif font-bold">{t.auth.registerTitle}</h1>
        <p className="mt-4 text-muted-foreground">{t.auth.registerSub}</p>
      </div>
    </Layout>
  );
};

export default Register;
