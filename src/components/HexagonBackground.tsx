import { useId } from "react";

/*
 * HexagonBackground — the hero's signature honeycomb.
 *
 * A seamless lattice of gold hexagon cells rendered as an SVG <pattern>:
 * no JS, no resize listeners, no per-cell DOM nodes — it tiles perfectly
 * at any viewport size. Painted as an absolutely positioned,
 * pointer-events-none, -z-10 layer so it sits safely beneath the hero's
 * in-flow content and above the WebGL scene layer, and graded out at the
 * very edges with a plain gradient vignette (no mask-image, so there is
 * nothing for a browser to mis-support).
 *
 * Theme: gold-400 #e4ac52 (cells) + steel-500 #6e8ea0 (inner core).
 */

const R = 34; // hexagon circumradius, px
const HEX_W = Math.sqrt(3) * R; // pointy-top hex width, px
const TILE_W = HEX_W; // horizontal pattern period
const TILE_H = 3 * R; // vertical pattern period

function hexPath(cx: number, cy: number, radius: number) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 60 - 90) * Math.PI) / 180; // vertex at 12 o'clock
    return `${(cx + radius * Math.cos(a)).toFixed(2)} ${(cy + radius * Math.sin(a)).toFixed(2)}`;
  });
  return `M ${pts.join(" L ")} Z`;
}

export function HexagonBackground({ className = "" }: { className?: string }) {
  // unique pattern id per instance (useId() may contain ":" — strip them)
  const patternId = useId().replace(/[^a-zA-Z0-9]/g, "");

  // Two cells per tile reproduce the full honeycomb lattice:
  //   • (0, 0)          — top row
  //   • (HEX_W/2, 1.5R) — lower row, offset by half a hexagon width
  const cells = [
    { cx: 0, cy: 0 },
    { cx: HEX_W / 2, cy: 1.5 * R },
  ];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <svg className="h-full w-full" role="presentation">
        <defs>
          <pattern id={patternId} width={TILE_W} height={TILE_H} patternUnits="userSpaceOnUse">
            {cells.map(({ cx, cy }) => (
              <g key={`${cx.toFixed(1)}-${cy.toFixed(1)}`}>
                {/* cell plate — gold-tinted hexagon with a clearly visible rim */}
                <path
                  d={hexPath(cx, cy, R)}
                  fill="#e4ac52"
                  fillOpacity={0.055}
                  stroke="#e4ac52"
                  strokeWidth={1.1}
                  strokeOpacity={0.55}
                />
                {/* inner core — steel hairline for depth */}
                <path
                  d={hexPath(cx, cy, R * 0.62)}
                  fill="none"
                  stroke="#6e8ea0"
                  strokeWidth={0.75}
                  strokeOpacity={0.4}
                />
              </g>
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* edge vignette — grades the honeycomb into the hero's dark base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 72% 24%, transparent 40%, rgba(11,14,20,0.75) 82%, #0b0e14 100%)",
        }}
      />
    </div>
  );
}