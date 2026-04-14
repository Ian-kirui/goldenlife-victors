import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Programmes",
    href: "/programmes",
    
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Blog",
    href: "/blog",
    // submenu: [
    //   { label: "Blog list", href: "/blog" },
    //   { label: "Blog details", href: "/blog/blog_1" },
    // ],
  },
  { label: "Contact", href: "/contact" },

];
