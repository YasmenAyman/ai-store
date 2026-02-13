import { Layout } from "@/Components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { BadgeCheck, Leaf, Heart } from "lucide-react";
import { Separator } from "@/Components/ui/separator";
import { motion } from "framer-motion";

const About = ({ page }: { page: any }) => {
  const { t, language } = useLanguage();

  const content = page?.content || {};

  const getField = (field: string) => {
    return content[`${field}_${language}`] || content[field] || t.about[field as keyof typeof t.about] || "";
  };

  const values = [
    {
      icon: BadgeCheck,
      title: getField("value1_title") || t.about.quality,
      desc: getField("value1_desc") || t.about.qualityDesc
    },
    {
      icon: Leaf,
      title: getField("value2_title") || t.about.sustainability,
      desc: getField("value2_desc") || t.about.sustainabilityDesc
    },
    {
      icon: Heart,
      title: getField("value3_title") || t.about.craftsmanship,
      desc: getField("value3_desc") || t.about.craftsmanshipDesc
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={getField("hero_bg") || page?.image_path || "/assets/about-hero.jpg"}
            alt="Our Story"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="container relative z-10 text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-2xl"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-serif font-bold mb-4"
            >
              {getField("hero_title") || t.about.heroTitle}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl opacity-90 font-light"
            >
              {getField("hero_subtitle") || t.about.heroSub}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Intro Text */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="container py-24 text-center max-w-4xl"
      >
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light"
        >
          {getField("intro_text") || "At Lumière, we believe in the transformative power of scent. Each candle is hand-poured with premium soy wax and infused with carefully curated fragrances that evoke warmth, comfort, and elegance."}
        </motion.p>
      </motion.div>

      <Separator className="container opacity-50" />

      {/* Mission Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="container py-24 text-center max-w-4xl"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-serif font-bold mb-6"
        >
          {getField("mission_title") || t.about.missionTitle}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground leading-relaxed font-light"
        >
          {getField("mission_text") || t.about.mission}
        </motion.p>
      </motion.div>

      {/* Values Section */}
      <div className="bg-muted/30 py-24 overflow-hidden">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-16"
          >
            {getField("values_title") || t.about.valuesTitle}
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-card p-10 rounded-xl border border-border/50 text-center flex flex-col items-center group hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
