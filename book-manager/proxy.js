import { NextResponse } from "next/server";


export function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    (pathname.startsWith("/login") || pathname.startsWith("/signup")) &&
    token
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
