"use client";

import React, { useEffect, useState } from "react";
import { TbPlayerTrackNext } from "react-icons/tb";
import { FiPause, FiPlay, FiVolumeX } from "react-icons/fi";
import { BiFullscreen } from "react-icons/bi";
import { RiPictureInPicture2Line } from "react-icons/ri";
import Config from "./config";
import { Post } from "@/types/api";

type Props = {
  post: Post;
  videoRef: React.RefObject<HTMLVideoElement>;
};

export default function Overlay({ videoRef, post }: Props) {
  const [isPlaying, setPlaying] = useState(false);
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlaying, videoRef]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = volume / 100;
  }, [volume, videoRef]);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
      <div
        className="h-[calc(100%-52px)] w-full"
        onClick={() => setPlaying((old) => !old)}
      ></div>

      {/* Progress Bar */}
      <div className="h-[52px] w-full flex justify-center">
        <div className="h-full w-[98%]">
          <div className="flex justify-center">
            <div className="h-[3px] w-full bg-white"></div>
          </div>
          <div className="h-[48px] w-[98%]">
            <div className="h-full w-full flex items-center justify-between">
              <div className="flex gap-3">
                {/* Play Button */}
                <div
                  className="h-7 w-7 cursor-pointer"
                  onClick={() => setPlaying((old) => !old)}
                >
                  {isPlaying ? (
                    <FiPause className="fill-white stroke-white h-full w-full" />
                  ) : (
                    <FiPlay className="fill-white stroke-white h-full w-full" />
                  )}
                </div>
                <div className="h-7 w-7">
                  <TbPlayerTrackNext className="fill-white stroke-white h-full w-full" />
                </div>
                <div
                  className="h-7 w-7"
                  onClick={() => setVolume((old) => (old ? 0 : 100))}
                >
                  <FiVolumeX className="fill-white stroke-white h-full w-full" />
                </div>

                <div className="h-7 w-7"></div>
              </div>
              <div className="flex gap-3">
                <Config post={post} videoRef={videoRef} />
                <div className="h-7 w-7 hover:cursor-pointer hidden sm:block">
                  <RiPictureInPicture2Line
                    className="fill-white h-full w-full"
                    onClick={() => videoRef.current?.requestPictureInPicture()}
                  />
                </div>
                <div
                  className="h-7 w-7 hover:cursor-pointer"
                  onClick={() => videoRef.current?.requestFullscreen()}
                >
                  <BiFullscreen className="fill-white h-full w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
