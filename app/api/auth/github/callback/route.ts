import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken, fetchGitHubUser } from "@/lib/auth/github";
import { consumeOAuthState, setSessionCookie } from "@/lib/auth/session";

function resolveAppOrigin(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  return request.nextUrl.origin;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  if (!code || !state) {
    return NextResponse.redirect(new URL("/platform/enroll?error=oauth_callback_missing_params", request.url));
  }

  const validState = await consumeOAuthState(state);
  if (!validState) {
    return NextResponse.redirect(new URL("/platform/enroll?error=oauth_invalid_state", request.url));
  }

  try {
    const origin = resolveAppOrigin(request);
    const redirectUri = `${origin}/api/auth/github/callback`;
    const accessToken = await exchangeCodeForToken({ code, redirectUri });
    const githubUser = await fetchGitHubUser(accessToken);

    await setSessionCookie({
      id: githubUser.id,
      login: githubUser.login,
      name: githubUser.name,
      avatarUrl: githubUser.avatar_url,
    });

    return NextResponse.redirect(new URL("/platform/enroll?auth=success", request.url));
  } catch (error) {
    console.error("GitHub OAuth callback failed", error);
    return NextResponse.redirect(new URL("/platform/enroll?error=oauth_callback_failed", request.url));
  }
}
