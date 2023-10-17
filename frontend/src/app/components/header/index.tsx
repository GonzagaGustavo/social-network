import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { CiUser, CiCirclePlus } from "react-icons/ci";
import Link from "next/link";
import UserMenu from "./userMenu";

export default function Header() {
  return (
    <nav className={styles.main}>
      <div className={styles.content}>
        <Link href="/feed" className={styles.logoWrapper}>
          <Image
            src="/logo.png"
            className={styles.logo}
            alt="SociNex"
            width={200}
            height={200}
          />
        </Link>

        <div className={styles.actions}>
          <Link
            href="/feed/new"
            className={styles.iconsWrapper}
            title="Nova Publicação"
          >
            <CiCirclePlus className={styles.userIcon} />
          </Link>

          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
