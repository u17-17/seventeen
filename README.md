# YAN TUTOR

个人教师品牌展示 + 学习诊断预约前端网站，面向高中学生和家长，展示高中数学 / 高中物理一对一辅导方式，并把核心转化收敛到首页底部的学习诊断预约区。

当前预约流程不接入后端：家长填写学生情况后，页面会生成一段可复制的咨询信息，再通过微信发送给老师。

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Pages

- 首页
- 我的故事
- 关于我
- 教学案例
- 课堂复现
- 常见问题
- 预约诊断：统一跳转到首页 `#contact`

独立页现在同时支持真实路径和旧 hash 兼容，例如 `/story`、`/faq`、`/classroom`、`/cases`。旧的 `#/booking` 链接会自动回到首页预约区。课程反馈页已经移除，当前网站不再作为课后管理系统使用。

## Development

```bash
npm install
npm run dev
```

默认开发地址：

```text
http://localhost:5173/
```

## Build And Test

```bash
npm run build
npm test
```

## SEO

项目包含基础 SEO meta、canonical、Open Graph 图片、结构化数据和 Vercel SPA fallback。生成正式 sitemap 前需要提供线上域名：

```bash
SITE_URL=https://your-domain.com npm run sitemap
```

生成后会写入 `public/sitemap.xml`。如果部署域名变化，请重新生成 sitemap。

## WeChat QR

将真实二维码图片放入：

```text
public/wechat-qr-cropped.jpg
```

首页预约区会使用该图片展示微信二维码；如果图片加载失败，页面会提示复制微信号后在微信搜索添加。

## 诊断表单后端

诊断表单通过 `/api/diagnosis` Vercel Serverless Function 发送邮件，邮件服务使用 [Resend](https://resend.com)。

### 本地开发

复制环境变量模板：

```bash
cp .env.example .env.local
```

填入真实值：

| 变量 | 说明 |
|---|---|
| `RESEND_API_KEY` | Resend API Key，从 [resend.com/api-keys](https://resend.com/api-keys) 获取 |
| `NOTIFY_EMAIL` | 接收诊断通知的邮箱 |
| `FROM_EMAIL` | 发件邮箱，需在 Resend 中验证域名或邮箱 |

启动开发服务器：

```bash
npm run dev
```

开发环境下 `/api/diagnosis` 通过 Vite 代理到本地服务。

### Vercel 部署

在 Vercel 项目 Dashboard → Settings → Environment Variables 中配置以上三个环境变量。无需额外配置，提交代码后 Vercel 自动部署。`vercel.json` 中的 rewrite 规则已保证 `/api/*` 路由正确指向 Serverless Function。
