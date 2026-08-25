import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Volunteer from "@/components/SharedComponent/Volunteer";
import Link from "next/link";
import { pillars } from "@/app/api/programmes-data";

export const metadata: Metadata = {
  title: "Treatments | GoldenLife Victors",
  description: "Three pillars of care — Clinical Recovery, Community Outreach, and Global Practices — delivering world-class mental health and rehabilitation services across Kenya.",
};

const colorMap: Record<string, string> = {
  blue:   "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  green:  "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
  purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
};
const PillarIcons = [
  // Clinical Recovery
  <svg key="clinical" className="w-16 h-16" viewBox="0 0 64 64" fill="none">
    <circle
      cx="32"
      cy="32"
      r="25"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <path
      d="M32 18V30M26 24H38"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M18 40C22 35 27 34 32 38C37 34 42 35 46 40"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 43C25 47 29 49 32 49C35 49 39 47 42 43"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>,

  // Community
  <svg key="community" className="w-16 h-16" viewBox="0 0 64 64" fill="none">
    <circle
      cx="32"
      cy="18"
      r="6"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <circle
      cx="15"
      cy="30"
      r="5"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <circle
      cx="49"
      cy="30"
      r="5"
      stroke="currentColor"
      strokeWidth="2.5"
    />

    <path
      d="M22 47C22 38 26 32 32 32C38 32 42 38 42 47"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M6 48C6 41 9 36 15 36C19 36 22 39 23 43"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M58 48C58 41 55 36 49 36C45 36 42 39 41 43"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    <path
      d="M15 54H49"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>,

  // Global Practices
  <svg key="global" className="w-16 h-16" viewBox="0 0 64 64" fill="none">
    <circle
      cx="32"
      cy="32"
      r="24"
      stroke="currentColor"
      strokeWidth="2.5"
    />

    <path
      d="M8 32H56"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.6"
    />

    <path
      d="M32 8C25 15 22 23 22 32C22 41 25 49 32 56"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.6"
    />

    <path
      d="M32 8C39 15 42 23 42 32C42 41 39 49 32 56"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.6"
    />

    <path
      d="M13 22H51M13 42H51"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.4"
    />

    <path
      d="M32 4V8"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>,
];
export default function ProgrammesPage() {
  return (
    <>
      <HeroSub title="Treatments" />

      <section className="py-20 dark:bg-dark px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="text-center mb-16" data-aos="fade-up">
            <p className="text-primary text-base font-medium mb-3">Three Pillars of Care</p>
            <h2 className="text-4xl font-bold text-midnight_text dark:text-white mb-5">
              Comprehensive Mental Health & Recovery
            </h2>
            <p className="text-muted dark:text-white/70 text-base max-w-2xl mx-auto leading-relaxed">
              GoldenLife Victors delivers care across three integrated pillars — from residential rehabilitation
              to community prevention and professional development — ensuring every person finds the right
              level of support.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {pillars.map((p, i) => (
              <div key={p.slug}
                className="bg-white dark:bg-dark rounded-2xl border border-border dark:border-dark_border p-8 flex flex-col hover:shadow-lg transition-shadow"
                data-aos="fade-up" data-aos-delay={`${i * 120}`} data-aos-duration="800"
              >
                <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border w-fit mb-5 ${colorMap[p.color]}`}>
                 {p.label}
                </div>
                <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-3">{p.title}</h3>
                <p className="text-sm font-medium text-primary mb-3">{p.subtitle}</p>
                <p className="text-muted dark:text-white/70 text-sm leading-relaxed mb-6 flex-1">{p.description}</p>
                <Link href={`/treatments/${p.slug}`}
                  className="block text-center bg-primary hover:bg-darkprimary text-white font-medium py-3 rounded-lg transition-colors text-sm">
                  {p.cta} →
                </Link>
              </div>
            ))}
          </div>

          {/* IMARA callout */}
          <div className="mt-16 bg-primary rounded-2xl p-8 md:p-12 text-center text-white" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2 block">Flagship Initiative</span>
            <h3 className="text-3xl font-bold mb-4">IMARA Program</h3>
            <p className="text-white/80 text-base max-w-2xl mx-auto mb-6">
              Indigenous Movement for Addiction Recovery & Awareness — our frontline initiative delivering
              culturally responsive, community-driven care to Kenya's pastoralist and indigenous communities.
            </p>
            <Link href="/treatments/imara"
              className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Discover IMARA
            </Link>
          </div>
        </div>
      </section>

      <Volunteer />
    </>
  );
}