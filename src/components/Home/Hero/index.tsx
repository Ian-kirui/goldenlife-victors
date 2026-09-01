"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Test } from "./Test";

// ─── Slide data — replace with actual images ──────────────────────────────────
const slides = [
  {
    src: "/images/all/front-view.jpg",
    alt: "GoldenLife Victors inpatient facility, Naivasha Kenya",
  },
  {
    src: "/images/all/religion.jpg",
    alt: "GoldenLife Victors community outreach programme",
  },
  {
    src: "/images/all/mh4.jpg",
    alt: "GoldenLife Victors community outreach programme - mental health matters",
  },
    {
    src: "/images/all/volunt.jpg",
    alt: "IMARA at its best in pastoralist community",
  },
   {
    src: "/images/all/xray.jpg",
    alt: "GoldenLife Victors inpatient facility, Naivasha Kenya",
  },
];

// UX standard: 5–7s per slide for content-heavy hero
const INTERVAL = 6000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading]   = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setFading(false);
      }, 400); // fade duration
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => {
    if (i === current) return;
    setFading(true);
    setTimeout(() => { setCurrent(i); setFading(false); }, 400);
  };

  return (
    <section className="relative text-white md:pt-40 md:pb-28 py-20 lg:mt-40 sm:mt-44 mt-20 overflow-hidden min-h-[520px]">

      {/* ── Background slides ── */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === current && !fading ? 1 : 0, zIndex: 0 }}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            quality={i === 0 ? 85 : 70}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto lg:max-w-(--breakpoint-xl) px-4 grid grid-cols-12">
        <div
          className="bg-white rounded-md p-10 lg:col-span-5 md:col-span-7 sm:col-span-10 col-span-12 dark:bg-dark"
          data-aos="fade-right"
        >
          <div className="flex justify-between mb-6">
            <div className="px-4 py-2 bg-midnight_text rounded-sm">
              <p className="text-white text-sm font-semibold">Mental Wellness for All</p>
            </div>
          </div>

          <h3 className="text-midnight_text dark:text-white text-lg font-bold mb-6">
            Restoring Hope, Rebuilding Lives: Integrated Mental Healthcare &
            Rehabilitation Across Kenya.
          </h3>

          <p className="text-muted dark:text-white/60 text-base mb-5">
            GoldenLife Victors combines evidence-based inpatient addiction recovery
            at our Naivasha facility with grassroots community prevention, family
            counselling, and professional mental health training.
          </p>

          <div className="grid grid-cols-2 border-t border-border dark:border-dark_border mb-5">
            <div className="col-span-1 border-r border-border dark:border-dark_border px-5 py-4">
              <p className="text-xs text-muted dark:text-white/60 mb-1">Programmes</p>
              <h4 className="text-2xl text-secondary">8+ Active</h4>
            </div>
            <div className="col-span-1 px-5 py-4">
              <p className="text-xs text-muted dark:text-white/60 mb-1">Communities Reached</p>
              <h4 className="text-2xl text-midnight_text dark:text-white">15+</h4>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Link
              href="/treatments"
              className="text-white bg-linear-to-r text-sm from-error to-warning px-7 py-4 hover:from-white hover:to-white dark:hover:from-dark dark:hover:to-dark border font-semibold border-transparent hover:border-error hover:text-error rounded-md"
            >
              Treatments
            </Link>
            <Test />
          </div>
        </div>
      </div>

      {/* ── Slide indicators ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "bg-white w-6 h-2.5"
                : "bg-white/50 w-2.5 h-2.5 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}