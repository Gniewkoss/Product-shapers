import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const TRANSITION = "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

type Props = {
  open: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
  role?: "region";
  "aria-hidden"?: boolean;
  "aria-labelledby"?: string;
};

/**
 * Measured max-height panel — avoids animating `grid-template-rows` (layout each frame)
 * and keeps accordion expand/collapse smooth.
 */
export function CollapsibleHeight({ open, children, className = "", id, role, "aria-hidden": ariaHidden, "aria-labelledby": ariaLabelledby }: Props) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState(0);
  const rafRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    if (!open) {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      setMaxH(0);
      return;
    }

    const measure = () => {
      if (!innerRef.current) return;
      setMaxH(innerRef.current.scrollHeight);
    };

    measure();
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(measure);
    });

    const ro = new ResizeObserver(() => {
      if (innerRef.current) setMaxH(innerRef.current.scrollHeight);
    });
    ro.observe(el);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [open]);

  const style: CSSProperties = {
    maxHeight: maxH,
    overflow: "hidden",
    transition: TRANSITION,
    ...(open && maxH > 0 ? { willChange: "max-height" } : {}),
  };

  return (
    <div
      data-accordion-height
      className={`[contain:content] [transform:translateZ(0)] ${className}`.trim()}
      style={style}
      id={id}
      role={role}
      aria-hidden={ariaHidden}
      aria-labelledby={ariaLabelledby}
    >
      <div ref={innerRef} className="min-h-0 [transform:translateZ(0)]">
        {children}
      </div>
    </div>
  );
}
