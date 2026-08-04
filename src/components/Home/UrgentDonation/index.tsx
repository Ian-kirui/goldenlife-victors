import Link from "next/link";

// Volunteer/partner registration — Google Form link (replace with actual form URL)
const PARTNER_FORM_URL = "https://forms.gle/your-form-id";

const UrgentDonation = () => {
  return (
    <section className="relative bg-[url('/images/all/volunt2.jpg')] bg-cover sm:py-52 lg:py-28 py-16 bg-no-repeat bg-center overflow-hidden">
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70" />
      
      {/* Content */}
      <div className="relative container mx-auto lg:max-w-(--breakpoint-xl) px-4 z-10">
        <div 
          className="bg-white dark:bg-dark max-w-2xl w-full px-10 py-14 rounded-lg text-center mx-auto shadow-2xl" 
          data-aos="fade-right"
        >
          <h3 className="sm:text-2xl text-lg font-bold mb-5">
            Partner with Us to Transform Lives
          </h3>
          <p className="text-muted dark:text-white/60 sm:text-base text-sm mb-4">
            GoldenLife Victors is built on partnership. We are looking for professionals, organisations, and
            compassionate individuals to join us in tackling alcohol and substance use disorder in our communities.
          </p>
          <p className="text-muted dark:text-white/60 sm:text-base text-sm mb-7">
            Whether through volunteering your expertise, offering in-kind support, or collaborating on outreach
            — your contribution makes recovery possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={PARTNER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-linear-to-r from-primary to-secondary px-7 border text-sm font-semibold text-white border-transparent py-4 rounded-sm hover:from-transparent hover:to-transparent hover:border-primary hover:text-primary transition-all duration-300"
            >
              Become a Partner
            </Link>
            <Link
              href="/programmes"
              className="px-7 border text-sm font-semibold border-primary text-primary py-4 rounded-sm hover:bg-primary hover:text-white transition-all duration-300"
            >
              Our Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgentDonation;