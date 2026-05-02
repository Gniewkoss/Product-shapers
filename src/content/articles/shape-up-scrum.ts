import type { ArticleDocument, ArticleSection } from "../articleTypes";
import { SAMPLE_COMPARISON_TABLE_BLOCK } from "../articleSamples";

const shapeSections: ArticleSection[] = [
  {
    id: "kontekst",
    number: "01",
    label: "Kontekst",
    title: "Problem Skalowania",
    content: `W świecie consultingu produktowego najczęściej spotykamy dwa ekstrema: zespoły, które "biegają w kółko" w nieskończonych sprintach Scruma bez wizji mety, oraz organizacje próbujące wdrożyć metodologię Basecampa (Shape Up) bez gotowości na tak radykalną autonomię. Hybrydowy model dowożenia, który wypracowaliśmy w Product Shapers, to odpowiedź na ten dylemat.`,
    contentFormat: "plain",
  },
  {
    id: "architektura",
    number: "02",
    label: "Architektura",
    title: "Struktura Hybrydy",
    content: `## Pętla vs Projekt: Gdzie Scrum traci impet?

Scrum świetnie radzi sobie z utrzymaniem rytmu pracy, ale często gubi szeroki kontekst biznesowy. Kiedy backlog staje się listą życzeń, a nie planem bitwy, zespół traci poczucie sprawstwa. Shape Up wprowadza koncepcję "Appetite" zamiast estymacji – pytamy, ile czasu chcemy zainwestować, a nie ile coś potrwa.

### Filary Hybrydy Product Shapers:

(Treść w pliku Figma powtarza akapit demonstracyjny; pełna redakcja w źródle projektu.)`,
    contentFormat: "plain",
  },
  {
    id: "wyniki",
    number: "03",
    label: "Wyniki",
    title: "Efektywność Zespołu",
    content: `<div style="margin-bottom:1.5rem;border:1px solid #e2e2e2;background:#f8fafc;padding:1.5rem 2rem;border-radius:2px"><h4 style="margin:0 0 0.5rem 0;font-family:Satoshi,ui-sans-serif,system-ui,sans-serif;font-size:20px;font-weight:700;color:#000f3d">Kluczowy Takeaway</h4><p style="margin:0;font-family:Erode,Georgia,serif;font-size:18px;line-height:1.55;color:#444651">Model hybrydowy redukuje wypalenie zespołu o 40% w pierwszym kwartale wdrożenia, jednocześnie zwiększając przewidywalność dostarczania kluczowych ficzerów o ponad połowę.</p></div>`,
    contentFormat: "html",
  },
];

/**
 * Demo article payload — replace with CMS fetch / loader by slug.
 * Kolejność jak w CMS: pierwsza sekcja → tabela → pozostałe sekcje.
 */
export const shapeUpScrumArticle: ArticleDocument = {
  slug: "shape-up-scrum",
  title: "Shape Up a Scrum: Hybrydowy model dowożenia",
  excerpt:
    "Dlaczego tradycyjne podejście Agile często zawodzi przy skalowaniu i jak połączenie dyscypliny Shape Up z rytmem Scruma zmienia reguły gry w budowaniu produktów.",
  categoryLabel: "Metodyka",
  categoryMeta: "12 minut czytania",
  readingTimeLabel: "12 minut czytania",
  body: [
    { blockType: "articleSection", ...shapeSections[0] },
    SAMPLE_COMPARISON_TABLE_BLOCK,
    { blockType: "articleSection", ...shapeSections[1] },
    { blockType: "articleSection", ...shapeSections[2] },
  ],
};
