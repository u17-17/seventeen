export const fieldBase =
  "w-full rounded-2xl border border-brand/15 bg-white px-4 py-3.5 text-base font-medium text-brand-deep outline-none transition-colors placeholder:text-neutral-400 focus:border-brand focus:ring-2 focus:ring-brand/15";

export function FieldError({ id, message }) {
  if (!message) return null;

  return (
    <p id={id} className="mt-2 text-sm font-semibold text-red-600">
      {message}
    </p>
  );
}

export function FormField({ label, name, inputId = name, error, children, hint }) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-bold text-brand-deep">
        {label}
      </label>
      {children({ errorId })}
      {hint && !error && <p className="mt-2 text-sm text-neutral-500">{hint}</p>}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function TextInput({ error, errorId, ...props }) {
  return (
    <input
      {...props}
      className={fieldBase}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? errorId : undefined}
    />
  );
}

export function SelectInput({ error, errorId, children, ...props }) {
  return (
    <select
      {...props}
      className={fieldBase}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? errorId : undefined}
    >
      {children}
    </select>
  );
}

export function TextAreaInput({ error, errorId, ...props }) {
  return (
    <textarea
      {...props}
      className={`${fieldBase} min-h-32 resize-y leading-7`}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? errorId : undefined}
    />
  );
}

export function FormStatus({ status }) {
  if (!status) return null;

  const tone =
    status.type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-red-200 bg-red-50 text-red-700";

  return (
    <div
      role={status.type === "success" ? "status" : "alert"}
      aria-live="polite"
      className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${tone}`}
    >
      {status.message}
    </div>
  );
}
