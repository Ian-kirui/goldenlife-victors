"use client";

import Logo from "@/components/Layout/Header/Logo";
import SupportForm from "@/components/Common/SupportForm";

export const Donation = () => {
  return (
    <>
      <div className="mb-8 text-center mx-auto inline-block max-w-[170px]">
        <Logo />
      </div>
      <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-2 text-center">
        Support GoldenLife Victors
      </h3>
      <p className="text-sm text-muted dark:text-white/60 text-center mb-6">
        Choose how you'd like to contribute to our rehabilitation and community programmes.
      </p>
      <SupportForm />
    </>
  );
};