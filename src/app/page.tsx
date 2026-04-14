import React from 'react'
import { Metadata } from "next";
import Hero from '@/components/Home/Hero';
import Help from '@/components/Home/Help';
import Causes from '@/components/Home/Causes';
import FutureEvents from '@/components/Home/FutureEvents';
import UrgentDonation from '@/components/Home/UrgentDonation';
import Newsletter from '@/components/Home/NewsLetter';
import Testimonial from '@/components/Home/Testimonial';
import Volunteer from '@/components/SharedComponent/Volunteer';
export const metadata: Metadata = {
  title: "GoldenLife Victors | Mental Health & Wellness Organization",
  description:
    "GoldenLife Victors is a world-class organization dedicated to promoting mental health, wellness, and recovery through compassionate care, community outreach, and global collaboration. Join us in building a world where mental health matters.",
  keywords: [
    "GoldenLife Victors",
    "mental health Kenya",
    "rehabilitation center",
    "community wellness programs",
    "Addiction recovery",
    "psychological therapy",
    "counseling services",
    "mental health awareness",
    "wellness programs",
    "mental health organization Africa",
    "Adopt an Addict initiative",
    "youth therapy",
    "family therapy",
    "spiritual healing program",
    "corporate mental wellness",
  ],
  authors: [{ name: "GoldenLife Victors" }],
  openGraph: {
    title: "GoldenLife Victors | Transforming Lives Through Mental Wellness",
    description:
      "Empowering communities through therapy, rehabilitation, and outreach programs that promote holistic mental health and recovery. Be part of the movement towards mental wellness for all.",
    url: "https://goldenlifevictors.org",
    siteName: "GoldenLife Victors",
    images: [
      {
        url: "/images/og/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "GoldenLife Victors Mental Health and Wellness",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoldenLife Victors | Promoting Mental Health & Wellness",
    description:
      "GoldenLife Victors provides compassionate mental health care, rehabilitation, and community wellness programs across Africa.",
    images: ["/images/og/og-banner.jpg"],
    creator: "@GoldenLifeVictors",
  },
  alternates: {
    canonical: "https://goldenlifevictors.org",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Help />
      <Causes />
      <FutureEvents />
      <UrgentDonation />
      <Newsletter />
      <Testimonial />
      <Volunteer />
    </main>
  )
}
