"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAdminEvents, updateEvent } from "@/utils/blogApi";
import type { Event } from "@/types/api.types";
import { formatPostDate } from "@/utils/formatDate";
import toast, { Toaster } from "react-hot-toast";

export default function AdminEventsPage() {
  const { data: session, status } = useSession();
  const [events, setEvents]     = useState<Event[]>([]);
  const [loading, setLoading]   = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);
  const [search, setSearch]     = useState("");

  const token = (session as any)?.accessToken as string;

  const fetchEvents = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      setEvents(await getAdminEvents(token));
    } catch {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetchEvents();
  }, [status, fetchEvents]);

  const handleToggle = async (ev: Event) => {
    setToggling(ev.id);
    const newStatus = ev.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      await updateEvent(token, ev.id, { status: newStatus as "DRAFT" | "PUBLISHED" });
      toast.success(newStatus === "PUBLISHED" ? "Event published" : "Moved to draft");
      fetchEvents();
    } catch (e: any) {
      toast.error(e.message ?? "Failed to update");
    } finally {
      setToggling(null);
    }
  };

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Toaster />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Events</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{events.length} total</p>
        </div>
        <Link href="/admin/events/new"
          className="flex items-center gap-2 bg-primary hover:bg-darkprimary text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Event
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search events…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-72 px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e2436] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
      />

      <div className="bg-white dark:bg-[#1e2436] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-sm">
            {search ? "No events match your search." : "No events yet. Create your first event!"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-12">Image</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Location</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {filtered.map((ev) => (
                  <tr key={ev.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
                        {ev.imageUrl ? (
                          <Image src={ev.imageUrl} alt={ev.title} fill className="object-cover" sizes="48px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 dark:text-white line-clamp-1 max-w-xs">{ev.title}</p>
                      {!ev.imageUrl && <span className="text-xs text-amber-500">⚠ No image</span>}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-500 dark:text-gray-400 text-xs">
                      {ev.location ?? "—"}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-xs">
                      {formatPostDate(ev.dateCreated)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggle(ev)}
                        disabled={toggling === ev.id}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all whitespace-nowrap ${
                          ev.status === "PUBLISHED"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200"
                            : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200"
                        } ${toggling === ev.id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        {toggling === ev.id ? "…" : ev.status}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/admin/events/${ev.id}`}
                          className="text-gray-400 hover:text-primary transition-colors" title="Edit">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}