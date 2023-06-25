import React, { Suspense } from "react";
import VideoInfos from "./videoInfos";

type Props = {
  params: { id: string };
};

export default async function Video({ params }: Props) {
  return (
    <div className="w-screen flex justify-between pt-5">
      <div className="w-2/3">
        <Suspense fallback={<p>Carregando...</p>}>
          <VideoInfos id={params.id} />
        </Suspense>
      </div>
      <div className="w-1/3">Sugestões</div>
    </div>
  );
}
