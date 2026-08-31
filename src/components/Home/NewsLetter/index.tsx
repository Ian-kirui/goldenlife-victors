"use client";

import Link from "next/link";
import { useState } from "react";
import { sendContactForm } from "@/utils/blogApi";
import toast, { Toaster } from "react-hot-toast";
import type { Post } from "@/types/api.types";
import BlogCard from "./blogCard";

// Newsletter receives posts as props — fetched by the Server Component parent
interface NewsletterProps {
  posts: Post[];
}

export default function Newsletter({ posts }: NewsletterProps) {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("")
  const [agreed, setAgreed]     = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { toast.error("Please agree to the terms and conditions."); return; }
    setSubmitting(true);
    try {
      await sendContactForm({
        name,
        email,
        subject: "Newsletter Subscription",
        message: `${name} has subscribed to the GoldenLife Victors newsletter.`,
      });
      toast.success("Subscribed successfully! Thank you.");
      setName(""); setEmail(""); setAgreed(false);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to subscribe. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = "w-full p-4 border border-border dark:border-dark_border focus:border-primary dark:focus:border-primary dark:bg-dark rounded-sm focus-visible:outline-hidden";

  return (
    <section className="lg:py-28 py-16 dark:bg-dark">
      <Toaster />
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-44">
          {/* Subscribe form */}
          <div data-aos="fade-left">
            <div className="mb-8">
              <p className="text-base text-primary mb-3">Newsletter</p>
              <h2 className="text-3xl font-medium mb-6">
                Stay informed about new and upcoming causes
              </h2>
              <p className="text-base text-muted dark:text-white/60">
                Subscribe to our updates and stay connected with the latest causes and
                initiatives. Be among the first to learn how you can make a difference
                in urgent and upcoming projects!
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={inputCls}
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className={inputCls}
                />
              </div>
              <div className="flex justify-center mb-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="text-white bg-linear-to-r from-error to-warning px-7 py-4 dark:hover:from-dark hover:from-white hover:to-white dark:hover:to-dark border border-transparent hover:border-error hover:text-error rounded-sm w-full disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />Subscribing…</>
                  ) : "Subscribe"}
                </button>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <input
                  type="checkbox"
                  name="condition"
                  id="condition"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <label htmlFor="condition" className="text-base text-muted dark:text-white/60">
                  I agree with the{" "}
                  <Link href="/terms" className="text-primary hover:underline">terms and conditions</Link>
                </label>
              </div>
            </form>
          </div>

          {/* Latest posts */}
          <div className="lg:mt-0 mt-8">
            <div className="flex justify-between items-center border-b border-border dark:border-dark_border pb-6 mb-8">
              <h4 className="text-base mb-0">Latest news at GoldenLife Victors</h4>
              <Link href="/blog" className="text-error hover:text-warning text-base">View all</Link>
            </div>
            {posts.length === 0 ? (
              <p className="text-gray-400 text-sm">No posts yet.</p>
            ) : (
              posts.map((blog) => (
                <div key={blog.id} className="lg:mb-10 mb-6" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                  <BlogCard blog={blog} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}