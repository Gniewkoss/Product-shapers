/** Hiring: Figma fallback lub layout z Payload (`site-pages` → hiring). */

function HiringPageFallback() {
  return (
    <div className="w-full min-w-0">
      <div
        className="mx-auto flex w-full min-w-0 max-w-content flex-col items-start px-4 pb-24 pt-[110px] sm:px-6 md:px-10 lg:px-[61px]"
        data-name="Hiring (Desktop) - Brand Strict"
      >
        <section
          className="flex w-full flex-col gap-10 py-12 sm:gap-12 sm:py-16 lg:flex-row lg:items-stretch lg:justify-between lg:gap-8 lg:py-[96px]"
          data-name="Hero Section"
        >
          <div className="flex min-h-0 min-w-0 max-w-[1095px] flex-1 flex-col gap-[24px] border-[var(--dark-blue,#022169)] border-l-4 border-solid pl-8">
            <div className="flex flex-col gap-10">
              <p className="font-['Satoshi:Bold',sans-serif] text-[16px] font-bold leading-4 tracking-[1.2px] text-[#005bb3]">
                Kariera w architekturze
              </p>
              <h1 className="font-['Satoshi:Bold',sans-serif] text-[40px] font-bold leading-tight text-[#000f3d] md:text-[64px] md:leading-[1.1] md:tracking-tight">
                Dołącz do arbitrów doskonałości produktowej.
              </h1>
            </div>
            <p className="max-w-[648px] text-[20px] leading-[27.5px] text-[#444651] md:text-[22px]">
              Nie zatrudniamy &quot;zasobów&quot;. Współpracujemy z architektami wzrostu, którzy traktują zarządzanie produktem
              jako dyscyplinę naukową. Przejrzystość to nasz standard – od wynagrodzenia po złożoność problemów, które
              rozwiązujemy.
            </p>
          </div>
          <div className="flex w-full shrink-0 justify-end lg:w-auto lg:flex-col lg:justify-end">
            <aside
              className="ml-auto w-full max-w-[290px] shrink-0 rounded-tr-[60px] border-[var(--dark-blue,#022169)] border-l-4 border-solid bg-[#f3f3f3] px-6 py-8 lg:ml-0 lg:w-[290px]"
              aria-label="Kluczowe wskaźniki"
            >
              <p className="font-sans text-[12px] font-bold uppercase leading-4 tracking-[1.2px] text-[#757682]">Nasz rekord wydajności</p>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="font-['Satoshi:Bold',sans-serif] text-[40px] font-bold leading-none text-[#000f3d]">94%</p>
                  <p className="mt-1 font-serif text-[13px] leading-5 text-[#444651]">Retencja klientów po konsultacjach</p>
                </div>
                <div>
                  <p className="font-['Satoshi:Bold',sans-serif] text-[40px] font-bold leading-none text-[#000f3d]">€12M+</p>
                  <p className="mt-1 font-serif text-[13px] leading-5 text-[#444651]">Retencja klientów po konsultacjach</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="w-full py-16 md:py-24" data-name="Job Board">
          <div className="mb-8 flex flex-col items-start justify-between gap-2 pb-6 md:flex-row md:items-end">
            <h2 className="font-['Satoshi:Bold',sans-serif] text-[32px] font-bold text-[#000f3d] md:text-[40px]">Otwarte dyrektywy</h2>
            <p className="text-[12px] font-sans font-bold uppercase leading-4 tracking-[1.2px] text-[#757682]">Sortowane według wpływu</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                tag: "Wysoki priorytet",
                title: "Head of Product",
                desc: "Skalowanie multidyscyplinarnej organizacji z 15 do 60 osób. Wymagana wizja strategiczna i strukturalizm architektoniczny.",
                pay: "€140K - €180K + Equity",
                loc: "Berlin/Remote (CET)",
              },
              {
                tag: "Strategia",
                title: "Senior PM",
                desc: "Prowadzenie zespołu Enterprise Architecture. Skupienie na skalowalności technicznej i strategiach wzrostu API-first.",
                pay: "€90K - €120K",
                loc: "Londyn / Hybrydowo",
              },
              {
                tag: "Wzrost",
                title: "Analityk Produktowy",
                desc: "Transformacja surowych danych behawioralnych w plany architektoniczne dla rozwoju funkcji. Niezbędne mistrzostwo SQL.",
                pay: "€65K - €85K",
                loc: "Warszawa / Remote (EU)",
              },
            ].map((job) => (
              <div key={job.title} className="flex flex-col border border-[#c5c5d2]/20 bg-white p-8 md:min-h-[460px]">
                <div className="mb-4 flex items-start justify-between">
                  <span className="bg-[#eee] px-4 py-1 text-[12px] font-bold leading-4 tracking-[1.2px] text-[#757682]">{job.tag}</span>
                </div>
                <h3 className="mb-2 font-['Satoshi:Bold',sans-serif] text-[24px] font-bold text-[#000f3d]">{job.title}</h3>
                <p className="mb-6 flex-1 text-[16px] leading-6 text-[#444651] md:text-[15px]">{job.desc}</p>
                <div className="mt-auto space-y-3 border-t border-[#c5c5d2]/20 pt-6 text-[14px] text-[#444651]">
                  <div className="flex justify-between">
                    <span>Renumeracja</span>
                    <span className="text-right text-[#000f3d]">{job.pay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lokalizacja</span>
                    <span className="text-right">{job.loc}</span>
                  </div>
                  <button
                    type="button"
                    className="mt-2 w-full rounded-md border-2 border-[#022169] py-3 text-center text-[12px] font-sans font-bold uppercase leading-4 tracking-[1.2px] text-[#022169] hover:bg-[#022169] hover:text-white"
                  >
                    Prześlij dossier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full py-16 md:py-24" data-name="Recruitment Process">
          <div className="mb-8 grid grid-cols-1 gap-12 md:grid-cols-[352px_1fr]">
            <div>
              <h2 className="font-['Satoshi:Bold',sans-serif] text-[32px] font-bold leading-tight text-[#000f3d] md:text-[40px]">
                Nasz proces rekrutacynjny
              </h2>
              <p className="mt-4 text-[18px] leading-6 text-[#444651]">
                Zaprojektowany dla efektywności. Szanujemy Twój ładunek poznawczy na każdym etapie ewaluacji.
              </p>
              <div className="mt-6 h-[200px] w-full max-w-[352px] rounded-lg bg-gradient-to-br from-[#c5c5d2]/30 to-[#f3f3f3] md:h-[416px]" aria-hidden="true" />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  n: "01",
                  t: "Dopasowanie techniczne",
                  d: "30-minutowa rozmowa syntetyzująca w celu uzgodnienia filozofii architektonicznej i kluczowych kompetencji technicznych. Konkrety, bez zbędnych wypełniaczy.",
                },
                {
                  n: "02",
                  t: "Plan przypadku",
                  d: "Realne wyzwanie architektoniczne. Zostaniesz poproszony o dekonstrukcję zawodzącego ekosystemu produktowego i zaproponowanie planu naprawczego.",
                },
                {
                  n: "03",
                  t: "Dekonstrukcja panelowa",
                  d: "Obrona Twojego planu przed naszymi głównymi konsultantami. Szukamy jasności myślenia i zdolności do zmiany kierunku pod presją danych.",
                },
                {
                  n: "04",
                  t: "Werdykt egzekucyjny",
                  d: "Finałowa dyskusja z Partnerami Założycielami dotycząca udziałów, trajektorii wpływu i długoterminowego autorytetu konsultingowego.",
                },
              ].map((s) => (
                <div key={s.n} className="min-w-0">
                  <p className="font-['Satoshi:Bold',sans-serif] text-[24px] font-bold leading-none tabular-nums tracking-tight text-[#757682]">{s.n}</p>
                  <h4 className="mt-2 font-['Satoshi:Bold',sans-serif] text-[20px] font-bold leading-tight text-[#000f3d]">{s.t}</h4>
                  <p className="mt-2 text-[16px] leading-6 text-[#444651]">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export function HiringPage() {
  return <HiringPageFallback />;
}
