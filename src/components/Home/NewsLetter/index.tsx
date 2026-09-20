"use client";

import Link from "next/link";
import { useState } from "react";
import { sendContactForm } from "@/utils/blogApi";
import toast, { Toaster } from "react-hot-toast";

export default function Newsletter() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [agreed, setAgreed]   = useState(false);
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
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 items-center">

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
                <input type="text" required value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name" className={inputCls} />
              </div>
              <div className="mb-6">
                <input type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" className={inputCls} />
              </div>
              <div className="flex justify-center mb-6">
                <button type="submit" disabled={submitting}
                  className="text-white bg-linear-to-r from-error to-warning px-7 py-4 dark:hover:from-dark hover:from-white hover:to-white dark:hover:to-dark border border-transparent hover:border-error hover:text-error rounded-sm w-full disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting
                    ? <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />Subscribing…</>
                    : "Subscribe"}
                </button>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <input type="checkbox" name="condition" id="condition"
                  checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                <label htmlFor="condition" className="text-base text-muted dark:text-white/60">
                  I agree with the{" "}
                  <Link href="/terms" className="text-primary hover:underline">terms and conditions</Link>
                </label>
              </div>
            </form>
          </div>

          {/* Right side — CTA panel instead of blog posts */}
          <div className="bg-primary rounded-2xl p-10 text-white" data-aos="fade-right">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">
              Why Subscribe?
            </p>
            <h3 className="text-2xl font-bold mb-5">
              Be part of the movement for mental wellness across Kenya
            </h3>
            <div className="space-y-4 mb-8">
              {[
                "Early access to upcoming events and community outreach programmes",
                "Mental health resources, research, and expert insights",
                "Updates from our IMARA field teams and rehabilitation facility",
                "Opportunities to volunteer, partner, or sponsor a wellness initiative",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                  <p className="text-white/80 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <Link href="/blog"
              className="inline-block border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors text-sm">
              Read our latest blog posts →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}