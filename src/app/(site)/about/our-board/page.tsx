import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Volunteer from "@/components/SharedComponent/Volunteer";
import Image from "next/image";
import BoardMemberImage from "@/components/Board/BoardMemberImage";
export const metadata: Metadata = {
  title: "Our Board | GoldenLife Victors",
  description: "Meet the board of directors guiding GoldenLife Victors International — experienced leaders committed to transforming mental health and rehabilitation across Kenya.",
};

const ceo = {
  name: "Jamilla Angela",
  title: "Chief Executive Officer & Founder",
  bio: "With Community, healing happens in connection — we build supportive networks that lasts.",
  image: "/images/all/jamila.png",
};

const directors = [
  {
    name: "[Director Name]",
    title: "Director, Clinical Services",
    bio: "Leading clinical excellence and evidence-based care standards across GoldenLife Victors' rehabilitation and outpatient programmes.",
    image: "/images/board/director-1.jpg",
  },
  {
    name: "[Director Name]",
    title: "Director, Community Programmes",
    bio: "Driving community outreach, the IMARA initiative, and preventive mental health education across Kenya's underserved regions.",
    image: "/images/board/director-2.jpg",
  },
  {
    name: "[Director Name]",
    title: "Director, Global Practices & Research",
    bio: "Spearheading professional development, institutional partnerships, and knowledge exchange with international mental health bodies.",
    image: "/images/board/director-3.jpg",
  },
];





export default function OurBoardPage() {
  return (
    <>
      <HeroSub title="Our Board" />

      <section className="py-20 dark:bg-dark px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">

          {/* Intro */}
          <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
            <p className="text-primary text-base font-medium mb-3">Leadership & Governance</p>
            <h2 className="text-4xl font-bold text-midnight_text dark:text-white mb-5">
              The People Behind GoldenLife Victors
            </h2>
            <p className="text-muted dark:text-white/70 text-base max-w-2xl mx-auto leading-relaxed">
              Our board brings together experienced clinicians, community advocates, and strategic leaders
              united by a shared commitment to dignified, world-class mental health care for all Kenyans.
            </p>
          </div>

          {/* ── CEO — large featured card ── */}
          <div
            className="bg-white dark:bg-[#1e2436] rounded-2xl border border-border dark:border-dark_border overflow-hidden mb-10 shadow-sm hover:shadow-md transition-shadow"
            data-aos="fade-up" data-aos-duration="800"
          >
            <div className="grid lg:grid-cols-2 grid-cols-1">
              {/* Photo */}
              <div className="h-80 lg:h-[480px]">
                <BoardMemberImage src={ceo.image} name={ceo.name} />
              </div>
              {/* Info */}
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-full w-fit mb-5">
                  Chief Executive Officer
                </span>
                <h3 className="text-3xl font-bold text-midnight_text dark:text-white mb-2">
                  {ceo.name}
                </h3>
                <p className="text-primary font-medium text-base mb-5">{ceo.title}</p>
                <p className="text-muted dark:text-white/70 text-base leading-relaxed mb-6">
                  {ceo.bio}
                </p>
                {/* Divider with org info */}
                <div className="border-t border-border dark:border-dark_border pt-5">
                  <p className="text-sm text-muted dark:text-white/50">
                    GoldenLife Victors International · Nairobi, Kenya
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Directors — three in a row ── */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {directors.map((d, i) => (
              <div
                key={d.name}
                className="bg-white dark:bg-[#1e2436] rounded-2xl border border-border dark:border-dark_border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                data-aos="fade-up"
                data-aos-delay={`${i * 120}`}
                data-aos-duration="800"
              >
                {/* Photo */}
                <div className="h-64">
                  <BoardMemberImage src={d.image} name={d.name} />
                </div>
                {/* Info */}
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mb-4 block">
                    Director
                  </span>
                  <h4 className="text-xl font-bold text-midnight_text dark:text-white mb-1">{d.name}</h4>
                  <p className="text-primary text-sm font-medium mb-3">{d.title}</p>
                  <p className="text-muted dark:text-white/60 text-sm leading-relaxed">{d.bio}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Governance note */}
          <div
            className="mt-14 bg-SnowySky dark:bg-darklight rounded-2xl p-8 text-center"
            data-aos="fade-up" data-aos-duration="800"
          >
            <p className="text-sm text-muted dark:text-white/60 max-w-xl mx-auto leading-relaxed">
              GoldenLife Victors International is governed by a board committed to transparency, ethical
              practice, and community accountability in all aspects of our clinical and outreach operations.
            </p>
          </div>

        </div>
      </section>

      <Volunteer />
    </>
  );
}