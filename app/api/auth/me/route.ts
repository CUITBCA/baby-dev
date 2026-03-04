import { NextResponse } from "next/server";
import { readSessionFromCookie } from "@/lib/auth/session";

export async function GET() {
  const session = await readSessionFromCookie();
  if (!session) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: session.user,
    expiresAt: session.exp,
  });
}
