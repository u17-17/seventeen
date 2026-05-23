import { Resend } from "resend";

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString()));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const raw = await readBody(req);
    const body = JSON.parse(raw);

    // Honeypot: if website field is filled, silently reject
    if (body.website) {
      return res.status(400).json({ error: "Bad request" });
    }

    const MAX_SHORT = 100;
    const MAX_LONG = 2000;
    const SCORE_RE = /^\d+(\.\d+)?$/;

    const guardianName = String(body.guardianName ?? "").trim().slice(0, MAX_SHORT);
    const contact = String(body.contact ?? "").trim().slice(0, MAX_SHORT);
    const grade = String(body.grade ?? "").trim().slice(0, MAX_SHORT);
    const subject = String(body.subject ?? "").trim().slice(0, MAX_SHORT);
    const currentScore = String(body.currentScore ?? "").trim().slice(0, 6);
    const targetScore = String(body.targetScore ?? "").trim().slice(0, 6);
    const problem = String(body.problem ?? "").trim().slice(0, MAX_LONG);
    const availableTime = String(body.availableTime ?? "").trim().slice(0, MAX_SHORT);
    const source = String(body.source ?? "").trim().slice(0, 500);

    // Required fields
    if (!guardianName || !contact || !grade || !subject || !problem) {
      return res.status(400).json({ error: "请填写必填字段" });
    }

    // Score validation
    if (currentScore) {
      if (!SCORE_RE.test(currentScore)) {
        return res.status(400).json({ error: "当前分数需在 0-150 之间" });
      }
      const n = Number(currentScore);
      if (n < 0 || n > 150) {
        return res.status(400).json({ error: "当前分数需在 0-150 之间" });
      }
    }

    if (targetScore) {
      if (!SCORE_RE.test(targetScore)) {
        return res.status(400).json({ error: "目标分数需在 0-150 之间" });
      }
      const n = Number(targetScore);
      if (n < 0 || n > 150) {
        return res.status(400).json({ error: "目标分数需在 0-150 之间" });
      }
    }

    const currentScoreDisplay = currentScore || "未填";
    const targetScoreDisplay = targetScore || "未填";
    const now = new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });

    const emailSubject = `YAN TUTOR 新诊断表单｜${grade || "未填"}${subject || "未填"}｜${currentScoreDisplay} → ${targetScoreDisplay}`;

    const rows = [
      ["家长称呼", guardianName],
      ["手机号或微信号", contact],
      ["学生年级", grade],
      ["咨询科目", subject],
      ["当前分数", currentScoreDisplay],
      ["目标分数", targetScoreDisplay],
      ["学生当前主要问题", problem],
      ["可沟通时间", availableTime || "未填"],
      ["提交时间", now],
      ["来源页面", source || "直接访问"],
    ];

    const htmlRows = rows
      .map(
        ([label, value]) =>
          `<tr>
            <td style="padding:10px 14px;background:#f5faf7;font-weight:600;color:#1a3a30;border:1px solid #d4e8da;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
            <td style="padding:10px 14px;border:1px solid #d4e8da;color:#2d2d2d;word-break:break-word;">${escapeHtml(value)}</td>
          </tr>`,
      )
      .join("");

    const htmlContent = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;">
<div style="max-width:560px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<div style="background:#1a3a30;padding:20px 28px;">
<h1 style="margin:0;font-size:18px;color:#fff;font-weight:700;">YAN TUTOR 新诊断表单</h1>
</div>
<div style="padding:24px 28px;">
<table style="width:100%;border-collapse:collapse;">${htmlRows}</table>
</div>
</div>
</body>
</html>`;

    const textContent = [
      "YAN TUTOR 新诊断表单",
      "─".repeat(30),
      ...rows.map(([label, value]) => `${label}：${value}`),
    ].join("\n");

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.NOTIFY_EMAIL,
      subject: emailSubject,
      html: htmlContent,
      text: textContent,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("diagnosis api error:", error);
    return res.status(500).json({ error: "提交失败，请直接添加微信 L07-929。" });
  }
}
