"use client";

import React, { useRef, useState } from "react";

export default function VideoDemo({
  src,
  width,
  label = false,
}: {
  src: string;
  width?: number | string;
  label?: boolean;
}) {
  const [speed, setSpeed] = useState(4.0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const setPlayback = () => {
    if (videoRef.current) videoRef.current.playbackRate = speed;
  };

  const changePlayback = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = parseFloat(e.target.value);
    setSpeed(next);
    if (videoRef.current) videoRef.current.playbackRate = next;
  };

  return (
    <div className="flex flex-col justify-center">
      <div>
        <video
          ref={videoRef}
          onCanPlay={setPlayback}
          playsInline
          src={src}
          muted
          autoPlay
          loop
          width={width}
        ></video>
      </div>
      {label && (
        <label htmlFor="video-speed" className="mt-8">
          🐢{" "}
          <input
            type="range"
            min="0.8"
            max="4.2"
            step="0.10"
            value={speed}
            name="video-speed"
            id="video-speed"
            onChange={changePlayback}
          />{" "}
          🐇
        </label>
      )}
    </div>
  );
}
