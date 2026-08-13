import { MetadataRoute } from "next";
import { getAllPublicPosts } from "@/utils/blogApi";
import { getPublicEvents } from "@/utils/blogApi";

const BASE_URL = "https://www.goldenlifevictors.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static routes ──────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                                      priority: 1.0,  changeFrequency: "weekly"  },
    { url: `${BASE_URL}/about`,                           priority: 0.9,  changeFrequency: "monthly" },
    { url: `${BASE_URL}/about/our-board`,                 priority: 0.7,  changeFrequency: "monthly" },
    { url: `${BASE_URL}/programmes`,                      priority: 0.9,  changeFrequency: "monthly" },
    { url: `${BASE_URL}/programmes/clinical-recovery`,    priority: 0.8,  changeFrequency: "monthly" },
    { url: `${BASE_URL}/programmes/community-outreach`,   priority: 0.8,  changeFrequency: "monthly" },
    { url: `${BASE_URL}/programmes/global-practices`,     priority: 0.8,  changeFrequency: "monthly" },
    { url: `${BASE_URL}/blog`,                            priority: 0.8,  changeFrequency: "daily"   },
    { url: `${BASE_URL}/events`,                          priority: 0.8,  changeFrequency: "daily"   },
    { url: `${BASE_URL}/cause`,                           priority: 0.7,  changeFrequency: "monthly" },
    { url: `${BASE_URL}/gallery`,                         priority: 0.6,  changeFrequency: "monthly" },
    { url: `${BASE_URL}/contact`,                         priority: 0.7,  changeFrequency: "yearly"  },
  ];

  // ── Dynamic blog posts ─────────────────────────────────────────────────────
  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPublicPosts();
    postRoutes = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.id}`,
      lastModified: post.dateCreated ? new Date(post.dateCreated) : new Date(),
      priority: 0.7,
      changeFrequency: "monthly" as const,
    }));
  } catch { /* fail silently — static routes still generated */ }

  // ── Dynamic events ─────────────────────────────────────────────────────────
  let eventRoutes: MetadataRoute.Sitemap = [];
  try {
    const events = await getPublicEvents();
    eventRoutes = events
      .filter((e) => e.status === "PUBLISHED")
      .map((event) => ({
        url: `${BASE_URL}/events/${event.id}`,
        lastModified: new Date(),
        priority: 0.7,
        changeFrequency: "weekly" as const,
      }));
  } catch { /* fail silently */ }

  return [...staticRoutes, ...postRoutes, ...eventRoutes];
}