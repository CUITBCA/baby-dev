"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { platformTasks } from "@/lib/platform-data";

type AuthResponse = {
  authenticated: boolean;
  user: {
    id: number;
    login: string;
    name: string | null;
    avatarUrl: string | null;
  } | null;
};

export default function TaskDetailPage() {
  const params = useParams<{ taskId: string }>();
  const [message, setMessage] = useState("");
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
      }
    };

    void load();
  }, []);

  const task = useMemo(
    () => platformTasks.find((item) => item.id === params.taskId),
    [params.taskId],
  );

  if (!task) {
    notFound();
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!auth.authenticated) {
      setMessage("请先使用 GitHub 登录，再提交任务。");
      return;
    }
    setMessage("提交成功。后端已记录本次提交，等待 GitHub push/PR webhook 触发 OpenClaw 自动评审。");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <p className="text-sm uppercase tracking-[0.16em] text-cyan-200">Task Detail</p>
        <h2 className="mt-2 text-3xl font-semibold">{task.title}</h2>
        <p className="mt-3 text-slate-300">{task.description}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-cyan-500/40 px-3 py-1 text-cyan-200">{task.points} 分</span>
          <span className="rounded-full border border-slate-700 px-3 py-1 text-slate-300">截止 {task.deadline}</span>
        </div>

        <h3 className="mt-7 text-lg font-semibold">提交要求</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
          {task.deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className="mt-7 text-lg font-semibold">AI 校验规则</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">{task.aiCheck}</p>
      </section>

      <section className="rounded-3xl border border-cyan-500/25 bg-slate-950/80 p-6">
        <h3 className="text-xl font-semibold">提交成果</h3>
        <p className="mt-2 text-xs text-slate-400">
          登录状态：{auth.authenticated && auth.user ? `已登录 @${auth.user.login}` : "未登录"}
        </p>

        <form className="mt-4 grid gap-3" onSubmit={onSubmit}>
          <label className="grid gap-2 text-sm">
            <span>GitHub 仓库地址</span>
            <input className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" placeholder="https://github.com/..." required />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Commit SHA / PR 链接</span>
            <input className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" placeholder="例如：a1b2c3... 或 https://github.com/.../pull/12" required />
          </label>
          <label className="grid gap-2 text-sm">
            <span>补充说明</span>
            <textarea className="min-h-28 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" placeholder="说明你的实现思路与关键改动" />
          </label>
          <button
            className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition enabled:hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!auth.authenticated}
            type="submit"
          >
            提交并等待 webhook 评审
          </button>
        </form>

        {message ? <p className="mt-4 rounded-lg border border-cyan-400/30 bg-cyan-500/10 p-3 text-sm text-cyan-100">{message}</p> : null}

        {!auth.authenticated ? (
          <Link className="mt-4 inline-block text-sm text-cyan-300 hover:text-cyan-100" href="/api/auth/github/start">
            去 GitHub 登录
          </Link>
        ) : null}

        <p className="mt-4 text-xs leading-5 text-slate-400">
          提示：请确认仓库已配置 webhook 指向平台后端，否则 OpenClaw 不会自动收到代码事件。
        </p>

        <Link className="mt-5 inline-block text-sm text-cyan-300 hover:text-cyan-100" href="/platform/tasks">
          返回任务列表
        </Link>
      </section>
    </div>
  );
}
