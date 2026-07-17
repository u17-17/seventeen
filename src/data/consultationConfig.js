import { entityProfile } from "./entityProfile.js";

const freeze = (values) => Object.freeze(values);

export const consultationConfig = Object.freeze({
  grades: entityProfile.services.consultationGrades,
  subjects: freeze(["数学", "物理", "数学和物理", "暂不确定"]),
  deliveryPreferences: freeze(["涉县线下", "邯郸线上", "暂不确定"]),
  scoreRanges: freeze([
    "60 以下",
    "60—79",
    "80—99",
    "100—119",
    "120 及以上",
  ]),
  availabilityOptions: freeze([
    "周六上午",
    "周六下午",
    "周日上午",
    "周日下午",
    "平时晚上",
    "需要再沟通",
  ]),
  limits: Object.freeze({
    guardianName: 30,
    contactMin: 5,
    contactMax: 50,
    mainConcernMin: 8,
    mainConcernMax: 500,
    source: 200,
  }),
  maxBodyBytes: 8 * 1024,
  minimumFillTimeMs: 3000,
  allowedOrigins: freeze([entityProfile.website.origin]),
  privacyNotice:
    `本表单由${entityProfile.teacher.name}用于回复高中数学、物理家教咨询和进行初步学习问题判断。我们会收集联系人称呼、联系方式、学生年级、咨询科目、授课偏好、可选成绩区间、主要问题和可选沟通时间。信息将通过 Resend 发送至私人通知邮箱，不用于公开展示、广告群发或出售。通知邮件会在最后一次咨询沟通后 90 天内删除；你可通过微信号 ${entityProfile.contact.wechatId} 请求查阅、更正、删除或撤回同意。请由家长或监护人提交，不要填写学生姓名、学校、班级、详细地址等可识别信息。`,
  consentLabel:
    "我已阅读并同意《咨询表单个人信息说明》，确认我是学生家长/监护人，或已经取得监护人同意。",
});
