import { reviewQueue } from "@/lib/platform-data";

export default function PlatformAdminPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Admin Console</p>
        <h2 className="mt-2 text-3xl font-semibold">审核与 AI 配置</h2>
        <p className="mt-3 text-slate-300">当前策略：AI 评分阈值 70，置信度低于 0.7 自动转人工复核。</p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
            <p className="text-xs text-slate-400">Prompt 版本</p>
            <p className="mt-1 text-lg font-semibold">v1.3.2</p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
            <p className="text-xs text-slate-400">模型</p>
            <p className="mt-1 text-lg font-semibold">OpenClaw Default</p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
            <p className="text-xs text-slate-400">Webhook 状态</p>
            <p className="mt-1 text-lg font-semibold text-emerald-300">Healthy</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-cyan-500/20 bg-slate-950/70 p-6">
        <h3 className="text-xl font-semibold">待审核队列</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="py-2">提交 ID</th>
                <th className="py-2">学员</th>
                <th className="py-2">任务</th>
                <th className="py-2">AI 分数</th>
                <th className="py-2">置信度</th>
                <th className="py-2">建议</th>
              </tr>
            </thead>
            <tbody>
              {reviewQueue.map((row) => (
                <tr className="border-b border-slate-800" key={row.submissionId}>
                  <td className="py-3">{row.submissionId}</td>
                  <td className="py-3">{row.student}</td>
                  <td className="py-3">{row.task}</td>
                  <td className="py-3">{row.aiScore}</td>
                  <td className="py-3">{row.confidence}</td>
                  <td className="py-3">{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
