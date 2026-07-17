# YAN TUTOR

`YAN TUTOR` 是“邯郸闫老师高中数学物理家教”的综合个人网站家教板块，面向高一、高二学生及家长，说明高中数学 / 高中物理一对一辅导、涉县线下与邯郸线上服务范围，并把咨询入口收敛到首页底部的学习诊断预约表单。

网站保留 React + Vite 技术栈。关键页面会在构建后输出静态 HTML，方便搜索引擎、AI 抓取器和无 JavaScript 环境读取核心正文、标题、描述、canonical、Open Graph 和结构化数据。

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 3
- Framer Motion
- Lucide React
- Resend
- Vercel Serverless Functions

## Pages

当前公开路由：

- `/` 首页，含教师介绍、案例摘要和学习诊断预约表单
- `/tutor` 规范家教实体页
- `/story` 教师故事与服务边界
- `/faq` 常见问题
- `/classroom` 学习内容入口
- `/cases` 经核验匿名案例与授权反馈

旧 hash 路由仍兼容，例如 `#/story`、`#/faq`、`#/classroom`、`#/cases`。旧的 `#/booking` 会回到首页 `#contact`。未知路径和缺失资源应返回自定义 404，不回落到首页。

## Environment Variables

复制模板后填入本地值：

```bash
cp .env.example .env.local
```

必需变量：

| 变量 | 用途 |
|---|---|
| `RESEND_API_KEY` | Resend API Key，用于发送诊断表单通知邮件 |
| `FROM_EMAIL` | 发件邮箱，需在 Resend 中完成验证 |
| `NOTIFY_EMAIL` | 接收诊断表单通知的邮箱 |

可选变量：

| 变量 | 用途 |
|---|---|
| `SITE_URL` | 构建静态 canonical、sitemap、robots 以及 API 来源校验的站点根地址；默认使用 `https://seventeen-yan.cn` |

不要把真实 `.env.local`、API Key、邮箱密钥或 Vercel 本地配置提交入库。

## Development

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

默认开发地址：

```text
http://localhost:5173/
```

本地开发时，前端会向同源 `/api/diagnosis` 提交诊断表单。Vite 只负责前端开发服务；真正的 `/api/diagnosis` 在 Vercel 部署环境中作为 Serverless Function 运行。本地调试接口时可使用 Vercel CLI 的本地开发能力或对 API 处理器运行单元测试。

## Form And Privacy

学习诊断表单采用最小字段方案：

- 联系人称呼
- 家长微信号或手机号
- 学生年级：高一、高二、升高一咨询
- 咨询科目：数学、物理、数学和物理、暂不确定
- 授课偏好：涉县线下、邯郸线上、暂不确定
- 当前成绩区间，可不填
- 学生当前主要问题
- 可沟通时间，可不填
- 未预先勾选的监护人同意

表单不收集学生姓名、学校、班级、详细地址、精确当前分数或目标分数。隐私告知说明用途、Resend 邮件通知、最后一次咨询沟通后 90 天内删除通知邮件，以及通过微信号 `-L09-29` 请求查阅、更正、删除或撤回同意。

`/api/diagnosis` 只接受同源 JSON `POST` 请求，限制请求体最大 8 KB，并包含来源校验、honeypot、最短填写时间、请求 ID、Resend 幂等键和错误回退。`GET /api/diagnosis` 应返回 `405`。

## Build And Test

运行测试：

```bash
npm test
```

生产构建：

```bash
npm run build
```

`npm run build` 会依次执行：

1. `vite build`
2. `node scripts/prerender-static.mjs`
3. `node scripts/generate-sitemap.mjs dist`

构建输出包含：

- 六个规范页面的静态 HTML
- `dist/404.html`
- `dist/sitemap.xml`
- `dist/robots.txt`

本地检查生产构建：

```bash
npm run preview
```

## Sitemap And Robots

sitemap 和 robots 在构建时写入 `dist/`，不是 `public/`。默认站点根地址来自统一实体配置：

```text
https://seventeen-yan.cn
```

如需临时指定其他站点根地址：

```powershell
$env:SITE_URL = "https://seventeen-yan.cn"; npm run build
```

或只重新生成 sitemap 与 robots：

```powershell
$env:SITE_URL = "https://seventeen-yan.cn"; npm run sitemap
```

sitemap 当前应只包含 `/`、`/tutor`、`/story`、`/faq`、`/classroom`、`/cases` 六个规范 URL，不包含 404 或旧 hash 路由。robots 应声明绝对 sitemap 地址。

## WeChat QR

真实二维码图片位于：

```text
public/wechat-qr-cropped.jpg
```

首页预约区会展示二维码和微信号；如果表单提交失败、不同意表单处理或二维码加载失败，页面会提示复制微信号后在微信中搜索添加。

## Deployment

当前项目已关联到现有 Vercel 项目 `u17-17s-projects/seventeen`。本地 `.vercel/` 只保存项目链接信息，已被 `.gitignore` 忽略。

Preview 部署可使用：

```bash
npx --yes vercel@50.28.0 deploy --yes --scope u17-17s-projects
```

Production 部署需要另行获得用户明确授权后再执行：

```bash
npx --yes vercel@50.28.0 deploy --prod --scope u17-17s-projects
```

Vercel 环境变量需在 Dashboard 或 CLI 中为对应环境配置 `RESEND_API_KEY`、`FROM_EMAIL`、`NOTIFY_EMAIL`。Preview 可能启用 Deployment Protection，因此人工或自动 HTTP 验证需要使用已授权的 Vercel 会话或保护绕过机制；Production 发布前还要重新检查状态码、Content-Type、canonical、sitemap、robots、404、OG 和表单接口。
