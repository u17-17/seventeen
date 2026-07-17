# 技术架构与改造边界

状态：阶段 0 只读记录。本文不授权技术栈、路由或部署变更。

## 1. 当前架构

```text
Browser
  └─ Vercel static deployment
       ├─ index.html + Vite assets
       ├─ SPA rewrite → /index.html
       └─ /api/diagnosis → Vercel Serverless Function → Resend → notification email

React App
  ├─ App.jsx: 首页/静态页选择与客户端转场
  ├─ routing.js: pathname + legacy hash 路由
  ├─ siteData.js: 首页和联系事实
  ├─ pageData.js: /story /faq /classroom /cases 内容
  ├─ seo.js + Seo.jsx: 客户端注入元数据与 JSON-LD
  └─ ConsultationForm.jsx: 表单校验、POST、复制咨询信息
```

## 2. 技术栈

| 层 | 当前实现 |
|---|---|
| UI | React 19.2.1 |
| 构建 | Vite 7.2.4 |
| 样式 | Tailwind CSS 3.4.18 |
| 动效 | Framer Motion 12.23.24 |
| 图标 | Lucide React 0.562.0 |
| 分析 | Vercel Analytics 2.0.1 |
| API | Vercel Node Function |
| 邮件 | Resend 6.12.3 |
| 测试 | Node.js 内置 test runner |
| 部署 | Vercel |

当前仓库分支为 `main`，只读审计时 HEAD 为 `86a8bf4`。线上部署与本地 HEAD 的准确对应关系尚未通过部署记录确认。

## 3. 当前路由与内容

| URL | 客户端页面 | 原始 HTML |
|---|---|---|
| `/` | 家教品牌首页 | 空 `#root`，仅通用 meta |
| `/story` | 我的故事 | 与首页相同的空 SPA shell |
| `/faq` | FAQ | 与首页相同的空 SPA shell |
| `/classroom` | 课堂复现 | 与首页相同的空 SPA shell |
| `/cases` | 教学案例 | 与首页相同的空 SPA shell |
| 任意未知路径 | 客户端回落到首页 | HTTP 200 + 首页 shell |

正文、独立标题、canonical 和结构化数据在浏览器执行 JavaScript 后才出现。现状适合普通 SPA 交互，但不满足 PRD 对“官网事实源可被抓取器直接读取”的强要求。

## 4. 当前数据流

### 内容

静态文案主要硬编码在两个 JavaScript 文件中，尚无 CMS。这个规模在第一阶段可维护，但实体事实分散在页面、SEO、表单错误文案、README 和 API 中，存在事实漂移风险。

### 预约

表单在客户端校验后：

1. 生成可复制的微信咨询文本；
2. POST 到 `/api/diagnosis`；
3. Serverless Function 再校验并通过 Resend 发邮件；
4. 失败时引导用户直接添加微信。

用户已确认保留该 Resend 流程，并同时展示微信号和二维码。表单具体字段、数据保留、隐私告知和反滥用方案仍待确认，因此当前接口不能直接视为已完成验收。

## 5. 当前测试覆盖

`npm test` 在 2026-07-15 通过 21/21 项，覆盖：

- 静态页面数据完整性；
- 路由和旧 hash 兼容；
- 客户端 SEO 辅助函数；
- 表单校验、咨询信息生成和剪贴板回退。

未覆盖：

- 真实 HTTP 状态和 Content-Type；
- 原始 HTML 可抓取内容；
- sitemap/robots/404；
- API 限流、环境变量和邮件失败；
- 浏览器端表单端到端提交；
- 隐私告知、授权与内容事实一致性；
- 响应式、视觉回归和无障碍自动检查。

## 6. 改造目标架构能力

后续方案无论选择何种技术，都必须提供：

- 关键路由返回包含核心正文和元数据的 HTML；
- 一个集中、可审阅的实体事实源；
- 可扩展的文章、案例、FAQ 和来源记录模型；
- 真实 404；
- 构建时生成有效 sitemap；
- 每页唯一 SEO 和适当 JSON-LD；
- 表单隐私、反滥用、可观测性和失败回退；
- 保留现有主页，仅新增个人介绍板块和 `/tutor` 规范实体页。

## 7. 技术路径决策

| 路径 | 优点 | 风险/成本 |
|---|---|---|
| **A. 保留 Vite/React，构建时预渲染关键路由** | **已选择；改动较小，保留现有组件** | 需要可靠的预渲染、每路由输出与部署测试 |
| B. 关键事实页使用静态 HTML/MD 构建，交互区继续 React | 未选择 | 页面模板与 SPA 组件可能出现双轨维护 |
| C. 迁移到支持 SSG/SSR 的框架 | 未选择 | 属于技术栈变更，成本和回归范围最大 |

用户于 2026-07-15 确认路径 A。实现不得借预渲染任务迁移框架；`/`、`/tutor` 和批准的关键页面必须用原始 HTML 验收。

## 8. 项目结构建议（未授权实施）

```text
src/
├─ components/       UI 组件
├─ data/             实体与页面数据
├─ pages/            页面或路由入口
├─ services/         提交等外部交互
└─ utils/            SEO、路由、校验
api/                 Serverless Functions（若批准保留）
public/              可公开静态资源、robots、sitemap
docs/                需求、事实、来源和验证记录
tests or src/*.test  单元与集成测试
```

## 9. 架构决策门

D-001、D-002、D-004、D-005、D-006、D-007 和 D-013 已确认。进入表单开发前仍必须解决 D-003、D-009 和 D-014；实体与页面开发前仍需解决 D-012。四层方法页面还需要完成 D-015 的公开定义。

## 10. 首次闭环后的自动化候选

项目聊天中提出 n8n、Supabase/Postgres、Dify、WordPress、自动提交和多租户系统。它们当前都不是已选技术，也不进入阶段 2—4。

只有首次 E1/E2 完成、T-501 复盘且用户通过 T-502 选择继续后，才先设计以下技术中立的数据模型：

| 对象 | 主要字段 | 人工控制点 |
|---|---|---|
| `entity_facts` | 字段、值、状态、证据、更新时间 | 新事实和公开范围批准 |
| `topics` | 用户问题、意图、受众、科目、优先级 | 选题和服务边界审核 |
| `content_assets` | 内容家族、官网主稿、平台版本、事实版本 | 内容事实、案例和脱敏审核 |
| `publications` | 平台、账号、URL、批次、公开/发现/收录状态 | 账号和实际发布批准 |
| `validation_runs` | 批次、查询、环境、回答、来源、E/I 判定 | 有效性和成功判定 |
| `evidence_records` | 案例、授权、截图、内部编号、访问范围 | 敏感原件访问控制 |

可自动化的范围：草稿生成、平台格式转换、链接检查、状态提醒、sitemap/提交任务和结果汇总。

必须保留人工审核的范围：实体事实确认、案例与评价授权、未成年人脱敏、平台发布、测试有效性和成功判定。自动发布、自动注册账号、多租户和商业化需再次单独批准。
