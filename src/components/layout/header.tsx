"use client";

import { useUser } from "@clerk/nextjs";
import UserPopover from "./user-popover";
import RestrictionsPopover from "./restrictions-popover";
import RevalidateButton from "./revalidate-button";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="w-full px-2 pt-4 pb-2">
      <div className="flex justify-between border rounded-md p-2">
        <RevalidateButton />
        <div className="flex items-center gap-4">
          <RestrictionsPopover />
          <UserPopover
            emailAddress={user?.primaryEmailAddress?.toString()}
            role={user?.publicMetadata.role?.toString()}
          />
        </div>
      </div>
    </header>
  );
}
