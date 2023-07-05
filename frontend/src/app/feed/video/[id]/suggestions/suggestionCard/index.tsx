import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  post: any;
};

export default async function SuggestionCard({ post }: Props) {
  return (
    <Link href={`/feed/video/${post.id}`}>
      <Image
        src={post.video.thumb}
        alt={post.title}
        width={1600}
        height={900}
      />
    </Link>
  );
}
