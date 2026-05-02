import type { Block } from "payload";

/**
 * Sekcja treści artykułu — jedna pozycja w uporządkowanym polu `layout`
 * (obok tabel porównawczych).
 */
export const articleSectionBlock: Block = {
  slug: "articleSection",
  labels: { singular: "Sekcja artykułu", plural: "Sekcje artykułu" },
  fields: [
    /**
     * Nie używaj nazwy `id` — koliduje z identyfikatorem wiersza bloku w Payload
     * i jest pomijana przy parsowaniu płaskiego JSON z REST (`getBlockFields`).
     */
    {
      name: "anchorId",
      type: "text",
      required: true,
      admin: {
        description:
          "Unikalna kotwica do TOC i URL (np. kontekst → #kontekst). Małe litery, bez spacji.",
      },
    },
    { name: "number", type: "text", admin: { description: "Numer w nawigacji, np. 01." } },
    { name: "label", type: "text", admin: { description: "Krótka etykieta w TOC." } },
    { name: "title", type: "text", admin: { description: "Tytuł sekcji." } },
    {
      name: "contentFormat",
      type: "select",
      defaultValue: "plain",
      options: [
        { label: "Plain (markdown-style)", value: "plain" },
        { label: "HTML", value: "html" },
      ],
    },
    {
      name: "content",
      type: "textarea",
      admin: {
        description: "Plain: akapity oddzielone pustą linią; ## / ### nagłówki. HTML: zaufany markup z CMS.",
      },
    },
  ],
};

/**
 * Opcjonalna tabela porównawcza w treści artykułu.
 * Kolejność pozycji w `rows[].cells` odpowiada kolejności `columns` (pierwsza komórka → pierwsza kolumna itd.).
 */
export const comparisonTableBlock: Block = {
  slug: "comparisonTable",
  labels: { singular: "Tabela porównawcza", plural: "Tabele porównawcze" },
  fields: [
    {
      name: "title",
      type: "text",
      admin: { description: "Opcjonalny nagłówek wyświetlany nad tabelą." },
    },
    {
      name: "columns",
      type: "array",
      labels: { singular: "Kolumna", plural: "Kolumny" },
      minRows: 1,
      admin: {
        description: "Nagłówki kolumn danych (np. „Skala”, „Biurokracja”). Pierwsza kolumna wierszy to zawsze nazwa wiersza.",
      },
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "rows",
      type: "array",
      labels: { singular: "Wiersz", plural: "Wiersze" },
      admin: {
        description:
          "Dla każdego wiersza dodaj komórki w tej samej kolejności co kolumny powyżej. Możesz zaznaczyć „highlight” przy wybranej komórce.",
      },
      fields: [
        { name: "name", type: "text", required: true },
        {
          name: "cells",
          type: "array",
          labels: { singular: "Komórka", plural: "Komórki (kolejność = kolumny)" },
          fields: [
            { name: "value", type: "text", required: true },
            {
              name: "highlight",
              type: "checkbox",
              defaultValue: false,
              admin: { description: "Delikatne wyróżnienie tła komórki." },
            },
          ],
        },
      ],
    },
  ],
};

/** Kolejność na liście = kolejność na stronie (sekcje i tabele można przeplat). */
export const articleLayoutBlocks: Block[] = [articleSectionBlock, comparisonTableBlock];
