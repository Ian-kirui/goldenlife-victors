"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Layout/Header/Logo";
import { forgotPassword } from "@/utils/blogApi";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
      toast.success("Reset link sent — check your inbox");
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 dark:bg-dark">
      <Toaster />
      <div className="w-full max-w-md bg-white dark:bg-dark_card rounded-2xl shadow-lg px-8 py-12">
        <div className="mb-8 text-center mx-auto inline-block max-w-[160px] w-full">
          <Logo />
        </div>

        {sent ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-midnight_text dark:text-white">Check your email</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              We've sent a password reset link to <strong>{email}</strong>.
              It may take a minute to arrive.
            </p>
            <Link href="/signin" className="inline-block mt-4 text-primary hover:underline text-sm">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-midnight_text dark:text-white mb-2 text-center">
              Forgot Password?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-8">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full rounded-md border border-border dark:border-dark_border bg-transparent px-5 py-3 text-base text-dark dark:text-white placeholder:text-gray-400 outline-hidden focus:border-primary transition"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-darkprimary disabled:opacity-60 text-white font-medium py-3 rounded-md transition"
              >
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending…</>
                ) : "Send Reset Link"}
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
              Remembered it?{" "}
              <Link href="/signin" className="text-primary hover:underline">Sign In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}