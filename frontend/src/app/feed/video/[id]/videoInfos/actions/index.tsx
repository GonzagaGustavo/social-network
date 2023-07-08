import React from "react";
import Like from "./like";
import DesLikes from "./deslike";
import { Post } from "@/types/api";

type Props = {
  post: Post;
};

export default function Actions({ post }: Props) {
  return (
    <div className="w-[97%] flex justify-between">
      <div>{post.autor.name}</div>

      <div className="h-full flex items-center">
        <Like />
        <span className="h-5/6 flex justify-center items-center skewed bg-gray-200">
          |
        </span>
        <DesLikes />
      </div>
    </div>
  );
}
