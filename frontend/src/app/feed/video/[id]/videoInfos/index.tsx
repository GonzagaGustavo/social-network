import { Post } from "@/types/api";
import { api } from "@/utils/constants";
import React from "react";

type Props = {
  id: string;
};

export default async function VideoInfos({ id }: Props) {
  const postRes = await fetch(api + `/post/${id}`);
  const post: Post = await postRes.json();

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-w-video h-h-video">
        <video className="w-full h-full" controls>
          <source src={api + `/post/video/${post.video?.id}/720`} />
        </video>
      </div>
      <div className="mt-2 w-full">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p>{post.description}</p>
        <p className="font-bold">{post.autor.name}</p>
      </div>
    </div>
  );
}
