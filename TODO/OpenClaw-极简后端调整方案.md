# OpenClaw + 极简后端调整方案

## 1. 目标

按你的新方案，后端不做复杂业务，只做 4 件事：
- GitHub 登录
- 学员提交记录存储
- 接收 GitHub webhook
- 调用 OpenClaw 并回写结果

OpenClaw 与后端可部署在同一台服务器。

## 2. 推荐最小架构

- 前端：Next.js（你已完成页面）
- 后端：Node.js（Express/NestJS 均可，建议 Express 先跑通）
- 数据库：SQLite（首期最省事）
- 队列：先不引入 Redis，首期可进程内异步任务
- AI 评审：OpenClaw HTTP API（同机 `localhost` 调用）

## 3. 最小数据表

- `users`
  - `id`, `github_id`, `github_login`, `avatar_url`, `created_at`
- `submissions`
  - `id`, `user_id`, `task_id`, `repo_url`, `target_ref`, `note`, `status`, `created_at`
- `reviews`
  - `id`, `submission_id`, `provider`, `score`, `decision`, `confidence`, `summary`, `raw_json`, `created_at`
- `webhook_events`
  - `id`, `delivery_id`, `event_type`, `repo_full_name`, `payload_json`, `processed_at`

## 4. 最小接口

- `GET /api/auth/github/start`
  - 重定向到 GitHub OAuth
- `GET /api/auth/github/callback`
  - 换 token，拉用户信息，写 `users`，建 session
- `POST /api/submissions`
  - 前端提交任务材料
- `GET /api/submissions/me`
  - 返回当前用户的提交记录和评审结果
- `POST /api/integrations/github/webhook`
  - 验签，记录 event，异步触发 OpenClaw
- `POST /api/reviews/:submissionId/override`
  - 人工改判

## 5. webhook -> OpenClaw 链路

1. GitHub 发送 `push` / `pull_request` 到 `/api/integrations/github/webhook`。  
2. 后端校验 `X-Hub-Signature-256`。  
3. 用 `X-GitHub-Delivery` 做幂等，防止重复处理。  
4. 按 `repo + 分支 + commit` 匹配最近 `submission`。  
5. 组装评审输入（任务 rubric + 代码变更信息）调用 OpenClaw。  
6. 将 `score/decision/confidence/summary` 写入 `reviews`。  
7. 更新 `submissions.status` 为 `approved/rejected/pending_manual_review`。  

## 6. OpenClaw 同机部署建议

- OpenClaw 服务监听：`127.0.0.1:8088`
- 后端服务监听：`0.0.0.0:3001`
- Nginx 反代：
  - `/api/*` -> `3001`
  - OpenClaw 不对公网暴露，仅后端内网访问

## 7. 需要新增的环境变量

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `GITHUB_WEBHOOK_SECRET`
- `SESSION_SECRET`
- `DATABASE_URL`（SQLite 可用 `file:./data.db`）
- `OPENCLAW_BASE_URL`（例如 `http://127.0.0.1:8088`）
- `OPENCLAW_API_KEY`（如有）
- `AI_SCORE_THRESHOLD`（默认 70）
- `AI_CONFIDENCE_THRESHOLD`（默认 0.7）

## 8. 前端要配合的点

- 报名页只保留 GitHub 登录
- 任务详情页提交 `repo_url + target_ref + note`
- 我的进度页读取 `/api/submissions/me`
- 管理台展示 `reviews` + 支持人工改判

## 9. 首期上线顺序（建议）

1. 先通 GitHub OAuth 登录。  
2. 再通提交存储。  
3. 接 webhook 并落库（不调用 AI）。  
4. 最后接 OpenClaw 自动评审。  
5. 加人工改判接口，闭环完成。  

