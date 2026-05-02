import type { ArticleComparisonTableBlock } from "./articleTypes";

/** Przykładowy blok tabeli — seed CMS, fallback `shape-up-scrum`, testy. */
export const SAMPLE_COMPARISON_TABLE_BLOCK: ArticleComparisonTableBlock = {
  blockType: "comparisonTable",
  title: "Porównanie podejść",
  columns: [{ label: "Skala" }, { label: "Biurokracja" }],
  rows: [
    {
      name: "Scrum",
      cells: [
        { value: "Typowo 5–9 osób", highlight: false },
        { value: "Ceremonie, artefakty, SM/PO", highlight: false },
      ],
    },
    {
      name: "Shape Up",
      cells: [
        { value: "Małe zespoły, krótkie cykle", highlight: true },
        { value: "Minimalna — appetite i shaping", highlight: false },
      ],
    },
  ],
};
