import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { galleryFilters, photos, type GalleryCategory } from "../data/content";
import { usePrefersReducedMotion } from "../lib/hooks";
import { ArrowLeft, ArrowRight, CloseX, Reveal, SectionHeading } from "./ui";

type Filter = GalleryCategory | "all";

export default function Gallery() {
  const reduced = usePrefersReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "all" ? photos : photos.filter((p) => p.category === filter);

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((v) => (v === null ? v : (v + 1) % filtered.length));
      if (e.key === "ArrowLeft") setLightbox((v) => (v === null ? v : (v - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, filtered.length]);

  const current = lightbox !== null ? filtered[lightbox] : null;

  return (
    <section id="gallery" className="relative scroll-mt-24 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          jp="写真 — gallery"
          title={
            <>
              Off-screen<span className="text-stroke block">frames</span>
            </>
          }
          note="A personal photo archive. Add your own frames to /public/photos and list them in src/data/content.ts."
        />

        {/* filters */}
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center gap-2.5">
            {galleryFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setFilter(f.id);
                  setLightbox(null);
                }}
                className={`px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                  filter === f.id
                    ? "bg-gold-400 font-bold text-ink-950"
                    : "border hairline text-smoke hover:border-gold-400/60 hover:text-gold-300"
                }`}
              >
                {f.label}
                <span className={`ml-2 ${filter === f.id ? "text-ink-950/60" : "text-smoke-deep"}`}>
                  {String(f.id === "all" ? photos.length : photos.filter((p) => p.category === f.id).length).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* masonry */}
        <motion.div
          key={filter}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="columns-1 gap-5 sm:columns-2 lg:columns-3"
        >
          {filtered.map((photo, i) => (
            <motion.figure
              key={photo.src}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 break-inside-avoid"
            >
              <button
                onClick={() => setLightbox(i)}
                className="group relative block w-full overflow-hidden border hairline bg-ink-800 text-left focus-visible:outline focus-visible:outline-gold-400"
                aria-label={`Open ${photo.title}`}
              >
                <div className={`${photo.ratio} overflow-hidden`}>
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                </div>
                <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.25em] text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute right-4 top-4 border border-bone/30 bg-ink-950/60 px-2 py-1 font-mono text-[9px] tracking-[0.22em] text-bone-dim uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {photo.category}
                </span>
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-ink-950/95 via-ink-950/70 to-transparent p-4 pt-10 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-display text-lg font-bold text-bone">{photo.title}</p>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-smoke uppercase">{photo.meta}</p>
                </figcaption>
              </button>
            </motion.figure>
          ))}
        </motion.div>

        <Reveal delay={0.1}>
          <p className="mt-8 border-t hairline pt-5 font-mono text-[11px] tracking-[0.2em] text-smoke-deep uppercase">
            ✦ Swap these seeds for your own — drop files in <span className="text-gold-500">public/photos/</span>, update{" "}
            <span className="text-gold-500">src/data/content.ts</span>
          </p>
        </Reveal>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex flex-col bg-ink-950/[0.97] p-5 sm:p-10"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-smoke uppercase">
              <span>
                <span className="text-gold-400">{String((lightbox ?? 0) + 1).padStart(2, "0")}</span> / {String(filtered.length).padStart(2, "0")} — {current.category}
              </span>
              <button
                onClick={() => setLightbox(null)}
                className="flex h-10 w-10 items-center justify-center border hairline text-bone transition-colors hover:border-gold-400 hover:text-gold-300"
                aria-label="Close"
              >
                <CloseX className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center gap-4 py-6" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setLightbox((v) => (v === null ? v : (v - 1 + filtered.length) % filtered.length))}
                className="hidden h-12 w-12 shrink-0 items-center justify-center border hairline text-smoke transition-colors hover:border-gold-400 hover:text-gold-300 sm:flex"
                aria-label="Previous photo"
              >
                <ArrowLeft />
              </button>
              <motion.figure
                key={current.src}
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex max-h-full flex-col items-center"
              >
                <img
                  src={current.src}
                  alt={current.title}
                  className="max-h-[68vh] max-w-full border hairline object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
                />
                <figcaption className="mt-5 flex items-baseline gap-4">
                  <span className="font-display text-xl font-bold text-bone">{current.title}</span>
                  <span className="font-mono text-[10px] tracking-[0.22em] text-smoke uppercase">{current.meta}</span>
                </figcaption>
              </motion.figure>
              <button
                onClick={() => setLightbox((v) => (v === null ? v : (v + 1) % filtered.length))}
                className="hidden h-12 w-12 shrink-0 items-center justify-center border hairline text-smoke transition-colors hover:border-gold-400 hover:text-gold-300 sm:flex"
                aria-label="Next photo"
              >
                <ArrowRight />
              </button>
            </div>

            <p className="text-center font-mono text-[10px] tracking-[0.25em] text-smoke-deep uppercase sm:hidden">
              Swipe with ← → keys · Esc to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
