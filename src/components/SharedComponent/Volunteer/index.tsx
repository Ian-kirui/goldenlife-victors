import Link from "next/link";

// Replace with actual Google Form URL for volunteer/partner registration
const VOLUNTEER_FORM_URL = "https://forms.gle/your-form-id";

const Volunteer = () => {
  return (
    <section className="lg:py-28 py-16 bg-[url('https://www.goldenlifekenya.org/images/20221121_122506.jpg')] bg-no-repeat bg-cover overflow-hidden">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="text-center">
          <h2 className="text-3xl font-medium text-white mb-6">
            Join Our Mission — Volunteer or Partner
          </h2>
          <p className="text-base text-white lg:max-w-60% mx-auto mb-4">
            GoldenLife Victors is driven by partnerships. We welcome professionals, organisations, and individuals
            who share our commitment to rehabilitation and mental wellness. Work with us directly in our community
            outreach or at our inpatient facility in Naivasha, Kenya.
          </p>
          <p className="text-white/80 text-sm lg:max-w-50% mx-auto mb-8">
            You can also support us through M-Pesa Paybill <strong>247247</strong>, Account <strong>071218</strong>,
            in-kind donations, or by calling us to discuss collaboration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={VOLUNTEER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white rounded-md bg-linear-to-r text-sm font-semibold from-error to-warning px-7 py-4 hover:from-transparent hover:to-transparent border border-transparent hover:border-error hover:text-error"
            >
              Register as Volunteer / Partner
            </Link>
            <Link
              href="/contact"
              className="text-white rounded-md border border-white text-sm font-semibold px-7 py-4 hover:bg-white hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Volunteer;