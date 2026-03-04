const timeline = [
  { date: "2026-03-01", action: "完成报名并绑定 GitHub", state: "done" },
  { date: "2026-03-02", action: "提交任务 1，AI 审核通过", state: "done" },
  { date: "2026-03-04", action: "提交任务 3，进入人工复核", state: "active" },
  { date: "2026-04-28", action: "达成发证条件后自动铸造凭证", state: "todo" },
];

export default function PlatformProfilePage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-2xl font-semibold">我的进度</h2>
        <p className="mt-2 text-sm text-slate-300">总进度 35%，当前待处理: 任务 3 的人工复核。</p>
        <div className="mt-6 space-y-4">
          {timeline.map((item) => (
            <div className="flex gap-3" key={item.date + item.action}>
              <div
                className={`mt-1 h-2.5 w-2.5 rounded-full ${
                  item.state === "done"
                    ? "bg-emerald-400"
                    : item.state === "active"
                      ? "bg-cyan-300"
                      : "bg-slate-600"
                }`}
              />
              <div>
                <p className="text-xs text-slate-400">{item.date}</p>
                <p className="text-sm text-slate-100">{item.action}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-cyan-900/40 to-slate-900 p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Credential</p>
        <h3 className="mt-2 text-xl font-semibold">链协技术任务凭证</h3>
        <p className="mt-3 text-sm text-slate-200">状态：未解锁。需要完成所有必修任务并通过 AI + 人工审核。</p>
        <div className="mt-5 rounded-xl border border-cyan-300/30 bg-slate-950/40 p-4 text-sm text-slate-200">
          <p>发证条件</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
            <li>必修任务全部通过</li>
            <li>总积分达到 80+</li>
            <li>无学术诚信违规记录</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
