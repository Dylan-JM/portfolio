"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export default function VideoPlayer({
  id,
  title,
  thumbnail,
}: {
  id: string;
  title: string;
  thumbnail?: string;
}) {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
      <LiteYouTubeEmbed id={id} title={title} thumbnail={thumbnail} />
    </div>
  );
}