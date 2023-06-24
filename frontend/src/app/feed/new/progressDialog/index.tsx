import React from "react";

type Props = {
  uploading: string;
};

export default function ProgressDialog({ uploading }: Props) {
  return (
    <div className="bg-dialogBg h-screen w-screen fixed flex justify-center items-center">
      <div className="h-4/5 w-4/5 bg-white"></div>
    </div>
  );
}
