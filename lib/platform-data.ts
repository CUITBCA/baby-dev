export type TaskStatus = "not_started" | "in_progress" | "pending_review" | "approved" | "rejected";

export type PlatformTask = {
  id: string;
  title: string;
  category: "contract" | "frontend" | "backend" | "analysis";
  points: number;
  deadline: string;
  status: TaskStatus;
  description: string;
  deliverables: string[];
  aiCheck: string;
};

export type StudentProgress = {
  id: string;
  name: string;
  githubLogin: string;
  repoUrl: string;
  commitCount: number;
  completedTaskCount: number;
  totalTaskCount: number;
  lastActiveAt: string;
};

export const platformTasks: PlatformTask[] = [
  {
    id: "task-1",
    title: "GitHub 账号与仓库绑定",
    category: "analysis",
    points: 10,
    deadline: "2026-04-01",
    status: "approved",
    description: "绑定个人 GitHub 账号，提交学习仓库并完成 README 项目说明。",
    deliverables: ["GitHub 用户主页链接", "仓库地址", "README 说明"],
    aiCheck: "检查仓库可访问、README 是否包含项目目标与运行步骤。",
  },
  {
    id: "task-2",
    title: "发布 ERC20 合约",
    category: "contract",
    points: 20,
    deadline: "2026-04-07",
    status: "in_progress",
    description: "在测试网部署 ERC20，提供合约地址、部署脚本与验证截图。",
    deliverables: ["测试网合约地址", "部署脚本仓库路径", "区块浏览器链接"],
    aiCheck: "检查合约源码结构、部署脚本存在性与地址格式。",
  },
  {
    id: "task-3",
    title: "投票系统（ERC20 + ERC721）",
    category: "contract",
    points: 25,
    deadline: "2026-04-14",
    status: "pending_review",
    description: "实现支持 ERC20/721 的投票系统，提交演示链接与核心逻辑说明。",
    deliverables: ["前端演示地址", "合约仓库路径", "功能说明文档"],
    aiCheck: "通过 OpenClaw + GitHub webhook 检查变更是否覆盖核心投票逻辑。",
  },
  {
    id: "task-4",
    title: "Uniswap V2 机制实现",
    category: "analysis",
    points: 20,
    deadline: "2026-04-20",
    status: "not_started",
    description: "学习并按个人方案实现 UniswapV2 核心机制，输出对比分析。",
    deliverables: ["实现代码链接", "与源码差异文档", "测试报告"],
    aiCheck: "检查代码变更及文档中的机制说明是否完整。",
  },
  {
    id: "task-5",
    title: "Node.js 后端对接前端",
    category: "backend",
    points: 25,
    deadline: "2026-04-27",
    status: "not_started",
    description: "实现 Node.js API 并联调前端页面，需包含健康检查接口。",
    deliverables: ["API 文档", "前后端联调演示", "health 接口地址"],
    aiCheck: "检查路由结构、状态码处理、接口与前端调用匹配度。",
  },
];

export const reviewQueue = [
  {
    submissionId: "sub-2411",
    student: "张同学",
    task: "投票系统（ERC20 + ERC721）",
    aiScore: 73,
    confidence: 0.61,
    result: "待人工复核",
  },
  {
    submissionId: "sub-2412",
    student: "李同学",
    task: "发布 ERC20 合约",
    aiScore: 88,
    confidence: 0.92,
    result: "建议通过",
  },
  {
    submissionId: "sub-2413",
    student: "王同学",
    task: "GitHub 账号与仓库绑定",
    aiScore: 45,
    confidence: 0.84,
    result: "建议驳回",
  },
];

export const studentProgressList: StudentProgress[] = [
  {
    id: "stu-001",
    name: "张同学",
    githubLogin: "zhang-dev",
    repoUrl: "https://github.com/zhang-dev/cuitbca-camp",
    commitCount: 128,
    completedTaskCount: 4,
    totalTaskCount: 5,
    lastActiveAt: "2026-03-04",
  },
  {
    id: "stu-002",
    name: "李同学",
    githubLogin: "li-builder",
    repoUrl: "https://github.com/li-builder/chain-assoc-training",
    commitCount: 93,
    completedTaskCount: 3,
    totalTaskCount: 5,
    lastActiveAt: "2026-03-03",
  },
  {
    id: "stu-003",
    name: "王同学",
    githubLogin: "wang-solidity",
    repoUrl: "https://github.com/wang-solidity/univ2-lab",
    commitCount: 61,
    completedTaskCount: 2,
    totalTaskCount: 5,
    lastActiveAt: "2026-03-02",
  },
  {
    id: "stu-004",
    name: "赵同学",
    githubLogin: "zhao-web3",
    repoUrl: "https://github.com/zhao-web3/cuitbca-project",
    commitCount: 47,
    completedTaskCount: 2,
    totalTaskCount: 5,
    lastActiveAt: "2026-03-01",
  },
  {
    id: "stu-005",
    name: "陈同学",
    githubLogin: "chen-node",
    repoUrl: "https://github.com/chen-node/task-platform-demo",
    commitCount: 35,
    completedTaskCount: 1,
    totalTaskCount: 5,
    lastActiveAt: "2026-02-28",
  },
];
