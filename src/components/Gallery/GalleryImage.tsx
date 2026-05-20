"use client";

import Image from "next/image";

const FALLBACK = "/images/causes/cause-1.jpg";

interface GalleryImageProps {
  src: string;
  alt: string;
  caption: string;
  delay: number;
}

export default function GalleryImage({ src, alt, caption, delay }: GalleryImageProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300"
      data-aos="fade-up"
      data-aos-delay={`${delay}`}
      data-aos-duration="800"
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = FALLBACK;
        }}
      />
      {/* Caption overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
        <p className="text-white text-sm font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {caption}
        </p>
      </div>
    </div>
  );
}