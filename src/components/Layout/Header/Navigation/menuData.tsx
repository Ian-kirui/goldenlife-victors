import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Programmes",
    href: "/programmes",
    submenu: [
      { label: "Clinical Recovery & Rehabilitation", href: "/programmes/clinical-recovery" },
      { label: "Community & Preventive Outreach", href: "/programmes/community-outreach" },
      { label: "Global Practices", href: "/programmes/global-practices" },
    ],
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Blog",
    href: "/blog",
    
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },

];
