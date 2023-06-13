"use client";

import React, { useState } from "react";
import Post from "./post";
import SelectFile from "./selectFile";
import DropFiles from "./selectFile/dropFiles";

export default function GetContent() {
  const [file, setFile] = useState<File | null>(null);

  if (file) {
    return <Post />;
  } else {
    return (
      <SelectFile>
        <DropFiles setFile={setFile} />
      </SelectFile>
    );
  }
}
