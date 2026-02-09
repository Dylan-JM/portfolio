"use client";

import { useState } from "react";
import Image from "next/image";

export default function Gallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {images.map((img) => (
          <div
            key={img}
            className="rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
            onClick={() => setActiveImage(img)}
          >
            <Image
              src={img}
              alt={title}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-start justify-center pt-75"
          onClick={() => setActiveImage(null)}
        >
          <div className="max-w-4xl w-full px-4">
            <Image
              src={activeImage}
              alt="Expanded view"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}