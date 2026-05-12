import { useEffect, useRef, type RefObject } from "react";

type Options = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

/**
 * Attaches an IntersectionObserver to a container and toggles `is-visible`
 * on every child that has the `reveal` class.
 * Pair with CSS: `.reveal { opacity:0; transform:translateY(18px); transition:… }
 *                .reveal.is-visible { opacity:1; transform:none; }`
 */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  { threshold = 0.12, rootMargin = "0px 0px -40px 0px", once = true }: Options = {},
) {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>(".reveal");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold, rootMargin },
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, once]);
}

/**
 * Convenience: self-contained — creates and owns the ref.
 * Usage: const sectionRef = useRevealSection()
 *        <section ref={sectionRef} ...>
 */
export function useRevealSection(options?: Options) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref as RefObject<HTMLElement>, options);
  return ref;
}
