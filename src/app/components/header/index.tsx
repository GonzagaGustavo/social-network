import React from 'react'
import styles from './header.module.css'
import Image from 'next/image'
import { CiUser, CiCirclePlus } from 'react-icons/ci'
import Link from 'next/link'
import UserMenu from './userMenu'
import Search from './search'

export default function Header() {
  return (
    <nav className="flex h-[100px] items-center justify-center px-4">
      <div className="flex h-5/6 w-full justify-between rounded-xl border border-[#d4d4d4]">
        <div className="flex w-2/3">
          <Link href="/feed" className={styles.logoWrapper}>
            <Image
              src="/logo.png"
              className={styles.logo}
              alt="SociNex"
              width={200}
              height={200}
            />
          </Link>

          <Search />
        </div>

        <div className="flex w-1/3 justify-end">
          <div className="flex w-max items-center justify-around pr-[10px]">
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
      </div>
    </nav>
  )
}
