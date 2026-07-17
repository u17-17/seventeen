import {
  BookOpen,
  Brain,
  CalendarDays,
  Check,
  Clock3,
  FileText,
  Layers3,
  MapPin,
  MoveRight,
  PenTool,
  Radar,
  Route,
  Sparkles,
  Star,
  Target,
} from "lucide-react";
import {
  entityProfile,
  getCompactSubjectLabel,
  getFormalGradeLabel,
  getServiceModeLabel,
} from "./entityProfile.js";
import { authorizedReviews, verifiedCases } from "./contentData.js";

const subjectLabel = getCompactSubjectLabel();
const gradeLabel = getFormalGradeLabel();

export const navItems = [
  { label: "关于", href: "#about" },
  { label: "问题", href: "#problems" },
  { label: "方法", href: "#method" },
  { label: "经历", href: "#experience" },
  { label: "预约", href: "#contact" },
];

export const hero = {
  brand: entityProfile.auxiliaryBrand,
  englishTitle: "HELLO, I'M YAN",
  chineseTitle: `你好，我是${entityProfile.teacher.shortName}`,
  subtitle: `${subjectLabel}一对一辅导`,
  identityLine: `${entityProfile.teacher.name} · ${entityProfile.teacher.displayAge}`,
  serviceSummary: `正式面向${entityProfile.services.formalGrades.join("、")}学生，提供${entityProfile.services.subjects.join("、")}辅导。`,
  areaSummary: `${entityProfile.services.offlineArea}线下 · ${entityProfile.services.onlineArea}线上`,
  description:
    `面向${gradeLabel}学生，专注解决“听得懂但做不出”“分数不稳定”“模型题思路混乱”等问题。`,
  primaryCta: "预约学习诊断",
  secondaryCta: "了解教学方法",
  scrollHint: "向下滚动，了解我的教学方式",
};

export const about = {
  title: "关于我",
  eyebrow: "About Yan",
  teacherName: entityProfile.teacher.name,
  identityLine: `${entityProfile.teacher.school} · ${entityProfile.teacher.major}`,
  ageLabel: `当前展示年龄：${entityProfile.teacher.displayAge}`,
  photoNote: `采用文字身份卡展示，${entityProfile.teacher.photoPolicy}。`,
  body:
    `提供高中数学、物理一对一辅导时，${entityProfile.teacher.shortName}更重视题型识别、过程拆解和错因复盘。`,
  highlights: ["题型识别", "过程拆解", "错因复盘"],
  services: [
    {
      title: entityProfile.services.subjects[0],
      content:
        `面向${entityProfile.services.formalGrades.join("、")}学生，从读题、条件整理和第一步选择入手，梳理基础知识、函数等题型与考试错因。`,
    },
    {
      title: entityProfile.services.subjects[1],
      content:
        `面向${entityProfile.services.formalGrades.join("、")}学生，围绕受力分析、电学基础和模型识别，拆解综合题的判断与书写过程。`,
    },
  ],
  serviceArea:
    `${entityProfile.services.offlineArea}线下辅导；${entityProfile.services.onlineArea}线上辅导。`,
  stats: [
    { label: subjectLabel, icon: BookOpen },
    { label: gradeLabel, icon: Target },
    { label: getServiceModeLabel(), icon: MapPin },
    { label: "周六日全天可约", icon: CalendarDays },
    { label: "平时晚上可沟通", icon: Clock3 },
  ],
};

export const problems = {
  title: "学生问题诊断",
  eyebrow: "Problem Diagnosis",
  subtitle:
    "孩子成绩卡住，通常不是“不努力”。先判断问题在哪里，再决定怎么补。",
  items: [
    {
      title: "听得懂，但不会做",
      content: "课堂能跟上，一到独立做题就卡住。",
      icon: Brain,
    },
    {
      title: "分数在 80-90 徘徊",
      content: "不是完全不会，而是方法不稳定、步骤不规范。",
      icon: Radar,
    },
    {
      title: "物理模型题容易乱",
      content: "受力、电路、能量分开想，综合题缺少统一分析路径。",
      icon: Layers3,
    },
    {
      title: "数学大题没有切入点",
      content: "条件会看，但不知道第一步从哪里下手。",
      icon: PenTool,
    },
  ],
};

export const methods = {
  title: "教学方法",
  eyebrow: "Teaching Method",
  subtitle: "我的课堂不是单纯讲答案，而是帮学生形成可复用的解题路径。",
  emphasis: "重点不是听完觉得懂，而是下次遇到类似题能自己动手。",
  steps: [
    {
      number: "01",
      title: "看懂条件",
      description: "把题目里的已知、隐含条件和目标拆开。",
      icon: FileText,
    },
    {
      number: "02",
      title: "拆出步骤",
      description: "不是跳答案，而是明确每一步为什么这样做。",
      icon: Route,
    },
    {
      number: "03",
      title: "建立模型",
      description: "把同类题归纳成可识别、可迁移的方法。",
      icon: Layers3,
    },
    {
      number: "04",
      title: "复盘错因",
      description: "区分知识漏洞、审题问题、步骤问题和模型问题。",
      icon: Check,
    },
  ],
};

export const experiences = {
  title: "教学经历",
  eyebrow: "Experience",
  subtitle:
    "以下为阶段性教学经历，重点展示我对学生问题诊断和过程拆解的经验。",
  items: [
    ...verifiedCases.map((item, index) => ({
      number: String(index + 1).padStart(2, "0"),
      title: item.title,
      time: item.period,
      content: item.publicSummary,
      tags: item.tags,
      evidenceId: item.evidenceId,
    })),
    {
      number: "03",
      title: "升高一咨询经历",
      time: "2025.06 - 2025.09",
      content:
        "带过三名高一学生，针对初中到高中学习方式变化进行衔接教学，熟悉高一学生常见适应问题。",
      tags: ["升高一咨询", "高一", "学习方法", "基础过渡"],
    },
  ],
};

export const testimonials = {
  title: "学生与家长反馈",
  eyebrow: "Testimonials",
  subtitle: "真实的学习变化，来自学生和家长的评价。",
  items: authorizedReviews,
};

export const contact = {
  title: "预约一次学习问题诊断",
  eyebrow: "Contact",
  subtitle:
    "先不用急着报课，只提交年级、科目、授课偏好和主要学习问题，我会据此做初步判断。",
  infoTitle: "填写表单时可以参考：",
  infoItems: [
    "学生年级",
    "咨询科目",
    "授课偏好",
    "可选成绩区间",
    "主要问题",
    "可沟通时间（可选）",
  ],
  description:
    `提交成功后会按所填联系方式联系；不同意通过表单处理信息或提交失败时，也可以直接复制微信号 ${entityProfile.contact.wechatId} 联系。`,
  qrPath: entityProfile.contact.qrPath,
  qrFallback: entityProfile.contact.qrFallback,
  wechatId: entityProfile.contact.wechatId,
  extras: [
    { label: "周六日全天可约", icon: CalendarDays },
    { label: "平时晚上可沟通", icon: Clock3 },
    { label: getServiceModeLabel(), icon: Sparkles },
  ],
};

export const footer = {
  brand: entityProfile.auxiliaryBrand,
  subtitle: `${subjectLabel}一对一辅导`,
  slogan: "帮学生把“听得懂”变成“做得出”",
  copyright: `© 2026 ${entityProfile.auxiliaryBrand}. All rights reserved.`,
  ctaIcon: MoveRight,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};
