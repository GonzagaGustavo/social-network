import { PostSuggestion } from "@/types/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  post: PostSuggestion;
};

export default async function SuggestionCard({ post }: Props) {
  return (
    <Link
      href={`/feed/video/${post.id}`}
      className="w-11/12 sm:w-4/5 flex overflow-hidden rounded-md bg-gray-200"
    >
      <Image
        src={post.video.thumb}
        alt={post.title}
        width={1600}
        height={900}
        className="w-1/2 aspect-video"
      />
      <div className="w-1/2 flex flex-col justify-around pl-2">
        <h3 className="font-bold text-sm text-ellipsis whitespace-normal">
          {post.title}
        </h3>
        <div>
          <div className="text-gray-600 text-xs">{post.autor.name}</div>
        </div>
      </div>
    </Link>
  );
}
