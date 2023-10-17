"use client";

import React from "react";
import { CiUser, CiLogout } from "react-icons/ci";
import { Content, Item, Root, Trigger } from "@radix-ui/react-dropdown-menu";
import { signOut } from "next-auth/react";

export default function UserMenu() {
  async function logOut() {
    await signOut({ callbackUrl: "/login", redirect: true });
  }

  return (
    <Root>
      <Trigger>
        <div className="relative h-fit w-fit mx-[5px] transition-all hover:cursor-pointer hover:scale-125">
          <CiUser className="w-[25px] h-[25px]" />
        </div>
      </Trigger>
      <Content className="m-2 p-2 bg-primary rounded-md">
        <Item
          onClick={logOut}
          className="text-white p-1 flex rounded-sm bg-primary justify-between items-center hover:bg-[#5f75b6] hover:cursor-pointer"
        >
          <CiLogout className="text-2xl mr-4" />
          Sair
        </Item>
      </Content>
    </Root>
  );
}
