import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Volunteer from "@/components/SharedComponent/Volunteer";
import Help from "@/components/Home/Help";
import Testimonial from "@/components/Home/Testimonial";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | GoldenLife Victors",
  description:
    "GoldenLife Victors is an integrated mental healthcare, rehabilitation, and community wellness organisation dedicated to restoring human dignity across Kenya.",
};

const pillars = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    label: "Our Story",
    heading: "Bridging the gap in Mental Health & Recovery",
    body: "GoldenLife Victors was established to address a critical gap in society: the need for accessible, dignified, and evidence-based mental health and addiction recovery services — replacing stigma with support, and despair with restored purpose.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    label: "Our Mission",
    heading: "Evidence-based care for every stage of life",
    body: "To deliver evidence-based clinical rehabilitation, community prevention programmes, and professional mental health capacity building that empower individuals and families to thrive in mind, body, and spirit.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    label: "Our Vision",
    heading: "A world where mental health is prioritised",
    body: "A world where mental health is prioritised, stigma is dismantled, and every individual has access to compassionate, holistic recovery and wellness.",
  },
];

const values = [
  { title: "Dignity & Compassion",        desc: "We treat every client with unconditional respect, creating a safe, non-judgmental space for healing." },
  { title: "Evidence-Based Excellence",   desc: "Our clinical interventions integrate proven medical, psychological, and therapeutic practices." },
  { title: "Holistic Restorative Care",   desc: "We address the whole person — bridging physical recovery, emotional resilience, family reintegration, and spiritual well-being." },
  { title: "Community-Rooted Action",     desc: "We believe true prevention happens where people live, work, learn, and worship." },
  { title: "Integrity & Accountability",  desc: "We maintain the highest ethical standards in patient care, financial management, and institutional partnerships." },
];

const facilityFeatures = [
  { feature: "Multidisciplinary Team",   benefit: "Led by ICAP-certified addiction professionals, psychiatric nurse specialists, and clinical psychologists." },
  { feature: "Serene Environment",       benefit: "Located in Naivasha, offering a tranquil, nature-surrounded setting ideal for rest, reflection, and focus." },
  { feature: "High Privacy & Dignity",   benefit: "Strict confidentiality protocols to protect client identity and ensure a safe, non-judgmental space." },
  { feature: "Holistic Integration",     benefit: "Medical, psychological, social, and spiritual dimensions of health addressed under one care plan." },
];

const careModel = [
  {
    num: "01",
    title: "Clinical Excellence",
    sub: "Inpatient & Outpatient",
    body: "At our facility in Naivasha, we offer structured residential rehabilitation for Alcohol and Substance Use Disorders (SUD), dual diagnosis care, and structured counselling. Our multidisciplinary care plans combine medical detoxification, individual psychotherapy, group therapy, life skills training, and structured family reintegration support.",
  },
  {
    num: "02",
    title: "IMARA Programme",
    sub: "Indigenous & Pastoralist Community Recovery",
    body: "Culturally responsive mobile wellness caravans delivering mental health education and addiction interventions directly into Kenya's pastoralist and hard-to-reach communities — working with traditional elders, women's leaders, and youth groups to embed mental wellness into the existing cultural fabric.",
  },
  {
    num: "03",
    title: "Capacity Building & Global Practices",
    sub: "Training, Research & Consultancy",
    body: "As an innovation and learning hub, GoldenLife Victors advances local mental healthcare by providing training, research platforms, and consultancy for healthcare workers, institutions, community leaders, and international volunteers.",
  },
];

export default function AboutPage() {
  return (
    <>
      <HeroSub title="About Us" />

      {/* ── Who we are ── */}
      <section className="py-20 dark:bg-dark px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 items-center">
            <div data-aos="fade-right" data-aos-duration="1000">
              <p className="text-primary text-base font-medium mb-3">Who We Are</p>
              <h2 className="text-4xl font-bold text-midnight_text dark:text-white mb-6 leading-tight">
                Driven by Compassion, Grounded in Science, Committed to Lasting Healing.
              </h2>
              <p className="text-muted dark:text-white/70 text-base leading-relaxed mb-4">
                We are an integrated mental healthcare, rehabilitation, and community wellness organisation
                dedicated to restoring human dignity across Kenya — from our specialised inpatient facility
                in Naivasha to grassroots communities.
              </p>
              <p className="text-muted dark:text-white/70 text-base leading-relaxed mb-6">
                Addiction and mental health challenges do not just affect an individual — they impact entire
                families and destabilise whole communities. GoldenLife Victors operates as a dual-impact
                organisation: delivering high-quality clinical rehabilitation while actively deploying
                preventive, community-driven mental health initiatives across schools, workplaces, faith
                organisations, and hard-to-reach pastoralist regions.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-8">
                {[
                  { number: "500+", label: "Clients Served" },
                  { number: "10+",  label: "Programmes" },
                  { number: "5+",   label: "Years of Impact" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-3xl font-bold text-primary">{s.number}</p>
                    <p className="text-sm text-muted dark:text-white/60 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative" data-aos="fade-left" data-aos-duration="1000">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/all/shakahola2.jpg"
                  alt="GoldenLife Victors team"
                  width={600} height={500}
                  className="w-full h-[420px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-white rounded-2xl px-6 py-4 shadow-xl">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm opacity-90">Commitment to Care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Healing in Connection narrative ── */}
      <section className="py-20 bg-SnowySky dark:bg-darklight px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up" data-aos-duration="1000">
            <p className="text-primary text-base font-medium mb-3">Our Approach</p>
            <h2 className="text-4xl font-bold text-midnight_text dark:text-white mb-6">
              Healing in Connection, Restoring Human Dignity
            </h2>
            <p className="text-muted dark:text-white/70 text-base leading-relaxed mb-4">
              Mental health challenges and addiction do not exist in isolation — they affect individuals,
              families, and entire communities. GoldenLife Victors bridges the gap between clinical excellence
              and grassroots access.
            </p>
            <p className="text-muted dark:text-white/70 text-base leading-relaxed">
              Operating from our inpatient facility in Naivasha, Kenya, and out in the field across remote,
              pastoralist, urban, and institutional settings, we provide compassionate, multi-disciplinary care
              tailored to every stage of recovery.
            </p>
          </div>
        </div>
      </section>

      {/* ── Model of Care ── */}
      <section className="py-20 dark:bg-dark px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="text-center mb-14" data-aos="fade-up">
            <p className="text-primary text-base font-medium mb-3">How We Work</p>
            <h2 className="text-4xl font-bold text-midnight_text dark:text-white">Our Integrated Model of Care</h2>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
            {careModel.map((c, i) => (
              <div key={c.num}
                className="bg-white dark:bg-dark rounded-2xl p-8 border border-border dark:border-dark_border hover:shadow-md transition-shadow"
                data-aos="fade-up" data-aos-delay={`${i * 120}`} data-aos-duration="1000"
              >
                <span className="text-4xl font-black text-primary/20 block mb-4">{c.num}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-1 block">{c.sub}</span>
                <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-3">{c.title}</h3>
                <p className="text-muted dark:text-white/70 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Naivasha Facility ── */}
      <section className="py-20 bg-SnowySky dark:bg-darklight px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="text-center mb-14" data-aos="fade-up">
            <p className="text-primary text-base font-medium mb-3">Our Inpatient Facility</p>
            <h2 className="text-4xl font-bold text-midnight_text dark:text-white">What Sets Our Naivasha Facility Apart</h2>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            {facilityFeatures.map((f, i) => (
              <div key={f.feature}
                className="bg-white dark:bg-dark rounded-2xl p-6 border border-border dark:border-dark_border hover:border-primary transition-colors group"
                data-aos="fade-up" data-aos-delay={`${i * 100}`} data-aos-duration="1000"
              >
                <div className="flex gap-4">
                  <div className="w-2 rounded-full bg-primary shrink-0 group-hover:bg-secondary transition-colors" />
                  <div>
                    <h4 className="font-bold text-midnight_text dark:text-white mb-1">{f.feature}</h4>
                    <p className="text-muted dark:text-white/70 text-sm leading-relaxed">{f.benefit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted dark:text-white/60 italic mb-4">
              Note: When using maps to find us, please call ahead to confirm the best route — GPS directions can
              sometimes suggest longer routes to our Naivasha location.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
              Get directions & contact us →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Story / Mission / Vision ── */}
      <section className="py-20 dark:bg-dark px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="text-center mb-14" data-aos="fade-up">
            <p className="text-primary text-base font-medium mb-3">Our Foundation</p>
            <h2 className="text-4xl font-bold text-midnight_text dark:text-white">Story, Mission & Vision</h2>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {pillars.map((p, i) => (
              <div key={p.label}
                className="bg-white dark:bg-dark rounded-2xl p-8 shadow-sm border border-border dark:border-dark_border hover:shadow-md transition-shadow"
                data-aos="fade-up" data-aos-delay={`${i * 150}`} data-aos-duration="1000"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">{p.icon}</div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">{p.label}</span>
                <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-3">{p.heading}</h3>
                <p className="text-muted dark:text-white/70 text-base leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values (VICTORS Framework) ── */}
      <section className="py-20 bg-SnowySky dark:bg-darklight px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="text-center mb-14" data-aos="fade-up">
            <p className="text-primary text-base font-medium mb-3">What Drives Us</p>
            <h2 className="text-4xl font-bold text-midnight_text dark:text-white">Our Core Values</h2>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {values.map((v, i) => (
              <div key={v.title}
                className="flex gap-4 p-6 rounded-xl border border-border dark:border-dark_border hover:border-primary dark:hover:border-primary transition-colors group"
                data-aos="fade-up" data-aos-delay={`${i * 100}`} data-aos-duration="1000"
              >
                <div className="w-2 rounded-full bg-primary shrink-0 group-hover:bg-secondary transition-colors" />
                <div>
                  <h4 className="font-bold text-midnight_text dark:text-white mb-1">{v.title}</h4>
                  <p className="text-muted dark:text-white/70 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership note ── */}
      <section className="py-16 dark:bg-dark px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="bg-primary rounded-2xl px-8 py-12 text-center text-white" data-aos="fade-up">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">Our Team</p>
            <h3 className="text-3xl font-bold mb-4">Guided by Professional Leadership & Passion</h3>
            <p className="text-white/80 text-base max-w-2xl mx-auto mb-6">
              Our strength lies in our multidisciplinary team of psychiatrists, psychiatric nurse specialists,
              ICAP-certified addiction professionals, medical doctors, clinical psychologists, counsellors,
              and community health champions.
            </p>
            <Link href="/about/our-board"
              className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Meet Our Board →
            </Link>
          </div>
        </div>
      </section>

      <Help />
      <Testimonial />
      <Volunteer />
    </>
  );
}