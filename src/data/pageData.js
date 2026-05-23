import {
  BadgeCheck,
  Camera,
  ClipboardList,
  FileText,
  HelpCircle,
  Layers3,
  NotebookPen,
  Sparkles,
  UserRound,
} from "lucide-react";

export const pageNavItems = [
  { label: "我的故事", href: "/story" },
  { label: "FAQ", href: "/faq" },
  { label: "课堂复现", href: "/classroom" },
  { label: "教学案例", href: "/cases" },
];

export const staticPages = {
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
    subtitle: "先把家长最关心的问题讲清楚：适合谁、怎么上、怎么判断是否有效。",
    icon: HelpCircle,
    intro: {
      title: "适合先快速了解的家长",
      body:
        "如果你还不确定孩子是基础问题、方法问题，还是考试状态问题，可以先从这些问题开始判断。",
      points: ["高一 / 高二数学物理", "一对一诊断", "先看问题，再定安排"],
    },
    sections: [
      {
        title: "课程安排",
        items: [
          {
            question: "主要辅导哪些学生？",
            answer:
              "当前主要面向高一、高二学生，科目以高中数学和高中物理为主，也可以做初高衔接阶段的学习方法梳理。",
          },
          {
            question: "线上和线下都可以吗？",
            answer:
              "可以。线下更适合需要强监督和板书推导的学生，线上更适合时间固定、能主动沟通问题的学生。",
          },
          {
            question: "第一次沟通需要准备什么？",
            answer:
              "建议准备年级、科目、当前分数、最近一次试卷、主要卡点和可上课时间。信息越具体，诊断越准确。",
          },
        ],
      },
      {
        title: "学习效果",
        items: [
          {
            question: "怎么判断孩子适不适合继续上？",
            answer:
              "优先看三件事：课后能否复述思路、同类题是否少卡一步、错因是否越来越具体。分数变化通常会滞后于方法变化。",
          },
          {
            question: "会不会只讲作业答案？",
            answer:
              "不会把课堂变成答案代写。作业题会用来反查知识漏洞、题型识别和步骤习惯。",
          },
          {
            question: "多久反馈一次学习情况？",
            answer:
              "建议每几次课做一次简短复盘，说明这段时间解决了什么、还卡在哪里、下一阶段怎么推进。",
          },
        ],
      },
    ],
  },
  classroom: {
    slug: "classroom",
    eyebrow: "Classroom Replay",
    title: "课堂复现",
    subtitle: "用课堂截图、板书整理和课后复盘，让家长看到一节课到底发生了什么。",
    icon: Camera,
    intro: {
      title: "把抽象的辅导过程变得可追踪",
      body:
        "这一页适合展示真实上课材料：题目拆解、板书路径、学生卡点和课后复盘。涉及学生隐私的内容需要先脱敏。",
      points: ["题目拆解", "板书路径", "课后复盘"],
    },
    sections: [
      {
        title: "课堂材料类型",
        items: [
          {
            title: "上课截图",
            icon: Camera,
            content: "展示讲题过程中的关键节点，例如题目条件标注、思路分叉、学生容易忽略的位置。",
          },
          {
            title: "板书截图",
            icon: NotebookPen,
            content: "保留推导过程，而不只是最终答案。家长能看到每一步为什么这样做。",
          },
          {
            title: "课后复盘",
            icon: ClipboardList,
            content: "记录本节课解决的问题、仍然卡住的点，以及下一次课的训练方向。",
          },
        ],
      },
      {
        title: "一节课的复现结构",
        items: [
          {
            label: "课前",
            title: "确认本节目标",
            content: "根据近期作业或试卷，确定本节课优先处理的题型和知识点。",
          },
          {
            label: "课中",
            title: "拆题与追问",
            content: "让学生说出卡点，再用追问方式定位是概念、模型还是步骤问题。",
          },
          {
            label: "课后",
            title: "沉淀复盘",
            content: "整理本节课的可复用方法，并给出下一次练习方向。",
          },
        ],
      },
    ],
  },
  cases: {
    slug: "cases",
    eyebrow: "Teaching Cases",
    title: "教学案例",
    subtitle: "不堆砌成功故事，而是用问题类型说明我会如何拆解和推进。",
    icon: Layers3,
    intro: {
      title: "从问题类型看教学方法",
      body:
        "同样是分数不理想，原因可能完全不同。案例页重点展示识别问题和制定路径的方式。",
      points: ["问题识别", "方法拆解", "阶段复盘"],
    },
    sections: [
      {
        title: "典型问题案例",
        items: [
          {
            title: "听得懂，但一做题就卡",
            subject: "高一数学",
            problem: "课堂例题能跟上，独立做题不知道第一步写什么。",
            method: "先训练条件标注，再把题目目标拆成可执行的小步骤。",
            result: "重点不是多刷题，而是让学生形成“先看什么、再想什么”的稳定路径。",
          },
          {
            title: "物理综合题模型混乱",
            subject: "高二物理",
            problem: "受力、能量、电路知识点都会，但综合在一起就容易乱。",
            method: "用模型清单先判断题目属于哪类情境，再决定优先画图、列式还是守恒分析。",
            result: "让学生从“凭感觉套公式”转向“先识别模型，再选择工具”。",
          },
          {
            title: "考试分数不稳定",
            subject: "阶段复盘",
            problem: "平时会做，考试容易漏条件、跳步骤或时间分配失控。",
            method: "把错题按知识、审题、步骤、心态四类复盘，再分别训练。",
            result: "先减少非知识性失误，再处理真正的知识漏洞。",
          },
        ],
      },
      {
        title: "案例页展示原则",
        items: [
          {
            title: "不暴露学生隐私",
            content: "姓名、学校、原始试卷细节都需要隐藏或概括处理。",
            icon: BadgeCheck,
          },
          {
            title: "不夸大结果",
            content: "成绩变化只描述阶段性现象，不承诺固定提分幅度。",
            icon: Sparkles,
          },
          {
            title: "强调方法过程",
            content: "让家长看到为什么这样教，而不只是看到一句“进步了”。",
            icon: FileText,
          },
        ],
      },
    ],
  },
};
