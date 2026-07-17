import {
  BadgeCheck,
  BookOpen,
  ClipboardList,
  FileText,
  HelpCircle,
  Layers3,
  MapPin,
  MessageCircle,
  UserRound,
} from "lucide-react";
import {
  authorizedReviews,
  faqGroups,
  learningResources,
  verifiedCases,
} from "./contentData.js";
import {
  entityProfile,
  getCompactSubjectLabel,
  getFormalGradeLabel,
  getServiceModeLabel,
} from "./entityProfile.js";

const faqItemsById = new Map(
  faqGroups.flatMap((group) => group.items.map((item) => [item.faqId, item])),
);

export const pageNavItems = [
  { label: "家教主页", href: "/tutor" },
  { label: "我的故事", href: "/story" },
  { label: "FAQ", href: "/faq" },
  { label: "学习内容", href: "/classroom" },
  { label: "教学案例", href: "/cases" },
];

export const notFoundPage = Object.freeze({
  eyebrow: "404 / PAGE NOT FOUND",
  title: "页面没有找到",
  description: "这个地址可能已更改或不存在。你可以返回首页，或继续查看家教服务说明。",
  primaryLink: Object.freeze({ href: "/", label: "返回首页" }),
  secondaryLink: Object.freeze({ href: "/tutor", label: "查看家教服务" }),
});

export const staticPages = {
  tutor: {
    slug: "tutor",
    seoTitle: entityProfile.search.title,
    seoDescription: entityProfile.search.description,
    seoKeywords: entityProfile.search.keywords,
    eyebrow: "Tutor Entity",
    title: entityProfile.canonicalName,
    subtitle: `${entityProfile.search.localName}提供${getCompactSubjectLabel()}一对一学习诊断与辅导，主要服务${getFormalGradeLabel()}学生：${entityProfile.services.offlineArea}可线下沟通，同时接受${entityProfile.services.onlineArea}线上辅导。`,
    icon: UserRound,
    intro: {
      title: `把${entityProfile.search.localName}、科目、地区和联系方式放在同一个稳定页面`,
      body:
        "这一页是家教服务的规范入口，集中说明闫老师是谁、主要辅导什么学生、在哪些地区服务，以及如何先做一次学习问题诊断。",
      points: [
        entityProfile.search.localName,
        entityProfile.teacher.name,
        getCompactSubjectLabel(),
        getServiceModeLabel(),
      ],
    },
    sections: [
      {
        title: "核心事实",
        items: [
          {
            title: "老师是谁",
            content:
              `${entityProfile.teacher.name}，学校为${entityProfile.teacher.school}，专业为${entityProfile.teacher.major}，当前展示年龄为 ${entityProfile.teacher.displayAge}。${entityProfile.teacher.photoPolicy}，采用文字身份信息呈现。`,
            href: "/story",
            linkLabel: "查看教师介绍",
            icon: UserRound,
          },
          {
            title: "辅导什么",
            content:
              `正式服务对象为${getFormalGradeLabel()}学生，科目为${entityProfile.services.subjects.join("、")}。先通过一对一学习诊断判断是基础、题型、步骤还是复盘问题。`,
            icon: BookOpen,
          },
          {
            title: "在哪里上课",
            content:
              `主要提供${entityProfile.services.offlineArea}线下高中数学、物理一对一家教，同时接受${entityProfile.services.onlineArea}线上辅导。`,
            icon: MapPin,
          },
        ],
      },
      {
        title: "高中数学、物理服务说明",
        items: [
          {
            title: entityProfile.services.subjects[0],
            content:
              `面向${entityProfile.services.formalGrades.join("、")}学生。先看读题、列条件和选择第一步的过程，再判断需要补基础知识、函数等题型识别，还是考试错因复盘。`,
            icon: BadgeCheck,
          },
          {
            title: entityProfile.services.subjects[1],
            content:
              `面向${entityProfile.services.formalGrades.join("、")}学生。把受力、电学、能量等模型分开梳理，再训练综合题中怎样判断该用哪一条分析路径。`,
            icon: Layers3,
          },
          {
            title: "升高一咨询和学习方式过渡",
            content:
              "升高一咨询只作为学习方法和适应问题的沟通入口，不扩展为正式长期服务年级。",
            icon: ClipboardList,
          },
        ],
      },
      {
        title: "已确认经历与匿名案例",
        items: [
          ...verifiedCases.map((item) => ({
            label: item.period,
            title: item.title,
            content: item.publicSummary,
            evidenceId: item.evidenceId,
          })),
          {
            label: "2025.06 - 2025.09",
            title: "升高一咨询经历",
            content:
              "带过三名高一学生，围绕初中到高中学习方式变化进行衔接教学，熟悉高一学生常见适应问题。",
          },
        ],
      },
      {
        title: "常见问题",
        items: [
          faqItemsById.get("FAQ-SERVICE-003"),
          faqItemsById.get("FAQ-EVIDENCE-003"),
          {
            question: "怎样联系闫老师？",
            answer:
              `可以通过首页学习诊断表或微信号 ${entityProfile.contact.wechatId} 联系；微信二维码也会和微信号同时展示。`,
          },
        ],
      },
      {
        title: "站内继续了解",
        items: [
          {
            title: "查看常见问题",
            content: "了解适合哪些学生、第一次沟通准备什么，以及线上线下安排边界。",
            href: "/faq",
            linkLabel: "进入 FAQ",
            icon: HelpCircle,
          },
          {
            title: "查看教学案例",
            content: "查看已经登记证据、完成匿名处理的案例和已获授权的匿名反馈。",
            href: "/cases",
            linkLabel: "进入教学案例",
            icon: Layers3,
          },
          {
            title: "预约学习诊断",
            content: "先填写学生年级、科目和主要问题，再决定下一步是否适合继续沟通。",
            href: "/#contact",
            linkLabel: "去预约诊断",
            icon: MessageCircle,
          },
        ],
      },
    ],
  },
  story: {
    slug: "story",
    eyebrow: "Story",
    title: "我的故事",
    subtitle: "这是闫老师的教学故事。比起把自己包装成万能老师，我更想讲清楚：我为什么这样教，以及什么样的学生适合先来做一次诊断。",
    icon: UserRound,
    intro: {
      title: "从一道题看见一个学生的学习方式",
      body:
        "很多学生不是不努力，而是一直用不适合自己的方式硬撑。我做一对一辅导时，会先看孩子怎么读题、怎么写第一步、哪里开始犹豫，再决定该补知识、补方法，还是补考试习惯。",
      points: ["先诊断", "再拆问题", "最后安排训练"],
    },
    sections: [
      {
        title: "教师身份与服务边界",
        items: [
          {
            title: entityProfile.teacher.name,
            content:
              `学校为${entityProfile.teacher.school}，专业为${entityProfile.teacher.major}，当前展示年龄为 ${entityProfile.teacher.displayAge}。${entityProfile.teacher.photoPolicy}，页面使用文字身份信息。`,
            href: "/tutor",
            linkLabel: "查看家教服务主页",
            icon: UserRound,
          },
          {
            title: "正式服务对象",
            content:
              `正式面向${entityProfile.services.formalGrades.join("、")}学生，提供${entityProfile.services.subjects.join("、")}一对一学习诊断与辅导。`,
            icon: BookOpen,
          },
          {
            title: "服务范围",
            content:
              `${entityProfile.services.offlineArea}线下辅导；${entityProfile.services.onlineArea}线上辅导。`,
            icon: MapPin,
          },
        ],
      },
      {
        title: "我为什么做一对一辅导",
        items: [
          {
            label: "01",
            title: "我见过太多“听懂了但不会做”",
            content:
              "学生上课点头，不代表真的会迁移。很多时候，问题藏在读题顺序、条件标注和第一步选择里。把这些过程拆开，比分散刷题更重要。",
          },
          {
            label: "02",
            title: "我更愿意把题讲慢一点",
            content:
              "一节课不是为了塞进更多题，而是让学生能说清楚为什么这样做。只要这条路径稳定了，后面做同类题才会真正变轻松。",
          },
          {
            label: "03",
            title: "家长需要看到过程，而不是只听结果",
            content:
              "我会尽量把课堂思路、错因和下一步安排讲清楚。分数变化很重要，但家长更需要知道孩子到底卡在哪里。",
          },
        ],
      },
      {
        title: "适合先来沟通的情况",
        items: [
          {
            title: "基础不算差，但分数总是不稳",
            content: "这类学生通常不是全不会，而是题型识别、步骤规范或考试节奏出了问题。",
            icon: BadgeCheck,
          },
          {
            title: "数学大题没有切入点",
            content: "重点会放在条件拆解、目标反推和常见模型识别，而不是直接背一堆套路。",
            icon: Layers3,
          },
          {
            title: "物理综合题容易混",
            content: "先把受力、能量、电路等模型分清，再训练什么时候该用哪一种工具。",
            icon: FileText,
          },
        ],
      },
    ],
  },
  faq: {
    slug: "faq",
    eyebrow: "FAQ",
    title: "常见问题",
    subtitle: "先把服务边界、沟通准备、案例来源和公开授权讲清楚。",
    icon: HelpCircle,
    intro: {
      title: "先看清楚是否在服务范围内",
      body:
        "这里集中回答正式服务对象、线上线下范围、咨询信息、案例边界和价格公开方式；仍有疑问时再预约学习诊断。",
      points: ["高一 / 高二", "高中数学 / 高中物理", "案例与授权可追溯"],
    },
    sections: faqGroups,
  },
  classroom: {
    slug: "classroom",
    eyebrow: "Learning Content",
    title: "学习内容",
    subtitle: "先发布可核验的学习主题摘要，后续可按同一结构补充正文，无需引入复杂内容管理系统。",
    icon: BookOpen,
    showVisual: false,
    intro: {
      title: "从真实问题出发整理学习主题",
      body:
        "每个主题都标注适用对象、内容家族、作者、更新时间和来源。当前仅提供主题摘要，不把未完成内容包装成正式文章。",
      points: ["主题摘要", "来源可追溯", "后续可扩展"],
    },
    sections: [
      {
        title: "学习主题摘要",
        items: learningResources.map((item, index) => ({
          ...item,
          content: item.summary,
          icon: [BookOpen, Layers3, ClipboardList][index],
        })),
      },
      {
        title: "每篇内容会讲清楚什么",
        items: [
          {
            title: "问题与适用场景",
            content: "先说明这个学习问题通常怎样出现、适合哪些学生参考，以及哪些情况不在本文范围内。",
            icon: HelpCircle,
          },
          {
            title: "判断与处理步骤",
            content: "把判断顺序和练习步骤写成可执行的小单元，帮助读者理解下一步该观察什么。",
            icon: ClipboardList,
          },
          {
            title: "边界、来源与下一步",
            content: "明确内容依据、适用边界和可继续阅读或咨询的入口，不把个体经验写成普遍承诺。",
            icon: FileText,
          },
        ],
      },
    ],
  },
  cases: {
    slug: "cases",
    eyebrow: "Teaching Cases",
    title: "教学案例",
    subtitle: "只展示已经登记证据、完成匿名处理的教学案例，以及已经获得公开授权的匿名反馈。",
    icon: Layers3,
    intro: {
      title: "案例可追溯，结果有边界",
      body:
        "本页只展示两条已核验且完成匿名处理的案例；当前公开的三条学生或家长反馈均已获得公开授权。案例中的阶段变化仅描述对应记录，不构成普遍效果承诺。",
      points: ["证据编号可追溯", "未成年人信息脱敏", "个体结果不作普遍承诺"],
    },
    sections: [
      {
        title: "经核验的匿名案例",
        items: verifiedCases.map((item) => ({
          ...item,
          subject: `${item.grade} · ${item.subject}`,
        })),
      },
      {
        title: "已获授权的匿名反馈",
        items: authorizedReviews.map((item) => ({
          ...item,
          title: item.author,
          content: `“${item.quote}”`,
          icon: MessageCircle,
        })),
      },
      {
        title: "继续了解",
        items: [
          {
            title: "查看家教服务说明",
            content: "了解正式服务对象、科目和线上线下范围。",
            href: "/tutor",
            linkLabel: "进入家教主页",
            icon: UserRound,
          },
          {
            title: "查看常见问题",
            content: "了解案例边界、反馈授权和第一次咨询需要准备的信息。",
            href: "/faq",
            linkLabel: "进入 FAQ",
            icon: HelpCircle,
          },
          {
            title: "预约学习诊断",
            content: "只提交年级、科目、主要卡点和可沟通时间，不提交学生身份信息。",
            href: "/#contact",
            linkLabel: "去预约诊断",
            icon: MessageCircle,
          },
        ],
      },
    ],
  },
};
