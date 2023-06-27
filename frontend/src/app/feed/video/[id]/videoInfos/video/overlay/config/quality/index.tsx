import React from "react";

export default function Quality({ open }: { open: boolean }) {
  return (
    <div style={{ display: open ? "block" : "none" }}>
      <div className="p-2 cursor-pointer hover:bg-zinc-700 transition-all">
        1080p
      </div>

      <div className="p-2 cursor-pointer hover:bg-zinc-700 transition-all">
        720p
      </div>

      <div className="p-2 cursor-pointer hover:bg-zinc-700 transition-all">
        360p
      </div>

      <div className="p-2 cursor-pointer hover:bg-zinc-700 transition-all">
        144p
      </div>
    </div>
  );
}
