import { TaskCard } from "@/components/platform/task-card";
import { platformTasks } from "@/lib/platform-data";

export default function PlatformTasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Task Hub</p>
        <h2 className="mt-2 text-3xl font-semibold">任务列表</h2>
        <p className="mt-3 text-slate-300">按任务要求提交仓库、测试网地址、演示链接和分析文档，系统会自动触发验证。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {platformTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
