import {
  BadgeCheck,
  Camera,
  ClipboardList,
  FileText,
  HelpCircle,
  Layers3,
  NotebookPen,
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
    subtitle: "不展示答案堆砌，而展示一节课怎么把公式来源、几何题眼和证明路径讲清楚。",
    icon: Layers3,
    intro: {
      title: "把难题拆成可复用的方法",
      body:
        "下面两个案例来自课堂板书：一个讲公式如何推导和迁移，一个讲立体几何如何从目标反推题眼。",
      points: ["公式来源", "逆推题眼", "板书过程"],
    },
    sections: [
      {
        title: "两个深案例：看见一节课怎么推进",
        items: [
          {
            title: "公式不是背出来的，是一步步长出来的",
            subject: "高一数学",
            focus: "公式推导",
            problem: "学生常把三角函数公式当成零散结论，背得住一部分，却不知道遇到变形题该怎么迁移。",
            method: "先从两角和差公式的来源讲起，再顺着公式之间的生长关系往下看二倍角、半角、万能公式和辅助角。",
            result: "学生不只记住公式，更知道看到复杂角、平方项、线性组合时该优先往哪个方向转化。",
            highlights: [
              "先问公式为什么出现，把复合角拆回熟悉角。",
              "用图像和向量分解推导两角和差，不直接给结论。",
              "把后续公式串成一条迁移路线，减少孤立记忆。",
            ],
            images: [
              {
                src: "/cases/formula-derivation-01.png",
                alt: "三角函数两角和差公式推导板书",
                caption: "从两角和差公式讲来源：先问为什么出现，再一步步推出 sin、cos、tan。",
              },
              {
                src: "/cases/formula-derivation-02.png",
                alt: "二倍角半角万能公式和辅助角公式关系板书",
                caption: "顺着公式关系往下看：二倍角、半角、万能公式和辅助角不再孤立记忆。",
              },
            ],
          },
          {
            title: "立体几何不是念答案，是从目标反推题眼",
            subject: "高二数学",
            focus: "立体几何逆推",
            problem: "学生看得懂答案里的每一步，但自己做题时不知道第一条辅助线、第一组垂直关系从哪里来。",
            method: "先从要证明的目标往回看，把面面垂直转成线面垂直，再继续找平面内第二条相交直线。",
            result: "学生会把目标、现成条件和待构造关系串起来，形成同类几何证明可复用的逆推路线。",
            highlights: [
              "先盯住要证什么，把大目标拆成能操作的小目标。",
              "从已知直角、圆心和轴线关系里找候选垂线。",
              "最后把思路整理成规范证明，避免只会听答案。",
            ],
            images: [
              {
                src: "/cases/solid-geometry-01.png",
                alt: "立体几何从目标反推题眼板书",
                caption: "先从目标往回看：把“面面垂直”转成要找的线面垂直。",
              },
              {
                src: "/cases/solid-geometry-02.png",
                alt: "立体几何逆推路线整理成完整证明板书",
                caption: "把题眼串成完整证明：目标反推、关系构造、规范落地。",
              },
            ],
          },
        ],
      },
      {
        title: "这类课我会怎么讲",
        items: [
          {
            title: "先讲来源，不急着背结论",
            content: "公式课会先回答为什么出现、怎么推出来，再看它和后续公式的生长关系。",
            icon: NotebookPen,
          },
          {
            title: "先找题眼，不急着套答案",
            content: "几何课会先从要证什么往回看，把面面、线面、线线关系一步步换成可操作的目标。",
            icon: Layers3,
          },
          {
            title: "课后沉淀成可迁移路径",
            content: "最后把本节课的方法整理成遇到同类题时能复用的判断顺序和检查清单。",
            icon: BadgeCheck,
          },
        ],
      },
    ],
  },
};
