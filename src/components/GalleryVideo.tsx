"use client";

import { useRef, useState } from "react";

export default function GalleryVideo({ src, poster, title }: { src: string; poster: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="gallery-video">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="none"
        aria-label={title}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      >
        Dein Browser unterstützt dieses Video nicht. <a href={src}>Video herunterladen</a>
      </video>
      {!playing && (
        <button
          className="gallery-video-play"
          type="button"
          onClick={() => { void videoRef.current?.play().catch(() => setPlaying(false)); }}
          aria-label={`${title}: Video abspielen`}
        >
          <span aria-hidden="true">▶</span>
          Zum Abspielen drücken
        </button>
      )}
    </div>
  );
}
