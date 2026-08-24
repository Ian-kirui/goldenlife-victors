import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Volunteer from "@/components/SharedComponent/Volunteer";
import ProgramCard from "@/components/Programme/ProgramCard";
import Link from "next/link";
import { globalPrograms } from "@/app/api/programmes-data";

export const metadata: Metadata = {
  title: "Professional Development & Global Practices | GoldenLife Victors",
  description: "An innovation hub for CME training, institutional capacity building, and mental health research connecting Kenya with global best practices.",
};

export default function GlobalPracticesPage() {
  return (
    <>
      <HeroSub title="Professional Development & Global Practices" />

      <section className="py-20 dark:bg-dark px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="max-w-3xl mx-auto text-center mb-16" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">Pillar 3</span>
            <h2 className="text-4xl font-bold text-midnight_text dark:text-white mb-5">
              Advancing Mental Healthcare Through Continuous Learning & Research
            </h2>
            <p className="text-muted dark:text-white/70 text-base leading-relaxed mb-8">
              An innovation hub bridging local research, clinical practice, and international standards to
              empower healthcare workers, institutions, and community leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="bg-primary hover:bg-darkprimary text-white font-semibold px-7 py-3.5 rounded-lg transition-colors">
                View Upcoming CME Seminars
              </Link>
              <Link href="/contact"
                className="border border-primary text-primary hover:bg-primary hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-colors">
                Institutional Training Request
              </Link>
            </div>
          </div>

          {/* Who it's for */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16" data-aos="fade-up">
            {["Healthcare Professionals", "NGOs & Government", "Researchers & Academics", "Corporate Organisations"].map((a) => (
              <div key={a} className="bg-white dark:bg-dark border border-border dark:border-dark_border rounded-xl p-4 text-center">
                <p className="text-sm font-medium text-midnight_text dark:text-white">{a}</p>
              </div>
            ))}
          </div>

          {/* Program cards */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {globalPrograms.map((program, i) => (
              <ProgramCard key={program.name} program={program} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-SnowySky dark:bg-darklight">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="bg-primary rounded-2xl px-8 py-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-3">
              Elevate Your Clinical Practice & Organisational Standards
            </h3>
            <p className="text-white/80 text-base mb-8 max-w-xl mx-auto">
              Join our network of mental health leaders, clinicians, and researchers driving change across the region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe to Educational Updates
              </Link>
              <Link href="/contact"
                className="border border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Partner With Our Hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Volunteer />
    </>
  );
}