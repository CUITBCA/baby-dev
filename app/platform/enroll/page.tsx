"use client";

import { FormEvent, useState } from "react";

export default function PlatformEnrollPage() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Enroll</p>
      <h2 className="mt-2 text-3xl font-semibold">报名链协训练营</h2>
      <p className="mt-3 text-slate-300">完成钱包签名登录后，填写以下信息即可进入任务系统。</p>

      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <label className="grid gap-2 text-sm">
          <span className="text-slate-200">姓名</span>
          <input className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" placeholder="例如：张三" required />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="text-slate-200">GitHub 用户名</span>
          <input className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" placeholder="例如：cuitbca-dev" required />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="text-slate-200">钱包地址</span>
          <input className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" placeholder="0x..." required />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="text-slate-200">任务仓库地址</span>
          <input className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2" placeholder="https://github.com/xxx/xxx" required />
        </label>
        <button
          className="mt-2 rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-200"
          type="submit"
        >
          提交报名
        </button>
      </form>

      {submitted ? (
        <p className="mt-4 rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-3 text-sm text-emerald-200">
          报名成功，已为你创建任务空间。下一步请前往任务列表提交成果。
        </p>
      ) : null}
    </div>
  );
}
