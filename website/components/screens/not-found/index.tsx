"use client";

import clsx from "clsx";
import { Jacquard_12 } from "next/font/google";
import { Link } from "next-view-transitions";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";

const jacquard = Jacquard_12({
  subsets: ["latin"],
  variable: "--font-jacquard",
  weight: ["400"],
});

export default function NotFound() {
  useEffect(() => {
    // @ts-ignore
    import("@/lib/unicornStudio.umd.js")
      .then((module) => {
        const UnicornStudio = module.default ?? module;
        UnicornStudio.init().catch(console.error);
      })
      .catch(console.error);
  }, []);

  return (
    <React.Fragment>
      <div className={styles.canvas}>
        <div
          data-us-project-src="/shaders/404.json"
          data-us-production="true"
          data-us-scale="1"
          data-us-dpi="1"
          data-us-fps="30"
          className={styles.shader}
          data-us-alttext="404 - Not Found"
          data-us-arialabel="404 - Not Found"
        />
      </div>
      <div className={styles.container}>
        <Link href="/" className={clsx(styles.home, jacquard.className)}>
          return home
        </Link>
      </div>
    </React.Fragment>
  );
}
