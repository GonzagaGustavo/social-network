import React from "react";
import { BiDislike } from "react-icons/bi";

export default function DesLikes() {
  return (
    <div className="w-auto h-5/6 p-2 skewed pl-3 bg-gray-200 hover:cursor-pointer hover:bg-gray-400">
      <BiDislike className="w-full h-full" />
    </div>
  );
}
