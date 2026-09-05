import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { identity, navLinks } from "../data/content";
import { usePrefersReducedMotion } from "../lib/hooks";
import { Asterisk } from "./ui";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-42% 0px -52% 0px" }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        id="site-nav"
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          scrolled ? "bg-ink-950/85 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        {/* scroll progress */}
        <div
          className="absolute left-0 top-0 h-[2px] bg-gold-400 transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
          aria-hidden
        />
        <div className={`border-b transition-colors duration-500 ${scrolled ? "hairline border-b" : "border-transparent"}`}>
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
            <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
              <Asterisk className="h-4 w-4 text-gold-400 transition-transform duration-500 group-hover:rotate-[60deg]" />
              <span className="font-display text-sm font-bold tracking-[0.14em] text-bone">
                ALIREZA<span className="text-smoke"> / </span>
                <span className="text-gold-300">EBRAHIMI</span>
              </span>
            </a>

            <ul className="hidden items-center gap-7 lg:flex">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    data-active={active === l.id}
                    className={`link-line font-mono text-[11px] tracking-[0.22em] uppercase transition-colors ${
                      active === l.id ? "text-gold-300" : "text-smoke hover:text-bone"
                    }`}
                  >
                    <span className="mr-1.5 text-gold-700">{l.num}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <a
                href="#contact"
                className="hidden items-center gap-2 border hairline px-3.5 py-2 font-mono text-[10px] tracking-[0.2em] text-bone-dim uppercase transition-colors hover:border-gold-400/60 hover:text-gold-300 sm:flex"
              >
                <span className="anim-pulse-dot h-1.5 w-1.5 rounded-full bg-gold-400" />
                Open to work
              </a>
              <button
                onClick={() => setOpen(true)}
                className="flex h-10 w-10 flex-col items-center justify-center gap-[7px] border hairline text-bone transition-colors hover:border-gold-400/60 lg:hidden"
                aria-label="Open menu"
              >
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-ink-950/[0.985] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <span className="font-mono text-[11px] tracking-[0.25em] text-smoke uppercase">
                Menu — {identity.katakana}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center border hairline text-bone"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  initial={reduced ? false : { opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-baseline gap-4 border-b hairline py-4"
                >
                  <span className="font-mono text-xs text-gold-400">{l.num}</span>
                  <span className="font-display text-4xl font-bold tracking-tight text-bone transition-colors group-hover:text-gold-300 sm:text-5xl">
                    {l.label}
                  </span>
                </motion.a>
              ))}
            </nav>
            <p className="px-8 pb-10 font-mono text-[11px] tracking-[0.2em] text-smoke-deep uppercase">
              {identity.status} ✦ {identity.location}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
