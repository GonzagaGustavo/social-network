import React from "react";
import { TbUpload } from "react-icons/tb";
import styles from "./new.module.scss";

export const metadata = {
  title: "SociNex - New Post",
};

export default function NewPage() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.image}>
          <TbUpload />
        </div>

        <h1>Faça o upload de um video ou foto...</h1>

        <button className={styles.uploadButton}>Selecionar arquivo</button>
      </div>
    </div>
  );
}
