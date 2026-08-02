import { Metadata } from "next";
import { getPublicEventById, getPublicEvents } from "@/utils/blogApi";
import { formatPostDate } from "@/utils/formatDate";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Volunteer from "@/components/SharedComponent/Volunteer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const event = await getPublicEventById(slug);
  if (!event) return { title: "Event Not Found | GoldenLife Victors" };
  return {
    title: `${event.title} | GoldenLife Victors`,
    description: event.content?.replace(/<[^>]+>/g, "").slice(0, 155),
  };
}

const PLACEHOLDER = "https://www.goldenlifekenya.org/images/20221121_122506.jpg";

export default async function EventDetailPage({ params }: any) {
  const { slug } = await params;
  const event = await getPublicEventById(slug);
  if (!event) notFound();

  return (
    <>
      {/* Hero with cover image */}
      <section className="relative pt-44 pb-0 dark:bg-dark px-4">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto">
          <div className="grid md:grid-cols-12 grid-cols-1 items-start gap-8">
            <div className="col-span-8">
              {/* Meta */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-5">
                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatPostDate(event.dateCreated)}
                </span>
                {event.location && (
                  <span className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    {event.location}
                  </span>
                )}
                {event.meetLink && (
                  <a
                    href={event.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-primary hover:underline font-medium"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Join Online
                  </a>
                )}
                {event.registrationLink && (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-secondary hover:underline font-medium"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Register
                  </a>
                )}
              </div>
              <h1 className="text-midnight_text dark:text-white text-[40px] leading-tight font-bold">
                {event.title}
              </h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
                Organised by{" "}
                <span className="font-medium text-midnight_text dark:text-white">
                  GoldenLife Victors
                </span>
              </p>
            </div>

            {/* Register / Join CTA */}
            <div className="col-span-4 flex flex-col gap-3 md:items-end">
              {event.meetLink && (
                <a
                  href={event.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-darkprimary text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Join Event
                </a>
              )}
              {event.registrationLink && (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-darksecondary text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Register Now
                </a>
              )}
              <Link
                href="/events"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
              >
                ← All Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="pb-10 pt-12 dark:bg-dark lg:pb-20 px-4">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto">
          {/* Cover image */}
          {(event.imageUrl || true) && (
            <div className="mb-12 rounded-2xl overflow-hidden h-80 md:h-[420px]">
              <Image
                src={event.imageUrl ?? PLACEHOLDER}
                alt={event.title}
                width={1170}
                height={500}
                quality={100}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Content */}
            <div className="lg:col-span-2">
              <div className="blog-details markdown">
                <div dangerouslySetInnerHTML={{ __html: event.content }} />
              </div>
            </div>

            {/* Sidebar info card */}
            <div>
              <div className="bg-white dark:bg-[#1e2436] rounded-2xl border border-border dark:border-dark_border p-6 space-y-5 sticky top-28">
                <h3 className="font-bold text-midnight_text dark:text-white text-lg">
                  Event Details
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-primary shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">
                        Date Posted
                      </p>
                      <p className="text-midnight_text dark:text-white font-medium">
                        {formatPostDate(event.dateCreated)}
                      </p>
                    </div>
                  </div>

                  {event.location && (
                    <div className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-primary shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Location</p>
                        <p className="text-midnight_text dark:text-white font-medium">
                          {event.location}
                        </p>
                      </div>
                    </div>
                  )}

                  {event.meetLink && (
                    <div className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-primary shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.361a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">
                          Virtual Link
                        </p>
                        <a
                          href={event.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-medium hover:underline break-all"
                        >
                          Join Meeting
                        </a>
                      </div>
                    </div>
                  )}
                  {event.registrationLink && (
                    <div className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-secondary shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">
                          Registration
                        </p>
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary font-medium hover:underline break-all"
                        >
                          Register Here
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-primary shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Organiser</p>
                      <p className="text-midnight_text dark:text-white font-medium">
                        GoldenLife Victors
                      </p>
                    </div>
                  </div>
                </div>

                {event.meetLink && (
                  <a
                    href={event.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-primary hover:bg-darkprimary text-white font-medium py-3 rounded-lg transition-colors mt-2"
                  >
                    Join Meeting
                  </a>
                )}
                {event.registrationLink && (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-secondary hover:bg-darksecondary text-white font-medium py-3 rounded-lg transition-colors mt-2"
                  >
                    Register / Sign Up
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Volunteer />
    </>
  );
}
