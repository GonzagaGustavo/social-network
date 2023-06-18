"use client";

import React, { useState } from "react";
import Post from "./post";
import SelectFile from "./selectFile";
import DropFiles from "./selectFile/dropFiles";

export default function GetContent() {
  const [file, setFile] = useState<File | null>(null);
  const [cropped, setCropped] = useState<boolean>(false);
  const [thumb, setThumb] = useState<File | null>(null);

  if (file && cropped) {
    return <Post thumb={thumb} file={file} />;
  } else {
    return (
      <SelectFile>
        <DropFiles
          file={file}
          setFile={setFile}
          cropped={cropped}
          setCropped={setCropped}
          setThumb={setThumb}
          thumb={thumb}
        />
      </SelectFile>
    );
  }
}
