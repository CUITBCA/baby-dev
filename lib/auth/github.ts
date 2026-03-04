export type GitHubUser = {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string | null;
};

function mustGetEnv(name: "GITHUB_CLIENT_ID" | "GITHUB_CLIENT_SECRET") {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

export function getGitHubAuthorizeUrl(params: { redirectUri: string; state: string }) {
  const query = new URLSearchParams({
    client_id: mustGetEnv("GITHUB_CLIENT_ID"),
    redirect_uri: params.redirectUri,
    state: params.state,
    scope: "read:user user:email",
  });
  return `https://github.com/login/oauth/authorize?${query.toString()}`;
}

export async function exchangeCodeForToken(params: { code: string; redirectUri: string }) {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: mustGetEnv("GITHUB_CLIENT_ID"),
      client_secret: mustGetEnv("GITHUB_CLIENT_SECRET"),
      code: params.code,
      redirect_uri: params.redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub token exchange failed: ${response.status}`);
  }

  const data = (await response.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (!data.access_token) {
    throw new Error(data.error_description || data.error || "Missing GitHub access token");
  }

  return data.access_token;
}

export async function fetchGitHubUser(accessToken: string): Promise<GitHubUser> {
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": "CUITBCA-web",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub user fetch failed: ${response.status}`);
  }

  const user = (await response.json()) as GitHubUser;
  if (!user.id || !user.login) {
    throw new Error("Invalid GitHub user payload");
  }
  return user;
}
