"use client";

import React from "react";
import styles from "../login.module.scss";

export default function Form({ children }: { children: React.ReactNode }) {
  function submit(e: any) {
    e.preventDefault();
    const login = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    console.log(login);
  }

  return (
    <form autoComplete="off" onSubmit={submit} className={styles.form}>
      {children}
    </form>
  );
}
