"use client";

import React, { useRef, useState } from "react";
import Overlay from "./overlay";
import { api } from "@/utils/constants";
import { Post } from "@/types/api";

type Props = {
  post: Post;
  type: string;
};

export default function Video({ type, post }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <video ref={videoRef} className="w-w-video h-h-video">
        <source src={api + `/post/video/${post.video?.v720p}`} type={type} />
      </video>

      <Overlay videoRef={videoRef} post={post} />
    </>
  );
}
