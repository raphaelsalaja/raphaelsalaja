"use client";

import Button from "@rs/design/button";
import dynamic from "next/dynamic";
import { Link } from "next-view-transitions";
import { Shape2, Shape3, Shape6, Shape8 } from "@/components/posts/placeholder/shapes";
import styles from "./styles.module.scss";

const Dither = dynamic(() => import("@/components/shaders/dither"), { ssr: false });

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <div className={styles.column}>
          <h1>Pages</h1>
          <Button asChild variant="ghost">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/projects">Projects</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/experiments">Experiments</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/insights">Insights</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/archive">Archive</Link>
          </Button>
        </div>
        <div className={styles.column}>
          <h1>Connect</h1>
          <Button asChild variant="ghost">
            <Link href="https://x.com/raphaelsalaja">Twitter</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="https://www.instagram.com/raphaelsalaja">Instagram</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="https://github.com/raphaelsalaja">Github</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="emailto:raphaelsalaja@gmail.com">Email</Link>
          </Button>
        </div>
      </div>

      <div className={styles.copyright}>
        <div className={styles.shapes}>
          <div className={styles.shape} data-color="blue">
            <Shape3 className={styles.icon} />
          </div>
          <div className={styles.shape} data-color="violet">
            <Shape6 className={styles.icon} />
          </div>
          <div className={styles.shape} data-color="yellow">
            <Shape2 className={styles.icon} />
          </div>
          <div className={styles.shape} data-color="gray">
            <Shape8 className={styles.icon} />
          </div>
        </div>
        <p className={styles.legal}>© {Date().split(" ")[3]} Raphael Salaja</p>
      </div>

      <div className={styles.background}>
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Dither
            colorDark={"rgba(0,0,0,0.3)"}
            colorLight={"rgba(255,255,255,1)"}
            speed={0.5}
            pixelSize={2}
            ditherScale={1}
            rotSpeed={0.1}
            warpInit={1}
            warpIter={2.5}
            warpAmpl={2.0}
          />
        </div>
      </div>
    </footer>
  );
}
