# YAN TUTOR

个人教师品牌展示 + 学习诊断预约前端网站，面向高中学生和家长，展示高中数学 / 高中物理一对一辅导方式，并把核心转化收敛到首页底部的学习诊断预约区。

当前预约流程不接入后端：家长填写学生情况后，页面会生成一段可复制的咨询信息，再通过微信发送给老师。

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Pages

- 首页
- 关于我
- 教学案例
- 课堂复现
- 常见问题
- 预约诊断：统一跳转到首页 `#contact`

旧的 `#/booking` 链接会自动回到首页预约区。课程反馈页已经移除，当前网站不再作为课后管理系统使用。

## Development

```bash
npm install
npm run dev
```

默认开发地址：

```text
http://localhost:5173/
```

## Build And Test

```bash
npm run build
npm test
```

## WeChat QR

将真实二维码图片放入：

```text
public/wechat-qr.jpg
```

首页预约区会使用该图片展示微信二维码；如果图片加载失败，页面会提示复制微信号后在微信搜索添加。
