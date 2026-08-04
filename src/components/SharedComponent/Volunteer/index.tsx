import Link from "next/link";

// Replace with actual Google Form URL for volunteer/partner registration
const VOLUNTEER_FORM_URL = "https://forms.gle/your-form-id";

const Volunteer = () => {
  return (
    <section className="relative lg:py-28 py-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-[url('/images/all/religion.jpg')] bg-no-repeat bg-cover bg-center"
        aria-hidden="true"
      />
      
      {/* Dark Overlay - Adjust opacity as needed */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/70" />
      
      {/* Content */}
      <div className="relative container mx-auto lg:max-w-(--breakpoint-xl) px-4 z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-medium text-white mb-6 drop-shadow-lg">
            Join Our Mission — Volunteer or Partner
          </h2>
          <p className="text-base lg:text-lg text-white/95 lg:max-w-3xl mx-auto mb-4 drop-shadow-md">
            GoldenLife Victors is driven by partnerships. We welcome professionals, organisations, and individuals
            who share our commitment to rehabilitation and mental wellness. Work with us directly in our community
            outreach or at our inpatient facility in Naivasha, Kenya.
          </p>
          <p className="text-white/90 text-sm lg:text-base lg:max-w-2xl mx-auto mb-8 drop-shadow-md">
            You can also support us through M-Pesa Paybill <strong>247247</strong>, Account <strong>071218</strong>,
            in-kind donations, or by calling us to discuss collaboration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={VOLUNTEER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white rounded-md bg-linear-to-r text-sm font-semibold from-error to-warning px-7 py-4 hover:from-transparent hover:to-transparent border border-transparent hover:border-error hover:text-error transition-all duration-300"
            >
              Register as Volunteer / Partner
            </Link>
            <Link
              href="/contact"
              className="text-white rounded-md border border-white text-sm font-semibold px-7 py-4 hover:bg-white hover:text-primary transition-all duration-300"
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