"use client";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import SocialSignUp from "../SocialSignUp";
import Logo from "@/components/Layout/Header/Logo";
import { useContext, useState } from "react";
import Loader from "@/components/Common/Loader";
import AuthDialogContext from "@/app/context/AuthDialogContext";

// Signup lives on the blog service, not the auth service
const AUTH_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const SignUp = ({ signUpOpen }: { signUpOpen?: any }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const authDialog = useContext(AuthDialogContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const username = data.get("username") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      // POST {{render_url}}/api/auth/signup
      const res = await fetch(`${AUTH_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          role: ["ROLE_USER"],
        }),
      });

      const body = await res.json().catch(() => null);

      if (!res.ok) {
        const message =
          body?.message ?? body?.error ?? "Registration failed. Please try again.";
        setError(message);
        setLoading(false);
        return;
      }

      toast.success("Account created! You can now sign in.");
      setLoading(false);

      authDialog?.setIsUserRegistered(true);
      setTimeout(() => authDialog?.setIsUserRegistered(false), 1100);
      setTimeout(() => signUpOpen?.(false), 1200);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="mb-10 text-center mx-auto inline-block max-w-[160px]">
        <Logo />
      </div>

      <SocialSignUp />

      <span className="z-1 relative my-8 block text-center">
        <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-border dark:bg-dark_border" />
        <span className="text-body-secondary relative z-10 inline-block bg-white px-3 text-base dark:bg-dark">
          OR
        </span>
      </span>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            minLength={3}
            className="w-full rounded-md border border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition placeholder:text-gray-300 focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="mb-[22px]">
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="w-full rounded-md border border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition placeholder:text-gray-300 focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="mb-[22px]">
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            minLength={6}
            className="w-full rounded-md border border-border dark:border-dark_border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition placeholder:text-gray-300 focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="mb-9">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-darkprimary! dark:hover:bg-darkprimary! disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating account…
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
      </form>

      <p className="text-body-secondary mb-4 text-base">
        By creating an account you agree with our{" "}
        <a href="/#" className="text-primary hover:underline">Privacy</a>{" "}
        and{" "}
        <a href="/#" className="text-primary hover:underline">Policy</a>
      </p>
      <p className="text-body-secondary text-base">
        Already have an account?
        <Link href="/" className="pl-2 text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </>
  );
};

export default SignUp;