"use client";

import { CopyButton } from "@/components/copy-button";

export function CopyLink() {
  return (
    <CopyButton
      label="Copy link"
      showLabel
      getText={() => window.location.href.split("#")[0]}
    />
  );
}
