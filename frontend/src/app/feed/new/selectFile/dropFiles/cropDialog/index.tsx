"use client";

import React, { useEffect, useState } from "react";
import styles from "./crop.module.scss";
import Cropper, { Area } from "react-easy-crop";

type Props = {
  open?: true;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setCropped: React.Dispatch<React.SetStateAction<boolean>>;
};

type AspectRatio = "1 / 1" | "16 / 9" | "4 / 5";

export default function CropDialog({ open, file, setFile, setCropped }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [aspect, setAspect] = useState<AspectRatio>("1 / 1");
  const [zoom, setZoom] = useState(1);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  useEffect(() => {
    if (file && file.type.substring(0, 5) === "image") {
      setFileUrl(URL.createObjectURL(file));
    } else {
      setFileUrl(null);
    }
  }, [file]);

  const cropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedArea);
  };

  function next() {
    if (!file) return;
    const newFile = Object.assign(file, {
      croppedArea,
      zoom,
      crop,
      aspectRatio: aspect,
    });

    setFile(newFile);

    setCropped(true);
  }

  return (
    <div
      style={{ display: open ? "flex" : "none" }}
      className={styles.dialogWrapper}
    >
      <div className={styles.dialogContent}>
        <div className={styles.cropWrapper}>
          {fileUrl ? (
            <Cropper
              image={fileUrl}
              aspect={eval(aspect)}
              crop={crop}
              onCropChange={setCrop}
              zoom={zoom}
              onZoomChange={setZoom}
              onCropComplete={cropComplete}
            />
          ) : null}
        </div>

        <div className={styles.dialogActions}>
          <button className={styles.buttonBack} onClick={() => setFile(null)}>
            Voltar
          </button>

          <select
            className={styles.select}
            value={aspect}
            onChange={(e) => setAspect(e.target.value as AspectRatio)}
          >
            <option value="1 / 1">1:1</option>
            <option value="16 / 9">16:9</option>
            <option value="4 / 5">4:5</option>
          </select>

          <button className={styles.button} onClick={next}>
            Avançar
          </button>
        </div>
      </div>
    </div>
  );
}
