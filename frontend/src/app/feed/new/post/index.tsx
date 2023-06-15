import React from "react";
import Form from "./form";

type Props = {
  file: File;
};

export default function Post({ file }: Props) {
  return <Form file={file} />;
}
