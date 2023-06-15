import React from "react";
import Image from "next/image";
import styles from "./login.module.scss";
import { Antonio } from "next/font/google";
import Form from "./form";
import Link from "next/link";

const antonio = Antonio({ subsets: ["latin"] });

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Image
            src="/logo.png"
            className={styles.image}
            alt="SociNex"
            width={200}
            height={200}
          />
          <h1 className={antonio.className}>SociNex</h1>
        </div>

        <div className={styles.login}>
          <h2 className={styles.loginTitle}>Login</h2>

          <Form>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Senha"
              className="input"
              required
            />
            <p>
              Ainda não possui uma conta?{" "}
              <Link href="/register">Crie uma!</Link>
            </p>
            <div className={styles.btnWrapper}>
              <button type="submit" id={styles.btnSubmit}>
                Entrar
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
