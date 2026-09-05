import { identity } from "../data/content";
import Marquee from "./Marquee";

export default function Footer() {
  const words = ["Alireza Ebrahimi", "Front-End Developer", identity.katakana, "Type Does The Talking"];
  return (
    <footer id="site-footer" className="relative">
      <Marquee reverse duration={40} className="border-b-0">
        {words.map((w, i) => (
          <span key={w} className="flex items-center">
            <span
              className={`px-8 font-display text-4xl font-extrabold tracking-tight uppercase md:text-6xl ${
                i % 2 === 0 ? "text-stroke" : "text-bone"
              }`}
            >
              {w}
            </span>
            <span className="font-display text-2xl text-gold-500 md:text-4xl" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </Marquee>

      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center">
        <p className="font-mono text-[11px] tracking-[0.2em] text-smoke uppercase">
          © 2026 {identity.name} — <span className="text-smoke-deep">precision, contrast, deliberate space.</span>
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em] text-smoke-deep uppercase">
          React · Three.js · Tailwind · Framer Motion
        </p>
        <a
          href="#top"
          className="group inline-flex items-center gap-3 border hairline px-4 py-2.5 font-mono text-[10px] tracking-[0.22em] text-bone-dim uppercase transition-colors hover:border-gold-400/70 hover:text-gold-300"
        >
          Back to top
          <svg viewBox="0 0 12 14" fill="none" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden>
            <path d="M6 13V1m0 0L1 6m5-5l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
