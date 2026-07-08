import { NextResponse } from "next/server";
import { auth } from "@/auth";

// Next.js 16 renamed `middleware.ts` -> `proxy.ts`. This runs on (almost)
// every page request for two independent reasons:
//   1. Auth gating for /saved — a UX-layer redirect only; the page itself
//      (and every saved-items/views API route) re-checks the session
//      server-side (see src/lib/authz.ts), so a bypassed or stale proxy
//      check can never grant real access on its own.
//   2. Issuing a per-request CSP nonce, following Next.js's documented
//      pattern (https://nextjs.org/docs/app/guides/content-security-policy)
//      so script-src can stay strict (nonce + strict-dynamic) instead of
//      falling back to 'unsafe-inline', which the App Router's own
//      hydration scripts would otherwise require.
export default auth((req) => {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "object-src 'none'",
  ].join("; ");

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const { pathname } = req.nextUrl;
  const session = req.auth;

  if (pathname.startsWith("/saved") && !session?.user) {
    const loginUrl = new URL("/login", req.nextUrl);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
});

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
