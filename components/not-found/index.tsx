"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { closest, pages } from "./match";
import styles from "./styles.module.css";

const subscribe = () => () => {};

export function NotFound() {
  // The 404 is prerendered once for every URL, so the path is only known in the browser.
  const path = useSyncExternalStore(
    subscribe,
    () => window.location.pathname,
    () => null,
  );

  return (
    <div className={styles.container} data-not-found>
      <div className={styles.sheet} aria-hidden="true">
        <svg width="64" height="80" viewBox="0 0 64 80" fill="none">
          <path
            className={styles.paper}
            d="M6.5.5h41L63.5 16.5v57a6 6 0 0 1-6 6h-51a6 6 0 0 1-6-6v-67a6 6 0 0 1 6-6Z"
          />
          <path className={styles.fold} d="M47.5.5v12a4 4 0 0 0 4 4h12Z" />
        </svg>
        <span className={styles.code}>404</span>
      </div>
      <div className={styles.text}>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={`${styles.copy} prose`}>
          {path && <Suggestions path={path} />}
        </p>
      </div>
    </div>
  );
}

function Suggestions({ path }: { path: string }) {
  const match = closest(path);
  const [latest] = pages;

  return (
    <>
      Nothing lives at <code>{path}</code>.{" "}
      {match && (
        <>
          The closest page is <Link href={match.href}>{match.title}</Link>,{" "}
        </>
      )}
      {match?.href !== latest.href && (
        <>
          {match ? "the newest is" : "The newest is"}{" "}
          <Link href={latest.href}>{latest.title}</Link>,{" "}
        </>
      )}
      or you can start from the <Link href="/">home page</Link>.
    </>
  );
}
