import { Layout } from "@/Components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/Components/ui/button";
import { MapPin, Phone, Send, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Contact = ({ page }: { page: any }) => {
  const { t, language } = useLanguage();

  const content = page?.content || {};

  const getField = (field: string) => {
    return content[`${field}_${language}`] || content[field] || t.contact[field as keyof typeof t.contact] || "";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <Layout>
      <div className="bg-background min-h-screen">
        <div className="container py-24 space-y-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-4"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-serif font-medium text-foreground"
            >
              {getField("hero_title") || t.contact.title}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-lg font-light"
            >
              {getField("hero_subtitle") || t.contact.subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid lg:grid-cols-12 gap-16 max-w-6xl mx-auto"
          >
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <form className="space-y-8">
                <div className="space-y-2">
                  <label className="text-sm text-foreground font-medium ml-1">
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full h-14 px-5 rounded-2xl border border-border bg-muted/10 text-foreground focus:bg-card focus:ring-1 focus:ring-accent/30 outline-none transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-foreground font-medium ml-1">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    className="w-full h-14 px-5 rounded-2xl border border-border bg-muted/10 text-foreground focus:bg-card focus:ring-1 focus:ring-accent/30 outline-none transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-foreground font-medium ml-1">
                    {t.contact.subject}
                  </label>
                  <input
                    type="text"
                    className="w-full h-14 px-5 rounded-2xl border border-border bg-muted/10 text-foreground focus:bg-card focus:ring-1 focus:ring-accent/30 outline-none transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-foreground font-medium ml-1">
                    {t.contact.message}
                  </label>
                  <textarea
                    rows={6}
                    className="w-full p-5 rounded-3xl border border-border bg-muted/10 text-foreground focus:bg-card focus:ring-1 focus:ring-accent/30 outline-none transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full px-10 h-14 text-base transition-all duration-300 shadow-lg shadow-accent/20"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {t.contact.send}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
              <div className="bg-card border border-border p-6 rounded-[2rem] flex items-center gap-6 group hover:border-accent/30 transition-all duration-500">
                <div className="w-14 h-14 flex-shrink-0 bg-background shadow-sm rounded-2xl flex items-center justify-center text-accent">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-0.5">{t.contact.addresstext}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {getField("address") || t.contact.address}
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border p-6 rounded-[2rem] flex items-center gap-6 group hover:border-accent/30 transition-all duration-500">
                <div className="w-14 h-14 flex-shrink-0 bg-background shadow-sm rounded-2xl flex items-center justify-center text-accent">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-0.5">{t.contact.phonetext}</h3>
                  <p className="text-muted-foreground text-sm">
                    {getField("phone") || t.contact.phone}
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border p-6 rounded-[2rem] flex items-center gap-6 group hover:border-accent/30 transition-all duration-500">
                <div className="w-14 h-14 flex-shrink-0 bg-background shadow-sm rounded-2xl flex items-center justify-center text-accent">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-0.5">{t.contact.emailtext}</h3>
                  <p className="text-muted-foreground text-sm">
                    {getField("email") || t.contact.emailAddress}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
