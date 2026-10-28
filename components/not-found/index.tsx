"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "./styles.module.css";

export function NotFound() {
  useEffect(() => {
    import("@/lib/unicornStudio.umd.cjs")
      .then((module) => module.default.init())
      .catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className="sr-only">404 - Not Found</h1>
      <div
        role="img"
        aria-label="404 - Not Found"
        data-us-project-src="/shaders/404-bw.json"
        data-us-production="true"
        data-us-scale="1"
        data-us-dpi="1"
        data-us-fps="30"
        className={styles.shader}
      />
      <Link href="/" className={styles.home}>
        return home
      </Link>
    </div>
  );
}
