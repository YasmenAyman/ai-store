import { StarRatingDisplay } from "./StarRatingDisplay";
import { format } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";

interface Review {
    id: number;
    user: {
        name: string;
    };
    rating: number;
    comment: string | null;
    created_at: string;
}

interface ReviewListProps {
    reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
    const { t } = useLanguage();
    if (!reviews || reviews.length === 0) {
        return (
            <div className="py-10 text-center text-muted-foreground">
                {(t as any).reviews.noReviews}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {reviews.map((review) => (
                <div key={review.id} className="group space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <p className="font-semibold">{review.user.name}</p>
                            <StarRatingDisplay rating={review.rating} size={14} />
                        </div>
                        <span className="text-xs text-muted-foreground">
                            {format(new Date(review.created_at), "MMM d, yyyy")}
                        </span>
                    </div>
                    {review.comment && (
                        <p className="text-muted-foreground leading-relaxed">
                            {review.comment}
                        </p>
                    )}
                    <div className="h-px w-full bg-border/40 group-last:hidden" />
                </div>
            ))}
        </div>
    );
}
