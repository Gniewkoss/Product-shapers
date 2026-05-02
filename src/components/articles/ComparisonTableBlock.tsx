import type { ArticleComparisonTableBlock } from "../../content/articleTypes";

export type ComparisonTableBlockProps = ArticleComparisonTableBlock;

export { SAMPLE_COMPARISON_TABLE_BLOCK } from "../../content/articleSamples";

/**
 * Tabela porównawcza z Payload (`comparisonTable`).
 * Responsywność: poziomy scroll na wąskich ekranach.
 */
export function ComparisonTableBlock({ title, columns, rows }: ComparisonTableBlockProps) {
  if (!columns.length) return null;

  const colCount = columns.length;

  return (
    <div
      className="article-comparison-table not-prose mt-10 w-full min-w-0"
      data-block="comparison-table"
    >
      {title ?
        <h3 className="mb-4 font-['Satoshi:Bold',sans-serif] text-[1.125rem] font-bold leading-snug text-[#000f3d] sm:text-[1.25rem]">
          {title}
        </h3>
      : null}
      <div className="-mx-1 overflow-x-auto rounded-lg border border-[#e5e7eb] bg-white shadow-sm sm:mx-0">
        <table className="w-full min-w-[320px] border-collapse text-left text-[15px] leading-snug text-[#1e293b]">
          <thead>
            <tr className="border-b border-[#e5e7eb] bg-[#f8fafc]">
              <th
                scope="col"
                className="whitespace-nowrap px-3 py-3 pl-4 font-['Satoshi:Bold',sans-serif] font-bold text-[#000f3d] sm:px-4 sm:py-3.5"
              >
                <span className="sr-only">Nagłówek wierszy</span>
                <span aria-hidden="true">
                  {/* Narożnik tabeli — kolumna z nazwami wierszy */}
                  —
                </span>
              </th>
              {columns.map((col, i) => (
                <th
                  key={i}
                  scope="col"
                  className="whitespace-nowrap border-l border-[#e5e7eb] px-3 py-3 font-['Satoshi:Bold',sans-serif] font-bold text-[#000f3d] sm:px-4 sm:py-3.5"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className="border-b border-[#e5e7eb] transition-colors last:border-b-0 hover:bg-[#f8fafc]/90"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap bg-white px-3 py-3 pl-4 text-left font-['Satoshi:Bold',sans-serif] font-bold text-[#022169] sm:px-4 sm:py-3.5"
                >
                  {row.name}
                </th>
                {Array.from({ length: colCount }, (_, ci) => {
                  const cell = row.cells[ci];
                  const value = cell?.value ?? "";
                  const highlight = Boolean(cell?.highlight);
                  return (
                    <td
                      key={ci}
                      className={`border-l border-[#e5e7eb] px-3 py-3 font-sans sm:px-4 sm:py-3.5 ${
                        highlight ? "bg-[#fffbeb]" : "bg-white"
                      }`}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
