import { Post } from "@/types/api";
import { api } from "@/utils/constants";
import React from "react";
import Video from "./video";
import Actions from "./actions";

type Props = {
  post: Post;
};

export default async function VideoInfos({ post }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="max-w-[97%] h-auto w-w-video relative aspect-video bg-black ">
        <Video post={post} type="video/mp4" />
      </div>

      <div className="w-full h-[50px] mt-[5px] flex justify-center">
        <Actions post={post} />
      </div>

      <div className="my-3 w-[97%] p-3 bg-gray-300 rounded-md">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p>{post.description}</p>
      </div>
    </div>
  );
}
