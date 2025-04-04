"use client";

import { User } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Separator } from "../ui/separator";
import { toTitleCase } from "@/src/lib/utils";
import { useState } from "react";
import Link from "next/link";

interface UserPopoverProps {
  emailAddress?: string;
  role?: string;
}

export default function UserPopover({ emailAddress, role }: UserPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={(toggled_on: boolean) => {
        if (open !== toggled_on) {
          setOpen(toggled_on);
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button className="rounded-full" size={"icon"} variant={"secondary"}>
          <User />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <SignedOut>
          <div className="flex flex-col gap-4">
            <div className="w-full text-center">You are not signed in</div>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant={"outline"}>Sign Up</Button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex flex-col gap-4">
            <div className="w-full text-center">{emailAddress}</div>
            {role && (
              <div className="flex justify-between">
                <div>Role: </div>
                <div>{toTitleCase(role)}</div>
              </div>
            )}
            <Separator />
            <div className="flex flex-col w-full gap-2">
              <SignOutButton>
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </SignOutButton>
              <Button
                variant={"outline"}
                className={role == "admin" ? "" : "hidden"}
                asChild
              >
                <Link href={"/admin"}>Manage Users</Link>
              </Button>
            </div>
          </div>
        </SignedIn>
      </PopoverContent>
    </Popover>
  );
}
