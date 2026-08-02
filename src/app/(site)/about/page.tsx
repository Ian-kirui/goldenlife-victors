import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Volunteer from "@/components/SharedComponent/Volunteer";
import Help from "@/components/Home/Help";
import Testimonial from "@/components/Home/Testimonial";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | GoldenLife Victors",
  description:
    "Learn about GoldenLife Victors — our story, mission, vision, and our approach to alcohol and substance use disorder rehabilitation in Kenya.",
};

const pillars = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    label: "Our Story",
    heading: "Where it all began",
    body: "GoldenLife Victors began with the aim of providing integrated, world-class quality and exceptional services on mental health and well-being — anywhere — through our all-time available professionals. The Travel Psychologists.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    label: "Our Mission",
    heading: "Care without borders",
    body: "Our mission is to create a world where mental health is viewed with the same importance as physical health — where individuals receive accessible, compassionate and effective care and where stigma is eliminated.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    label: "Our Vision",
    heading: "World-class excellence",
    body: "Our vision is to become a world-class centre of excellence in mental health and well-being — a beacon of hope and healing that reaches communities across Africa and beyond.",
  },
];

const values = [
  { title: "Compassion",    desc: "We approach every individual with empathy, dignity and genuine care." },
  { title: "Excellence",    desc: "We uphold the highest professional standards in everything we do." },
  { title: "Accessibility", desc: "Mental health support should be available to everyone, everywhere." },
  { title: "Community",     desc: "Healing happens in connection — we build supportive networks that last." },
  { title: "Integrity",     desc: "We operate with transparency, honesty and accountability at all times." },
  { title: "Innovation",    desc: "We embrace new ideas, research and methods to continuously improve care." },
];

export default function AboutPage() {
  return (
    <>
      <HeroSub title="About Us" />

      {/* ── Who we are ── */}
      <section className="py-20 dark:bg-dark px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 items-center">
            <div data-aos="fade-right" data-aos-duration="1000">
              <p className="text-primary text-base font-medium mb-3">Who We Are</p>
              <h2 className="text-4xl font-bold text-midnight_text dark:text-white mb-6 leading-tight">
                Transforming lives through rehabilitation & partnership
              </h2>
              <p className="text-muted dark:text-white/70 text-base leading-relaxed mb-4">
                GoldenLife Victors is a world-class organisation specialising in alcohol and substance use disorder
                rehabilitation, community outreach, and global mental health practices. We reach individuals wherever
                they are — through our inpatient hospital in Naivasha and through community-based programmes across Kenya.
              </p>
              <p className="text-muted dark:text-white/70 text-base leading-relaxed mb-6">
                Our work is powered not by donations, but by <strong className="text-primary">partnerships</strong> —
                professionals, volunteers, and organisations who share our vision and work alongside us to restore lives.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-8">
                {[
                  { number: "500+", label: "Clients Served" },
                  { number: "10+",  label: "Programmes" },
                  { number: "5+",   label: "Years of Impact" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-3xl font-bold text-primary">{s.number}</p>
                    <p className="text-sm text-muted dark:text-white/60 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative" data-aos="fade-left" data-aos-duration="1000">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="https://www.goldenlifekenya.org/images/shakahola2.jpg"
                  alt="GoldenLife Victors team"
                  width={600}
                  height={500}
                  className="w-full h-[420px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-white rounded-2xl px-6 py-4 shadow-xl">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm opacity-90">Commitment to Care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Rehabilitation Approach ── */}
      <section className="py-20 bg-SnowySky dark:bg-darklight px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="text-center mb-14">
            <p className="text-primary text-base font-medium mb-3">Our Core Focus</p>
            <h2 className="text-4xl font-bold text-midnight_text dark:text-white">
              Rehabilitation — Two Pathways to Recovery
            </h2>
            <p className="text-muted dark:text-white/70 text-base mt-4 max-w-2xl mx-auto">
              We specialise in alcohol and substance use disorder rehabilitation through two complementary approaches,
              ensuring no one is left behind regardless of the severity of their situation.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
            {/* Inpatient */}
            <div className="bg-white dark:bg-dark rounded-2xl p-8 shadow-sm border border-border dark:border-dark_border hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">Pathway 1</span>
              <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-3">Inpatient Hospital</h3>
              <p className="text-muted dark:text-white/70 text-base leading-relaxed mb-4">
                Our inpatient facility in <strong>Naivasha, Kenya</strong> provides structured, full-time residential
                rehabilitation for individuals requiring intensive care and a safe environment to recover from alcohol
                and substance use disorder.
              </p>
              <p className="text-muted dark:text-white/70 text-sm leading-relaxed mb-5 italic">
                Note: When using maps to find us, please call ahead to confirm the best route — GPS directions can
                sometimes suggest longer routes to our location.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
              >
                Get directions & contact us →
              </Link>
            </div>

            {/* Community */}
            <div className="bg-white dark:bg-dark rounded-2xl p-8 shadow-sm border border-border dark:border-dark_border hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="150" data-aos-duration="1000">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">Pathway 2</span>
              <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-3">Community Rehabilitation</h3>
              <p className="text-muted dark:text-white/70 text-base leading-relaxed mb-4">
                Our teams go directly into communities to identify and support individuals and groups dealing with
                alcohol and substance use disorder. Those who can be helped through community-level care receive
                support on the ground. Those who need more are referred to our inpatient facility.
              </p>
              <Link
                href="/programmes"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
              >
                View our community programmes →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Story / Mission / Vision ── */}
      <section className="py-20 dark:bg-dark px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="text-center mb-14">
            <p className="text-primary text-base font-medium mb-3">Our Foundation</p>
            <h2 className="text-4xl font-bold text-midnight_text dark:text-white">Story, Mission & Vision</h2>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {pillars.map((p, i) => (
              <div key={p.label}
                className="bg-white dark:bg-dark rounded-2xl p-8 shadow-sm border border-border dark:border-dark_border hover:shadow-md transition-shadow"
                data-aos="fade-up" data-aos-delay={`${i * 150}`} data-aos-duration="1000"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">{p.icon}</div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">{p.label}</span>
                <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-3">{p.heading}</h3>
                <p className="text-muted dark:text-white/70 text-base leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core values ── */}
      <section className="py-20 bg-SnowySky dark:bg-darklight px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="text-center mb-14">
            <p className="text-primary text-base font-medium mb-3">What Drives Us</p>
            <h2 className="text-4xl font-bold text-midnight_text dark:text-white">Our Core Values</h2>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {values.map((v, i) => (
              <div key={v.title}
                className="flex gap-4 p-6 rounded-xl border border-border dark:border-dark_border hover:border-primary dark:hover:border-primary transition-colors group"
                data-aos="fade-up" data-aos-delay={`${i * 100}`} data-aos-duration="1000"
              >
                <div className="w-2 rounded-full bg-primary shrink-0 group-hover:bg-secondary transition-colors" />
                <div>
                  <h4 className="font-bold text-midnight_text dark:text-white mb-1">{v.title}</h4>
                  <p className="text-muted dark:text-white/70 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Help />
      <Testimonial />
      <Volunteer />
    </>
  );
}