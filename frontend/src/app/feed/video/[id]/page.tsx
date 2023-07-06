import React, { Suspense } from "react";
import VideoInfos from "./videoInfos";
import Suggestions from "./suggestions";

type Props = {
  params: { id: string };
};

export default async function Video({ params }: Props) {
  return (
    <div className="w-screen flex flex-col sm:flex-row  justify-between">
      <div className="sm:w-3/5 w-full">
        <Suspense fallback={<p>Carregando...</p>}>
          <VideoInfos id={params.id} />
        </Suspense>
      </div>
      <div className="w-2/5">
        <Suggestions />
      </div>
    </div>
  );
}
