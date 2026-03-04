import Link from "next/link";
import { PlatformTask } from "@/lib/platform-data";

const statusMap: Record<PlatformTask["status"], { label: string; cls: string }> = {
  not_started: { label: "未开始", cls: "bg-slate-800 text-slate-300" },
  in_progress: { label: "进行中", cls: "bg-cyan-500/20 text-cyan-200" },
  pending_review: { label: "待审核", cls: "bg-amber-500/20 text-amber-200" },
  approved: { label: "已通过", cls: "bg-emerald-500/20 text-emerald-200" },
  rejected: { label: "未通过", cls: "bg-rose-500/20 text-rose-200" },
};

export function TaskCard({ task }: { task: PlatformTask }) {
  const status = statusMap[task.status];

  return (
    <article className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-[0_0_0_1px_rgba(8,145,178,0.1)] transition hover:-translate-y-0.5 hover:border-cyan-500/60">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${status.cls}`}>{status.label}</span>
        <span className="text-xs text-slate-400">截止 {task.deadline}</span>
      </div>
      <h3 className="text-lg font-semibold text-white">{task.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{task.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="rounded-lg border border-cyan-500/30 px-2 py-1 text-cyan-200">{task.points} 分</span>
        <Link
          className="text-cyan-300 underline-offset-4 transition hover:text-cyan-100 hover:underline focus-visible:outline-2 focus-visible:outline-cyan-300"
          href={`/platform/tasks/${task.id}`}
        >
          查看并提交
        </Link>
      </div>
    </article>
  );
}
