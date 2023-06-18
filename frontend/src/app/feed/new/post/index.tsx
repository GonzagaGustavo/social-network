import React from "react";
import Form from "./form";

type Props = {
  file: File;
  thumb: File | null;
};

export default function Post({ file, thumb }: Props) {
  return <Form file={file} thumb={thumb} />;
}
