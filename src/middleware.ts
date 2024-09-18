import { NextResponse, type NextRequest } from "next/server";

const mainRoute = "/characters";
const loginRoute = "/login";

const protectedRoutes = [mainRoute, "/character"];
const authRoutes = [loginRoute];

export default function middleware(req: NextRequest) {
  const authCookie = req.cookies.get("auth");

  const isAuthenticated = authCookie?.value === "true";

  const isProtectedRoute = protectedRoutes.some((route) => {
    return (
      req.nextUrl.pathname === route || req.nextUrl.pathname.startsWith(route)
    );
  });

  if (!isAuthenticated && isProtectedRoute) {
    const absoluteURL = new URL(loginRoute, req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (isAuthenticated && authRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL(mainRoute, req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
