"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

/**
 * Drop this anywhere in the homepage layout.
 * It reads ?unauthorized=1 from the URL, shows a toast, then cleans the URL.
 */
export default function UnauthorizedToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("unauthorized") === "1") {
      toast.error("You don't have permission to access the admin panel.", {
        duration: 4000,
        id: "unauthorized",
      });
      // Clean the query param without adding a history entry
      const url = new URL(window.location.href);
      url.searchParams.delete("unauthorized");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  return <Toaster />;
}