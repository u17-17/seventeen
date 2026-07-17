# 项目变更日志

## 2026-07-17 外部来源与安全版 TDK

- 用户提供已发布的头条号与百家号文章 URL，登记为 `SRC-001` 与 `SRC-002`。
- 官网首页和 `/tutor` 的静态 TDK 改为安全版“邯郸市闫老师”关键词，不重新暴露真实姓名，不写全市线下或试听承诺。
- 静态 HTML 新增 `keywords` 元标签，并在原始 HTML 正文中自然出现“邯郸市闫老师”。
- 线上生效后，百度普通收录接口重新提交首页和 `/tutor`，返回 `success: 2`。

## 2026-07-17 公开身份口径更新

- 公开网页不再直接展示真实姓名，统一使用“闫老师”。
- 学校更新为河北师范大学，专业更新为教育学。
- 同步更新官网数据源、预渲染输出、结构化数据、表单隐私文案和第一轮外部平台草稿。

## 2026-07-15

### Added

- 建立根级 `AGENTS.md`，固定阶段 0 权限、事实优先级、业务边界、工程命令和发布/验证门。
- 建立 `PRODUCT.md`，记录品牌型站点的用户、目的、人格、反面模式、原则和无障碍待决项。
- 建立项目文档体系：
  - `PROJECT.md`
  - `REQUIREMENTS.md`
  - `ENTITY-PROFILE.md`
  - `ARCHITECTURE.md`
  - `GEO-STRATEGY.md`
  - `WEBSITE-AUDIT.md`
  - `CONTENT-STRATEGY.md`
  - `CONTENT-SOURCES.md`
  - `PLATFORM-GUIDELINES.md`
  - `VALIDATION-PLAN.md`
  - `TEST-QUERIES.md`
  - `DISCUSSION-SYNTHESIS.md`
  - `FORM-PRIVACY-OPTIONS.md`
  - `TASKS.md`
  - `DECISIONS.md`
  - `RISKS.md`
  - `CHANGELOG.md`

### Audit

- 只读扫描 React/Vite/Vercel/Resend 架构和当前内容数据。
- 线上核对首页、独立页、robots、sitemap、未知路径、头像资源、OG 图片和 API 方法响应。
- 确认现有 `npm test` 21/21 通过。
- 识别首要阻塞：目标实体事实缺失、客户端-only 正文/SEO、无效 sitemap、soft 404 和服务区域不一致。
- 识别决策冲突：当前站点并非明显的综合个人站；微信/二维码/Resend 已实现但 PRD 列为待确认；案例/评价证据状态未知。

### Boundaries

- 未修改任何业务代码、页面、样式、依赖、构建或部署配置。
- 未运行产生新构建产物的构建命令。
- 未提交、推送或发布。
- 未创建账号或发布外部内容；豆包正式测试在用户后续批准 T-105 后执行并另行记录。

### Pending

- 登记发布前案例/评价证据与授权编号；
- 确认表单“其他”选项、隐私权利联系渠道、限流和 90 天邮箱清理方式；
- 确认“四层错因诊断表”的四层定义、步骤、适用范围、局限和公开范围；
- 按顺序继续阶段 2 后续任务；外部平台节奏、无障碍等级和地图范围仍待确认。

### Confirmed decisions

- 用户确认目前没有其他个人项目，保留现有主页，只新增个人介绍板块。
- 确认 `/tutor` 为规范家教实体页。
- 确认微信号与二维码同时展示，保留现有 Resend 接口。
- 确认保留 React + Vite，并让关键页面在构建时输出可抓取 HTML。
- 当时确认过旧学校/专业口径；后续已由 2026-07-17 新口径覆盖。
- 确认两个“阶段测评提升约 20 分”案例有证据并允许匿名公开，三条评价已获授权。
- 确认继续展示年龄；当前没有可公开教师照片，不展示照片。
- 当时仍待确认表单字段/隐私、教学经历明细、`YAN TUTOR` 关系、外部发布与正式阶段批准；其中教学经历、表单核心方案、辅助品牌关系和阶段 0 确认已在后续解决。

### Discussion synthesis

- 完整读取私有 ChatGPT 项目的“自动化Geo推词条方案”“堆词条技巧分享”“邯郸GEO搜索优化项目”三段讨论。
- 新增 `DISCUSSION-SYNTHESIS.md`，记录讨论建议的采纳、调整、延后和舍弃结论。
- 将总体策略收敛为：官网事实主源、豆包优先、字节系优先实验、平台内容家族、逐批增加信源、首次成功后再自动化。
- 将外部测试细化为 `WEBSITE-v1`、`BYTE-TEXT-v1`、`BYTE-MEDIA-v1`、`BAIDU-AUX-v1` 和 `OTHER-SOURCES-v1`，并新增 `CORE-v1` 最小对比问题集。
- 区分 I0— I3 技术诊断与 E0—E2 成功判定；精确品牌词、精确新造词和直接 URL 命中不计入首次成功。
- 最初把“邯郸高中数学四层错因诊断表”登记为 D-015 待确认候选；后续用户已确认方法真实使用，但仍不自动宣称原创理论或官方标准。
- 明确舍弃聊天中的具体价格、高三服务、全邯郸线下和一次性大规模铺量建议。
- 将 n8n、Supabase、Dify、WordPress、SaaS 和自动发布统一延后到首次闭环复盘之后，仅保留技术中立的数据模型草案。

### Additional confirmations and form options

- 用户通过截图确认三段教学经历：2026.03—2026.06 高一数学、2026.03—2026.06 高二物理、2025.06—2025.09 初高衔接。
- 为降低未成年人再识别风险，新公开文案建议省略学生性别，但保留已确认的教学内容和阶段结果口径。
- 用户确认“四层错因”是实际使用的方法；后续又确认正式名称为“四层错因诊断表”，完整定义、步骤、适用范围、局限、公开署名方式和公开范围仍在 D-015 中确认。
- 新增 `FORM-PRIVACY-OPTIONS.md`，比较最小邮件通知、邮件加数据库和仅微信三种方案。
- 第一阶段推荐保留 Resend 的无数据库邮件通知方案，成绩改为可选区间、删除目标分数、增加授课偏好和隐私同意；后续用户已确认采用该方案和 90 天留存期限。

### Stage 0 confirmation and BASELINE-v1

- 用户确认阶段 0 审计与任务结果，批准阶段 1 的 T-105 / `BASELINE-v1`；阶段 2 开发仍未批准。
- 用户确认表单采用方案 A“最小邮件通知”，通知邮件在最后一次咨询沟通后 90 天内删除。
- 用户确认“初高衔接”改为“升高一咨询”并作为咨询选项保留，不扩展正式长期服务年级。
- 用户确认教学工具名为“四层错因诊断表”，并确认 `YAN TUTOR` 为辅助品牌。
- 在豆包网页端 Chrome 已登录环境按 CORE-v1 固定顺序执行六个新的独立对话；结果为 E2 0、E1 0、E0 6、EX 0。
- 六题均未出现规范实体名、明确变体、真实姓名字段或 `seventeen-yan.cn`，未达到 I3 或最低成功标准。
- 完整回答、对话 URL、来源限制和六张截图已保存到 `docs/evidence/BASELINE-v1/REPORT.md`。
- 豆包回答中出现的其他机构、教师、电话、地址、价格、资质和案例均保持“未核验外部回答”状态，不进入实体档案或发布内容。

### Stage 2 authorization

- 用户于 2026-07-15 明确批准进入阶段 2 官网开发。
- 阶段 2 继续按 `TASKS.md` 一次执行一个任务，不跳过依赖；外部发布、账号创建、Git 提交和推送仍未授权。
- 阶段 2 授权时，首项 `T-201` 曾因 T-102/T-104 未完成保持阻塞，需先完成证据编号、表单剩余决策、微信具体值复核和 90 天清理方式确认。

### Stage 2 dependency confirmation

- 用户回复“全部按推荐项行动”，确认删除表单“其他”年级选项、隐私权利渠道使用微信 `-L09-29`、现有二维码有效、限流优先使用 Vercel 平台能力、通知邮箱独立标签并每周清理最后沟通超过 90 天的记录。
- 登记案例编号 `CASE-EVID-001/002` 和评价授权编号 `REVIEW-AUTH-001~003`；公开案例删除学生性别并保留“个体结果不代表普遍承诺”，第三条评价将“帮他”脱敏为“帮助孩子”。
- T-102/T-104 依赖解除，T-201 进入执行；仍不授权外部发布、账号创建、Git 提交或推送。

### T-201 entity fact source

- 先写失败测试，确认缺少统一实体事实源会导致 `npm test` 失败。
- 新增 `src/data/entityProfile.js`，集中维护规范实体名、辅助品牌、教师姓名、官网、服务科目、年级、地区和微信/二维码信息。
- `src/data/siteData.js`、`src/utils/seo.js` 和表单失败提示/年级选项改为读取统一事实源；FAQ 中“初高衔接”口径调整为“升高一咨询”。
- SEO 结构化数据的 `name` 改为规范实体名，并保留 `YAN TUTOR` 作为 `alternateName`。
- 新增关键事实漂移测试，防止页面模块重新手写规范名、姓名、官网、服务地区和微信号。
- 验证通过：`npm test` 23/23，`npm run build` 成功。

### T-202 static route HTML

- 先写失败测试，确认缺少构建后静态 HTML 预渲染器会导致 `npm test` 失败。
- 新增 `scripts/prerender-static.mjs`，在 Vite 构建后为 `/`、`/story`、`/faq`、`/classroom`、`/cases` 生成独立 `index.html`。
- `npm run build` 改为 `vite build && node scripts/prerender-static.mjs`，保持 React + Vite 技术栈不迁移。
- 每个预渲染 HTML 写入唯一 H1、核心实体事实、title、description、canonical、Open Graph/Twitter meta 和 JSON-LD；客户端 React 仍正常接管页面。
- 验证通过：`npm test` 26/26，`npm run build` 成功；本地 preview HTTP 检查上述 5 个路由均为 200、`text/html`、唯一 H1、有 canonical、有 JSON-LD、有规范实体名。
- 观察到 `/sitemap.xml` 仍返回 HTML、未知路径仍返回 200 HTML；该问题保留在 T-207，不在 T-202 中修复。

### T-203 canonical tutor page

- 先写失败测试，确认 `/tutor` 尚未进入页面数据、路由和构建后预渲染列表。
- 新增 `/tutor` 规范实体页，使用已确认事实说明实体名、教师、科目、地区、学生、授课方式、经历、匿名案例、FAQ、联系和站内链接。
- `/tutor` 加入顶部/页脚独立页面导航、路由识别和预渲染列表；无尾斜杠 `/tutor` 与带尾斜杠 `/tutor/` 均映射到同一预渲染 HTML。
- 为 Vite preview 增加本地静态路由中间件，避免本地验证时无尾斜杠路径回落到首页 HTML。
- 新页面未包含具体课时价格、高三服务、全邯郸线下承诺、保证提分或未确认的“四层错因诊断表”细节。
- 验证通过：`npm test` 29/29，`npm run build` 成功；本地 preview HTTP 检查 `/tutor` 和 `/tutor/` 均为 200、`text/html`、唯一 H1、正确 title/canonical、JSON-LD 和核心事实；桌面 1440 与移动 390 浏览器检查无控制台 error、无横向溢出。

### T-204 teacher, subjects and service areas

- 按主页与静态页两个切片先写失败测试，再补最小实现；教师身份、两科服务、正式年级、精确范围、无照片呈现和正文链接均有回归覆盖。
- 统一实体事实源新增学校、专业、当前展示年龄和无照片模式；主页 Hero 与个人介绍不再手写这些事实。
- 删除 `AboutSection.jsx` 对缺失 `/teacher-avatar.jpg` 的请求，改用带明确说明的文字身份卡。
- 主页和 `/tutor` 分开说明高中数学、高中物理服务，均明确面向高一、高二；`/story` 增加已确认教师身份与服务边界，`/faq` 改为涉县线下、邯郸市全地区线上精确表达。
- `/tutor` 教师卡链接到 `/story`，`/story` 身份卡链接回 `/tutor`；浏览器实际点击验证双向跳转成功。
- 验证通过：`npm test` 38/38，`npm run build` 成功；禁止词/错误范围/头像路径扫描为 0 命中；4 个相关路由 HTTP 内容矩阵通过；桌面 1440 与移动 390 无控制台 error、无横向溢出、无教师头像请求。

### T-205 verified cases, FAQ and learning content

- 先用失败测试固定案例证据编号、评价授权编号、脱敏规则、FAQ 边界、学习内容元数据和无 JavaScript 静态正文要求。
- 新增 `src/data/contentData.js` 作为文件式内容源，只登记 `CASE-EVID-001/002`、`REVIEW-AUTH-001~003` 和三条主题摘要；首页经历与评价、`/tutor` 和 `/cases` 复用经核验集合。
- `/cases` 删除对未登记公式推导、立体几何板书的页面引用，只呈现匿名案例、证据编号、结果边界和已授权匿名反馈；原图片文件保留在磁盘但不再公开引用。
- `/faq` 统一服务范围、咨询隐私、案例结果、评价授权和不公开具体价格边界；`/classroom` 更名为“学习内容”，以内容编号、内容家族、作者、更新时间、适用对象和来源支持后续文件式扩展，不创建未确认文章 URL。
- 预渲染器同步输出案例证据与学习资源元数据，核心内容在禁用 JavaScript 时仍可读取；D-015 尚未确认的“四层错因诊断表”细节未进入页面。
- 验证通过：`npm test` 52/52，`npm run build` 成功；`/cases`、`/faq`、`/classroom` 本地 HTTP 为 200、`text/html`、唯一 H1 和正确 canonical；桌面 1440、移动 390 与 320 检查无内容横向溢出、无控制台 warning/error。sitemap 与真实 404 的既有问题继续留在 T-207。

### T-206 consultation form and WeChat fallback

- 先用失败测试固定已批准的最小字段、允许值、隐私告知、监护人同意、反滥用上下文和 API 安全边界。
- 表单删除精确当前分数与目标分数，增加授课偏好、可选成绩区间、完整隐私告知和未预先勾选的同意；失败或不同意表单处理时保留微信号、二维码和可复制咨询摘要。
- 前后端共用字段允许值与长度限制；`/api/diagnosis` 增加 JSON/8 KB/来源检查、真实 honeypot、最短填写时间、请求 ID、Resend 幂等键、HTML 转义、配置/发送失败回退和不含个人信息的结果日志。
- 13 项 API 测试均使用虚构数据与注入的邮件发送器，没有发送真实邮件；`npm test` 72/72，`npm run build` 成功。
- 浏览器验证覆盖必填错误、隐私同意、提交失败微信回退、二维码、字段标签、重复 ID、键盘顺序和 320/768/1024/1440 响应式宽度；无内容横向溢出。本地预览仅出现未部署 Vercel Analytics 时的预期提示。
- Vercel 平台级速率限制、通知邮箱独立标签和最后沟通后 90 天清理流程未作为本地代码伪实现，需在发布配置和运营验收时核对；未执行发布、Git 提交或推送。

### T-207 crawl discovery, social metadata and 404

- 先用失败测试固定 sitemap 路由清单、robots 声明、完整静态 Open Graph、真实 404、缺失资源行为、客户端畸形路径和 Vercel 不再全量重写首页。
- 重写 sitemap 生成器，从共享静态路由生成 6 个规范 URL，并在生产构建中同时输出 `dist/sitemap.xml` 和 `dist/robots.txt`；`/tutor` 已纳入，404 未进入 sitemap。
- 预渲染头部统一输出唯一 canonical、`index,follow`、完整 Open Graph/Twitter 字段与绝对分享图 URL；404 使用 `noindex,follow`，不输出 canonical、OG 或结构化数据。
- 构建新增静态 `404.html`，客户端新增同源可访问错误页；移除 Vercel catch-all SPA rewrite，本地 preview 对未知页面、缺失资源和旧头像路径返回真实 404。路由解码对畸形百分号路径失败关闭，不再导致客户端渲染中断。
- 验证通过：`npm test` 84/84，`npm run build` 成功；本地真实 HTTP 矩阵中 6 个规范页面为 200 HTML，sitemap 为 200 XML，robots 为 200 text，未知页面与缺失资源为 404；404 页完成 320/768/1024/1440、元数据、链接和控制台检查。
- 用户明确批准关联现有 Vercel 项目并创建一条 Preview；本地确定性关联 `u17-17s-projects/seventeen`，没有新建项目，`.vercel` 已加入 `.gitignore`。
- Preview `https://seventeen-o2recfl5h-u17-17s-projects.vercel.app` 为 Ready；远程构建成功，target 为 preview，Production 域名和内容未变更。
- 受保护 Preview 使用 Vercel CLI bypass 完成真实 HTTP 矩阵：6 个规范页面、sitemap、robots、分享图、三类 404 和 API 方法响应全部符合 T-207 验收；Preview 统一带平台级 `X-Robots-Tag: noindex`。非法百分号编码由 Vercel 边缘层返回 400，不会回落首页。
- T-207 已完成并解除 T-208 依赖；R-002/R-008 保留到 Production 发布后复核关闭。本次未执行 Production 部署、Git 提交或推送。

### T-208 documentation and runbook

- 重写 README，使运行说明与当前实现一致：React + Vite 静态预渲染、Resend 邮件通知、Vercel Serverless Function、真实 404、构建产物中的 sitemap/robots 和 Preview/Production 部署边界。
- README 记录当前公开路由、旧 hash 兼容、诊断表单字段、隐私告知、90 天通知邮件删除、8 KB 请求体限制、来源校验、honeypot、最短填写时间、请求 ID 和 API 方法限制。
- `.env.example` 保留 `RESEND_API_KEY`、`FROM_EMAIL`、`NOTIFY_EMAIL` 空占位，新增非密钥 `SITE_URL=https://seventeen-yan.cn`，并说明 `.env.local`、API Key、邮箱密钥和 `.vercel/` 不应入库。
- 验证 README 中的新环境关键命令：`npm ci --dry-run`、`npm test`、`npm run build`、`$env:SITE_URL = "https://seventeen-yan.cn"; npm run sitemap`；同时执行 `git diff --check`、ignore 检查和密钥模式扫描。
- T-208 已完成并解除 T-209 依赖。本次未执行 Production 部署、Git 提交或推送。

### T-209 pre-release website acceptance

- 执行官网发布前整体验收，覆盖单元测试、生产构建、显式 sitemap 生成、本地 production preview HTTP/SEO 矩阵、404/缺失资源、内容禁区扫描和浏览器端到端检查。
- 验收中发现本地 preview 会因 `@vercel/analytics` 请求 `/_vercel/insights/script.js` 产生控制台 404；先写失败测试，再新增 Analytics 加载门，使 localhost、局域网和保留测试网段不加载 Vercel Analytics，正式域名和 Vercel preview 域名仍加载。
- 验证通过：`npm test` 86/86，`npm run build` 成功，`$env:SITE_URL = "https://seventeen-yan.cn"; npm run sitemap` 成功。
- 本地 HTTP 矩阵通过：6 个公开路由均为 200 HTML，唯一 H1、canonical、JSON-LD、完整 OG 且包含规范实体名；sitemap、robots、分享图均返回正确类型；未知页、缺失脚本和旧头像路径均为自定义 404，不回落首页。
- 浏览器矩阵通过：Chrome 覆盖 1440、768、390、320 四个宽度与 28 个路由/视口组合，无横向溢出、无错误覆盖层、公开页面无控制台 error/warning、无资源失败；移动端导航到 `/tutor`、微信入口、二维码、年级选项、隐私同意和空提交错误提示均通过。
- 发布面内容扫描通过：源码非测试文件和 `dist` HTML/XML/TXT 中，高三服务、全市线下、具体价格、旧头像路径和未确认四层定义均为 0 命中。
- T-209 已完成。Production 部署、外部内容发布、账号创建、Git 提交和推送仍未授权；R-002/R-008 的 Production 复核保留到用户批准上线后执行。

### WEBSITE-v1 production validation

- 用户先批准执行官网上线后验证；生产站 `https://seventeen-yan.cn` 已公开可访问，6 个规范页面均为 200 HTML，sitemap、robots、百度验证文件、分享图和真实 404 行为均通过。
- 百度普通收录 API 已成功提交 6 个规范 URL；本次脚本搜索检查中，百度结果文本尚未显示目标域名，Google 的 `site:` 查询已出现目标域名。该观察只记录当前发现状态，不代表永久收录结论。
- 用户随后在 Codex 内置浏览器登录豆包；按 `TEST-QUERIES v1.0 / CORE-v1` 执行 6 个新的独立对话，并保存回答文本和截图到 `docs/evidence/WEBSITE-v1/`。
- `WEBSITE-v1` 结果为 `E2 0 / E1 0 / E0 6 / EX 0`；未出现规范实体名、明确变体、真实姓名字段或 `seventeen-yan.cn`，未达到最低成功标准。
- 更新 `TASKS.md`、`TEST-QUERIES.md`、`CONTENT-SOURCES.md` 和 `docs/evidence/WEBSITE-v1/REPORT.md`；下一步不能跳到外部发布，仍需阶段 3 的账号、内容和发布批准。
