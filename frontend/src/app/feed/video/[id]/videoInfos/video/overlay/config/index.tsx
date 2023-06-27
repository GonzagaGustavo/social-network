"use client";

import React, { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import Quality from "./quality";

export default function Config() {
  const [configOpen, setConfigOpen] = useState(false);
  const [qualityOpen, setQualityOpen] = useState(false);

  return (
    <div className="h-7 w-7 relative select-none">
      <IoSettingsSharp
        className="fill-white h-full w-full hover:cursor-pointer transition-transform"
        style={{ transform: configOpen ? "rotate(30deg)" : "none" }}
        onClick={() => {
          setConfigOpen((old) => {
            if (old) {
              setQualityOpen(false);
              return false;
            } else {
              return true;
            }
          });
        }}
      />

      <div
        className="absolute w-[100px] bg-zinc-800 text-white top-[-20px] rounded-sm translate-y-[-100%]"
        style={{ display: configOpen ? "block" : "none" }}
      >
        <div
          className="p-2 cursor-pointer hover:bg-zinc-700 transition-all"
          style={{ display: qualityOpen ? "none" : "block" }}
          onClick={() => setQualityOpen(true)}
        >
          Quality
        </div>

        <Quality open={qualityOpen} />
      </div>
    </div>
  );
}
