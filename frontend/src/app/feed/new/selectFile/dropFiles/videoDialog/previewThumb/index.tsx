"use client";

import React, { useEffect, useState } from "react";
import styles from "../video.module.scss";
import Image from "next/image";

type Props = {
  thumb: File | null;
  setThumb: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function PreviewThumb({ thumb, setThumb }: Props) {
  const [thumbUrl, setThumbUrl] = useState("");

  useEffect(() => {
    if (thumb) setThumbUrl(URL.createObjectURL(thumb));
  }, [thumb]);

  return (
    <div className={styles.selectThumb}>
      {thumbUrl ? (
        <Image
          src={thumbUrl}
          width={160}
          height={90}
          alt="Thumb"
          className={styles.thumb}
        />
      ) : null}

      <button className={styles.uploadButton} onClick={() => setThumb(null)}>
        Selecionar outra imagem
      </button>

      <div className={styles.thumbText}>
        <h2>Não se esqueça de fazer o upload de uma imagem 16:9</h2>
        <p>
          Caso o contrário a imagem poderá perder qualidade e ficar distorcida
        </p>
      </div>
    </div>
  );
}
