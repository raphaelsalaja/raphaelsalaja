"use client";

import { useMemo, useState } from "react";
import { Demo } from "@/components/demo";
import styles from "../styles.module.css";

function Card({ title, description }: { title: string; description: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        width: "100%",
        height: "100%",
        padding: "8%",
        color: "#21201c",
        background: "linear-gradient(160deg, #f3efe4, #d7e4f2 55%, #f7d7c4)",
      }}
    >
      <strong style={{ fontSize: "4.5cqw" }}>{title}</strong>
      <span style={{ fontSize: "2.4cqw" }}>{description}</span>
    </div>
  );
}

function Frame({
  label,
  aspect,
  crop,
  title,
  description,
  cut,
}: {
  label: string;
  aspect: string;
  crop?: { width: string; height: string; left: string; top: string };
  title: string;
  description: string;
  cut?: string;
}) {
  return (
    <figure className={styles.field} style={{ width: "min(100%, 220px)" }}>
      <figcaption>
        {label} {cut && <span className={styles.fail}>{cut}</span>}
      </figcaption>
      <div
        style={{
          aspectRatio: aspect,
          overflow: "hidden",
          position: "relative",
          borderRadius: 8,
          boxShadow: "var(--shadow-raised)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: crop?.width ?? "100%",
            height: crop?.height ?? "100%",
            left: crop?.left ?? 0,
            top: crop?.top ?? 0,
            containerType: "inline-size",
          }}
        >
          <Card title={title} description={description} />
        </div>
      </div>
      {label === "Slack" && <p className={styles.muted}>{description}</p>}
    </figure>
  );
}

export function PreviewDemo() {
  const [title, setTitle] = useState("Evening Tide");
  const [description, setDescription] = useState("High water at 18:40.");
  const titleCut =
    title.length > 70 || new TextEncoder().encode(title).length > 70;
  const descriptionCut =
    description.length > 200 ||
    new TextEncoder().encode(description).length > 350;
  const tags = useMemo(
    () => [
      "og:title",
      "og:description",
      "og:image",
      "og:image:width",
      "og:image:height",
      "twitter:card",
    ],
    [],
  );

  return (
    <Demo wide>
      <div className={styles.stack} style={{ width: "min(100%, 720px)" }}>
        <label className={styles.field}>
          Title, {title.length} characters
          <input
            value={title}
            aria-label="Card title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label className={styles.field}>
          Description, {description.length} characters
          <input
            value={description}
            aria-label="Card description"
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <div className={styles.row} style={{ alignItems: "flex-start" }}>
          <Frame
            label="X"
            aspect="2 / 1"
            crop={{ width: "100%", height: "105%", left: "0", top: "-2.5%" }}
            title={title}
            description={description}
            cut={titleCut ? "Cut" : undefined}
          />
          <Frame
            label="iMessage"
            aspect="1200 / 630"
            title={title}
            description={description}
          />
          <Frame
            label="Slack"
            aspect="1 / 1"
            crop={{ width: "190.5%", height: "100%", left: "-45.2%", top: "0" }}
            title={title}
            description={description}
            cut={descriptionCut ? "Cut" : undefined}
          />
          <Frame
            label="Discord"
            aspect="1200 / 630"
            title={title}
            description={description}
            cut={titleCut || descriptionCut ? "Cut" : undefined}
          />
        </div>
        <p className={styles.note}>
          Still 1200×630. X drops 15px at the top and bottom. Slack keeps the
          centre square, 285px in from each side. iMessage and Discord scale the
          full frame.
        </p>
        <p className={styles.note}>
          Tags this card would need: {tags.join(", ")}.
        </p>
      </div>
    </Demo>
  );
}
