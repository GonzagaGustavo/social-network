'use client'

import React from 'react'
import { CiUser, CiLogout } from 'react-icons/ci'
import {
  Arrow,
  Content,
  Item,
  Portal,
  Root,
  Separator,
  Trigger
} from '@radix-ui/react-dropdown-menu'
import { signOut } from 'next-auth/react'
import { Flex, Switch, Text } from '@radix-ui/themes'
import clsx from 'clsx'
import ThemeSwitch from './themeSwitch'

export default function UserMenu() {
  async function logOut() {
    await signOut({ callbackUrl: '/login', redirect: true })
  }

  return (
    <Root>
      <Trigger asChild>
        <div className="relative mx-[5px] h-fit w-fit transition-all hover:scale-125 hover:cursor-pointer">
          <CiUser className="h-[25px] w-[25px]" />
        </div>
      </Trigger>
      <Portal>
        <Content
          className={clsx(
            'm-2 rounded-md bg-primary p-2',
            'min-w-[220px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade'
          )}
          sideOffset={5}
        >
          <ThemeSwitch />

          <Separator className="bg-violet6 m-[5px] h-[1px]" />

          <Item
            onClick={logOut}
            className={clsx(
              'flex items-center justify-between rounded-sm bg-primary p-1 text-white hover:cursor-pointer hover:bg-[#5f75b6]'
            )}
          >
            <CiLogout className="mr-4 text-2xl" />
            Sair
          </Item>

          <Arrow className="fill-primary" />
        </Content>
      </Portal>
    </Root>
  )
}
