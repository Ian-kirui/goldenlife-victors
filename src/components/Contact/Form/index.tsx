"use client";

import { useState } from "react";
import Image from "next/image";
import { sendContactForm } from "@/utils/blogApi";
import toast, { Toaster } from "react-hot-toast";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await sendContactForm(form);
      toast.success("Message sent! We'll be in touch shortly.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      toast.error(err.message ?? "Failed to send. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full text-base px-4 py-3 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-dark transition-all focus:border-primary dark:focus:border-primary focus:outline-none";

  return (
    <section className="dark:bg-dark pb-24">
      <Toaster />
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-8">
          {/* Form */}
          <div className="lg:col-span-6 lg:order-1 order-2">
            <h2 className="max-w-72 text-[40px] leading-tight font-bold mb-9 text-midnight_text dark:text-white">
              Get in Touch
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <label className="pb-2 inline-block text-base">Name *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your full name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="pb-2 inline-block text-base">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="your@email.com"
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <label className="pb-2 inline-block text-base">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={set("subject")}
                  placeholder="How can we help?"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="pb-2 inline-block text-base">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us more about your enquiry…"
                  className={`${inputCls} resize-none`}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-linear-to-r from-primary to-secondary rounded-lg text-white py-4 px-8 hover:from-transparent hover:to-transparent hover:text-primary border hover:border-primary disabled:opacity-50 flex items-center gap-2 transition-all"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          {/* Image */}
          <div className="lg:col-span-6 lg:order-2 order-1">
            <Image
              src="/images/all/religion.jpg"
              alt="Contact GoldenLife Victors"
              width={1300}
              height={0}
              quality={100}
              style={{ width: "100%", height: "auto" }}
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
