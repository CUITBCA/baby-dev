"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

type AuthResponse = {
  authenticated: boolean;
  user: {
    id: number;
    login: string;
    name: string | null;
    avatarUrl: string | null;
  } | null;
};

const errorMap: Record<string, string> = {
  oauth_start_failed: "OAuth 启动失败，请检查后端环境变量。",
  oauth_callback_missing_params: "GitHub 回调参数缺失，请重新登录。",
  oauth_invalid_state: "登录校验失败（state 不匹配），请重试。",
  oauth_callback_failed: "GitHub 回调失败，请检查 Client ID/Secret 和回调地址。",
};

export default function PlatformEnrollPage() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
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

  const error = searchParams.get("error");
  const authSuccess = searchParams.get("auth") === "success";

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return errorMap[error] || `登录失败：${error}`;
  }, [error]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Enroll</p>
      <h2 className="mt-2 text-3xl font-semibold">报名链协训练营</h2>
      <p className="mt-3 text-slate-300">首期仅需 GitHub 登录。完成绑定后即可提交任务仓库并触发 webhook 审核。</p>

      <section className="mt-6 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-4">
        <p className="text-sm text-cyan-100">第 1 步：绑定 GitHub 账号</p>
        {loading ? <p className="mt-2 text-xs text-slate-200">正在检查登录状态...</p> : null}

        {!loading && !auth.authenticated ? (
          <Link
            className="mt-3 inline-block rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            href="/api/auth/github/start"
          >
            使用 GitHub 登录
          </Link>
        ) : null}

        {!loading && auth.authenticated && auth.user ? (
          <p className="mt-3 rounded-lg border border-emerald-300/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
            已登录 GitHub：@{auth.user.login}
          </p>
        ) : null}
      </section>

      {authSuccess ? (
        <p className="mt-4 rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-3 text-sm text-emerald-200">GitHub 登录成功，你现在可以提交报名信息。</p>
      ) : null}

      {errorMessage ? (
        <p className="mt-4 rounded-xl border border-rose-400/40 bg-rose-500/10 p-3 text-sm text-rose-200">{errorMessage}</p>
      ) : null}

      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <label className="grid gap-2 text-sm">
          <span className="text-slate-200">姓名</span>
          <input className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" placeholder="例如：张三" required />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="text-slate-200">GitHub 用户名</span>
          <input
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2"
            defaultValue={auth.user?.login || ""}
            placeholder="例如：cuitbca-dev"
            required
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="text-slate-200">默认任务仓库地址</span>
          <input className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" placeholder="https://github.com/xxx/xxx" required />
        </label>
        <button
          className="mt-2 rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition enabled:hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!auth.authenticated}
          type="submit"
        >
          提交报名
        </button>
      </form>

      {!auth.authenticated ? (
        <p className="mt-4 rounded-xl border border-amber-400/40 bg-amber-500/10 p-3 text-sm text-amber-200">请先完成 GitHub 登录后再提交报名。</p>
      ) : null}

      {submitted ? (
        <p className="mt-4 rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-3 text-sm text-emerald-200">
          报名成功。请在 GitHub 仓库里配置 webhook 到平台后端，后续每次 push 会自动触发 OpenClaw 审核。
        </p>
      ) : null}
    </div>
  );
}
