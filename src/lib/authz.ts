import "server-only";
import { auth } from "@/auth";

// Server-side session gate. Every saved-items/views/account route calls this
// directly rather than trusting the proxy redirect or the client UI — a
// visitor with a stale/tampered client can never bypass this.
export async function requireSession() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return session;
}
