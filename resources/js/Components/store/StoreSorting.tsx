import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

export type SortOption = "popular" | "newest" | "priceLow" | "priceHigh" | "rating";

interface StoreSortingProps {
  value: SortOption;
  onChange: (v: SortOption) => void;
}

export function StoreSorting({ value, onChange }: StoreSortingProps) {
  const { t } = useLanguage();

  return (
    <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
      <SelectTrigger className="w-[200px] bg-card">
        <SelectValue placeholder={t.store.sortBy} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="popular">{t.store.sortOptions.popular}</SelectItem>
        <SelectItem value="newest">{t.store.sortOptions.newest}</SelectItem>
        <SelectItem value="priceLow">{t.store.sortOptions.priceLow}</SelectItem>
        <SelectItem value="priceHigh">{t.store.sortOptions.priceHigh}</SelectItem>
        <SelectItem value="rating">{t.store.sortOptions.rating}</SelectItem>
      </SelectContent>
    </Select>
  );
}
