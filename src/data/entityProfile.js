export const entityProfile = Object.freeze({
  canonicalName: "邯郸闫老师高中数学物理家教",
  auxiliaryBrand: "YAN TUTOR",
  entityType: "个人教师品牌 / 高中一对一家教服务",
  search: Object.freeze({
    localName: "邯郸市闫老师",
    title: "邯郸市闫老师高中数学物理家教｜涉县线下/邯郸线上一对一辅导",
    description:
      "邯郸市闫老师提供高一高二高中数学、物理一对一学习诊断与辅导，涉县线下沟通，邯郸市全地区线上辅导，重点做题型拆解、过程梳理和错因复盘。",
    keywords: Object.freeze([
      "邯郸市闫老师",
      "涉县闫老师",
      "邯郸高中数学家教",
      "涉县高中物理家教",
      "高中数学物理一对一",
    ]),
  }),
  teacher: Object.freeze({
    name: "闫老师",
    shortName: "闫老师",
    school: "河北师范大学",
    major: "教育学",
    displayAge: "22 岁",
    photoPolicy: "当前不展示教师照片",
  }),
  website: Object.freeze({
    origin: "https://seventeen-yan.cn",
    homePath: "/",
    tutorPath: "/tutor",
  }),
  services: Object.freeze({
    subjects: Object.freeze(["高中数学", "高中物理"]),
    formalGrades: Object.freeze(["高一", "高二"]),
    consultationGrades: Object.freeze(["高一", "高二", "升高一咨询"]),
    offlineArea: "河北省邯郸市涉县",
    onlineArea: "邯郸市全地区",
  }),
  contact: Object.freeze({
    wechatId: "-L09-29",
    qrPath: "/wechat-qr-cropped.jpg",
    qrFallback: "请复制微信号后在微信搜索添加",
  }),
});

export function getCompactSubjectLabel() {
  const [firstSubject, secondSubject] = entityProfile.services.subjects;
  return `${firstSubject} / ${secondSubject.replace(/^高中/, "")}`;
}

export function getFormalGradeLabel() {
  return entityProfile.services.formalGrades.join(" / ");
}

export function getServiceModeLabel() {
  return "涉县线下 / 邯郸线上";
}
