import React from "react";

export const metadata = {
  description: "Product Shapers — Payload CMS",
  title: "Payload CMS",
};

export default function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="pl">
      <body style={{ fontFamily: "system-ui", margin: 0, padding: "2rem" }}>{children}</body>
    </html>
  );
}
