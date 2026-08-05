import Link from "next/link";

interface Program {
  name: string;
  tag: string;
  audience: string;
  focus: string;
  delivers: string[];
  impact: string;
  cta: string;
  ctaLink: string;
}

export default function ProgramCard({ program, index }: { program: Program; index: number }) {
  return (
    <div
      className="bg-white dark:bg-dark rounded-2xl border border-border dark:border-dark_border p-8 hover:shadow-lg transition-shadow flex flex-col"
      data-aos="fade-up"
      data-aos-delay={`${index * 100}`}
      data-aos-duration="800"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
          {program.tag}
        </span>
      </div>
      <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-3">{program.name}</h3>
      <p className="text-sm text-muted dark:text-white/60 mb-4 leading-relaxed">
        <strong className="text-midnight_text dark:text-white">For:</strong> {program.audience}
      </p>
      <p className="text-sm text-muted dark:text-white/60 mb-4 leading-relaxed">
        <strong className="text-midnight_text dark:text-white">Focus:</strong> {program.focus}
      </p>
      <div className="mb-4">
        <p className="text-sm font-semibold text-midnight_text dark:text-white mb-2">What We Deliver:</p>
        <ul className="space-y-1.5">
          {program.delivers.map((d, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span className="text-sm text-muted dark:text-white/60">{d}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-primary/5 rounded-xl p-4 mb-6 mt-auto">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Key Impact</p>
        <p className="text-sm text-muted dark:text-white/70">{program.impact}</p>
      </div>
      <Link href={program.ctaLink}
        className="block text-center bg-primary hover:bg-darkprimary text-white font-medium py-3 rounded-lg transition-colors text-sm">
        {program.cta}
      </Link>
    </div>
  );
}