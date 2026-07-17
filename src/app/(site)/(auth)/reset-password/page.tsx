"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Layout/Header/Logo";
import { resetPassword } from "@/utils/blogApi";
import toast, { Toaster } from "react-hot-toast";

function ResetPasswordForm() {
  const searchParams  = useSearchParams();
  const router        = useRouter();
  const token         = searchParams.get("token") ?? "";

  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [loading, setLoading]     = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { toast.error("Passwords do not match"); return; }
    if (password.length < 6)  { toast.error("Password must be at least 6 characters"); return; }
    if (!token)                { toast.error("Invalid or expired reset link"); return; }

    setLoading(true);
    try {
      await resetPassword(token, password);
      toast.success("Password updated! Redirecting to sign in…");
      setTimeout(() => router.push("/signin"), 2000);
    } catch (err: any) {
      toast.error(err.message ?? "Reset failed — the link may have expired");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <p className="text-red-500 text-sm">Invalid or missing reset token.</p>
        <Link href="/forgot-password" className="text-primary hover:underline text-sm">
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-midnight_text dark:text-white mb-2 text-center">
        Set New Password
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-8">
        Choose a strong password for your account.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          className="w-full rounded-md border border-border dark:border-dark_border bg-transparent px-5 py-3 text-base text-dark dark:text-white placeholder:text-gray-400 outline-hidden focus:border-primary transition"
        />
        <input
          type="password"
          required
          minLength={6}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirm new password"
          className="w-full rounded-md border border-border dark:border-dark_border bg-transparent px-5 py-3 text-base text-dark dark:text-white placeholder:text-gray-400 outline-hidden focus:border-primary transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-darkprimary disabled:opacity-60 text-white font-medium py-3 rounded-md transition"
        >
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Updating…</>
          ) : "Update Password"}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/signin" className="text-primary hover:underline">Back to Sign In</Link>
      </p>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 dark:bg-dark">
      <Toaster />
      <div className="w-full max-w-md bg-white dark:bg-dark_card rounded-2xl shadow-lg px-8 py-12">
        <div className="mb-8 text-center mx-auto inline-block max-w-[160px] w-full">
          <Logo />
        </div>
        <Suspense fallback={<div className="h-40 flex items-center justify-center"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}