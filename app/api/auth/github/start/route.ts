import { NextRequest, NextResponse } from "next/server";
import { getGitHubAuthorizeUrl } from "@/lib/auth/github";
import { issueOAuthState } from "@/lib/auth/session";

function resolveAppOrigin(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  return request.nextUrl.origin;
}

export async function GET(request: NextRequest) {
  try {
    const state = await issueOAuthState();
    const origin = resolveAppOrigin(request);
    const redirectUri = `${origin}/api/auth/github/callback`;
    const authUrl = getGitHubAuthorizeUrl({ redirectUri, state });
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("GitHub OAuth start failed", error);
    return NextResponse.redirect(new URL("/platform/enroll?error=oauth_start_failed", request.url));
  }
}
