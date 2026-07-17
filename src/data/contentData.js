import { entityProfile } from "./entityProfile.js";

const caseDisclaimer = "个体结果不代表普遍承诺。";
const learningOutline = Object.freeze([
  "问题与适用场景",
  "判断与处理步骤",
  "边界、来源与下一步",
]);

export const verifiedCases = Object.freeze([
  Object.freeze({
    caseId: "case-high-one-math",
    evidenceId: "CASE-EVID-001",
    evidenceStatus: "已确认",
    title: "高一数学辅导",
    grade: "高一",
    subject: "高中数学",
    period: "2026.03 - 2026.06",
    problem: "辅导内容涉及基础知识、函数题型和考试错因。",
    method: "围绕基础知识、函数题型和考试错因进行系统复盘。",
    result: "阶段测评提升约 20 分。",
    disclaimer: caseDisclaimer,
    publicSummary:
      `辅导一名高一学生数学，围绕基础知识、函数题型和考试错因进行系统复盘；阶段测评提升约 20 分。${caseDisclaimer}`,
    tags: Object.freeze(["高中数学", "高一", "错因复盘", "题型训练"]),
  }),
  Object.freeze({
    caseId: "case-high-two-physics",
    evidenceId: "CASE-EVID-002",
    evidenceStatus: "已确认",
    title: "高二物理辅导",
    grade: "高二",
    subject: "高中物理",
    period: "2026.03 - 2026.06",
    problem: "辅导内容涉及受力分析、电学基础和模型题过程。",
    method: "围绕受力分析、电学基础和模型题过程拆解进行训练。",
    result: "阶段测评提升约 20 分。",
    disclaimer: caseDisclaimer,
    publicSummary:
      `辅导一名高二学生物理，围绕受力分析、电学基础和模型题过程拆解进行训练；阶段测评提升约 20 分。${caseDisclaimer}`,
    tags: Object.freeze(["高中物理", "高二", "模型分析", "过程拆解"]),
  }),
]);

export const authorizedReviews = Object.freeze([
  Object.freeze({
    authorizationId: "REVIEW-AUTH-001",
    authorizationStatus: "已确认",
    quote: "以前做函数题总是凭感觉，现在会先拆条件再选方法，准确率提高了很多。",
    author: "高一学生家长",
    tag: "高中数学",
  }),
  Object.freeze({
    authorizationId: "REVIEW-AUTH-002",
    authorizationStatus: "已确认",
    quote: "闫老师讲题很有耐心，不会直接给答案，而是引导我自己想出来。物理大题终于有思路了。",
    author: "高二学生",
    tag: "高中物理",
  }),
  Object.freeze({
    authorizationId: "REVIEW-AUTH-003",
    authorizationStatus: "已确认",
    quote: "孩子从初中到高中不适应，闫老师帮助孩子梳理了学习方法，期中考试进步明显。",
    author: "高一学生家长",
    tag: "升高一咨询",
  }),
]);

export const faqGroups = Object.freeze([
  Object.freeze({
    title: "服务与安排",
    items: Object.freeze([
      Object.freeze({
        faqId: "FAQ-SERVICE-001",
        question: "主要辅导哪些学生和科目？",
        answer:
          `正式服务对象为${entityProfile.services.formalGrades.join("、")}学生，科目为${entityProfile.services.subjects.join("、")}。升高一咨询只用于学习方式和适应问题沟通，不扩展为正式长期服务年级。`,
      }),
      Object.freeze({
        faqId: "FAQ-SERVICE-002",
        question: "线上和线下的服务范围是什么？",
        answer:
          `${entityProfile.services.offlineArea}提供线下辅导，${entityProfile.services.onlineArea}接受线上辅导。线下与线上范围分别说明，避免造成服务区域误解。`,
      }),
      Object.freeze({
        faqId: "FAQ-SERVICE-003",
        question: "第一次沟通需要准备什么？",
        answer:
          "准备学生年级、咨询科目、当前成绩区间、主要卡点和可沟通时间即可；不要提交学生姓名、学校、班级、详细地址或其他可识别资料。",
      }),
    ]),
  }),
  Object.freeze({
    title: "案例、效果与边界",
    items: Object.freeze([
      Object.freeze({
        faqId: "FAQ-EVIDENCE-001",
        question: "怎样理解案例中的阶段测评变化？",
        answer:
          `公开案例使用已确认的阶段测评记录，并省略可识别学生信息；每条案例均保留“${caseDisclaimer}”提示，不把个体变化写成保证。`,
      }),
      Object.freeze({
        faqId: "FAQ-EVIDENCE-002",
        question: "学生和家长反馈经过授权吗？",
        answer:
          "当前公开的三条学生或家长反馈均已获得公开授权，并采用匿名或最小化身份表达。",
      }),
      Object.freeze({
        faqId: "FAQ-EVIDENCE-003",
        question: "网站会公开具体课时价格吗？",
        answer:
          "网站不公开具体课时价格。是否适合继续安排课程，会在了解学生情况并完成学习诊断后再沟通。",
      }),
    ]),
  }),
]);

export const learningResources = Object.freeze([
  Object.freeze({
    resourceId: "LEARN-001",
    contentFamilyId: "FAM-H1-MATH-DIAGNOSIS",
    title: "高一数学：函数题没有切入点时先看什么",
    summary:
      "先观察学生能否标出已知条件、说清题目目标并独立写出第一步，再判断卡点更接近基础知识、题型识别还是考试错因。",
    audience: `${entityProfile.services.formalGrades[0]}学生及家长`,
    topic: entityProfile.services.subjects[0],
    author: entityProfile.teacher.name,
    updatedAt: "2026-07-15",
    status: "主题摘要",
    sourceIds: Object.freeze(["ENTITY-PROFILE", "CASE-EVID-001"]),
    outline: learningOutline,
    href: null,
  }),
  Object.freeze({
    resourceId: "LEARN-002",
    contentFamilyId: "FAM-H2-PHYSICS-DIAGNOSIS",
    title: "高二物理：模型题容易混时怎样定位卡点",
    summary:
      "先把受力、电学和能量等模型分开梳理，再观察学生能否根据条件选择分析路径，并把判断过程落实到规范步骤。",
    audience: `${entityProfile.services.formalGrades[1]}学生及家长`,
    topic: entityProfile.services.subjects[1],
    author: entityProfile.teacher.name,
    updatedAt: "2026-07-15",
    status: "主题摘要",
    sourceIds: Object.freeze(["ENTITY-PROFILE", "CASE-EVID-002"]),
    outline: learningOutline,
    href: null,
  }),
  Object.freeze({
    resourceId: "LEARN-003",
    contentFamilyId: "FAM-FIRST-DIAGNOSIS",
    title: "第一次学习诊断需要准备什么",
    summary:
      "准备年级、科目、当前成绩区间、主要卡点和可沟通时间即可；不提交学生姓名、学校、班级、详细地址或其他可识别资料。",
    audience: `${entityProfile.services.formalGrades.join("、")}学生家长`,
    topic: "学习诊断",
    author: entityProfile.teacher.name,
    updatedAt: "2026-07-15",
    status: "主题摘要",
    sourceIds: Object.freeze(["ENTITY-PROFILE", "D-003", "D-009"]),
    outline: learningOutline,
    href: null,
  }),
]);
