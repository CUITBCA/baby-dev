import Link from "next/link";
import { PropsWithChildren } from "react";
import { AuthStatus } from "@/components/platform/auth-status";

const navItems = [
  { href: "/platform", label: "概览" },
  { href: "/platform/enroll", label: "报名" },
  { href: "/platform/tasks", label: "任务" },
  { href: "/platform/students", label: "同学榜单" },
  { href: "/platform/profile", label: "我的进度" },
  { href: "/platform/admin", label: "管理台" },
];

export function PlatformShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_55%,#020617_100%)] text-slate-50">
      <header className="sticky top-0 z-20 border-b border-cyan-400/20 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">CUITBCA</p>
            <h1 className="text-lg font-semibold">链协任务与凭证平台</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <nav className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <Link
                  className="rounded-full border border-slate-700 px-3 py-1.5 text-sm transition hover:border-cyan-400 hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-cyan-300"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <AuthStatus />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
