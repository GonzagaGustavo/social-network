"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "../selectFile.module.scss";

type Props = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function DropFiles({ setFile }: Props) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function drop(e: DragEvent) {
      e.preventDefault();
      const file = e.dataTransfer?.files[0];

      console.log("oi");
      if (!file) return;

      const imagesSupported = [
        "image/jpeg",
        "image/png",
        "image/tiff",
        "image/webp",
        "image/svg+xml",
        "application/pdf",
      ];

      if (!imagesSupported.find((type) => type === file.type)) return;

      setFile(file);
    }

    document.documentElement.addEventListener("drop", drop);
    document.documentElement.addEventListener("dragover", (e) =>
      e.preventDefault()
    );

    return () => {
      document.documentElement.removeEventListener("drop", drop);
      document.documentElement.removeEventListener("dragover", (e) =>
        e.preventDefault()
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (!file) return;

    const imagesSupported = [
      "image/jpeg",
      "image/png",
      "image/tiff",
      "image/webp",
      "image/svg+xml",
      "application/pdf",
    ];

    if (!imagesSupported.find((type) => type === file.type)) return;
    setFile(file);
  }

  return (
    <>
      <input
        style={{ display: "none" }}
        type="file"
        ref={inputFileRef}
        onChange={(e) => handleChange(e)}
      />
      <button
        className={styles.uploadButton}
        onClick={() => inputFileRef.current?.click()}
      >
        Selecionar arquivo
      </button>
    </>
  );
}
