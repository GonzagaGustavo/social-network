import { api } from "@/utils/constants";
import Image from "next/image";
import React from "react";
import SuggestionCard from "./suggestionCard";

export default async function Suggestions() {
  const res = await fetch(api + "/post");

  const posts = await res.json();

  return (
    <div>
      {posts.map((post: any) => (
        <SuggestionCard key={post.id} post={post} />
      ))}
    </div>
  );
}
