import type { CSSProperties, ReactNode } from "react";

export default function Marquee({
  children,
  reverse = false,
  duration = 28,
  className = "",
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`mask-fade-x overflow-hidden border-y hairline bg-ink-950/70 ${className}`}>
      <div
        className={`flex w-max items-center ${reverse ? "anim-marquee-rev" : "anim-marquee"}`}
        style={{ "--marquee-dur": `${duration}s` } as CSSProperties}
      >
        <div className="flex items-center" aria-hidden={false}>
          {children}
        </div>
        <div className="flex items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

export function TechMarqueeRow({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-6 font-mono text-xs tracking-[0.3em] text-smoke uppercase transition-colors hover:text-gold-300">
            {item}
          </span>
          <span className="text-gold-700" aria-hidden>
            ✦
          </span>
        </span>
      ))}
    </>
  );
}
