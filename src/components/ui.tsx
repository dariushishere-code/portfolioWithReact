import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "../lib/hooks";

/* Scroll reveal wrapper — honours reduced motion. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Numbered section header — the recurring identity element. */
export function SectionHeading({
  index,
  jp,
  title,
  note,
}: {
  index: string;
  jp: string;
  title: ReactNode;
  note?: string;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="flex items-baseline gap-4 font-mono text-[11px] tracking-[0.25em] text-smoke uppercase">
          <span className="text-gold-400">{index}</span>
          <span className="h-px flex-1 bg-bone/15" aria-hidden />
          <span className="normal-case tracking-[0.2em] text-smoke-deep">{jp}</span>
        </div>
      </Reveal>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl leading-[0.95] font-bold tracking-tight text-bone sm:text-6xl lg:text-7xl">
            {title}
          </h2>
        </Reveal>
        {note ? (
          <Reveal delay={0.16}>
            <p className="max-w-xs font-mono text-xs leading-relaxed text-smoke">{note}</p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}

/* ---------- hand-drawn inline icons ---------- */

export function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M4 12L12 4M12 4H5.5M12 4v6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 12" fill="none" className={className} aria-hidden>
      <path d="M1 6h15m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowLeft({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 12" fill="none" className={className} aria-hidden>
      <path d="M17 6H2m0 0l5-5M2 6l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function CloseX({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function DownloadGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M8 2v8m0 0L4.5 6.5M8 10l3.5-3.5M2.5 13.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function PrintGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M4.5 6V2.5h7V6M4.5 11H3V6h10v5h-1.5M4.5 8.5h7v5h-7z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Asterisk({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M8 1.5v13M2.4 4.75l11.2 6.5M13.6 4.75l-11.2 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

/* ---------- brand glyphs for socials ---------- */

export function XGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
      <path d="M1.5 1.5h3.4l4 5.6 4.7-5.6h1.9L10.6 7.6l5.2 6.9h-3.4l-4.3-6-5 6H1.2l5.4-6.5-5.1-6.5z" />
    </svg>
  );
}

export function LinkedInGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
      <path d="M2.2 1.4a1.6 1.6 0 11-.001 3.2 1.6 1.6 0 010-3.2zM1 6h2.5v8.6H1zM6 6h2.4v1.2h.1c.4-.7 1.3-1.5 2.7-1.5 2.4 0 3.3 1.5 3.3 4v4.9h-2.5v-4.3c0-1.2-.4-2-1.5-2-1.2 0-2 .8-2 2v4.3H6z" />
    </svg>
  );
}

export function GitHubGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
      <path d="M8 1a7 7 0 00-2.2 13.6c.35.07.48-.15.48-.34v-1.3c-1.95.42-2.36-.83-2.36-.83-.32-.8-.78-1.02-.78-1.02-.64-.44.05-.43.05-.43.7.05 1.08.73 1.08.73.63 1.08 1.65.77 2.05.59.06-.46.25-.77.44-.95-1.56-.18-3.2-.78-3.2-3.46 0-.77.27-1.4.72-1.89-.07-.18-.32-.9.07-1.87 0 0 .6-.19 1.94.72a6.7 6.7 0 013.54 0c1.35-.9 1.94-.72 1.94-.72.39.97.14 1.7.07 1.87.45.5.72 1.12.72 1.9 0 2.68-1.65 3.27-3.22 3.44.25.22.48.64.48 1.3V14.3c0 .19.12.41.48.34A7 7 0 008 1z" />
    </svg>
  );
}
