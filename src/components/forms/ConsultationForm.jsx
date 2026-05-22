import { useState } from "react";
import { CalendarCheck, Copy, Send } from "lucide-react";
import {
  buildConsultationMessage,
  copyTextWithFallback,
} from "../../services/submissions.js";
import { validateConsultationForm } from "../../utils/formValidation.js";
import {
  FormField,
  FormStatus,
  SelectInput,
  TextAreaInput,
  TextInput,
} from "./FormControls.jsx";

const initialValues = {
  guardianName: "",
  contact: "",
  grade: "",
  subject: "",
  currentScore: "",
  targetScore: "",
  mainConcern: "",
  availability: "",
};

const grades = ["高一", "高二", "初高衔接", "其他"];
const subjects = ["数学", "物理", "数学 + 物理", "暂不确定"];
const availabilityOptions = [
  "周六上午",
  "周六下午",
  "周日上午",
  "周日下午",
  "平时晚上",
  "需要再沟通",
];

const preparationItems = [
  "学生基本情况",
  "当前分数和目标",
  "最主要的卡点",
  "可沟通时间",
];

export default function ConsultationForm({ variant = "standalone", className = "" }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const embedded = variant === "embedded";

  const updateField = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
    setStatus(null);
    setGeneratedMessage("");
    setCopyStatus("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = validateConsultationForm(values);
    setErrors(result.errors);

    if (!result.valid) {
      setStatus({ type: "error", message: "请先补全标红的信息，再生成咨询信息。" });
      setGeneratedMessage("");
      setCopyStatus("");
      return;
    }

    const message = buildConsultationMessage(values);
    setGeneratedMessage(message);
    setCopyStatus("");
    setStatus({
      type: "success",
      message:
        "已整理好咨询信息。你可以复制下面内容，通过微信发给我，我会根据学生情况判断适合的补习方向。",
    });
  };

  const handleCopyMessage = async () => {
    if (!generatedMessage) return;
    const copied = await copyTextWithFallback(generatedMessage);
    setCopyStatus(copied ? "咨询信息已复制。" : "请在弹出的提示框中手动复制咨询信息。");
  };

  const form = (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`rounded-3xl border border-brand/12 bg-white p-5 shadow-soft sm:p-7 ${className}`}
    >
      {embedded && (
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand/70">
            Diagnosis Form
          </p>
          <h3 className="mt-3 text-xl font-bold leading-tight text-brand-deep sm:text-2xl">
            填写学生情况
          </h3>
          <p className="mt-3 text-sm leading-7 text-neutral-500">
            表单不会提交到服务器，只会帮你生成一段可复制的微信咨询内容。
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="家长称呼" name="guardianName" error={errors.guardianName}>
          {({ errorId }) => (
            <TextInput
              id="guardianName"
              name="guardianName"
              value={values.guardianName}
              onChange={updateField}
              placeholder="例如：李女士"
              error={errors.guardianName}
              errorId={errorId}
            />
          )}
        </FormField>

        <FormField label="手机号或微信号" name="contact" error={errors.contact}>
          {({ errorId }) => (
            <TextInput
              id="contact"
              name="contact"
              value={values.contact}
              onChange={updateField}
              placeholder="用于后续沟通"
              error={errors.contact}
              errorId={errorId}
            />
          )}
        </FormField>

        <FormField label="学生年级" name="grade" error={errors.grade}>
          {({ errorId }) => (
            <SelectInput
              id="grade"
              name="grade"
              value={values.grade}
              onChange={updateField}
              error={errors.grade}
              errorId={errorId}
            >
              <option value="">请选择</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </SelectInput>
          )}
        </FormField>

        <FormField label="咨询科目" name="subject" error={errors.subject}>
          {({ errorId }) => (
            <SelectInput
              id="subject"
              name="subject"
              value={values.subject}
              onChange={updateField}
              error={errors.subject}
              errorId={errorId}
            >
              <option value="">请选择</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </SelectInput>
          )}
        </FormField>

        <FormField
          label="当前分数"
          name="currentScore"
          error={errors.currentScore}
          hint="可不填，填写时按 0-150 校验。"
        >
          {({ errorId }) => (
            <TextInput
              id="currentScore"
              name="currentScore"
              value={values.currentScore}
              onChange={updateField}
              inputMode="decimal"
              placeholder="例如：86"
              error={errors.currentScore}
              errorId={errorId}
            />
          )}
        </FormField>

        <FormField
          label="目标分数"
          name="targetScore"
          error={errors.targetScore}
          hint="可不填，用于判断目标压力。"
        >
          {({ errorId }) => (
            <TextInput
              id="targetScore"
              name="targetScore"
              value={values.targetScore}
              onChange={updateField}
              inputMode="decimal"
              placeholder="例如：110"
              error={errors.targetScore}
              errorId={errorId}
            />
          )}
        </FormField>
      </div>

      <div className="mt-5 grid gap-5">
        <FormField label="学生当前主要问题" name="mainConcern" error={errors.mainConcern}>
          {({ errorId }) => (
            <TextAreaInput
              id="mainConcern"
              name="mainConcern"
              value={values.mainConcern}
              onChange={updateField}
              placeholder="例如：函数题听得懂，但是自己做题没有切入点。"
              error={errors.mainConcern}
              errorId={errorId}
            />
          )}
        </FormField>

        <FormField label="可沟通时间" name="availability" error={errors.availability}>
          {({ errorId }) => (
            <SelectInput
              id="availability"
              name="availability"
              value={values.availability}
              onChange={updateField}
              error={errors.availability}
              errorId={errorId}
            >
              <option value="">请选择</option>
              {availabilityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectInput>
          )}
        </FormField>
      </div>

      <div className="mt-7 grid gap-4">
        <FormStatus status={status} />

        {generatedMessage && (
          <div className="rounded-2xl border border-brand/12 bg-cream/60 p-4">
            <pre className="whitespace-pre-wrap break-words font-sans text-sm font-semibold leading-7 text-brand-deep">
              {generatedMessage}
            </pre>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/20 bg-white px-5 py-3 text-sm font-semibold text-brand transition-colors hover:border-brand hover:text-brand-deep"
              >
                <Copy size={16} />
                复制咨询信息
              </button>
              {copyStatus && (
                <p className="text-sm font-semibold text-neutral-500">{copyStatus}</p>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-base font-semibold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-brand"
        >
          {generatedMessage ? "更新咨询信息" : "生成咨询信息"}
          <Send size={18} />
        </button>
      </div>
    </form>
  );

  if (embedded) return form;

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="rounded-3xl border border-brand/12 bg-cream/60 p-7 sm:p-9">
            <div className="mb-8 grid h-12 w-12 place-items-center rounded-full bg-brand text-accent">
              <CalendarCheck size={21} />
            </div>
            <h2 className="text-2xl font-black leading-tight text-brand-deep sm:text-3xl">
              学习诊断表
            </h2>
            <p className="mt-5 text-base leading-7 text-neutral-600">
              先把学生情况整理清楚，再复制成微信消息发送给我。
            </p>
            <div className="mt-8 grid gap-3">
              {preparationItems.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-brand/10 bg-white px-4 py-3"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-xs font-bold text-accent">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-neutral-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {form}
        </div>
      </div>
    </section>
  );
}
