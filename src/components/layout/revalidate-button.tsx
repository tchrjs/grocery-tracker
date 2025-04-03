"use client";

import { useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { revalidate } from "@/src/db/db";

export default function RevalidateButton() {
  const [isRotating, setIsRotating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (isRotating) return;
    setIsRotating(true);
    revalidate("/");

    if (!ref.current) return;
    ref.current.onanimationend = () => {
      setIsRotating(false);
    };
  };

  return (
    <Button variant="secondary" onClick={handleClick}>
      <span ref={ref} className={isRotating ? "rotate-icon" : ""}>
        <RefreshCw />
      </span>
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .rotate-icon {
          display: inline-block;
          animation: spin 0.5s ease-in-out;
        }
      `}</style>
    </Button>
  );
}
