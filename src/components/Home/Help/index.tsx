import Link from "next/link";
import { pillars } from "@/app/api/programmes-data";

// Maasai-inspired SVG icons — geometric, clean, on-theme
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

const Help = () => {
  return (
    <section className="lg:py-28 py-16 bg-white dark:bg-dark">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="text-center">
          <h2 className="text-3xl mb-3 font-medium" data-aos-delay="100" data-aos="fade-right">
            GoldenLife Victors
          </h2>
          <p className="text-muted dark:text-white/60 text-base">
            Our mission is to deliver evidence-based clinical rehabilitation, community prevention, and professional
            mental health capacity building —{" "}
            <br className="lg:block hidden" />
            empowering individuals and families to thrive in mind, body, and spirit.
          </p>

          <div className="mt-20 grid grid-cols-12 gap-8">
            {pillars.map((item, index) => (
              <div
                key={item.slug}
                className="md:col-span-4 sm:col-span-6 col-span-12 text-center flex flex-col gap-5 justify-center"
                data-aos="fade-up"
                data-aos-delay={`${index * 150}`}
              >
                {/* Maasai-geometric SVG icon */}
                <div className="flex justify-center text-primary">
                  {PillarIcons[index]}
                </div>

                {/* Subtle label badge */}
                <span className="text-xs font-bold uppercase tracking-widest text-primary/60 -mb-2">
                  {item.label}
                </span>

                <h4 className="text-lg font-medium">{item.title}</h4>

                <p className="text-muted dark:text-white/60 text-base">{item.description}</p>

                <Link
                  href={`/treatments/${item.slug}`}
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  {item.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help;