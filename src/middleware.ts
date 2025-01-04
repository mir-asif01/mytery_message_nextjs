import { NextRequest, NextResponse } from "next/server"
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"
import { request } from "http"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const url = req.nextUrl

  if (
    token &&
    (url.pathname.startsWith("/sing-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }
}

export const config = {
  matcher: ["/sign-in", "/sign-up"],
}
