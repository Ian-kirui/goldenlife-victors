"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createEvent, uploadEventImage } from "@/utils/blogApi";
import RichTextEditor from "@/components/Admin/RichTextEditor";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function NewEventPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");
  const [eventStatus, setEventStatus] = useState<"DRAFT" | "PUBLISHED">(
    "DRAFT"
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<"idle" | "creating" | "uploading">("idle");

  const token = (session as any)?.accessToken as string;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || content === "<br>") {
      toast.error("Content cannot be empty");
      return;
    }
    setSubmitting(true);
    setStep("creating");
    try {
      const ev = await createEvent(token, {
        title,
        content,
        location,
        meetLink,
        registrationLink,
        status: eventStatus,
      });
      if (imageFile) {
        setStep("uploading");
        await uploadEventImage(token, ev.id, imageFile).catch(() =>
          toast.error("Event created but image upload failed")
        );
      }
      toast.success(
        eventStatus === "PUBLISHED" ? "Event published!" : "Draft saved!"
      );
      router.push("/admin/events");
    } catch (e: any) {
      toast.error(e.message ?? "Failed to create event");
    } finally {
      setSubmitting(false);
      setStep("idle");
    }
  };

  const btnLabel =
    step === "creating"
      ? "Creating…"
      : step === "uploading"
      ? "Uploading image…"
      : eventStatus === "PUBLISHED"
      ? "Publish Event"
      : "Save Draft";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Toaster />
      <div className="flex items-center gap-4">
        <Link
          href="/admin/events"
          className="text-gray-400 hover:text-primary transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            New Event
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Create a new event
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white dark:bg-[#1e2436] rounded-xl border border-gray-100 dark:border-gray-800 p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Event title"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Content <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Describe the event…"
                minHeight={300}
              />
            </div>
          </div>

          {/* Cover image */}
          <div className="bg-white dark:bg-[#1e2436] rounded-xl border border-gray-100 dark:border-gray-800 p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Cover Image
            </label>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary transition-colors">
                <svg
                  className="w-8 h-8 text-gray-300 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm text-gray-400">
                  Click to select image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        <div className="space-y-5">
          {/* Publish */}
          <div className="bg-white dark:bg-[#1e2436] rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Publish
            </h3>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Status
              </label>
              <select
                value={eventStatus}
                onChange={(e) =>
                  setEventStatus(e.target.value as "DRAFT" | "PUBLISHED")
                }
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161b27] text-gray-900 dark:text-white focus:outline-none focus:border-primary"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary hover:bg-darkprimary disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {btnLabel}
                </>
              ) : (
                btnLabel
              )}
            </button>
          </div>

          {/* Details */}
          <div className="bg-white dark:bg-[#1e2436] rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Event Details
            </h3>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Nairobi, Kenya"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Meet Link
              </label>
              <input
                type="url"
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
                placeholder="https://meet.google.com/..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Registration Link
              </label>
              <input
                type="url"
                value={registrationLink}
                onChange={(e) => setRegistrationLink(e.target.value)}
                placeholder="https://forms.gle/..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
