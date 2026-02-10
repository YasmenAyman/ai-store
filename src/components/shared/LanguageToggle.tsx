import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      aria-label="Toggle language"
      className="relative"
    >
      <Languages className="h-5 w-5" />
      <span className="absolute -bottom-0.5 text-[9px] font-sans font-bold">
        {language === "en" ? "AR" : "EN"}
      </span>
    </Button>
  );
}
