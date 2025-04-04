import { redirect } from "next/navigation";
import { checkRole } from "@/src/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { setRole } from "./_actions";
import { Button } from "@/src/components/ui/button";
import { Check } from "lucide-react";
import { Separator } from "@/src/components/ui/separator";
import Link from "next/link";

export default async function AdminDashboard() {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const client = await clerkClient();

  const { data: users } = await client.users.getUserList();

  const requestedUsers =
    users?.filter(
      (user: any) =>
        user.publicMetadata?.sentRequest !== true &&
        user.publicMetadata?.role == "viewer"
    ) || [];

  return (
    <div className="w-full h-full p-4 flex gap-4 flex-col">
      <div className="flex items-center">
        <div className="w-1/3"></div>
        <div className="text-2xl text-center w-1/3">Admin</div>
        <div className="w-1/3 flex justify-end">
          <Button variant={"outline"} asChild>
            <Link href={"/"}>Return</Link>
          </Button>
        </div>
      </div>
      <div>
        <div className="text-xl">User Requests</div>
        <div className="text-sm text-muted-foreground">
          Users that have requested to edit content.
        </div>
      </div>

      <div className="w-full flex gap-4">
        {requestedUsers.map((user) => {
          return (
            <div className="w-full flex flex-col" key={user.id}>
              <Separator />
              <div className="w-full flex gap-4 justify-between items-center pt-2">
                <div>
                  {
                    user.emailAddresses.find(
                      (email) => email.id === user.primaryEmailAddressId
                    )?.emailAddress
                  }
                </div>
                <form action={setRole}>
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="moderator" name="role" />
                  <Button variant={"outline"} type="submit">
                    <Check />
                    Accept Request
                  </Button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
