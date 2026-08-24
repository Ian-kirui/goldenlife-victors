import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about",
     submenu: [
      {
        label: "Our Board",
        href: "/about/our-board",
      },
      {
        label: "Our Services",
        href: "/treatments",
      },
      { label: "Our Facility", href: "/contact" },
    ],
   },
  {
    label: "Treatments",
    href: "/treatments",
    submenu: [
      {
        label: "Clinical Recovery & Rehabilitation",
        href: "/treatments/clinical-recovery",
      },
      {
        label: "Community & Preventive Outreach",
        href: "/treatments/community-outreach",
      },
      { label: "Global Practices", href: "/treatments/global-practices" },
    ],
  },
  {
    label: "Knowledge Center",
    href: "/blog",
    submenu: [
      {
        label: "Events",
        href: "/events",
      },
      {
        label: "Blog",
        href: "/blog",
      },
      { label: "Gallery", href: "/gallery" },
    ],
  },

  { label: "Contact", href: "/contact" },
];
