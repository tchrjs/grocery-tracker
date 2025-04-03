"use client";

import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { sendRequest } from "@/src/app/api/actions";
import { useState } from "react";

export default function RestrictionsPopover({
  pendingRequest = false,
}: {
  pendingRequest: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(pendingRequest);

  const handleRequest = async () => {
    setOpen(false);
    setRequestSent(true);
    await sendRequest();
  };

  return (
    <Popover
      open={open}
      onOpenChange={(toggled_on: boolean) => {
        if (open != toggled_on) setOpen(toggled_on);
      }}
    >
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
            {}
            <Button
              disabled={pendingRequest || requestSent}
              className="bg-green-600 hover:bg-foreground hover:text-green-600 disabled:hover:text-muted-foreground disabled:bg-muted"
              variant={"secondary"}
              onClick={handleRequest}
            >
              {pendingRequest || requestSent
                ? "Pending Request Approval"
                : "Request Edit Access"}
            </Button>
          </SignedIn>
        </div>
      </PopoverContent>
    </Popover>
  );
}
