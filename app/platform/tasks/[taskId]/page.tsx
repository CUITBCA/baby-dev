"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { platformTasks } from "@/lib/platform-data";

export default function TaskDetailPage() {
  const params = useParams<{ taskId: string }>();
  const [message, setMessage] = useState("");

  const task = useMemo(
    () => platformTasks.find((item) => item.id === params.taskId),
    [params.taskId],
  );

  if (!task) {
    notFound();
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("提交成功，已进入 AI 评审队列。若置信度不足将自动转人工复核。");
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
        <form className="mt-4 grid gap-3" onSubmit={onSubmit}>
          <label className="grid gap-2 text-sm">
            <span>GitHub 仓库地址</span>
            <input className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" placeholder="https://github.com/..." required />
          </label>
          <label className="grid gap-2 text-sm">
            <span>测试网地址 / 演示地址</span>
            <input className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" placeholder="https://... 或 0x..." required />
          </label>
          <label className="grid gap-2 text-sm">
            <span>补充说明</span>
            <textarea className="min-h-28 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" placeholder="说明你的实现思路与关键改动" />
          </label>
          <button className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300" type="submit">
            提交并触发 AI 审核
          </button>
        </form>

        {message ? <p className="mt-4 rounded-lg border border-cyan-400/30 bg-cyan-500/10 p-3 text-sm text-cyan-100">{message}</p> : null}

        <Link className="mt-5 inline-block text-sm text-cyan-300 hover:text-cyan-100" href="/platform/tasks">
          返回任务列表
        </Link>
      </section>
    </div>
  );
}
