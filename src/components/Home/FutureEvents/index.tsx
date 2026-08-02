import { getPublicEvents } from "@/utils/blogApi";
import { formatPostDate } from "@/utils/formatDate";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

const PLACEHOLDER = "https://www.goldenlifekenya.org/images/20221121_122506.jpg";

const FutureEvents = async () => {
  const events = await getPublicEvents();
  const published = events.filter((e) => e.status === "PUBLISHED").slice(0, 3);

  if (published.length === 0) return null;

  return (
    <section className="lg:py-28 py-16 dark:bg-dark">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="text-center">
          <h2 className="text-3xl font-medium mb-3" data-aos="fade-left">Upcoming Events Near You</h2>
          <p className="text-base text-muted dark:text-white/60 mx-auto lg:max-w-60%">
            Join us at local events to make a difference! Connect, volunteer, and support our mission in your community.
          </p>
        </div>
        <div className="mt-20 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {published.map((item, index) => (
            <Link key={item.id} href={`/events/${item.id}`} className="group" data-aos="fade-up" data-aos-delay={`${index * 250}`}>
              <div className="relative overflow-hidden mb-8">
                <div className="overflow-hidden">
                  <Image
                    src={item.imageUrl ?? PLACEHOLDER}
                    alt={item.title}
                    width={350}
                    height={250}
                    className="w-full h-auto group-hover:scale-110 scale-[1.01] duration-300 object-cover"
                  />
                </div>
                {item.location && (
                  <div className="px-3 py-2 bg-linear-to-r from-primary to-secondary absolute z-1 top-3 right-3 rounded-sm">
                    <p className="text-white text-xs text-center">{item.location}</p>
                  </div>
                )}
              </div>
              <h4 className="text-lg font-medium mb-4 group-hover:text-primary">{item.title}</h4>
              <p className="text-muted dark:text-white/60 text-base mb-6 line-clamp-2">
                {item.content?.replace(/<[^>]+>/g, "").slice(0, 100)}…
              </p>
              <h5 className="text-error hover:text-warning text-base font-medium flex gap-3 items-center w-fit">
                Learn More
                <span><Icon icon="solar:arrow-right-linear" width="20" height="20" /></span>
              </h5>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureEvents;