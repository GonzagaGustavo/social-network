import React from "react";
import { BiLike } from "react-icons/bi";

export default function Like() {
  return (
    <div className="w-auto h-5/6 p-2 skewed pr-3 bg-gray-300 hover:cursor-pointer hover:bg-gray-400">
      <BiLike className="w-full h-full" />
    </div>
  );
}
