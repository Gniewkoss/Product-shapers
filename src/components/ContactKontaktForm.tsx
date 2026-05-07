import { useState, type FormEvent } from "react";

const fieldLabel = "font-sans font-bold text-[13px] uppercase tracking-[0.06em] text-[#555]";

const inputBase = [
  "w-full min-h-0 rounded-[10px] border border-[#e2e5ee] bg-[#fafbfd] px-4",
  "font-sans text-[15px] text-[#1b1b1b] placeholder:text-[#a0aab8]",
  "outline-none transition-[border-color,box-shadow] duration-150 ease-out",
  "hover:border-[#b8bec9]",
  "focus:border-[#0083fe] focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,131,254,0.12)]",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

const submitBase = [
  "mt-1 inline-flex w-full items-center justify-center rounded-[12px] bg-[#022169] px-10 py-4",
  "text-[15px] font-sans font-bold tracking-[0.05em] text-white",
  "transition-all duration-150 ease-out",
  "hover:bg-[#031d56] hover:shadow-[0_4px_16px_rgba(2,33,105,0.25)] hover:-translate-y-px",
  "active:translate-y-0 active:shadow-none",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0083fe]",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");

/** FormSubmit delivers here; override with VITE_FORMSUBMIT_EMAIL if needed. */
const FORMSUBMIT_EMAIL =
  (typeof import.meta.env.VITE_FORMSUBMIT_EMAIL === "string" && import.meta.env.VITE_FORMSUBMIT_EMAIL.trim()) ||
  "d.szkielka@gmail.com";

const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(FORMSUBMIT_EMAIL)}`;

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const initial: FormState = { name: "", email: "", company: "", message: "" };

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactKontaktForm({ "data-node-id": dataNodeId }: { "data-node-id"?: string }) {
  const [values, setValues] = useState<FormState>(initial);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          message: values.message.trim(),
          _subject: "Konsultacja — formularz Product Shapers",
          _template: "table",
          _captcha: false,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };

      if (!res.ok || data.success === false) {
        setStatus("error");
        return;
      }

      setValues(initial);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      className="flex w-full max-w-[539px] flex-col gap-6"
      onSubmit={onSubmit}
      data-node-id={dataNodeId}
      autoComplete="on"
    >
      <div className="grid w-full max-w-full grid-cols-1 gap-x-[23px] gap-y-6 min-[500px]:grid-cols-2" data-name="Name + Email">
        <div className="flex min-w-0 flex-col gap-2" data-name="Imię i nazwisko">
          <label htmlFor="kontakt-name" className={fieldLabel}>
            <span>Imię i nazwisko</span>
          </label>
          <input
            id="kontakt-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => setValues((s) => ({ ...s, name: e.target.value }))}
            className={`${inputBase} h-[50px] sm:h-[58px]`}
            placeholder="Jan Kowalski"
            required
            disabled={status === "submitting"}
            aria-describedby="kontakt-form-hint"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-2" data-name="Email">
          <label htmlFor="kontakt-email" className={fieldLabel}>
            <span>Email</span>
          </label>
          <input
            id="kontakt-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues((s) => ({ ...s, email: e.target.value }))}
            className={`${inputBase} h-[50px] sm:h-[58px]`}
            placeholder="imie@firma.pl"
            required
            disabled={status === "submitting"}
            aria-describedby="kontakt-form-hint"
          />
        </div>
      </div>
      <div className="flex w-full min-w-0 flex-col gap-2" data-name="Firma">
        <label htmlFor="kontakt-company" className={fieldLabel}>
          <span>Firma</span>
        </label>
        <input
          id="kontakt-company"
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={(e) => setValues((s) => ({ ...s, company: e.target.value }))}
          className={`${inputBase} h-[50px] sm:h-[58px]`}
          placeholder="Nazwa firmy"
          disabled={status === "submitting"}
        />
      </div>
      <div className="flex w-full min-w-0 flex-col gap-2" data-name="Wiadomość">
        <label htmlFor="kontakt-message" className={fieldLabel}>
          <span>Wiadomość</span>
        </label>
        <textarea
          id="kontakt-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
          className={`${inputBase} min-h-[140px] resize-y py-2.5`}
          placeholder="Opisz, z czym do nas przychodzisz…"
          required
          disabled={status === "submitting"}
        />
      </div>
      {status === "success" ?
        <p className="rounded-md border border-[#7dfab6]/40 bg-[#f0fdf4] px-3 py-2 text-[14px] leading-snug text-[#14532d]" role="status">
          Dziękujemy — wiadomość została wysłana. Odezwiemy się na podany adres e-mail.
        </p>
      : null}
      {status === "error" ?
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[14px] leading-snug text-red-900" role="alert">
          Nie udało się wysłać formularza. Spróbuj ponownie za chwilę lub napisz bezpośrednio na{" "}
          <a href="mailto:kontakt@productshapers.com" className="font-medium underline underline-offset-2">
            kontakt@productshapers.com
          </a>
          .
        </p>
      : null}
      <p id="kontakt-form-hint" className="text-[12px] leading-4 text-[#64748b]">
        Wysyłając formularz, przekazujesz dane do Product Shapers. Możesz też napisać na{" "}
        <a href="mailto:kontakt@productshapers.com" className="text-[#022169] underline-offset-2 hover:underline">
          kontakt@productshapers.com
        </a>
        . Przy pierwszym użyciu usługi FormSubmit możesz dostać e-mail aktywacyjny — potwierdź go, aby odbierać zgłoszenia.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <button type="submit" className={submitBase} disabled={status === "submitting"}>
          {status === "submitting" ? "Wysyłanie…" : "Wyślij wiadomość"}
        </button>
      </div>
    </form>
  );
}
