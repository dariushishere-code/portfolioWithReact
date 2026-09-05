import { useState } from "react";
import type { FormEvent } from "react";
import { identity, socials } from "../data/content";
import { useClock } from "../lib/hooks";
import { ArrowUpRight, GitHubGlyph, LinkedInGlyph, Reveal, SectionHeading, XGlyph } from "./ui";

function SocialGlyph({ kind }: { kind: "x" | "linkedin" | "github" }) {
  if (kind === "x") return <XGlyph className="h-4 w-4" />;
  if (kind === "linkedin") return <LinkedInGlyph className="h-4 w-4" />;
  return <GitHubGlyph className="h-4 w-4" />;
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const time = useClock();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Inquiry from ${fd.get("name")} — via portfolio`);
    const body = encodeURIComponent(
      `${fd.get("message")}\n\n—\n${fd.get("name")}\n${fd.get("email")}`
    );
    window.location.href = `mailto:${identity.email}?subject=${subject}&body=${body}`;
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  };

  const inputCls =
    "w-full border hairline bg-ink-850/80 px-4 py-3.5 text-sm text-bone placeholder:text-smoke-deep outline-none transition-colors duration-300 focus:border-gold-400/80";

  return (
    <section id="contact" className="relative scroll-mt-24 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          jp="連絡 — contact"
          title={
            <>
              Let's build
              <span className="block">
                something <span className="text-gold-400">sharp.</span>
              </span>
            </>
          }
          note="Open to new collaborations, remote full-time roles, and thoughtful side projects."
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* form */}
          <div className="lg:col-span-7">
            <Reveal>
              <a
                href={`mailto:${identity.email}`}
                className="group flex flex-wrap items-center gap-4 border hairline bg-ink-850/60 p-6 transition-colors hover:border-gold-400/60 sm:p-8"
              >
                <span className="font-display text-xl font-bold tracking-tight text-bone transition-colors group-hover:text-gold-300 sm:text-3xl">
                  {identity.email}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    copyEmail();
                  }}
                  className={`ml-auto shrink-0 border px-4 py-2 font-mono text-[10px] tracking-[0.22em] uppercase transition-all duration-300 ${
                    copied
                      ? "border-gold-400 bg-gold-400 text-ink-950"
                      : "hairline text-smoke hover:border-gold-400/70 hover:text-gold-300"
                  }`}
                >
                  {copied ? "Copied ✦" : "Copy"}
                </button>
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-smoke uppercase">
                      Name <span className="text-gold-500">*</span>
                    </span>
                    <input name="name" required placeholder="Ada Lovelace" className={inputCls} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-smoke uppercase">
                      Email <span className="text-gold-500">*</span>
                    </span>
                    <input name="email" type="email" required placeholder="ada@analytical.engine" className={inputCls} />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-smoke uppercase">
                    Message <span className="text-gold-500">*</span>
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about the interface you need…"
                    className={`${inputCls} resize-none`}
                  />
                </label>
                <div className="flex flex-wrap items-center gap-5">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 bg-gold-400 px-7 py-4 font-mono text-[11px] font-bold tracking-[0.22em] text-ink-950 uppercase transition-colors duration-300 hover:bg-gold-300"
                  >
                    Send message
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-smoke-deep uppercase" aria-live="polite">
                    {sent ? "Draft opened in your mail client ✦" : "Opens your mail app — no data stored"}
                  </p>
                </div>
              </form>
            </Reveal>
          </div>

          {/* meta rail */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.08}>
              <div className="border hairline p-6">
                <div className="flex items-baseline justify-between">
                  <p className="font-mono text-[10px] tracking-[0.28em] text-smoke-deep uppercase">Local time</p>
                  <span className="anim-pulse-dot h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden />
                </div>
                <p className="mt-3 font-display text-4xl font-bold tracking-tight text-bone tabular-nums">{time}</p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-smoke uppercase">Wherever you are</p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-5 border hairline p-6">
                <p className="font-mono text-[10px] tracking-[0.28em] text-smoke-deep uppercase">Status</p>
                <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                  <span className="font-semibold text-gold-300">{identity.status}.</span> Remote full-time, freelance
                  builds, and collaborations — {identity.location.toLowerCase()}.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-5 border-t hairline">
                {socials.map((s) => (
                  <li key={s.kind}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 border-b hairline py-4 transition-colors hover:bg-ink-800/50"
                    >
                      <span className="flex h-9 w-9 items-center justify-center border hairline text-smoke transition-colors group-hover:border-gold-400/70 group-hover:text-gold-300">
                        <SocialGlyph kind={s.kind} />
                      </span>
                      <span>
                        <span className="block font-display text-sm font-bold tracking-wide text-bone">{s.label}</span>
                        <span className="block font-mono text-[10px] tracking-[0.16em] text-smoke-deep">{s.handle}</span>
                      </span>
                      <ArrowUpRight className="ml-auto h-4 w-4 text-smoke-deep transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
