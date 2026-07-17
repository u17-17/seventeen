function displayValue(value) {
  const normalized = String(value ?? "").trim();
  return normalized || "暂未填写";
}

export function buildConsultationMessage(values) {
  return [
    "【学习诊断咨询】",
    `学生年级：${displayValue(values.grade)}`,
    `咨询科目：${displayValue(values.subject)}`,
    `授课偏好：${displayValue(values.deliveryPreference)}`,
    `当前成绩区间：${displayValue(values.scoreRange)}`,
    `主要问题：${displayValue(values.mainConcern)}`,
    `可沟通时间：${displayValue(values.availability)}`,
    `联系方式：${displayValue(values.contact)}`,
    `联系人称呼：${displayValue(values.guardianName)}`,
  ].join("\n");
}

export function buildDiagnosisPayload(values, context = {}) {
  return {
    guardianName: values.guardianName,
    contact: values.contact,
    grade: values.grade,
    subject: values.subject,
    deliveryPreference: values.deliveryPreference,
    scoreRange: values.scoreRange,
    problem: values.mainConcern,
    availableTime: values.availability,
    privacyConsent: values.privacyConsent === true,
    source: context.source ?? "",
    website: values.website ?? "",
    formStartedAt: context.formStartedAt,
    requestId: context.requestId,
  };
}

export function createSubmissionRequestId(cryptoImplementation = globalThis.crypto) {
  if (typeof cryptoImplementation?.randomUUID === "function") {
    return cryptoImplementation.randomUUID();
  }

  return `form-${Date.now()}-${Math.random().toString(36).slice(2, 14)}`;
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
