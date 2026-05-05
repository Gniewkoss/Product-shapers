import type { GlobalConfig } from "payload";

import { postRevalidate } from "../hooks/revalidateFrontend";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [async () => postRevalidate({ global: "footer" })],
  },
  fields: [
    { name: "companyName", type: "text" },
    { name: "tagline", type: "text" },
    { name: "email", type: "email" },
    { name: "linkedinUrl", type: "text", admin: { description: "Pełny URL profilu LinkedIn (https://...)" } },
    {
      name: "linkedinLabel",
      type: "text",
      admin: { description: "Etykieta przycisku LinkedIn (np. „Obserwuj nas”). Puste = nie pokazuj przycisku, nawet jeśli URL jest ustawiony.", condition: (_, siblings) => Boolean(siblings?.linkedinUrl) },
    },
    {
      name: "linkedinOpenInNewTab",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Otwórz LinkedIn w nowej karcie", condition: (_, siblings) => Boolean(siblings?.linkedinUrl) },
    },
    { name: "legalText", type: "textarea" },
    {
      name: "primaryCta",
      type: "group",
      label: "Główny przycisk CTA",
      admin: { description: "Wyświetlany w nagłówku/górnej części footera. Aby ukryć — pozostaw puste pola." },
      fields: [
        { name: "label", type: "text", admin: { description: "Tekst na przycisku, np. „Skontaktuj się”" } },
        { name: "url", type: "text", admin: { description: "Dokąd kieruje przycisk (ścieżka /kontakt lub pełny URL https://...)" } },
        {
          name: "openInNewTab",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description: "Otwórz w nowej karcie (zalecane gdy URL jest zewnętrzny)",
            condition: (_, siblings) => Boolean(siblings?.url),
          },
        },
      ],
    },
    {
      name: "columns",
      type: "array",
      admin: { description: "Four columns like current footer" },
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "items",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "url", type: "text", admin: { description: "Opcjonalny link. Puste = pozycja jest tylko tekstem (bez kliknięcia)." } },
            {
              name: "openInNewTab",
              type: "checkbox",
              defaultValue: false,
              admin: {
                description: "Otwórz w nowej karcie",
                condition: (_, siblings) => Boolean(siblings?.url),
              },
            },
          ],
        },
      ],
    },
    {
      name: "footerLinks",
      type: "array",
      fields: [
        { name: "label", type: "text" },
        { name: "url", type: "text" },
      ],
    },
  ],
};
