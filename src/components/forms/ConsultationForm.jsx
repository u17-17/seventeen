import { useId, useRef, useState } from "react";
import { CalendarCheck, Copy, Loader2, Send } from "lucide-react";
import { consultationConfig } from "../../data/consultationConfig.js";
import { entityProfile } from "../../data/entityProfile.js";
import {
  buildConsultationMessage,
  buildDiagnosisPayload,
  copyTextWithFallback,
  createSubmissionRequestId,
} from "../../services/submissions.js";
import { validateConsultationForm } from "../../utils/formValidation.js";
import {
  FieldError,
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
  deliveryPreference: "",
  scoreRange: "",
  mainConcern: "",
  availability: "",
  privacyConsent: false,
  website: "",
};

const preparationItems = [
  "学生年级和咨询科目",
  "涉县线下或邯郸线上偏好",
  "可选的当前成绩区间",
  "最主要的学习卡点",
];

export default function ConsultationForm({ variant = "standalone", className = "" }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [apiStatus, setApiStatus] = useState(null);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formStartedAtRef = useRef(Date.now());
  const requestIdRef = useRef("");
  const privacyNoticeId = useId();
  const consentId = `${privacyNoticeId}-consent`;
  const consentErrorId = `${privacyNoticeId}-consent-error`;
  const embedded = variant === "embedded";

  const updateField = (event) => {
    const { checked, name, type, value } = event.target;
    const nextValue = type === "checkbox" ? checked : value;

    setValues((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
    setApiStatus(null);
    setGeneratedMessage("");
    setCopyStatus("");
    setSubmitted(false);
    requestIdRef.current = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting || submitted) return;

    const result = validateConsultationForm(values);
    setErrors(result.errors);

    if (!result.valid) {
      setApiStatus({
        type: "error",
        message:
          "请先补全标红的必填信息并确认个人信息说明；也可以直接复制右侧微信号联系。",
      });
      setGeneratedMessage("");
      return;
    }

    const message = buildConsultationMessage(values);
    setGeneratedMessage(message);
    setSubmitting(true);
    setApiStatus(null);
    setCopyStatus("");

    if (!requestIdRef.current) {
      requestIdRef.current = createSubmissionRequestId();
    }

    const payload = buildDiagnosisPayload(values, {
      source: typeof window !== "undefined" ? window.location.pathname : "",
      formStartedAt: formStartedAtRef.current,
      requestId: requestIdRef.current,
    });

    try {
      const response = await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
        setApiStatus({
          type: "success",
          message: "已收到咨询，会按所填联系方式联系你。请保留下方咨询摘要以便核对。",
        });
      } else {
        setApiStatus({
          type: "error",
          message: `提交失败，请复制咨询摘要并直接添加微信 ${entityProfile.contact.wechatId}。`,
        });
      }
    } catch {
      setApiStatus({
        type: "error",
        message: `提交失败，请复制咨询摘要并直接添加微信 ${entityProfile.contact.wechatId}。`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyMessage = async () => {
    if (!generatedMessage) return;
    const copied = await copyTextWithFallback(generatedMessage);
    setCopyStatus(copied ? "咨询摘要已复制。" : "请在弹出的提示框中手动复制摘要。");
  };

  const form = (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={submitting}
      className={`rounded-3xl border border-brand/12 bg-white p-5 shadow-soft sm:p-7 ${className}`}
    >
      {embedded && (
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand/70">
            Diagnosis Form
          </p>
          <h3 className="mt-3 text-xl font-bold leading-tight text-brand-deep sm:text-2xl">
            填写家教咨询
          </h3>
          <p className="mt-3 text-sm leading-7 text-neutral-500">
            只填写初步判断所需的信息；提交成功后会按所填联系方式继续沟通。
          </p>
        </div>
      )}

      <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px]">
        <label htmlFor={`${privacyNoticeId}-website`}>Website</label>
        <input
          id={`${privacyNoticeId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={updateField}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="联系人称呼（可选）"
          name="guardianName"
          error={errors.guardianName}
          hint="最多 30 个字。"
        >
          {({ errorId }) => (
            <TextInput
              id="guardianName"
              name="guardianName"
              value={values.guardianName}
              onChange={updateField}
              maxLength={consultationConfig.limits.guardianName}
              autoComplete="name"
              placeholder="例如：李女士"
              error={errors.guardianName}
              errorId={errorId}
            />
          )}
        </FormField>

        <FormField
          label="家长微信号或手机号 *"
          name="contact"
          inputId="guardianContact"
          error={errors.contact}
        >
          {({ errorId }) => (
            <TextInput
              id="guardianContact"
              name="contact"
              value={values.contact}
              onChange={updateField}
              minLength={consultationConfig.limits.contactMin}
              maxLength={consultationConfig.limits.contactMax}
              autoComplete="tel"
              required
              placeholder="仅用于回复本次咨询"
              error={errors.contact}
              errorId={errorId}
            />
          )}
        </FormField>

        <FormField label="学生年级 *" name="grade" error={errors.grade}>
          {({ errorId }) => (
            <SelectInput
              id="grade"
              name="grade"
              value={values.grade}
              onChange={updateField}
              required
              error={errors.grade}
              errorId={errorId}
            >
              <option value="">请选择</option>
              {consultationConfig.grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </SelectInput>
          )}
        </FormField>

        <FormField label="咨询科目 *" name="subject" error={errors.subject}>
          {({ errorId }) => (
            <SelectInput
              id="subject"
              name="subject"
              value={values.subject}
              onChange={updateField}
              required
              error={errors.subject}
              errorId={errorId}
            >
              <option value="">请选择</option>
              {consultationConfig.subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </SelectInput>
          )}
        </FormField>

        <FormField
          label="授课偏好 *"
          name="deliveryPreference"
          error={errors.deliveryPreference}
          hint={`线下范围：${entityProfile.services.offlineArea}；线上范围：${entityProfile.services.onlineArea}。`}
        >
          {({ errorId }) => (
            <SelectInput
              id="deliveryPreference"
              name="deliveryPreference"
              value={values.deliveryPreference}
              onChange={updateField}
              required
              error={errors.deliveryPreference}
              errorId={errorId}
            >
              <option value="">请选择</option>
              {consultationConfig.deliveryPreferences.map((preference) => (
                <option key={preference} value={preference}>
                  {preference}
                </option>
              ))}
            </SelectInput>
          )}
        </FormField>

        <FormField
          label="当前成绩区间（可选）"
          name="scoreRange"
          error={errors.scoreRange}
          hint="只需选择区间，不收集精确分数。"
        >
          {({ errorId }) => (
            <SelectInput
              id="scoreRange"
              name="scoreRange"
              value={values.scoreRange}
              onChange={updateField}
              error={errors.scoreRange}
              errorId={errorId}
            >
              <option value="">未提供</option>
              {consultationConfig.scoreRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </SelectInput>
          )}
        </FormField>
      </div>

      <div className="mt-5 grid gap-5">
        <FormField
          label="学生当前主要问题 *"
          name="mainConcern"
          error={errors.mainConcern}
          hint="8—500 字；只描述学习问题，不提交学生身份信息或图片。"
        >
          {({ errorId }) => (
            <TextAreaInput
              id="mainConcern"
              name="mainConcern"
              value={values.mainConcern}
              onChange={updateField}
              minLength={consultationConfig.limits.mainConcernMin}
              maxLength={consultationConfig.limits.mainConcernMax}
              required
              placeholder="例如：函数题能听懂，但独立做题时不知道第一步。请勿填写学生姓名、学校、班级或详细地址。"
              error={errors.mainConcern}
              errorId={errorId}
            />
          )}
        </FormField>

        <FormField
          label="可沟通时间（可选）"
          name="availability"
          error={errors.availability}
          hint="也可以在首次微信回复时再确认。"
        >
          {({ errorId }) => (
            <SelectInput
              id="availability"
              name="availability"
              value={values.availability}
              onChange={updateField}
              error={errors.availability}
              errorId={errorId}
            >
              <option value="">暂不选择</option>
              {consultationConfig.availabilityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectInput>
          )}
        </FormField>
      </div>

      <section
        id={privacyNoticeId}
        aria-labelledby={`${privacyNoticeId}-title`}
        className="mt-7 rounded-2xl border border-brand/12 bg-cream/60 p-4 sm:p-5"
      >
        <h4
          id={`${privacyNoticeId}-title`}
          className="text-base font-bold text-brand-deep"
        >
          咨询表单个人信息说明
        </h4>
        <p className="mt-3 text-sm leading-7 text-neutral-600">
          {consultationConfig.privacyNotice}
        </p>
      </section>

      <div className="mt-5 rounded-2xl border border-brand/12 bg-white p-4">
        <div className="flex items-start gap-3">
          <input
            id={consentId}
            name="privacyConsent"
            type="checkbox"
            checked={values.privacyConsent}
            onChange={updateField}
            required
            aria-invalid={Boolean(errors.privacyConsent)}
            aria-describedby={
              errors.privacyConsent
                ? `${privacyNoticeId} ${consentErrorId}`
                : privacyNoticeId
            }
            className="mt-1 h-5 w-5 shrink-0 accent-brand"
          />
          <label htmlFor={consentId} className="text-sm font-semibold leading-6 text-brand-deep">
            {consultationConfig.consentLabel}
          </label>
        </div>
        <p className="mt-3 text-sm leading-6 text-neutral-500">
          不同意通过表单处理信息时，可以直接复制微信号 {entityProfile.contact.wechatId}，再通过微信联系。
        </p>
        <FieldError id={consentErrorId} message={errors.privacyConsent} />
      </div>

      <div className="mt-7 grid gap-4">
        <FormStatus status={apiStatus} />

        {generatedMessage && !submitting && (
          <div className="rounded-2xl border border-brand/12 bg-cream/60 p-4">
            <p className="text-sm font-bold text-brand-deep">可复制的咨询摘要</p>
            <pre className="mt-3 whitespace-pre-wrap break-words font-sans text-sm font-semibold leading-7 text-brand-deep">
              {generatedMessage}
            </pre>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/20 bg-white px-5 py-3 text-sm font-semibold text-brand transition-colors hover:border-brand hover:text-brand-deep"
              >
                <Copy size={16} />
                复制咨询摘要
              </button>
              {copyStatus && (
                <p role="status" className="text-sm font-semibold text-neutral-500">
                  {copyStatus}
                </p>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || submitted}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-base font-semibold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-brand disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-brand disabled:hover:shadow-none"
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              正在提交...
            </>
          ) : (
            <>
              {submitted ? "咨询已提交" : "提交咨询"}
              <Send size={18} />
            </>
          )}
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
              只准备初步判断需要的信息，不提交学生身份资料或详细地址。
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
