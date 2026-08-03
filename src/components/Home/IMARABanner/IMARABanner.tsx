"use client";

import { useState } from "react";
import Link from "next/link";

const VOLUNTEER_FORM = "https://forms.gle/your-form-id";

export default function IMARABanner() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Sticky pill trigger on homepage ── */}
      <div className="flex justify-center mt-6" data-aos="fade-up" data-aos-delay="400">
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-3 bg-white dark:bg-dark border border-primary/30 shadow-lg rounded-full px-5 py-2.5 hover:border-primary transition-all duration-300"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0" />
          <span className="text-sm font-semibold text-midnight_text dark:text-white group-hover:text-primary transition-colors">
            Discover the IMARA Program — Our Flagship Initiative
          </span>
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── Modal ── */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-dark rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-500 transition-colors z-10"
            >
              ×
            </button>

            {/* Header strip */}
            <div className="bg-primary rounded-t-2xl px-8 py-7">
              <span className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1 block">
                Flagship Programme
              </span>
              <h2 className="text-2xl font-bold text-white mb-1">IMARA Program</h2>
              <p className="text-white/80 text-sm">
                Indigenous Movement for Addiction Recovery & Awareness
              </p>
            </div>

            {/* Body */}
            <div className="px-8 py-7 space-y-5">
              <p className="text-base text-muted dark:text-white/70 leading-relaxed">
                IMARA is GoldenLife Victors' frontline initiative dedicated to preventing substance use,
                supporting holistic recovery, and restoring hope in Kenya's pastoralist and indigenous
                regions — communities that face unique mental health challenges and historic barriers to care.
              </p>

              {/* What IMARA does */}
              <div>
                <h4 className="font-bold text-midnight_text dark:text-white mb-3">What IMARA Does</h4>
                <div className="space-y-2">
                  {[
                    "Culturally responsive addiction recovery for indigenous & pastoralist communities",
                    "Community recovery networks that break down stigma from within",
                    "Youth empowerment and substance use prevention programmes",
                    "Wellness caravans bringing care directly into remote communities",
                    "Mental health advocacy embedded in local cultural traditions",
                    "Faith leader support — equipping them to care for congregants' mental health",
                    "Sustainable reintegration programmes for lasting, dignified recovery",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <p className="text-sm text-muted dark:text-white/70">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="border-l-4 border-primary pl-4 py-1">
                <p className="text-sm italic text-muted dark:text-white/60">
                  "Caring for those who shepherd others — because no one is immune to burnout, stress,
                  and mental health challenges, including the leaders who give tirelessly to their communities."
                </p>
              </blockquote>

              {/* Impact numbers */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { n: "3,000+", l: "People Reached" },
                  { n: "50+",    l: "Communities" },
                  { n: "5+",     l: "Years Active" },
                ].map((s) => (
                  <div key={s.l} className="text-center bg-primary/5 rounded-xl py-4">
                    <p className="text-2xl font-bold text-primary">{s.n}</p>
                    <p className="text-xs text-muted dark:text-white/60 mt-1">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/programmes/imara"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center bg-primary hover:bg-darkprimary text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  Learn More About IMARA
                </Link>
                <a
                  href={VOLUNTEER_FORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  Partner / Volunteer
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}