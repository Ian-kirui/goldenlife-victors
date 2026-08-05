import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Volunteer from "@/components/SharedComponent/Volunteer";
import ProgramCard from "@/components/Programme/ProgramCard";
import Link from "next/link";
import { clinicalPrograms } from "@/app/api/programmes-data";

export const metadata: Metadata = {
  title: "Clinical Recovery & Rehabilitation | GoldenLife Victors",
  description: "Evidence-based, compassionate residential and outpatient care for alcohol and substance use disorders, trauma, and dual-diagnosis mental health conditions.",
};

export default function ClinicalRecoveryPage() {
  return (
    <>
      <HeroSub title="Clinical Recovery & Rehabilitation" />

      {/* Hero intro */}
      <section className="py-20 dark:bg-dark px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="max-w-3xl mx-auto text-center mb-16" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">Pillar 1</span>
            <h2 className="text-4xl font-bold text-midnight_text dark:text-white mb-5">
              Evidence-Based Care, Compassionate Recovery, Restored Dignity
            </h2>
            <p className="text-muted dark:text-white/70 text-base leading-relaxed mb-8">
              Personalised, multi-disciplinary care plans bridging physical, psychological, social, and spiritual
              healing for individuals and families recovering from addiction and mental health challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="bg-primary hover:bg-darkprimary text-white font-semibold px-7 py-3.5 rounded-lg transition-colors">
                Start Admission Inquiry
              </Link>
              <a href="tel:+254724571997"
                className="border border-primary text-primary hover:bg-primary hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-colors">
                Speak with Admissions: +254 724 571 997
              </a>
            </div>
          </div>

          {/* Program cards */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {clinicalPrograms.map((program, i) => (
              <ProgramCard key={program.name} program={program} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-SnowySky dark:bg-darklight">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="bg-primary rounded-2xl px-8 py-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-3">Confidential, Dignified Help is Available Right Now</h3>
            <p className="text-white/80 text-base mb-8 max-w-xl mx-auto">
              Recovery is a journey you do not have to walk alone. Reach out to our admissions team
              for a confidential assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+254724571997"
                className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Call Helpline: +254 724 571 997
              </a>
              <Link href="/contact"
                className="border border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Request a Callback
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Volunteer />
    </>
  );
}