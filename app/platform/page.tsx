import Link from "next/link";
import { TaskCard } from "@/components/platform/task-card";
import { platformTasks } from "@/lib/platform-data";

const stats = [
  { label: "当前批次", value: "2026 春季链协训练营" },
  { label: "任务总数", value: `${platformTasks.length}` },
  { label: "当前积分", value: "35 / 100" },
  { label: "凭证状态", value: "待解锁" },
];

export default function PlatformOverviewPage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/70 via-slate-900 to-indigo-950/60 p-6 md:p-10">
        <div className="absolute -right-10 -top-14 h-44 w-44 rounded-full bg-cyan-500/20 blur-3xl" />
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">AI 审核 + 人工复核</p>
        <h2 className="mt-3 max-w-2xl text-2xl font-bold leading-tight md:text-4xl">完成链协任务，自动验证通过后发放凭证</h2>
        <p className="mt-4 max-w-2xl text-slate-300">
          提交代码后可由 GitHub Webhook 触发 OpenClaw 自动评审，低置信度结果进入人工审核队列。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="rounded-xl bg-cyan-400 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-300"
            href="/platform/enroll"
          >
            立即报名
          </Link>
          <Link
            className="rounded-xl border border-cyan-300/60 px-4 py-2 font-medium text-cyan-100 transition hover:bg-cyan-400/10"
            href="/platform/tasks"
          >
            查看任务
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4" key={item.label}>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{item.label}</p>
            <p className="mt-2 text-lg font-semibold text-slate-100">{item.value}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h3 className="text-2xl font-semibold">任务看板</h3>
          <Link className="text-sm text-cyan-300 hover:text-cyan-100" href="/platform/tasks">
            查看全部
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {platformTasks.slice(0, 4).map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>
    </div>
  );
}
