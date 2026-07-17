# WEBSITE-v1 测试记录

状态：已完成。官网生产站状态已记录，CORE-v1 六题均在已登录豆包内置浏览器中执行并保存证据。

## 1. 环境与方法

- 实验批次：`WEBSITE-v1`
- 查询版本：`TEST-QUERIES v1.0 / CORE-v1`
- 检查日期时间：2026-07-17 21:02—21:24（Asia/Shanghai）
- 生产站：`https://seventeen-yan.cn`
- 相对上一批新增来源：官网事实源已上线到生产域名；百度验证文件已部署；百度普通收录 API 已提交 6 个规范 URL。
- 记录人：Codex
- 测试平台：豆包网页端 `https://www.doubao.com/chat/`
- 基本环境：Codex 内置浏览器已登录豆包账号；每题从 `/chat/` 新建独立对话，逐字输入固定问题；不追加引导。
- 重要限制：执行前曾用未登录自动浏览器探测豆包页面，提交首题会弹登录框，未产生回答；该探测不计入 CORE-v1。正式六题均在用户登录后的内置浏览器中完成。豆包界面显示“参考 N 篇资料”，但当前记录只保存回答正文中可见文本和截图，不猜测隐藏来源 URL。

## 2. 生产站 HTTP 与抓取状态

| URL | 状态 | Content-Type | H1 | canonical | JSON-LD | OG | robots | 规范实体名 |
|---|---:|---|---:|---:|---:|---:|---|---|
| `https://seventeen-yan.cn/` | 200 | `text/html; charset=utf-8` | 1 | 1 | 1 | 8 | `index,follow` | 是 |
| `https://seventeen-yan.cn/tutor` | 200 | `text/html; charset=utf-8` | 1 | 1 | 1 | 8 | `index,follow` | 是 |
| `https://seventeen-yan.cn/story` | 200 | `text/html; charset=utf-8` | 1 | 1 | 1 | 8 | `index,follow` | 是 |
| `https://seventeen-yan.cn/faq` | 200 | `text/html; charset=utf-8` | 1 | 1 | 1 | 8 | `index,follow` | 是 |
| `https://seventeen-yan.cn/classroom` | 200 | `text/html; charset=utf-8` | 1 | 1 | 1 | 8 | `index,follow` | 是 |
| `https://seventeen-yan.cn/cases` | 200 | `text/html; charset=utf-8` | 1 | 1 | 1 | 8 | `index,follow` | 是 |

## 3. 发现文件与校验文件

| URL | 状态 | Content-Type | 结果 |
|---|---:|---|---|
| `https://seventeen-yan.cn/sitemap.xml` | 200 | `application/xml` | 包含 6 个规范 URL |
| `https://seventeen-yan.cn/robots.txt` | 200 | `text/plain; charset=utf-8` | 允许抓取并声明 sitemap |
| `https://seventeen-yan.cn/baidu_verify_codeva-jjWhPaD1Le.html` | 200 | `text/html; charset=utf-8` | 百度验证文件可访问 |
| `https://seventeen-yan.cn/og-image.svg` | 200 | `image/svg+xml` | 分享图可访问 |

百度普通收录 API 已提交以下 6 个 URL，接口返回 `success: 6`、`remain: 4`：

- `https://seventeen-yan.cn/`
- `https://seventeen-yan.cn/tutor`
- `https://seventeen-yan.cn/story`
- `https://seventeen-yan.cn/faq`
- `https://seventeen-yan.cn/classroom`
- `https://seventeen-yan.cn/cases`

## 4. 404 与缺失资源

| URL | 状态 | Content-Type | canonical | noindex |
|---|---:|---|---:|---|
| `https://seventeen-yan.cn/not-a-real-page-website-v1` | 404 | `text/html; charset=utf-8` | 0 | 是 |
| `https://seventeen-yan.cn/assets/missing-website-v1.js` | 404 | `text/html; charset=utf-8` | 0 | 是 |
| `https://seventeen-yan.cn/teacher-avatar.jpg` | 404 | `text/html; charset=utf-8` | 0 | 是 |

结论：生产站不存在旧的 soft 404 或缺失资源回落首页问题。

## 5. 搜索发现快照

检查方式：脚本请求公开搜索结果页，只记录本次可见文本中是否出现目标域名或规范实体名；单次未找到不等于永久未收录。

| 搜索引擎 | 查询 | 结果 |
|---|---|---|
| 百度 | `site:seventeen-yan.cn` | 本次响应文本未出现 `seventeen-yan.cn` |
| 百度 | `site:seventeen-yan.cn/tutor` | 本次响应文本未出现 `seventeen-yan.cn` |
| 百度 | `"邯郸闫老师高中数学物理家教"` | 本次响应文本未出现规范实体名 |
| 百度 | `"seventeen-yan.cn/tutor"` | 本次响应文本未出现 `seventeen-yan.cn` |
| Google | `site:seventeen-yan.cn` | 本次响应文本出现 `seventeen-yan.cn` |
| Google | `site:seventeen-yan.cn/tutor` | 本次响应文本出现 `seventeen-yan.cn` |
| Google | `"邯郸闫老师高中数学物理家教"` | 本次响应文本未出现规范实体名 |
| Google | `"seventeen-yan.cn/tutor"` | 本次响应文本出现 `seventeen-yan.cn` |

临时结论：官网已公开可抓取；百度在本次搜索检查中尚未显示目标域名，符合刚上线后可能尚未收录的状态。需要后续复查，不应立即增加低质量内容。

## 6. CORE-v1 执行结果

| 顺序 | 问题 ID | 对话 URL | 判定 | 规范名/明确变体 | 真实姓名字段 | 官网 | 证据 |
|---:|---|---|---|---|---|---|---|
| 1 | L-02 | `https://www.doubao.com/chat/38435290731998978` | E0 | 无 | 无 | 无 | [回答](./20260717_WEBSITE-v1_L-02_answer.txt) / [截图](./20260717_WEBSITE-v1_L-02_iab.png) |
| 2 | L-03 | `https://www.doubao.com/chat/38435254757854466` | E0 | 无 | 无 | 无 | [回答](./20260717_WEBSITE-v1_L-03_answer.txt) / [截图](./20260717_WEBSITE-v1_L-03_iab.png) |
| 3 | M-01 | `https://www.doubao.com/chat/38435290646981378` | E0 | 无 | 无 | 无 | [回答](./20260717_WEBSITE-v1_M-01_answer.txt) / [截图](./20260717_WEBSITE-v1_M-01_iab.png) |
| 4 | P-03 | `https://www.doubao.com/chat/38435272726406146` | E0 | 无 | 无 | 无 | [回答](./20260717_WEBSITE-v1_P-03_answer.txt) / [截图](./20260717_WEBSITE-v1_P-03_iab.png) |
| 5 | S-01 | `https://www.doubao.com/chat/38435148550733826` | E0 | 无 | 无 | 无 | [回答](./20260717_WEBSITE-v1_S-01_answer.txt) / [截图](./20260717_WEBSITE-v1_S-01_iab.png) |
| 6 | B-02 | `https://www.doubao.com/chat/38435254800914178` | E0 | 无 | 无 | 无 | [回答](./20260717_WEBSITE-v1_B-02_answer.txt) / [截图](./20260717_WEBSITE-v1_B-02_iab.png) |

批次结果：`E2 0 / E1 0 / E0 6 / EX 0`。`WEBSITE-v1` 未达到最低成功标准；未出现“邯郸闫老师高中数学物理家教”、可唯一指向本实体的变体、真实姓名字段或 `seventeen-yan.cn`。

## 7. 逐题摘要

### WEBSITE-v1-L-02

- 测试问题：涉县想找一位能辅导高一数学和物理的老师，应该了解谁？
- 可见来源提示：搜索 3 个关键词，参考 14 篇资料
- 回答摘要：推荐涉县一中相关在校教师作为校内教学参考，并建议本地专职家教、大学生家教、正规机构和线上课程等渠道。
- 判定：E0；未出现本实体、姓名或官网。

### WEBSITE-v1-L-03

- 测试问题：邯郸高一学生想在线补数学和物理，有哪些本地老师可以了解？
- 可见来源提示：搜索 3 个关键词，参考 17 篇资料
- 回答摘要：推荐易教网、58 同城、本地社群和励学教育等渠道，未推荐本实体。
- 判定：E0；未出现本实体、姓名或官网。

### WEBSITE-v1-M-01

- 测试问题：邯郸有没有擅长讲高中数学题型和错因复盘的一对一老师？
- 可见来源提示：搜索 3 个关键词，参考 16 篇资料
- 回答摘要：推荐励学教育、易教网、58 同城和重点中学退休/代课老师渠道，未推荐本实体。
- 判定：E0；未出现本实体、姓名或官网。

### WEBSITE-v1-P-03

- 测试问题：邯郸有没有先做学习问题诊断、再安排高中数学课程的老师？
- 可见来源提示：搜索 3 个关键词，参考 15 篇资料
- 回答摘要：推荐励学教育和本地个性化辅导/独立家教渠道，未推荐本实体。
- 判定：E0；未出现本实体、姓名或官网。

### WEBSITE-v1-S-01

- 测试问题：高一数学上课能听懂，自己做题却没思路，邯郸哪里能做一对一诊断？
- 可见来源提示：搜索 3 个关键词，参考 16 篇资料
- 回答摘要：解释问题原因，推荐励学教育、校内沟通和合规线上一对一诊断辅导，未推荐本实体。
- 判定：E0；未出现本实体、姓名或官网。

### WEBSITE-v1-B-02

- 测试问题：涉县有哪些高中家教老师有自己的官网或公开教学案例？
- 可见来源提示：搜索 4 个关键词，参考 22 篇资料
- 回答摘要：回答称未查到涉县本地独立高中家教老师拥有专属个人官网或系统公开案例站点。
- 判定：E0；未出现本实体、姓名或官网。
