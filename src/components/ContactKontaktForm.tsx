import { useState, type FormEvent } from "react";

const fieldLabel = "font-['Satoshi:Bold',sans-serif] text-[#444651] text-[16px] tracking-[1.2px] leading-[16px]";

const inputBase = [
  "w-full min-h-0 rounded-[6px] border border-[#e6ebf1] bg-[#f8fafc] px-3",
  "font-['Satoshi:Bold',sans-serif] text-[16px] tracking-[1.2px] text-[#1b1b1b] placeholder:text-[#94a3b8]/80",
  "outline-none transition-[border-color,box-shadow] duration-200 ease-out",
  "hover:border-[#c5cad4]",
  "focus:border-[#0083fe] focus:shadow-[0_0_0_3px_rgba(0,131,254,0.12)]",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

const submitBase = [
  "mt-2 inline-flex w-full items-center justify-center rounded-[18px] bg-[#022169] px-10 py-5",
  "text-[16px] font-['Satoshi:Bold',sans-serif] font-bold tracking-[1.2px] text-white",
  "shadow-sm transition-[transform,box-shadow,background-color] duration-200 ease-out",
  "hover:bg-[#031d56] active:scale-[0.99]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0083fe]",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const initial: FormState = { name: "", email: "", company: "", message: "" };

function buildMailtoBody(values: FormState) {
  const lines = [
    `Imię i nazwisko: ${values.name}`,
    `Email: ${values.email}`,
    `Firma: ${values.company}`,
    "",
    "Wiadomość:",
    values.message,
  ];
  return lines.join("\n");
}

export function ContactKontaktForm({ "data-node-id": dataNodeId }: { "data-node-id"?: string }) {
  const [values, setValues] = useState<FormState>(initial);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const body = buildMailtoBody(values);
    const subject = encodeURIComponent("Konsultacja — formularz Product Shapers");
    const href = `mailto:kontakt@productshapers.com?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
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
        />
      </div>
      <p id="kontakt-form-hint" className="text-[12px] leading-4 text-[#64748b]">
        Wysyłając, otworzysz skrzynkę poczty z uzupełnionym szablonem. Możesz też napisać na{" "}
        <a href="mailto:kontakt@productshapers.com" className="text-[#022169] underline-offset-2 hover:underline">
          kontakt@productshapers.com
        </a>
        .
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <button type="submit" className={submitBase}>
          Wyślij wiadomość
        </button>
      </div>
    </form>
  );
}
