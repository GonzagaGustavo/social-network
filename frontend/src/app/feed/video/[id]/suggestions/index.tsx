import { api } from "@/utils/constants";
import React from "react";
import SuggestionCard from "./suggestionCard";
import { PostSuggestion } from "@/types/api";

export default async function Suggestions() {
  const res = await fetch(api + "/post");

  const posts: PostSuggestion[] = await res.json();

  return (
    <div className="w-full h-full flex flex-col gap-2">
      {posts.map((post) => (
        <SuggestionCard key={post.id} post={post} />
      ))}
    </div>
  );
}
