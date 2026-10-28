"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Europe/Dublin",
});

const now = () => formatter.format(Date.now()).replace(" ", "").toLowerCase();

function subscribe(callback: () => void) {
  let timeout: ReturnType<typeof setTimeout>;
  const tick = () => {
    callback();
    timeout = setTimeout(tick, 60_000 - (Date.now() % 60_000));
  };
  timeout = setTimeout(tick, 60_000 - (Date.now() % 60_000));
  return () => clearTimeout(timeout);
}

export function Clock({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, now, () => null);

  return (
    <time className={className} data-ready={time !== null}>
      {time ?? "0:00pm"}
    </time>
  );
}
