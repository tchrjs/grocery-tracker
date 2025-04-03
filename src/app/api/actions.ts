"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function sendRequest() {
  const client = await clerkClient();
  const user = await currentUser();

  try {
    if (user) {
      await client.users.updateUserMetadata(user.id, {
        publicMetadata: { sentRequest: true },
      });
    }
  } catch (err) {}
}
