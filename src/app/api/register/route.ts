import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!rateLimit(`register:${clientIp(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Generic message — do not reveal whether the account exists.
    return NextResponse.json(
      { error: "Unable to create account with those details." },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    await prisma.user.create({
      data: { name, email, passwordHash },
    });
  } catch {
    // Covers the race where two concurrent requests both pass the
    // `existing` check above for the same email — the unique constraint
    // catches it, and we still return the same generic message.
    return NextResponse.json(
      { error: "Unable to create account with those details." },
      { status: 400 },
    );
  }

  return NextResponse.json({ success: true });
}
