import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import { projects, type ProjectArt } from "../data/content";
import { socials } from "../data/content";
import { usePrefersReducedMotion } from "../lib/hooks";
import { ArrowUpRight, Reveal, SectionHeading } from "./ui";

/* Hand-built CSS cover art — a mini identity for each project. */
function ArtCover({ art }: { art: ProjectArt }) {
  if (art === "aureum")
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#0e0b07] p-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold-500/70">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/40 font-display text-xl font-bold text-gold-300">
            Au
          </div>
        </div>
        <p className="font-display text-sm font-bold tracking-[0.42em] text-gold-300 uppercase">Aureum</p>
        <p className="font-mono text-[9px] tracking-[0.3em] text-gold-700 uppercase">Gold · Marketplace</p>
      </div>
    );
  if (art === "portfolio")
    return (
      <div className="flex h-full w-full flex-col bg-[#e6e1d3] p-4">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-ink-900/70" />
          <span className="h-2 w-2 rounded-full bg-ink-900/40" />
          <span className="h-2 w-2 rounded-full bg-ink-900/20" />
        </div>
        <div className="mt-4 h-2.5 w-3/4 bg-ink-900" />
        <div className="mt-2 h-1.5 w-1/2 bg-ink-900/40" />
        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="h-12 bg-ink-900/85" />
          <div className="h-12 bg-ink-900/25" />
          <div className="h-12 bg-ink-900/55" />
        </div>
        <div className="mt-3 h-1.5 w-2/3 bg-ink-900/30" />
        <div className="mt-1.5 h-1.5 w-1/3 bg-ink-900/30" />
        <p className="mt-auto font-mono text-[8px] tracking-[0.3em] text-ink-900/60 uppercase">SSG · Blog · CMS</p>
      </div>
    );
  if (art === "service")
    return (
      <div className="flex h-full w-full flex-col bg-[#eef0f2] p-4">
        <p className="font-display text-xs font-bold tracking-[0.3em] text-ink-900 uppercase">Services</p>
        <div className="mt-3 space-y-2.5">
          {[86, 64, 74].map((w, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="h-1.5 bg-ink-900/70" style={{ width: `${w}%` }} />
              <span className="font-mono text-[9px] text-ink-900/50">${(i + 1) * 15}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto flex gap-2">
          <span className="bg-ink-900 px-3 py-1.5 font-mono text-[8px] tracking-[0.2em] text-[#eef0f2] uppercase">Book</span>
          <span className="border border-ink-900/50 px-3 py-1.5 font-mono text-[8px] tracking-[0.2em] text-ink-900 uppercase">Order</span>
        </div>
      </div>
    );
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[#0c120e] p-6">
      <div className="flex h-16 items-end gap-1.5">
        {[0.9, 0.5, 1, 0.65, 0.85, 0.45, 0.75].map((h, i) => (
          <span
            key={i}
            className="eq-bar w-2 bg-[#4ade80]"
            style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s`, opacity: 0.55 + i * 0.06 }}
          />
        ))}
      </div>
      <p className="font-mono text-[9px] tracking-[0.3em] text-[#4ade80]/70 uppercase">Search · Web API</p>
    </div>
  );
}

export default function Projects() {
  const reduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const canHover = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches && !reduced;
  const github = socials.find((s) => s.kind === "github");

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!canHover || !previewRef.current || !listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 130), rect.width - 130);
    const y = Math.min(Math.max(e.clientY - rect.top, 150), rect.height - 60);
    previewRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  return (
    <section id="work" className="relative scroll-mt-24 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          jp="作品 — selected work"
          title={
            <>
              Built &<span className="text-stroke block">shipped</span>
            </>
          }
          note="Storefronts, tooling and pixel-close UI. Each row opens the live repository."
        />

        <Reveal>
          <div ref={listRef} onMouseMove={onMove} className="relative">
            {/* cursor-following preview (fine pointers only) */}
            {canHover && (
              <div
                ref={previewRef}
                className="pointer-events-none absolute left-0 top-0 z-20 will-change-transform"
                aria-hidden
              >
                <div
                  className={`h-[300px] w-[240px] -translate-x-1/2 -translate-y-[112%] rotate-[-3deg] overflow-hidden border hairline shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition-[opacity,scale] duration-300 ${
                    hovered !== null ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                >
                  {hovered !== null && <ArtCover art={projects[hovered].art} />}
                </div>
              </div>
            )}

            {projects.map((p, i) => (
              <Reveal key={p.url} delay={i * 0.05} y={20}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative block overflow-hidden border-t hairline"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink-800/60 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" aria-hidden />
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold-400 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" aria-hidden />
                  <div className="relative grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-3 py-8 sm:items-center md:gap-x-8">
                    <span className="pt-1 font-mono text-sm text-gold-400 md:text-base">{p.index}</span>
                    <div className="min-w-0">
                      <h3 className="font-display text-2xl font-bold tracking-tight text-bone transition-all duration-500 group-hover:translate-x-2 group-hover:text-gold-300 sm:text-3xl lg:text-4xl">
                        {p.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-smoke">{p.description}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <li key={t} className="border hairline px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] text-smoke-deep uppercase transition-colors group-hover:border-gold-700/50 group-hover:text-smoke">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-4 pt-1">
                      <span className="hidden font-mono text-xs text-smoke-deep sm:block">{p.year}</span>
                      <span className="flex h-11 w-11 items-center justify-center border hairline text-smoke transition-all duration-500 group-hover:rotate-45 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-ink-950">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
            <div className="border-t hairline" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[11px] tracking-[0.22em] text-smoke-deep uppercase">
              04 repositories — more in the lab
            </p>
            {github && (
              <a
                href={github.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 border hairline px-5 py-3 font-mono text-[11px] tracking-[0.22em] text-bone-dim uppercase transition-colors hover:border-gold-400/70 hover:text-gold-300"
              >
                All repositories
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
