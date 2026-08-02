import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Volunteer from "@/components/SharedComponent/Volunteer";
import { getPublicEvents } from "@/utils/blogApi";
import { formatPostDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events | GoldenLife Victors",
  description:
    "Upcoming and past events by GoldenLife Victors — workshops, therapy programmes, community outreaches and more.",
};

const PLACEHOLDER = "https://www.goldenlifekenya.org/images/20221121_122506.jpg";

export default async function EventsPage() {
  const events = await getPublicEvents();
  const published = events.filter((e) => e.status === "PUBLISHED");

  return (
    <>
      <HeroSub title="Events" />

      <section className="py-20 dark:bg-dark px-4">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          {/* Header */}
          <div
            className="flex items-center justify-between mb-12"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div>
              <p className="text-primary text-base font-medium mb-2">
                What's Happening
              </p>
              <h2 className="text-4xl font-bold text-midnight_text dark:text-white">
                Upcoming Events
              </h2>
            </div>
            <span className="text-sm text-gray-400">
              {published.length} event{published.length !== 1 ? "s" : ""}
            </span>
          </div>

          {published.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <svg
                className="w-16 h-16 mx-auto mb-4 opacity-30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-lg font-medium">
                No upcoming events at this time.
              </p>
              <p className="text-sm mt-1">
                Check back soon — we're always planning something new.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
              {published.map((event, i) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="group bg-white dark:bg-dark rounded-2xl shadow-sm border border-border dark:border-dark_border hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                  data-aos="fade-up"
                  data-aos-delay={`${i * 100}`}
                  data-aos-duration="800"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={event.imageUrl ?? PLACEHOLDER}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
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
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {event.location}
                        </span>
                      )}
                      <span>{formatPostDate(event.dateCreated)}</span>
                    </div>

                    <h3 className="text-lg font-bold text-midnight_text dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-border dark:border-dark_border">
                      <div className="flex items-center gap-3 flex-wrap">
                        {event.meetLink && (
                          <span className="flex items-center gap-1 text-xs text-primary font-medium">
                            <svg
                              className="w-3.5 h-3.5"
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
                            Virtual
                          </span>
                        )}
                        {event.registrationLink && (
                          <span className="flex items-center gap-1 text-xs text-secondary font-medium">
                            <svg
                              className="w-3.5 h-3.5"
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
                            Registration
                          </span>
                        )}
                        {!event.meetLink && !event.registrationLink && (
                          <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                            In Person
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Volunteer />
    </>
  );
}
