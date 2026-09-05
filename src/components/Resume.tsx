import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { identity, resume } from "../data/content";
import { usePrefersReducedMotion } from "../lib/hooks";
import { DownloadGlyph, PrintGlyph, Reveal, SectionHeading } from "./ui";

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = usePrefersReducedMotion();
  return (
    <div ref={ref}>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-mono text-[11px] tracking-[0.18em] text-bone-dim uppercase">{name}</span>
        <span className="font-mono text-[11px] text-gold-400">{level}%</span>
      </div>
      <div className="h-[3px] w-full bg-ink-700">
        <motion.div
          className="h-full bg-gradient-to-r from-gold-700 to-gold-400"
          initial={{ width: reduced ? `${level}%` : "0%" }}
          animate={inView ? { width: `${level}%` } : undefined}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function BlockLabel({ children }: { children: string }) {
  return (
    <p className="mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-gold-400 uppercase">
      <span aria-hidden>✦</span> {children}
      <span className="h-px flex-1 bg-bone/10" aria-hidden />
    </p>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="relative scroll-mt-24 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          jp="履歴書 — resume"
          title={
            <>
              Curriculum<span className="text-stroke block">vitae</span>
            </>
          }
          note="The paper version lives below — or take the PDF with you."
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* sticky rail */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="text-base leading-relaxed text-bone-dim">{resume.intro}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={identity.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center justify-center gap-3 bg-gold-400 px-6 py-4 font-mono text-[11px] font-bold tracking-[0.22em] text-ink-950 uppercase transition-colors duration-300 hover:bg-gold-300"
                  >
                    <DownloadGlyph />
                    Download PDF
                  </a>
                  <button
                    onClick={() => window.print()}
                    className="group inline-flex items-center justify-center gap-3 border hairline px-6 py-4 font-mono text-[11px] tracking-[0.22em] text-bone-dim uppercase transition-colors duration-300 hover:border-gold-400/70 hover:text-gold-300"
                  >
                    <PrintGlyph />
                    Print this page
                  </button>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="mt-6 font-mono text-[10px] tracking-[0.22em] text-smoke-deep uppercase">
                  Last updated — 2026 · {identity.site}
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="mt-10 border hairline p-6">
                  <p className="font-mono text-[10px] tracking-[0.28em] text-smoke-deep uppercase">Languages</p>
                  <ul className="mt-4 space-y-2.5">
                    {resume.languages.map((l) => (
                      <li key={l.name} className="flex items-baseline justify-between text-sm">
                        <span className="font-semibold text-bone">{l.name}</span>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-smoke uppercase">{l.level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>

          {/* timeline */}
          <div className="space-y-16 lg:col-span-8">
            <div>
              <BlockLabel>Experience</BlockLabel>
              <div className="space-y-10 border-l hairline pl-6 sm:pl-8">
                {resume.experience.map((job, i) => (
                  <Reveal key={job.role} delay={i * 0.08}>
                    <div className="relative">
                      <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rotate-45 border border-gold-400 bg-ink-900 sm:-left-[39px]" aria-hidden />
                      <p className="font-mono text-[11px] tracking-[0.25em] text-gold-300 uppercase">{job.period}</p>
                      <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-bone sm:text-3xl">{job.role}</h3>
                      <p className="mt-1 font-mono text-xs tracking-[0.15em] text-smoke uppercase">{job.org}</p>
                      <ul className="mt-4 space-y-2.5">
                        {job.points.map((pt) => (
                          <li key={pt} className="flex gap-3 text-sm leading-relaxed text-bone-dim">
                            <span className="mt-0.5 text-gold-500" aria-hidden>
                              ✦
                            </span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <BlockLabel>Education</BlockLabel>
              <div className="border-l hairline pl-6 sm:pl-8">
                {resume.education.map((ed) => (
                  <Reveal key={ed.title}>
                    <div className="relative">
                      <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rotate-45 border border-steel-500 bg-ink-900 sm:-left-[39px]" aria-hidden />
                      <p className="font-mono text-[11px] tracking-[0.25em] text-steel-300 uppercase">{ed.period}</p>
                      <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-bone">{ed.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-bone-dim">{ed.detail}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <BlockLabel>Core skills</BlockLabel>
              <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {resume.coreSkills.map((s, i) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.08} />
                ))}
              </div>
            </div>

            <div>
              <BlockLabel>Toolbox</BlockLabel>
              <Reveal>
                <ul className="flex flex-wrap gap-2.5">
                  {resume.toolbox.map((t) => (
                    <li
                      key={t}
                      className="cursor-default border hairline px-4 py-2 font-mono text-[11px] tracking-[0.16em] text-smoke uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-steel-500/70 hover:text-steel-300"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
