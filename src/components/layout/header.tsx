"use client";

import { useRef, useState } from "react";
import { Eye, RefreshCw, User } from "lucide-react";
import { Button } from "../ui/button";
import { revalidate } from "@/src/db/db";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SignedOut, SignedIn, SignInButton } from "@clerk/nextjs";

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
          <SignedOut>
            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">
                    <Eye />
                    View Only
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end">
                  <div className="flex flex-col gap-4">
                    <div className="text-sm">
                      You can only view this content. Ask owner for permission
                      to edit.
                    </div>
                    <SignInButton>
                      <Button
                        className="bg-green-600 hover:bg-foreground hover:text-green-600"
                        variant={"secondary"}
                      >
                        Request Edit Access
                      </Button>
                    </SignInButton>
                  </div>
                </PopoverContent>
              </Popover>
              <SignInButton>
                <Button
                  className="rounded-full"
                  size={"icon"}
                  variant={"secondary"}
                >
                  <User />
                </Button>
              </SignInButton>
            </div>
          </SignedOut>
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
