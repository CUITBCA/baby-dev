import Link from "next/link";
import { studentProgressList } from "@/lib/platform-data";

export default function PlatformStudentsPage() {
  const ranked = [...studentProgressList].sort((a, b) => {
    if (b.completedTaskCount !== a.completedTaskCount) {
      return b.completedTaskCount - a.completedTaskCount;
    }
    return b.commitCount - a.commitCount;
  });

  const totalStudents = ranked.length;
  const totalCommits = ranked.reduce((sum, student) => sum + student.commitCount, 0);
  const avgCompleted =
    ranked.reduce((sum, student) => sum + student.completedTaskCount, 0) / Math.max(totalStudents, 1);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Students</p>
        <h2 className="mt-2 text-3xl font-semibold">同学 GitHub 提交榜单</h2>
        <p className="mt-3 text-slate-300">展示每位同学的 GitHub 账号、提交 commit 次数、任务完成数。排序优先按任务完成数，再按 commit 次数。</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
            <p className="text-xs text-slate-400">同学人数</p>
            <p className="mt-1 text-2xl font-semibold">{totalStudents}</p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
            <p className="text-xs text-slate-400">总 commit 数</p>
            <p className="mt-1 text-2xl font-semibold">{totalCommits}</p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
            <p className="text-xs text-slate-400">人均完成任务</p>
            <p className="mt-1 text-2xl font-semibold">{avgCompleted.toFixed(1)}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-cyan-500/20 bg-slate-950/70 p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="py-2">排名</th>
                <th className="py-2">姓名</th>
                <th className="py-2">GitHub</th>
                <th className="py-2">commit 次数</th>
                <th className="py-2">完成任务数</th>
                <th className="py-2">最近活跃</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((student, index) => (
                <tr className="border-b border-slate-800" key={student.id}>
                  <td className="py-3 font-semibold text-cyan-200">#{index + 1}</td>
                  <td className="py-3">{student.name}</td>
                  <td className="py-3">
                    <Link className="text-cyan-300 hover:text-cyan-100" href={student.repoUrl} target="_blank">
                      @{student.githubLogin}
                    </Link>
                  </td>
                  <td className="py-3">{student.commitCount}</td>
                  <td className="py-3">
                    {student.completedTaskCount}/{student.totalTaskCount}
                  </td>
                  <td className="py-3 text-slate-300">{student.lastActiveAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
