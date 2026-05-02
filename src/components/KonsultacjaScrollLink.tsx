import { Link, useLocation, type LinkProps } from "react-router-dom";

const TO: LinkProps["to"] = { pathname: "/", hash: "kontakt" };

export type KonsultacjaScrollLinkProps = Omit<LinkProps, "to">;

/**
 * CTA to the homepage "Konsultacja / Umów się na rozmowę" section.
 * On home, smooth-scrolls and updates the hash; on other routes, navigates to /#kontakt
 * (HomeMain scrolls on mount). Uses id="kontakt" and scroll-margin for header offset.
 */
export function KonsultacjaScrollLink({ onClick, ...props }: KonsultacjaScrollLinkProps) {
  const { pathname } = useLocation();
  return (
    <Link
      {...props}
      to={TO}
      onClick={(e) => {
        if (pathname === "/" && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
          e.preventDefault();
          document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", "/#kontakt");
        }
        onClick?.(e);
      }}
    />
  );
}
