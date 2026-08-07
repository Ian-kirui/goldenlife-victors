"use client";

const PLACEHOLDER = "/images/all/jamila.png";

export default function BoardMemberImage({ src, name }: { src: string; name: string }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover object-top"
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER; }}
      />
    </div>
  );
}