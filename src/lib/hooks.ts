import { useEffect, useRef, useState } from "react";

/* Respect the user's motion preference everywhere. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* Katakana + digit scramble-decode, the site's signature reveal. */
const GLYPHS = "アイウエオカキクケコサシスセソタチツテト0123456789✦◆*";

export function useScramble(text: string, play: boolean, delayMs = 0, holdFrames = 3): string {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(() => (reduced ? text : ""));
  const raf = useRef(0);

  useEffect(() => {
    if (!play) return;
    if (reduced) {
      setOut(text);
      return;
    }
    let frame = 0;
    let started = false;
    const timeout = window.setTimeout(() => {
      started = true;
      const tick = () => {
        frame += 1;
        const chars = text.split("").map((ch, i) => {
          if (ch === " ") return " ";
          const revealAt = i * holdFrames + 10;
          if (frame >= revealAt) return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        });
        setOut(chars.join(""));
        const done = frame >= text.length * holdFrames + 12;
        if (!done) raf.current = requestAnimationFrame(tick);
        else setOut(text);
      };
      raf.current = requestAnimationFrame(tick);
    }, delayMs);
    return () => {
      window.clearTimeout(timeout);
      if (started) cancelAnimationFrame(raf.current);
    };
  }, [text, play, delayMs, holdFrames, reduced]);

  return out;
}

/* Simple count-up when something scrolls into view. */
export function useCountUp(target: number, active: boolean, durationMs = 1200): number {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs, reduced]);
  return value;
}

/* Live clock, ticking. */
export function useClock(timeZone?: string): string {
  const [now, setNow] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      ...(timeZone ? { timeZone } : {}),
    });
    const update = () => setNow(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  return now;
}
