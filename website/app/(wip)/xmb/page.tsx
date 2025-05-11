"use client";

import Stage from "@/components/stage";
import Waves from "./components/shader";
import XMB from "./components/xmb";

export default function Page() {
  return (
    <Stage>
      <Waves />
      <XMB />
    </Stage>
  );
}
