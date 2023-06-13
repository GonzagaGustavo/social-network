import React from "react";
import { TbUpload } from "react-icons/tb";
import styles from "./selectFile.module.scss";

export default function SelectFile({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.content}>
      <div className={styles.image}>
        <TbUpload />
      </div>

      <h1>Faça o upload de um video ou foto...</h1>

      {children}
    </div>
  );
}
