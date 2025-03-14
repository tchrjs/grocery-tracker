import { Star } from "lucide-react";

export type RatingRange = 0 | 1 | 2 | 3 | 4 | 5;

export function StarRating({ value = 0 }) {
  return (
    <div className="flex justify-center items-center">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < value ? "text-foreground fill-foreground" : "text-foreground"
          }`}
        />
      ))}
    </div>
  );
}
