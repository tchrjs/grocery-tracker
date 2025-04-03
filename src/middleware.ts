import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const session = await auth();

  if (!session) {
    return NextResponse.next();
  }

  const userId = session.userId;
  const metadata = session.sessionClaims?.metadata || {};

  // If no role is set in public metadata, set default values
  if (!metadata.role) {
    try {
      await fetch(`https://api.clerk.com/v1/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`, // Set in .env.local
        },
        body: JSON.stringify({
          public_metadata: {
            role: "viewer",
            sentRequest: false,
          },
        }),
      });
    } catch (error) {
      console.error("Error updating public metadata:", error);
    }
  }

  // Protect all routes starting with `/admin`
  if (isAdminRoute(req) && metadata.role !== "admin") {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
