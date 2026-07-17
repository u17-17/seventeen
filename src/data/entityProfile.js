export const entityProfile = Object.freeze({
  canonicalName: "邯郸闫老师高中数学物理家教",
  auxiliaryBrand: "YAN TUTOR",
  entityType: "个人教师品牌 / 高中一对一家教服务",
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
