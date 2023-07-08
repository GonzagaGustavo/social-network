import React, { Suspense } from "react";
import VideoInfos from "./videoInfos";
import Suggestions from "./suggestions";
import { Post } from "@/types/api";
import { api } from "@/utils/constants";

type Props = {
  params: { id: string };
};

export default async function Video({ params }: Props) {
  const postRes = await fetch(api + `/post/${params.id}`, {
    next: { revalidate: 60 },
  });
  const post: Post = await postRes.json();

  return (
    <div className="w-screen flex flex-col sm:flex-row  justify-between">
      <div className="sm:w-3/5 w-full">
        <Suspense fallback={<p>Carregando...</p>}>
          <VideoInfos post={post} />
        </Suspense>
      </div>
      <div className="w-full sm:w-2/5">
        <Suggestions />
      </div>
    </div>
  );
}
