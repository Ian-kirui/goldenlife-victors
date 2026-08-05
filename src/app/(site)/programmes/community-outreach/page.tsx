import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Volunteer from "@/components/SharedComponent/Volunteer";
import ProgramCard from "@/components/Programme/ProgramCard";
import Link from "next/link";
import { communityPrograms } from "@/app/api/programmes-data";

export const metadata: Metadata = {
  title: "Community & Preventive Mental Health | GoldenLife Victors",
  description: "Preventive mental health education, support groups, and grassroots resilience initiatives for schools, mothers, faith communities, and young leaders across Kenya.",
};

const filters = ["All Programs", "Maternal & Family", "Schools & Youth", "Faith & Community Leaders", "Workplace & Professionals", "Grassroots & Advocacy"];

export default function CommunityOutreachPage() {
  return (
    <>
      <HeroSub title="Community & Preventive Mental Health" />

      <section className="py-20 dark:bg-dark px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="max-w-3xl mx-auto text-center mb-16" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">Pillar 2</span>
            <h2 className="text-4xl font-bold text-midnight_text dark:text-white mb-5">
              Rooted in Community, Empowering Every Stage of Life
            </h2>
            <p className="text-muted dark:text-white/70 text-base leading-relaxed mb-8">
              Preventive mental health education, specialised support groups, and grass-roots resilience initiatives
              tailored for schools, mothers, faith communities, and young leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="bg-primary hover:bg-darkprimary text-white font-semibold px-7 py-3.5 rounded-lg transition-colors">
                Request a Community Session
              </Link>
              <Link href="/contact"
                className="border border-primary text-primary hover:bg-primary hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-colors">
                Partner With Us
              </Link>
            </div>
          </div>

          {/* IMARA flagship callout */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mb-12 flex flex-col md:flex-row gap-6 items-center" data-aos="fade-up">
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">Flagship Initiative</span>
              <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-3">IMARA Program</h3>
              <p className="text-muted dark:text-white/70 text-sm leading-relaxed">
                Indigenous Movement for Addiction Recovery & Awareness — our frontline initiative delivering
                culturally responsive, community-driven addiction recovery and mental health awareness to
                Kenya's pastoralist and indigenous communities through wellness caravans, youth empowerment,
                and cultural integration.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 shrink-0">
              {[{ n: "3,000+", l: "Reached" }, { n: "50+", l: "Communities" }, { n: "5+", l: "Years" }].map((s) => (
                <div key={s.l} className="text-center bg-white dark:bg-dark rounded-xl py-4 px-3">
                  <p className="text-xl font-bold text-primary">{s.n}</p>
                  <p className="text-xs text-muted dark:text-white/60 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Filter tags — display only, filtering handled client-side if needed */}
          <div className="flex flex-wrap gap-2 mb-10" data-aos="fade-up">
            {filters.map((f, i) => (
              <span key={f}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-default ${
                  i === 0
                    ? "bg-primary text-white border-primary"
                    : "border-border dark:border-dark_border text-muted dark:text-white/60"
                }`}>
                {f}
              </span>
            ))}
          </div>

          {/* Program cards */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {communityPrograms.map((program, i) => (
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
              Ready to Bring Preventive Mental Wellness to Your Community?
            </h3>
            <p className="text-white/80 text-base mb-8 max-w-xl mx-auto">
              Whether you represent a school, church, corporate team, or community organisation, we tailor
              our programmes to fit your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Schedule a Consultation
              </Link>
              <a href="tel:+254724571997"
                className="border border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Call Us: +254 724 571 997
              </a>
            </div>
          </div>
        </div>
      </section>

      <Volunteer />
    </>
  );
}