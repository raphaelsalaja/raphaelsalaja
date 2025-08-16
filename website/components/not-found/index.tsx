"use client";

import clsx from "clsx";

import { Link } from "next-view-transitions";
import { useEffect } from "react";
import styles from "./styles.module.css";

export default function NotFound() {
  useEffect(() => {
    // @ts-expect-error
    import("@/lib/unicornStudio.umd.js")
      .then((module) => {
        const UnicornStudio = module.default ?? module;
        UnicornStudio.init().catch(console.error);
      })
      .catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <div
        data-us-project-src="/shaders/404-bw.json"
        data-us-production="true"
        data-us-scale="1"
        data-us-dpi="1"
        data-us-fps="30"
        className={styles.shader}
        data-us-alttext="404 - Not Found"
        data-us-arialabel="404 - Not Found"
      />

      <Link href="/" className={clsx(styles.home)}>
        return home
      </Link>
    </div>
  );
}
