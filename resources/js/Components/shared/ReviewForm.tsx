import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Star } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { route } from "ziggy-js";
import { useLanguage } from "@/contexts/LanguageContext";

interface ReviewFormProps {
    productId: number;
    onSuccess?: () => void;
}

export function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
    const { t } = useLanguage();
    const { flash } = usePage().props as any;
    const [hoverRating, setHoverRating] = useState(0);
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        product_id: productId,
        rating: 0,
        comment: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("reviews.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border/50 bg-card p-6">
            <div className="space-y-4">
                <Label className="text-base">{(t as any).reviews.yourRating}</Label>
                <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => {
                        const starValue = i + 1;
                        return (
                            <button
                                key={i}
                                type="button"
                                className="transition-transform hover:scale-110 active:scale-95"
                                onMouseEnter={() => setHoverRating(starValue)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setData("rating", starValue)}
                            >
                                <Star
                                    className={`h-8 w-8 transition-colors ${starValue <= (hoverRating || data.rating)
                                        ? "fill-accent text-accent"
                                        : "fill-muted text-muted"
                                        }`}
                                />
                            </button>
                        );
                    })}
                </div>
                {errors.rating && <p className="text-sm text-destructive">{errors.rating}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="comment" className="text-base">{(t as any).reviews.yourReview}</Label>
                <Textarea
                    id="comment"
                    placeholder={(t as any).reviews.placeholder}
                    rows={4}
                    value={data.comment}
                    onChange={(e) => setData("comment", e.target.value)}
                    className="resize-none"
                />
                {errors.comment && <p className="text-sm text-destructive">{errors.comment}</p>}
            </div>

            <Button type="submit" disabled={processing} className="w-full md:w-auto px-8">
                {processing ? (t as any).reviews.submitting : (t as any).reviews.post}
            </Button>

            {recentlySuccessful && (
                <p className="text-sm text-green-600 animate-in fade-in slide-in-from-top-2">
                    {(t as any).reviews.success}
                </p>
            )}

            {flash?.error && (
                <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-2">
                    {flash.error === "You have already reviewed this product." ? (t as any).reviews.alreadyReviewed : flash.error}
                </p>
            )}

            {flash?.message && !recentlySuccessful && (
                <p className="text-sm text-green-600 animate-in fade-in slide-in-from-top-2">
                    {flash.message}
                </p>
            )}

            {errors.product_id && <p className="text-sm text-destructive">{errors.product_id}</p>}
        </form>
    );
}
