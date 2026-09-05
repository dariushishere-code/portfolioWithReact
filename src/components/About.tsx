import { useInView } from "framer-motion";
import { useRef } from "react";
import { about } from "../data/content";
import { useCountUp } from "../lib/hooks";
import { Reveal, SectionHeading } from "./ui";

function Stat({ value, label, delay }: { value: number; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const n = useCountUp(value, inView, 1100 + delay * 400);
  return (
    <div ref={ref} className="group flex items-baseline justify-between gap-6 border-b hairline py-6 transition-colors hover:border-gold-700/60">
      <div>
        <p className="font-display text-6xl font-extrabold tracking-tight text-bone transition-colors duration-300 group-hover:text-gold-300 sm:text-7xl">
          {String(n).padStart(2, "0")}
        </p>
        <p className="mt-2 font-mono text-[11px] tracking-[0.24em] text-smoke uppercase">{label}</p>
      </div>
      <span className="font-mono text-xs text-smoke-deep transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-gold-400" aria-hidden>
        +
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          jp="自己紹介 — about"
          title={
            <>
              Making digital
              <span className="text-stroke block">feel intentional</span>
            </>
          }
          note="Type, contrast and deliberate space — the three materials every interface here is built from."
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <div className="space-y-6">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p
                    className={
                      i === 0
                        ? "text-lg leading-relaxed text-bone sm:text-xl"
                        : "max-w-xl text-base leading-relaxed text-bone-dim"
                    }
                  >
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-10 flex items-start gap-4 border border-gold-700/40 bg-ink-850/80 p-5">
                <span className="mt-0.5 font-display text-lg text-gold-400" aria-hidden>
                  ✦
                </span>
                <p className="font-mono text-xs leading-relaxed tracking-wide text-bone-dim">{about.nowLine}</p>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <ul className="mt-10 flex flex-wrap gap-2.5">
                {about.focus.map((f) => (
                  <li
                    key={f}
                    className="cursor-default border hairline px-4 py-2 font-mono text-[11px] tracking-[0.18em] text-smoke uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/70 hover:text-gold-300"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.12}>
              <p className="mb-2 font-mono text-[11px] tracking-[0.25em] text-smoke-deep uppercase">
                Signals
              </p>
            </Reveal>
            <div>
              {about.stats.map((s, i) => (
                <Stat key={s.label} value={s.value} label={s.label} delay={i} />
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-10 border hairline p-6">
                <p className="font-mono text-[10px] tracking-[0.28em] text-smoke-deep uppercase">Principles</p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Contrast is a material, not a decoration.",
                    "Motion must mean something — or stay still.",
                    "Performance is a design decision.",
                  ].map((line) => (
                    <li key={line} className="flex items-baseline gap-3 text-sm leading-relaxed text-bone-dim">
                      <span className="text-gold-400" aria-hidden>
                        ✦
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
