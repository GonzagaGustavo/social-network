"use client";

import React, { useRef } from "react";
import Overlay from "./overlay";

type Props = {
  src: string;
  type: string;
};

export default function Video({ src, type }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <video ref={videoRef} className="w-full h-full">
        <source src={src} type={type} />
      </video>

      <Overlay videoRef={videoRef} />
    </>
  );
}
