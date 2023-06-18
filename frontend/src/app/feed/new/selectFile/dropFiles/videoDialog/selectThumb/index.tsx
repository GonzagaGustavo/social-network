import React, { useEffect, useRef } from "react";
import styles from "../video.module.scss";
import { BsImages } from "react-icons/bs";

type Props = {
  setThumb: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function SelectThumb({ setThumb }: Props) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const containerDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function drop(e: DragEvent) {
      e.preventDefault();
      const file = e.dataTransfer?.files[0];

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

      setThumb(file);
    }

    containerDiv.current?.addEventListener("drop", drop);
    containerDiv.current?.addEventListener("dragover", (e) =>
      e.preventDefault()
    );

    return () => {
      containerDiv.current?.removeEventListener("drop", drop);
      containerDiv.current?.removeEventListener("dragover", (e) =>
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
    setThumb(file);
  }

  return (
    <div ref={containerDiv} className={styles.selectThumb}>
      <div className={styles.image}>
        <BsImages />
      </div>

      <h1>Selecione uma imagem para thumb do video</h1>

      <input
        ref={inputFileRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleChange}
      />

      <button
        className={styles.uploadButton}
        onClick={() => inputFileRef.current?.click()}
      >
        Selecionar arquivo
      </button>
    </div>
  );
}
