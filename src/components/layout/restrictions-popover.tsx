"use client";

import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { sendRequest } from "@/src/app/api/actions";

export default function RestrictionsPopover() {
  const handleRequest = async () => {
    await fetch("api/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sentRequest: true }),
    });
  };

  return (
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
            You can only view this content. Ask owner for permission to edit.
          </div>
          <SignedOut>
            <SignInButton>
              <Button
                className="bg-green-600 hover:bg-foreground hover:text-green-600"
                variant={"secondary"}
              >
                Request Edit Access
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Button
              className="bg-green-600 hover:bg-foreground hover:text-green-600"
              variant={"secondary"}
              onClick={sendRequest}
            >
              Request Edit Access
            </Button>
          </SignedIn>
        </div>
      </PopoverContent>
    </Popover>
  );
}
