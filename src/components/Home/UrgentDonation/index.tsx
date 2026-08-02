import Link from "next/link";

// Volunteer/partner registration — Google Form link (replace with actual form URL)
const PARTNER_FORM_URL = "https://forms.gle/your-form-id";

const UrgentDonation = () => {
  return (
    <section className="bg-[url('https://www.goldenlifekenya.org/images/20221121_122506.jpg')] bg-cover sm:py-52 lg:py-28 py-16 bg-no-repeat">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="bg-white dark:bg-dark max-w-29 w-full px-10 py-14 rounded-lg text-center mx-auto" data-aos="fade-right">
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
              className="bg-linear-to-r from-primary to-secondary px-7 border text-sm font-semibold text-white border-transparent py-4 rounded-sm hover:from-transparent hover:to-transparent hover:border-primary hover:text-primary"
            >
              Become a Partner
            </Link>
            <Link
              href="/programmes"
              className="px-7 border text-sm font-semibold border-primary text-primary py-4 rounded-sm hover:bg-primary hover:text-white transition-colors"
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