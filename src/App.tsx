import Scene from "./components/Scene";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee, { TechMarqueeRow } from "./components/Marquee";
import About from "./components/About";
import Projects from "./components/Projects";
import Gallery from "./components/Gallery";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { CustomCursor, NoiseOverlay } from "./components/Chrome";
import { marqueeItems } from "./data/content";

const displayWords = ["Alireza Ebrahimi", "✦", "Front-End Developer", "✦", "WebGL & Motion", "✦", "写真アーカイブ"];

export default function App() {
  return (
    <div className="relative min-h-screen text-bone antialiased">
      <Scene />
      <NoiseOverlay />
      <CustomCursor />
      <Nav />

      <main>
        <Hero />

        <Marquee duration={26} className="mt-4">
          <TechMarqueeRow items={marqueeItems} />
        </Marquee>

        <About />
        <Projects />

        {/* big display marquee — the signature divider */}
        <Marquee reverse duration={36}>
          {displayWords.map((w, i) =>
            w === "✦" ? (
              <span key={i} className="px-6 font-display text-3xl text-gold-500 md:text-5xl" aria-hidden>
                ✦
              </span>
            ) : (
              <span
                key={i}
                className={`px-6 font-display text-3xl font-extrabold tracking-tight uppercase md:text-5xl ${
                  i % 4 === 0 ? "text-bone" : "text-stroke"
                }`}
              >
                {w}
              </span>
            )
          )}
        </Marquee>

        <Gallery />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
