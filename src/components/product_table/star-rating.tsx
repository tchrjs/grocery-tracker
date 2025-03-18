import { Star } from "lucide-react";

export enum QualityRating {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

export function StarRating({ value }: { value: QualityRating }) {
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
