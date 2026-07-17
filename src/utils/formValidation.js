import { consultationConfig } from "../data/consultationConfig.js";

function text(value) {
  return String(value ?? "").trim();
}

function validateOption(value, options, errors, field, emptyMessage, invalidMessage) {
  const normalized = text(value);
  if (!normalized) {
    if (emptyMessage) errors[field] = emptyMessage;
    return;
  }

  if (!options.includes(normalized)) errors[field] = invalidMessage;
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
  const deliveryPreference = text(values.deliveryPreference);
  const scoreRange = text(values.scoreRange);
  const mainConcern = text(values.mainConcern);
  const availability = text(values.availability);
  const limits = consultationConfig.limits;

  if (guardianName.length > limits.guardianName) {
    errors.guardianName = `联系人称呼最多 ${limits.guardianName} 个字`;
  }
  if (!contact) errors.contact = "请填写手机号或微信号";
  else if (contact.length < limits.contactMin) {
    errors.contact = `联系方式至少 ${limits.contactMin} 个字符`;
  } else if (contact.length > limits.contactMax) {
    errors.contact = `联系方式最多 ${limits.contactMax} 个字符`;
  }

  validateOption(
    grade,
    consultationConfig.grades,
    errors,
    "grade",
    "请选择学生年级",
    "请选择有效的学生年级",
  );
  validateOption(
    subject,
    consultationConfig.subjects,
    errors,
    "subject",
    "请选择咨询科目",
    "请选择有效的咨询科目",
  );
  validateOption(
    deliveryPreference,
    consultationConfig.deliveryPreferences,
    errors,
    "deliveryPreference",
    "请选择授课偏好",
    "请选择有效的授课偏好",
  );
  validateOption(
    scoreRange,
    consultationConfig.scoreRanges,
    errors,
    "scoreRange",
    null,
    "请选择有效的成绩区间",
  );

  if (!mainConcern) errors.mainConcern = "请简单描述学生当前问题";
  else if (mainConcern.length < limits.mainConcernMin) {
    errors.mainConcern = `问题描述至少 ${limits.mainConcernMin} 个字`;
  } else if (mainConcern.length > limits.mainConcernMax) {
    errors.mainConcern = `问题描述最多 ${limits.mainConcernMax} 个字`;
  }

  validateOption(
    availability,
    consultationConfig.availabilityOptions,
    errors,
    "availability",
    null,
    "请选择有效的可沟通时间",
  );

  if (values.privacyConsent !== true) {
    errors.privacyConsent = "请阅读并同意个人信息说明";
  }

  return result(errors);
}
