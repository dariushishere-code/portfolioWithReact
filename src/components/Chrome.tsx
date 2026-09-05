import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/hooks";

/* Film-grain overlay — sits above everything except the lightbox. */
export function NoiseOverlay() {
  return <div className="noise-layer anim-grain pointer-events-none fixed -inset-[5%] z-[60] opacity-[0.05]" aria-hidden />;
}

/* Cursor: gold dot + lagging ring that swells over interactive things. */
export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let visible = false;

    const show = () => {
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      show();
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest("a, button, input, textarea, [data-hover]");
      targetScale = interactive ? 2 : 1;
      ring.style.borderColor = interactive ? "rgba(240,198,120,0.95)" : "rgba(228,172,82,0.5)";
      ring.style.backgroundColor = interactive ? "rgba(228,172,82,0.08)" : "transparent";
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (targetScale - scale) * 0.14;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-gold-300 opacity-0 transition-opacity duration-300"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-9 w-9 rounded-full border opacity-0 transition-opacity duration-300 will-change-transform"
        style={{ borderColor: "rgba(228,172,82,0.5)" }}
        aria-hidden
      />
    </>
  );
}
