import { Post } from "@/types/api";
import { api } from "@/utils/constants";
import React from "react";
import Video from "./video";

type Props = {
  id: string;
};

export default async function VideoInfos({ id }: Props) {
  const postRes = await fetch(api + `/post/${id}`);
  const post: Post = await postRes.json();

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="max-w-[80%] w-auto h-auto relative aspect-video">
        <Video
          src={api + `/post/video/${post.video?.v720p}`}
          type="video/mp4"
        />
      </div>
      <div className="mt-2 w-full">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p>{post.description}</p>
        <p className="font-bold">{post.autor.name}</p>
      </div>
    </div>
  );
}
