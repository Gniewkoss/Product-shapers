import React from "react";

/** Pass-through root so child route groups can own <html> (Payload admin vs marketing stub). */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
