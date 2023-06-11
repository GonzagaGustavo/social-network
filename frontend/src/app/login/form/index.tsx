"use client";

import React from "react";
import styles from "../login.module.scss";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Form({ children }: { children: React.ReactNode }) {
  async function submit(e: any) {
    e.preventDefault();
    const login = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const res = await signIn("Credentials", {
      redirect: false,
      email: login.email,
      password: login.password,
      callbackUrl: window.location.origin,
    });

    console.log(res);
    if (res?.error) {
      return alert(res.error);
    }

    redirect(res?.url!);
  }

  return (
    <form autoComplete="off" onSubmit={submit} className={styles.form}>
      {children}
    </form>
  );
}
