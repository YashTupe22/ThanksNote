import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { PawIcon, Heart, Sparkle, SittingCat, BlinkingCat, WalkingCat } from "@/components/CatSvgs";
import {
  getSongAudio,
  isSongPaused,
  pauseSong,
  playSong,
  preloadSong,
} from "@/lib/song-audio";

export const Route = createFileRoute("/")({
  component: SamikshaPage,
  head: () => ({
    meta: [
      { title: "For Samiksha — A Note 🐾" },
      { name: "description", content: "A quiet, kitten-filled note written just for you." },
    ],
    links: [
      {
        rel: "preload",
        href: "/song.mp3",
        as: "audio",
        type: "audio/mpeg",
      },
    ],
  }),
});

const LETTER = [
  "Thank you for wishing me on my birthday — it honestly made my day so much sweeter.",
  "I don't really know how to put into words what it feels like to be remembered by you. I don't care if we don't talk for a while — I will still always love you.",
  "You are the best thing that ever happened to me. I am never going to leave you that easily, even if it costs me everything.",
  "Every quiet prayer I've sent for you — I think this is one of them finally working.",
  "I've never imagined a single dream without you in it. Being together. The world tour. The slow afternoons.",
  "You will always be my princess.",
  "I was waiting for your wishes, and I knew they'd arrive even if late. I wish you everything you've ever dreamed of — and I hope we do most of it together.",
  "My efforts will never let you feel alone. You are my lucky charm. Please don't ever leave.",
  "I typed every word of this myself, because it was the only way I knew how to say it —",
];

function SamikshaPage() {
  const [musicOn, setMusicOn] = useState(true);
  const [started, setStarted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Floating paws (background)
  const paws = useMemo(
    () => Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 22,
      dur: 14 + Math.random() * 16,
      delay: -Math.random() * 24,
      rot: Math.random() * 360,
      opacity: 0.25 + Math.random() * 0.3,
      color: i % 3 === 0 ? "var(--rose)" : i % 3 === 1 ? "var(--caramel)" : "var(--gold)",
    })),
    []
  );

  // Floating hearts
  const hearts = useMemo(
    () => Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 16 + Math.random() * 18,
      dur: 18 + Math.random() * 12,
      delay: -Math.random() * 22,
      rot: (Math.random() - 0.5) * 40,
      opacity: 0.3 + Math.random() * 0.3,
    })),
    []
  );

  // Sparkles
  const sparkles = useMemo(
    () => Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 8 + Math.random() * 10,
      delay: Math.random() * 3,
      dur: 2 + Math.random() * 2,
    })),
    []
  );

  useLayoutEffect(() => {
    preloadSong();
  }, []);

  useEffect(() => {
    const a = getSongAudio();
    if (!a) return;
    const onPlaying = () => setStarted(true);
    a.addEventListener("playing", onPlaying);
    void playSong().then(() => {
      if (!a.paused) setStarted(true);
    });
    return () => a.removeEventListener("playing", onPlaying);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("reveal-in"); io.unobserve(e.target); }
      }),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const beginIfNeeded = () => {
    if (!musicOn) return;
    void playSong().then(() => setStarted(true));
  };

  const toggleMusic = () => {
    if (isSongPaused()) {
      void playSong();
      setMusicOn(true);
    } else {
      pauseSong();
      setMusicOn(false);
    }
  };

  return (
    <main
      onPointerDown={beginIfNeeded}
      className="relative min-h-screen grain text-ink"
    >

      {/* Aurora warm blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 h-[60vh] w-[60vh] rounded-full bg-peach/60 blur-3xl drift" />
        <div className="absolute top-1/3 -right-40 h-[55vh] w-[55vh] rounded-full bg-rose/40 blur-3xl drift" style={{ animationDelay: "-6s" }} />
        <div className="absolute bottom-0 left-1/3 h-[50vh] w-[50vh] rounded-full bg-gold/40 blur-3xl drift" style={{ animationDelay: "-12s" }} />
      </div>

      {/* Sparkles */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {sparkles.map((s) => (
          <Sparkle
            key={s.id}
            className="sparkle absolute text-gold"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>

      {/* Floating paws + hearts */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        {paws.map((p) => (
          <PawIcon
            key={p.id}
            className="paw-rise absolute"
            style={{
              left: `${p.left}%`,
              bottom: `-${p.size}px`,
              width: p.size,
              height: p.size,
              color: p.color,
              opacity: p.opacity,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              ['--r' as string]: `${p.rot}deg`,
            } as React.CSSProperties}
          />
        ))}
        {hearts.map((h) => (
          <Heart
            key={`h${h.id}`}
            className="paw-rise absolute text-rose"
            style={{
              left: `${h.left}%`,
              bottom: `-${h.size}px`,
              width: h.size,
              height: h.size,
              opacity: h.opacity,
              animationDuration: `${h.dur}s`,
              animationDelay: `${h.delay}s`,
              ['--r' as string]: `${h.rot}deg`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Walking cats (fixed at bottom) */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-20 z-10">
        <div className="absolute bottom-2 walk-ltr text-caramel">
          <div className="bob-walk"><WalkingCat className="w-28 h-14" /></div>
        </div>
        <div className="absolute bottom-8 walk-rtl text-caramel" style={{ animationDuration: "30s" }}>
          <div className="bob-walk" style={{ animationDuration: "0.55s" }}>
            <WalkingCat className="w-24 h-12" />
          </div>
        </div>
        <div className="absolute bottom-1 walk-ltr text-caramel" style={{ animationDuration: "38s", animationDelay: "-15s" }}>
          <div className="bob-walk" style={{ animationDuration: "0.6s" }}>
            <WalkingCat className="w-20 h-10 opacity-80" />
          </div>
        </div>
      </div>

      {/* Music control */}
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => { e.stopPropagation(); toggleMusic(); }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-caramel/30 bg-cream/80 px-4 py-2 text-sm text-ink/80 backdrop-blur-md transition hover:bg-cream shadow-lg"
      >
        <span className={`inline-block h-2 w-2 rounded-full ${musicOn ? "bg-rose animate-pulse" : "bg-ink/30"}`} />
        {musicOn ? "music playing" : "music paused"}
      </button>

      {!started && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-xs uppercase tracking-[0.3em] text-ink/50 animate-pulse">
          tap anywhere to begin ✨
        </div>
      )}

      {/* ============ HERO ============ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Floating cats around the title */}
        <div className="pointer-events-none absolute left-[8%] top-[18%] text-caramel float-bob hidden md:block">
          <SittingCat className="w-24 h-24" />
        </div>
        <div className="pointer-events-none absolute right-[10%] top-[22%] text-caramel float-slow hidden md:block" style={{ animationDelay: "-2s" }}>
          <SittingCat flip className="w-20 h-20" />
        </div>
        <div className="pointer-events-none absolute left-[15%] bottom-[18%] text-caramel float-slow hidden md:block" style={{ animationDelay: "-4s" }}>
          <BlinkingCat className="w-16 h-16" />
        </div>
        <div className="pointer-events-none absolute right-[14%] bottom-[22%] text-caramel float-bob hidden md:block" style={{ animationDelay: "-1.5s" }}>
          <BlinkingCat className="w-20 h-20" />
        </div>

        <p
          className="rise font-sans text-[11px] uppercase tracking-[0.55em] text-caramel/70"
          style={{ animationDelay: "0.1s", transform: `translateY(${scrollY * 0.2}px)` }}
        >
          a note · written quietly · for one person
        </p>

        <h1
          className="rise mt-8 font-serif text-[16vw] leading-[0.85] tracking-[-0.04em] sm:text-[10vw] md:text-[9rem] ken-burns"
          style={{ animationDelay: "0.4s", fontVariationSettings: "'opsz' 144, 'wght' 400" }}
        >
          <span className="italic shimmer-text">samiksha</span>
        </h1>

        <div className="rise relative mt-3 h-1 w-40 origin-left">
          <div className="underline-grow h-full w-full rounded-full bg-gradient-to-r from-rose via-caramel to-gold" style={{ animationDelay: "1.4s" }} />
        </div>

        <p className="rise mt-10 max-w-md font-serif text-xl italic text-ink/75" style={{ animationDelay: "1.1s" }}>
          some things take a whole song to say. <br />
          so put it on, and read slowly.
        </p>

        <div className="rise mt-12 flex items-center gap-3" style={{ animationDelay: "1.6s" }}>
          <PawIcon className="w-5 h-5 text-caramel wiggle" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-ink/50">scroll down</span>
          <PawIcon className="w-5 h-5 text-caramel wiggle" style={{ animationDelay: "-1s" }} />
        </div>

        <div className="rise mt-6 h-16 w-px bg-gradient-to-b from-caramel/0 via-caramel/50 to-caramel/0" style={{ animationDelay: "1.8s" }} />
      </section>

      {/* ============ LETTER ============ */}
      <section className="relative mx-auto max-w-3xl px-6 py-32 sm:py-44">
        {/* Cats near letter */}
        <div className="reveal absolute -left-4 top-12 text-caramel hidden md:block">
          <SittingCat className="w-20 h-20 wiggle" />
        </div>
        <div className="reveal absolute -right-4 top-20 text-caramel hidden md:block" style={{ transitionDelay: "0.2s" }}>
          <BlinkingCat className="w-20 h-20 float-bob" />
        </div>

        <div className="reveal mb-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-caramel/30" />
          <Heart className="w-5 h-5 text-rose heart" />
          <span className="font-hand text-3xl text-caramel">the note</span>
          <Heart className="w-5 h-5 text-rose heart" style={{ animationDelay: "-0.4s" }} />
          <span className="h-px flex-1 bg-caramel/30" />
        </div>

        <p className="reveal mb-12 font-serif text-3xl italic leading-tight text-ink sm:text-4xl" style={{ transitionDelay: "0.1s" }}>
          Dear Samiksha,
        </p>

        <div className="space-y-10">
          {LETTER.map((line, i) => (
            <p
              key={i}
              className="reveal font-serif text-xl leading-[1.7] text-ink/85 sm:text-2xl"
              style={{ transitionDelay: `${i * 0.08}s`, fontVariationSettings: "'opsz' 18, 'wght' 380" }}
            >
              {line}
            </p>
          ))}

          <p className="reveal font-hand text-6xl leading-tight text-caramel sm:text-7xl">
            i love you <Heart className="heart inline-block w-12 h-12 text-rose align-middle" />
          </p>
        </div>

        {/* Signature card */}
        <div className="reveal relative mt-24 tilt rounded-md border-2 border-dashed border-caramel/40 bg-cream/70 p-10 backdrop-blur-sm shadow-[0_30px_60px_-25px_rgba(139,94,60,0.45)]">
          {/* Corner cats */}
          <div className="absolute -top-8 -left-8 text-caramel">
            <SittingCat className="w-16 h-16 float-bob" />
          </div>
          <div className="absolute -top-8 -right-8 text-caramel">
            <SittingCat flip className="w-16 h-16 float-slow" />
          </div>
          <div className="absolute -bottom-8 -left-6 text-caramel">
            <BlinkingCat className="w-14 h-14" />
          </div>
          <div className="absolute -bottom-8 -right-6 text-caramel">
            <BlinkingCat className="w-14 h-14" />
          </div>

          {/* Wax-seal pulse */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 ring-pulse rounded-full bg-rose p-3 shadow-lg">
            <PawIcon className="w-6 h-6 text-cream" />
          </div>

          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-caramel/70">with love & gratitude</p>
              <p className="mt-3 font-hand text-6xl text-ink">Yash</p>
            </div>
            <div className="text-right">
              <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-caramel/70">for</p>
              <p className="mt-3 font-serif text-3xl italic text-rose">samiksha</p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 text-caramel/60">
            <span className="h-px flex-1 bg-caramel/30" />
            <PawIcon className="w-4 h-4" />
            <PawIcon className="w-3 h-3 opacity-70" />
            <PawIcon className="w-2 h-2 opacity-50" />
            <span className="h-px flex-1 bg-caramel/30" />
          </div>
        </div>
      </section>

      {/* ============ CODA ============ */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-32 text-center">
        <div className="reveal text-caramel mb-10">
          <BlinkingCat className="w-28 h-28 float-bob mx-auto" />
        </div>

        <p className="reveal font-sans text-[10px] uppercase tracking-[0.55em] text-caramel/70">
          p.s.
        </p>
        <p className="reveal mt-8 max-w-xl font-serif text-2xl italic leading-relaxed text-ink/80 sm:text-3xl" style={{ transitionDelay: "0.15s" }}>
          if the song's still playing, that means i'm still thinking about you.
        </p>
        <p className="reveal mt-12 font-hand text-5xl text-caramel" style={{ transitionDelay: "0.3s" }}>
          — Y
        </p>

        <div className="reveal mt-20 flex items-center gap-4 text-caramel/60" style={{ transitionDelay: "0.5s" }}>
          <Heart className="heart w-5 h-5 text-rose" />
          <span className="text-[10px] uppercase tracking-[0.4em]">end of note</span>
          <Heart className="heart w-5 h-5 text-rose" style={{ animationDelay: "-0.4s" }} />
        </div>

        {/* Bottom space so walking cats don't overlap */}
        <div className="h-32" />
      </section>
    </main>
  );
}
