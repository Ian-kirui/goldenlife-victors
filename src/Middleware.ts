import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_ROLES = ["ROLE_ADMIN", "DEVELOPER"];

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;


  // Not logged in — redirect to signin
  if (!token) {
    const signInUrl = req.nextUrl.clone();
    signInUrl.pathname = "/signin";
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  const roles: string[] = (token.roles as string[]) ?? [];
  const isAdmin = roles.some((r) => ADMIN_ROLES.includes(r));

  console.log("[Middleware] roles:", roles, "| isAdmin:", isAdmin);

  if (!isAdmin) {
    const homeUrl = req.nextUrl.clone();
    homeUrl.pathname = "/";
    homeUrl.searchParams.set("unauthorized", "1");
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};