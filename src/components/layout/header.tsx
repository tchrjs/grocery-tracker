"use client";

import { HtmlHTMLAttributes, useRef, useState } from "react";
import { Eye, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { revalidate } from "@/src/db/db";

export default function Header() {
  const [isRotating, setIsRotating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (isRotating) return;
    setIsRotating(true);
    revalidate();

    if (!ref.current) return;
    ref.current.onanimationend = () => {
      setIsRotating(false);
    };
  };

  return (
    <header className="w-full px-2 pt-4 pb-2">
      <div className="flex justify-between border rounded-md p-2">
        <div>
          <Button variant="secondary" onClick={handleClick}>
            <span ref={ref} className={isRotating ? "rotate-icon" : ""}>
              <RefreshCw />
            </span>
          </Button>
        </div>
        <div>
          <Button variant="secondary">
            <Eye />
            View Only
          </Button>
        </div>
      </div>

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
    </header>
  );
}
