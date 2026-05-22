const scorePattern = /^\d+(\.\d+)?$/;

function text(value) {
  return String(value ?? "").trim();
}

function validateScore(value, label, errors, field) {
  const normalized = text(value);
  if (!normalized) return;

  if (!scorePattern.test(normalized)) {
    errors[field] = `${label}需在 0-150 之间`;
    return;
  }

  const score = Number(normalized);
  if (score < 0 || score > 150) {
    errors[field] = `${label}需在 0-150 之间`;
  }
}

function result(errors) {
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateConsultationForm(values) {
  const errors = {};
  const guardianName = text(values.guardianName);
  const contact = text(values.contact);
  const grade = text(values.grade);
  const subject = text(values.subject);
  const mainConcern = text(values.mainConcern);
  const availability = text(values.availability);

  if (!guardianName) errors.guardianName = "请填写家长称呼";
  if (!contact) errors.contact = "请填写手机号或微信号";
  else if (contact.length < 5) errors.contact = "联系方式至少 5 个字符";
  if (!grade) errors.grade = "请选择学生年级";
  if (!subject) errors.subject = "请选择咨询科目";
  if (!mainConcern) errors.mainConcern = "请简单描述学生当前问题";
  else if (mainConcern.length < 8) errors.mainConcern = "问题描述至少 8 个字";
  if (!availability) errors.availability = "请选择或填写可沟通时间";

  validateScore(values.currentScore, "当前分数", errors, "currentScore");
  validateScore(values.targetScore, "目标分数", errors, "targetScore");

  return result(errors);
}
