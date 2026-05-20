import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Volunteer from "@/components/SharedComponent/Volunteer";
import GalleryImage from "@/components/Gallery/GalleryImage";

export const metadata: Metadata = {
  title: "Gallery | GoldenLife Victors",
  description:
    "Explore moments from GoldenLife Victors — our programmes, community outreaches, therapy sessions and events captured in photos.",
};

const categories = [
  {
    label: "Community Outreach",
    images: [
      { src: "https://www.goldenlifekenya.org/images/20221121_123208.jpg", caption: "Community wellness drive, Nairobi" },
      { src: "https://www.goldenlifekenya.org/images/20221121_122537.jpg", caption: "Mental health awareness camp" },
      { src: "https://www.goldenlifekenya.org/images/20221121_122506.jpg", caption: "BeyondBump mothers' circle" },
    ],
  },
  {
    label: "Therapy & Programmes",
    images: [
      { src: "https://www.goldenlifekenya.org/images/watoto.jpg", caption: "Roots & Wings school session" },
      { src: "https://www.goldenlifekenya.org/images/children.jpg", caption: "Active Minds youth workshop" },
      { src: "https://www.goldenlifekenya.org/images/20221121_123208.jpg", caption: "Wellness Warriors group" },
    ],
  },
  {
    label: "Events & Conferences",
    images: [
      { src: "https://www.goldenlifekenya.org/images/shakahola2.jpg", caption: "Global Practices leadership summit" },
      { src: "https://www.goldenlifekenya.org/images/shakahola.jpg", caption: "Annual mental health gala" },
      { src: "https://www.goldenlifekenya.org/images/3.jpg", caption: "Stakeholders roundtable 2024" },
    ],
  },
  {
    label: "Our Team",
    images: [
      { src: "https://www.goldenlifekenya.org/images/shakahola2.jpg", caption: "The GoldenLife professionals" },
      { src: "https://www.goldenlifekenya.org/images/shakahola.jpg", caption: "Staff training day" },
      { src: "https://www.goldenlifekenya.org/images/3.jpg", caption: "Field team, Mombasa" },
    ],
  },
];

export default function GalleryPage() {
  return (
    <>
      <HeroSub title="Gallery" />

      {/* Intro */}
      <section className="pt-20 pb-4 dark:bg-dark px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) text-center max-w-2xl">
          <p className="text-primary text-base font-medium mb-3">Our Journey in Photos</p>
          <h2 className="text-4xl font-bold text-midnight_text dark:text-white mb-5">
            Moments that matter
          </h2>
          <p className="text-muted dark:text-white/70 text-base leading-relaxed">
            Every photograph here represents a life touched, a community strengthened, and a step forward
            in our mission to make mental health care accessible to all.
          </p>
        </div>
      </section>

      {/* Gallery sections */}
      {categories.map((cat, ci) => (
        <section
          key={cat.label}
          className={`py-16 px-4 ${ci % 2 === 1 ? "bg-SnowySky dark:bg-darklight" : "dark:bg-dark"}`}
        >
          <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h3 className="text-2xl font-bold text-midnight_text dark:text-white">{cat.label}</h3>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              {cat.images.map((img, ii) => (
                <GalleryImage
                  key={img.src}
                  src={img.src}
                  alt={img.caption}
                  caption={img.caption}
                  delay={ii * 120}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA strip */}
      <section className="py-16 px-4 dark:bg-dark">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="bg-primary rounded-2xl px-8 py-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Be part of our story</h3>
            <p className="text-white/80 text-base mb-8 max-w-xl mx-auto">
              Join GoldenLife Victors as a volunteer, donor or partner and help us create more moments
              worth celebrating.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact"
                className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Get Involved
              </a>
              <a href="/blog"
                className="border border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Read Our Blog
              </a>
            </div>
          </div>
        </div>
      </section>

      <Volunteer />
    </>
  );
}