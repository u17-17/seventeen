import {
  ArrowUpRight,
  BookOpen,
  Brain,
  CalendarDays,
  Check,
  Clock3,
  FileText,
  Layers3,
  MapPin,
  MessageCircle,
  MoveRight,
  PenTool,
  Radar,
  Route,
  Sparkles,
  Target,
} from "lucide-react";

export const navItems = [
  { label: "关于", href: "#about" },
  { label: "问题", href: "#problems" },
  { label: "方法", href: "#method" },
  { label: "经历", href: "#experience" },
  { label: "预约", href: "#contact" },
];

export const hero = {
  englishTitle: "HELLO, I'M YAN",
  chineseTitle: "你好，我是龙",
  subtitle: "高中数学 / 物理一对一辅导",
  description:
    "面向高一高二学生，专注解决“听得懂但做不出”“分数不稳定”“模型题思路混乱”等问题。",
  primaryCta: "预约学习诊断",
  secondaryCta: "了解教学方法",
  scrollHint: "向下滚动，了解我的教学方式",
};

export const about = {
  title: "关于我",
  eyebrow: "About Yan",
  body:
    "我是一名长期做高中数学、物理一对一辅导的年轻老师。相比单纯讲答案，我更重视帮学生建立题型识别、过程拆解和错因复盘能力。",
  highlights: ["年轻，但认真负责。", "懂学生，不死板。", "方法清晰，讲题有结构。"],
  stats: [
    { label: "高中数学 / 高中物理", icon: BookOpen },
    { label: "高一 / 高二", icon: Target },
    { label: "线上线下均可", icon: MapPin },
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
    {
      number: "01",
      title: "高一数学辅导",
      time: "2026.03 - 2026.06",
      content:
        "辅导一名高一女生数学，围绕基础知识、函数题型、考试错因进行系统复盘，阶段测评提升约 20 分。",
      tags: ["高中数学", "高一", "错因复盘", "题型训练"],
    },
    {
      number: "02",
      title: "高二物理辅导",
      time: "2026.03 - 2026.06",
      content:
        "辅导一名高二男生物理，围绕受力分析、电学基础、模型题过程拆解进行训练，阶段测评提升约 20 分。",
      tags: ["高中物理", "高二", "模型分析", "过程拆解"],
    },
    {
      number: "03",
      title: "初高衔接教学",
      time: "2025.06 - 2025.09",
      content:
        "带过三名高一学生，针对初中到高中学习方式变化进行衔接教学，熟悉高一学生常见适应问题。",
      tags: ["初高衔接", "高一", "学习方法", "基础过渡"],
    },
  ],
};

export const contact = {
  title: "预约一次学习问题诊断",
  eyebrow: "Contact",
  subtitle: "不写价格，先沟通学生情况；适合再安排试听。",
  infoTitle: "你可以先提供这些信息：",
  infoItems: ["学生年级", "补习科目", "当前分数", "目标分数", "主要问题", "可上课时间"],
  description:
    "我会先根据学生情况判断更适合补基础、专题突破，还是试卷复盘。",
  qrPath: "/wechat-qr.png",
  qrFallback: "此处替换为微信二维码",
  buttons: [
    { label: "添加微信咨询", href: "#contact", icon: MessageCircle },
    { label: "预约学习诊断", href: "#contact", icon: ArrowUpRight },
  ],
  extras: [
    { label: "周六日全天可约", icon: CalendarDays },
    { label: "平时晚上可沟通", icon: Clock3 },
    { label: "线上线下均可", icon: Sparkles },
  ],
};

export const footer = {
  brand: "YAN TUTOR",
  subtitle: "高中数学 / 高中物理一对一辅导",
  slogan: "帮学生把“听得懂”变成“做得出”",
  copyright: "© 2026 YAN TUTOR. All rights reserved.",
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
