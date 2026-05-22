function displayValue(value) {
  const normalized = String(value ?? "").trim();
  return normalized || "暂未填写";
}

export function buildConsultationMessage(values) {
  return [
    "【学习诊断咨询】",
    `学生年级：${displayValue(values.grade)}`,
    `咨询科目：${displayValue(values.subject)}`,
    `当前分数：${displayValue(values.currentScore)}`,
    `目标分数：${displayValue(values.targetScore)}`,
    `主要问题：${displayValue(values.mainConcern)}`,
    `可上课时间：${displayValue(values.availability)}`,
    `联系方式：${displayValue(values.contact)}`,
    `家长称呼：${displayValue(values.guardianName)}`,
  ].join("\n");
}

export async function copyTextWithFallback(text, options = {}) {
  const clipboard = options.clipboard ?? globalThis.navigator?.clipboard;
  const prompt = options.prompt ?? globalThis.window?.prompt;

  try {
    if (clipboard?.writeText) {
      await clipboard.writeText(text);
      return true;
    }
  } catch {
    // Some public HTTP environments block clipboard access. Fall through to prompt.
  }

  if (typeof prompt === "function") {
    prompt("请复制以下内容：", text);
  }

  return false;
}
