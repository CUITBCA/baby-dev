"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type AuthResponse = {
  authenticated: boolean;
  user: {
    id: number;
    login: string;
    name: string | null;
    avatarUrl: string | null;
  } | null;
};

export function AuthStatus() {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<AuthResponse>({ authenticated: false, user: null });

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        if (!response.ok) {
          setAuth({ authenticated: false, user: null });
          return;
        }
        const data = (await response.json()) as AuthResponse;
        setAuth(data);
      } catch {
        setAuth({ authenticated: false, user: null });
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const onLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  };

  if (loading) {
    return <p className="text-xs text-slate-400">登录态检查中...</p>;
  }

  if (!auth.authenticated || !auth.user) {
    return (
      <Link className="rounded-full border border-cyan-300/50 px-3 py-1.5 text-sm text-cyan-100 hover:bg-cyan-400/10" href="/api/auth/github/start">
        GitHub 登录
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-xs text-slate-300">@{auth.user.login}</p>
      <button
        className="rounded-full border border-slate-700 px-3 py-1.5 text-xs text-slate-200 transition hover:border-rose-300 hover:text-rose-200"
        onClick={onLogout}
        type="button"
      >
        退出
      </button>
    </div>
  );
}
