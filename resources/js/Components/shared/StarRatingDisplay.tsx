import { Star } from "lucide-react";

interface StarRatingDisplayProps {
    rating: number;
    max?: number;
    size?: number;
    className?: string;
}

export function StarRatingDisplay({
    rating,
    max = 5,
    size = 16,
    className = ""
}: StarRatingDisplayProps) {
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {Array.from({ length: max }).map((_, i) => (
                <Star
                    key={i}
                    size={size}
                    className={`${i < Math.floor(rating)
                            ? "fill-accent text-accent"
                            : "fill-muted text-muted"
                        }`}
                />
            ))}
        </div>
    );
}
