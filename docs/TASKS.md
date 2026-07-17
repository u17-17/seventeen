# 项目任务清单

状态定义：`[x]` 已完成，`[ ]` 未开始，`[~]` 进行中，`[!]` 被决策或外部状态阻塞。  
阶段 0 和阶段 1 已完成；用户已批准进入阶段 2。阶段 2 仍按依赖一次执行一个任务，阶段 3 及其后任务仍需另行批准。

## 0. 阶段 0：文档与只读审计

- [x] T-001 建立项目、需求和实体档案
  - Acceptance：目标、范围、事实、禁区和成功标准可追踪。
  - Verify：逐项对照 PRD v1.0。
  - Files：`PROJECT.md`、`REQUIREMENTS.md`、`ENTITY-PROFILE.md`。

- [x] T-002 完成源码与线上只读审计
  - Acceptance：记录源码架构、线上 HTTP、SEO/GEO、内容、表单、UI 技术风险和正向发现。
  - Verify：`npm test`；`curl` 检查首页、独立页、robots、sitemap、404、资源和 API 方法。
  - Files：`ARCHITECTURE.md`、`WEBSITE-AUDIT.md`。

- [x] T-003 建立 GEO、内容、平台与验证方案
  - Acceptance：能够在不临时发明规则的情况下制作内容、登记信源和执行测试。
  - Verify：交叉检查实体、来源字段和成功判定。
  - Files：`GEO-STRATEGY.md`、`CONTENT-STRATEGY.md`、`CONTENT-SOURCES.md`、`PLATFORM-GUIDELINES.md`、`VALIDATION-PLAN.md`、`TEST-QUERIES.md`、`DISCUSSION-SYNTHESIS.md`。

- [x] T-004 建立决策、风险、变更和执行规则
  - Acceptance：所有 PRD 禁止自行确定的事项都有决策 ID，风险有缓解措施，AGENTS 约束与文档一致。
  - Verify：文档链接与状态检查。
  - Files：`DECISIONS.md`、`RISKS.md`、`CHANGELOG.md`、`AGENTS.md`、`PRODUCT.md`。

- [x] T-005 用户确认阶段 0 结果
  - Acceptance：用户明确批准审计、任务优先级和准备进入的下一阶段。
  - Verify：用户确认记录进入 `DECISIONS.md`。
  - 结果：用户于 2026-07-15 确认阶段 0，并批准先执行 T-105；阶段 2 未获批准。

## 1. 阶段 1：决策与基线

- [x] T-101 确认综合个人网站基线
  - Acceptance：确认没有其他个人项目或待迁移来源；保留现有主页，只新增个人介绍板块。
  - Verify：D-005、D-006 已记录用户确认。
  - 依赖：已解除。

- [x] T-102 确认身份、案例和评价证据
  - Acceptance：学校/专业、教学经历、提分案例、评价、年龄、照片和 `YAN TUTOR` 辅助品牌关系已确认；已登记发布前证据/授权编号。
  - Verify：更新 `ENTITY-PROFILE.md` 和证据台账。
  - 结果：案例编号 `CASE-EVID-001`、`CASE-EVID-002`；评价授权编号 `REVIEW-AUTH-001` 至 `REVIEW-AUTH-003`；公开口径删除学生性别，保留“个体结果不代表普遍承诺”提示。

- [!] T-102A 确认“四层错因”教学工具的公开细节
  - Acceptance：真实性、正式名称“四层错因诊断表”和署名“闫奕龙”已确认；继续确认四层定义与顺序、步骤、适用范围、局限和公开范围。
  - Verify：D-015 和 `ENTITY-PROFILE.md` 状态一致。
  - 依赖：D-015 剩余公开细节；不阻塞不含该工具的官网开发。

- [x] T-103 确认家教板块 URL 与抓取架构
  - Acceptance：`/tutor` 为规范家教页；保留 React + Vite，采用构建时静态输出/预渲染。
  - Verify：D-001、D-004 已记录用户确认。
  - 依赖：已解除。

- [x] T-104 确认联系、表单和隐私方案
  - Acceptance：微信号和二维码同时展示、保留 Resend、方案 A、推荐字段、90 天留存、“升高一咨询”、删除“其他”选项、隐私权利联系渠道、限流方式和实际清理方式均已确认。
  - Verify：决策与表单验收用例完整。
  - 结果：微信号 `-L09-29` 与现有二维码有效；隐私权利渠道使用该微信号；限流优先使用 Vercel 平台能力，暂不增加共享存储；通知邮箱使用独立标签，每周清理最后沟通超过 90 天的记录。

- [x] T-105 执行 BASELINE-v1
  - Acceptance：选择的固定问题均在新对话执行，记录完整且不含品牌引导。
  - Verify：每条记录可按 E2/E1/E0/EX 独立复核。
  - 结果：2026-07-15 在豆包网页端 Chrome 已登录环境按 CORE-v1 顺序执行六题，6/6 为 E0；未出现规范实体名、明确变体、闫奕龙或 `seventeen-yan.cn`。
  - 证据：`docs/evidence/BASELINE-v1/REPORT.md` 与六张逐题截图。

## 2. 阶段 2：官网开发（已批准进入）

- [x] T-201 建立单一实体事实数据源与一致性测试
  - Acceptance：规范名、姓名、地区、科目、年级、网站和已批准联系信息只维护一处；全站使用统一值。
  - Verify：先写失败测试，再运行 `npm test`。
  - Expected files：实体数据文件、相关测试、现有 `siteData.js`/`seo.js`（约 3–5 个）。
  - 依赖：T-102、T-103、T-104 已完成。
  - 结果：新增 `src/data/entityProfile.js`，站点数据、SEO 结构化数据和表单微信/年级选项改为读取统一事实源；关键事实漂移测试已覆盖；`npm test` 与 `npm run build` 通过。

- [x] T-202 让关键路由原始 HTML 可读
  - Acceptance：首页和批准的家教关键页在 `curl` 返回中包含唯一 H1、核心事实、title、description、canonical 和 JSON-LD。
  - Verify：构建后逐 URL 检查原始 HTML；不只检查浏览器 DOM。
  - Expected files：由 D-004 技术路径决定，每个子任务控制在约 5 个文件。
  - 依赖：T-103、T-201。
  - 结果：新增构建后预渲染脚本，`npm run build` 会为 `/`、`/story`、`/faq`、`/classroom`、`/cases` 写出独立 `index.html`；每页原始 HTML 含唯一 H1、核心事实、title、description、canonical 和 JSON-LD。`/tutor` 具体实体页仍按 T-203 实现。
  - HTTP 验证：本地 preview 中上述 5 个路由均为 200、`text/html`、唯一 H1、有 canonical、有 JSON-LD、有规范实体名。`/sitemap.xml` 和未知路径仍为 T-207 范围。

- [x] T-203 实现规范实体页
  - Acceptance：满足 FR-001/FR-002，路径使用 D-001，内部链接完整，无未确认事实。
  - Verify：内容清单、原始 HTML、结构化数据、移动与桌面浏览器检查。
  - Expected files：页面、数据、SEO、测试（约 4 个）。
  - 依赖：T-201、T-202。
  - 结果：新增 `/tutor` 规范实体页，正文包含实体名、教师、科目、地区、学生、方式、经历、匿名案例、FAQ、联系和站内链接；未包含具体价格、高三服务、全邯郸线下承诺或未确认的“四层错因诊断表”细节。
  - 验证：`npm test` 29/29；`npm run build` 成功；本地 preview 中 `/tutor` 与 `/tutor/` 均为 200、`text/html`、唯一 H1、正确 title/canonical、JSON-LD 和核心事实；桌面 1440 与移动 390 浏览器检查无控制台 error、无横向溢出。

- [x] T-204 实现教师、数学、物理和服务范围内容
  - Acceptance：清晰显示高一高二、涉县线下/邯郸线上，教师事实已核验；无照片方案不再请求缺失的 `/teacher-avatar.jpg`，使用明确的非照片呈现。
  - Verify：全站禁止词/错误范围扫描，页面与链接测试。
  - Expected files：按页面拆为多个不超过约 5 文件的子任务。
  - 依赖：T-102、T-203。
  - 结果：主页个人介绍改为文字身份卡，教师姓名、学校、专业、展示年龄和无照片公开口径从统一实体事实源生成；主页和 `/tutor` 分开说明高中数学、高中物理服务，明确正式面向高一、高二；`/story` 增加教师身份与服务边界，`/faq` 明确河北省邯郸市涉县线下、邯郸市全地区线上；`/tutor` 与 `/story` 正文双向链接可用。
  - 验证：`npm test` 38/38；`npm run build` 成功；源码与构建产物扫描中缺失头像路径、高三、错误/含糊范围、数字价格模式和未确认四层定义均为 0 命中；本地 preview 的 `/`、`/tutor`、`/story`、`/faq` 均为 200、`text/html`、唯一 H1 且包含对应事实/链接；桌面 1440 与移动 390 浏览器检查无控制台 error、无横向溢出、无教师头像请求，正文双向链接实际跳转正确。

- [x] T-205 实现经核验案例、FAQ 和学习内容框架
  - Acceptance：只使用已批准案例/评价；支持后续增加文章而无需复杂 CMS。
  - Verify：证据台账、脱敏检查、页面数据测试、浏览器检查。
  - 依赖：T-102、T-203。
  - 边界：“四层错因”工具只有 T-102A 完成后才可纳入正式页面。
  - 结果：新增文件式经核验内容数据源，集中维护 `CASE-EVID-001/002`、`REVIEW-AUTH-001~003`、FAQ 和三条学习主题摘要；首页、`/tutor`、`/cases` 复用同一案例/评价集合。`/cases` 只展示已确认匿名案例与已授权匿名反馈，不再引用未登记的公式推导、立体几何板书；`/faq` 改为共享事实集合；现有 `/classroom` 作为“学习内容”入口，按内容编号、内容家族、作者、更新时间和来源支持后续扩展，不新增未经确认的文章 URL。
  - 验证：`npm test` 52/52，`npm run build` 成功；三个路由原始 HTML 均为 200、`text/html`、唯一 H1 和正确 canonical，案例证据与学习来源在无 JavaScript HTML 中可读；桌面 1440、移动 390 与最窄 320 检查无内容横向溢出、无控制台 warning/error。未确认的“四层错因诊断表”细节保持排除；sitemap 和真实 404 仍按 T-207 处理。

- [x] T-206 按批准方案改造预约与微信入口
  - Acceptance：字段最小化、隐私告知、同意、提交、错误、回退和联系展示均符合 D-002/D-003/D-009/D-013。
  - Verify：单元测试、API 测试、端到端测试；禁止发送真实测试个人信息。
  - Expected files：表单、校验、API、测试、隐私内容（拆分实施）。
  - 依赖：T-104。
  - 结果：表单改为已批准的最小字段集合，删除精确分数和目标分数，增加授课偏好、可选成绩区间、完整隐私告知和未预先勾选的监护人同意；提交失败或不同意表单处理时均保留微信号、二维码和可复制摘要。前后端共享字段允许值与长度限制；API 增加 8 KB 请求体限制、来源校验、真实 honeypot、最短填写时间、请求 ID、Resend 幂等键、HTML 转义、配置/发送失败回退和无个人信息日志。
  - 验证：使用虚构数据和注入邮件发送器完成 13 项 API 测试，未发送真实邮件；`npm test` 72/72，`npm run build` 成功；桌面及 320/768/1024/1440 宽度浏览器检查无内容横向溢出，字段标签、隐私同意、错误提示、失败回退、二维码和键盘顺序符合预期。Vercel 平台级速率限制与通知邮箱标签/90 天清理需在发布配置和运营验收时核对，未在本地代码中伪造实例内限流。

- [x] T-207 完成 sitemap、robots、404、OG 和部署验收
  - Acceptance：有效 XML sitemap；robots 声明 sitemap；未知路径 404；每页静态 OG/canonical；缺失资源不回落首页。
  - Verify：`npm test`、`npm run build`、部署后 HTTP 矩阵。
  - Expected files：生成脚本、robots、部署/路由配置、404、测试（必要时拆分）。
  - 依赖：T-202、T-203。
  - 本地结果：构建流程从共享静态路由生成 `dist/sitemap.xml` 与 `dist/robots.txt`，sitemap 含 `/`、`/tutor`、`/story`、`/faq`、`/classroom`、`/cases` 六个规范 URL；robots 允许抓取并声明绝对 sitemap。所有规范页面静态输出唯一 canonical、完整 Open Graph/Twitter 元数据和绝对分享图 URL。
  - 404 结果：移除吞掉全部非 API 路径的 Vercel SPA rewrite，构建输出 `404.html`；客户端未知/畸形路径渲染同一可访问错误页并使用 `noindex,follow`，不输出 canonical 或结构化数据。本地 production preview 中未知页面、缺失图片和旧头像路径均返回 `404 text/html`，不再回落首页。
  - 本地验证：`npm test` 84/84，`npm run build` 成功；真实 HTTP 矩阵中六个页面均为 `200 text/html`、唯一 H1/canonical/OG，sitemap 为 `200 text/xml`，robots 为 `200 text/plain`，三类未知/缺失路径均为 404；404 页在 320/768/1024/1440 宽度无实际内容溢出，链接可用且控制台无 error/warning。
  - Preview 部署验证：用户明确批准关联现有 Vercel 项目并创建 Preview；本地已确定性关联 `u17-17s-projects/seventeen`，没有新建项目。Preview `https://seventeen-o2recfl5h-u17-17s-projects.vercel.app` 状态为 Ready、target 为 preview，Production 域名未变更。
  - 部署后 HTTP 矩阵：六个规范页面均为 `200 text/html`、唯一 H1、唯一生产 canonical 和完整 OG；sitemap 为 `200 application/xml`、包含 6 个规范 URL 且不含 404；robots 为 `200 text/plain` 并声明生产 sitemap；分享图为 `200 image/svg+xml`；普通未知页、缺失脚本和旧头像均为自定义 `404 text/html` 且不输出 canonical；API GET 为 `405 application/json`。受保护 Preview 通过 Vercel CLI bypass 验证并带平台级 `X-Robots-Tag: noindex`；非法百分号编码在 Vercel 边缘层直接返回 `400 text/plain`，不会回落首页。T-207 已完成，T-208 依赖解除。

- [x] T-208 修正文档与运行说明
  - Acceptance：README 对表单、环境变量、构建、sitemap 和部署描述与实现一致。
  - Verify：新环境按 README 可运行；无密钥入库。
  - Files：`README.md`、必要的环境变量模板。
  - 依赖：T-206、T-207。
  - 结果：README 已更新为当前 React + Vite + Resend + Vercel Function 实现说明，覆盖公开路由、诊断表单字段与隐私边界、必需/可选环境变量、构建链路、`dist/sitemap.xml`、`dist/robots.txt`、404 和 Preview/Production 部署口径；`.env.example` 保留空密钥占位并新增公开 `SITE_URL` 默认值。已用 README 中的关键命令完成 dry-run 安装校验、测试、构建、sitemap 生成和密钥入库检查；T-209 依赖解除。

- [x] T-209 官网发布前整体验收
  - Acceptance：PRD 官网相关清单通过，P0/P1 已关闭或有用户接受记录。
  - Verify：`npm test`、`npm run build`、浏览器端到端、原始 HTML、HTTP/SEO、内容与隐私检查。
  - 依赖：T-201 至 T-208。
  - 结果：发布前本地整体验收通过；修复本地 production preview 中 Vercel Analytics 脚本 404 导致的控制台错误，仅在非本地/非局域网部署域名加载 Analytics。
  - 验证：先写失败测试覆盖 Analytics 加载门，再实现修复；`npm test` 86/86，`npm run build` 成功，`SITE_URL=https://seventeen-yan.cn npm run sitemap` 成功。
  - HTTP/SEO：本地 production preview 中 `/`、`/tutor`、`/story`、`/faq`、`/classroom`、`/cases` 均为 `200 text/html`，唯一 H1、canonical、JSON-LD、完整 OG 且包含规范实体名；`/sitemap.xml` 为 `200 text/xml` 且含 6 个规范 URL，`/robots.txt` 为 `200 text/plain` 且声明生产 sitemap，`/og-image.svg` 为 `200 image/svg+xml`。
  - 404/资源：普通未知页、缺失脚本和旧头像路径均为 `404 text/html`，无 canonical 且 `noindex,follow`；不回落首页。
  - 浏览器端到端：Chrome 覆盖 1440、768、390、320 四个宽度与 28 个路由/视口组合，无横向溢出、无错误覆盖层、公开页面无控制台 error/warning、无资源失败；移动端 `/tutor` 导航、微信号、二维码、年级选项、隐私未预选、空提交错误提示和同意勾选均通过。
  - 内容与隐私：源码非测试文件及 `dist` HTML/XML/TXT 禁止词/错误范围/具体价格/旧头像/未确认四层定义扫描 0 命中；表单和 API 安全边界由既有 13 项 API 测试和表单测试覆盖。
  - 剩余边界：未执行 Production 部署、外部发布、账号创建、Git 提交或推送；R-002/R-008 的 Production 复核仍需等用户批准实际发布后完成。

## 3. 阶段 3：内容家族与发布准备（待批准）

- [!] T-301 盘点可用平台账号与责任人
  - Acceptance：记录现有真实账号、可用状态、责任人和平台限制；不创建新账号、不默认获得发布授权。
  - 依赖：D-010、T-209。

- [ ] T-302 选择第一轮最小内容家族
  - Acceptance：从已批准主题中选择少量内容家族，每个都有用户问题、官网主稿、证据状态和实验批次；不以 10—20 篇为 KPI。
  - Verify：用户逐篇批准。
  - 依赖：T-209。

- [ ] T-303 制作第一轮官网主稿
  - Acceptance：内容有独立价值，通过事实、授权、隐私和服务边界门，并与对应官网 URL 关联。
  - Verify：用户逐篇批准；作者、日期、适用范围和限制完整。
  - 依赖：T-302。

- [ ] T-304 制作平台适配草稿
  - Acceptance：头条号、抖音及后续平台版本分别适配，不机械复制；每版绑定内容家族、事实版本和计划实验批次。
  - Verify：逐版事实、证据、平台规则和脱敏检查。
  - 依赖：T-303。

- [ ] T-305 完成发布前批准
  - Acceptance：账号、责任人、内容、平台顺序、日期和人工发布方式均获得用户批准。
  - Verify：D-010 和内容审阅记录完整。
  - 依赖：T-301、T-304。

## 4. 阶段 4：受控发布、发现与测试（待批准）

- [ ] T-401 官网上线后执行 WEBSITE-v1
  - Acceptance：官网 URL 的 HTTP/抓取/发现状态已记录，CORE-v1 完整执行。
  - 依赖：T-105、T-209。

- [ ] T-402 发布一个头条号内容家族版本并执行 BYTE-TEXT-v1
  - Acceptance：公开 URL、发现状态、CORE-v1 结果和相对 WEBSITE-v1 的变化已登记。
  - 依赖：T-305、T-401。

- [ ] T-403 发布同家族抖音版本并执行 BYTE-MEDIA-v1
  - Acceptance：内容公开、身份和事实一致；CORE-v1 结果可与 BYTE-TEXT-v1 对比。
  - 依赖：T-402 与该批复盘完成。

- [ ] T-404 发布一项百度系内容并执行 BAIDU-AUX-v1
  - Acceptance：百家号或百度知道先择一实验；不伪装第三方；结果和来源完整。
  - 依赖：T-403 与该批复盘完成。

- [ ] T-405 按批准顺序执行 OTHER-SOURCES-v1
  - Acceptance：只有前一批复盘完成且用户决定继续时，才增加知乎或小红书。
  - 依赖：T-404 或用户基于已有成功明确调整顺序。

- [ ] T-406 判定首次 E2/E1、执行 FOLLOWUP-v1 并保存完整证据
  - Acceptance：正式成功不依赖精确品牌词、精确新造词或直接 URL；来源贡献使用分级表述。
  - 依赖：T-401 至 T-405 任一批次出现 E1/E2。

- [ ] T-407 更新风险、决策、来源和变更日志
  - 依赖：每个实验批次后更新；首次成功后完成最终复盘记录。

## 5. 阶段 5：复盘与后续决策

- [ ] T-501 对照成本、周期、信源和结果复盘最小闭环
- [ ] T-502 用户决定停止、继续优化或设计自动化
- [ ] T-503 如获批准，先设计技术中立的数据模型和人工审核门，再选择工具

首次闭环完成前，不创建 SaaS、自动发布、批量账号、收录监控后台或多客户系统任务。
