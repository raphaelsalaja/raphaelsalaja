"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Demo } from "@/components/demo";
import styles from "../styles.module.css";
import { useReducedMotion } from "../use-reduced-motion";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const STRIP = Array.from({ length: 30 }, (_, slot) => slot);

function Digit({
  digit,
  up,
  reduced,
}: {
  digit: number;
  up: boolean;
  reduced: boolean;
}) {
  const [index, setIndex] = useState(10 + digit);
  const [animate, setAnimate] = useState(false);
  const previous = useRef(digit);

  useEffect(() => {
    const from = previous.current;
    previous.current = digit;
    if (from === digit) return;
    let delta = digit - from;
    if (up && delta < 0) delta += 10;
    if (!up && delta > 0) delta -= 10;
    setAnimate(!reduced);
    setIndex((current) => current + delta);
    const timer = window.setTimeout(
      () => {
        setAnimate(false);
        setIndex(10 + digit);
      },
      reduced ? 0 : 220,
    );
    return () => window.clearTimeout(timer);
  }, [digit, up, reduced]);

  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: "1ch",
        height: "1.2em",
        overflow: "hidden",
        verticalAlign: "bottom",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <span
        style={{
          display: "block",
          transform: `translateY(${-index * 1.2}em)`,
          transition: animate ? `transform 200ms ${EASE}` : "none",
        }}
      >
        {STRIP.map((slot) => (
          <span key={slot} style={{ display: "block", height: "1.2em" }}>
            {slot % 10}
          </span>
        ))}
      </span>
    </span>
  );
}

function AmountParts({
  parts,
  up,
  reduced,
}: {
  parts: Intl.NumberFormatPart[];
  up: boolean;
  reduced: boolean;
}) {
  const digits = parts.filter((part) => part.type === "integer");
  let digitFromRight = digits.length;
  let other = 0;
  return parts.map((part) => {
    if (part.type === "integer") {
      digitFromRight -= 1;
      return (
        <Digit
          key={`d${digitFromRight}`}
          digit={Number(part.value)}
          up={up}
          reduced={reduced}
        />
      );
    }
    other += 1;
    return <span key={`${part.type}-${other}`}>{part.value}</span>;
  });
}

function Amount({ value }: { value: number }) {
  const reduced = useReducedMotion();
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-IE", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [],
  );
  const formatted = formatter.format(value);
  const previous = useRef(value);
  const up = value >= previous.current;
  useEffect(() => {
    previous.current = value;
  }, [value]);
  const [announced, setAnnounced] = useState("");

  useEffect(() => {
    setAnnounced("");
    const frame = requestAnimationFrame(() => setAnnounced(formatted));
    return () => cancelAnimationFrame(frame);
  }, [formatted]);

  return (
    <span>
      <span aria-hidden="true" style={{ fontVariantNumeric: "tabular-nums" }}>
        <AmountParts
          parts={formatter.formatToParts(value)}
          up={up}
          reduced={reduced}
        />
      </span>
      <span className="sr-only" role="status">
        {announced}
      </span>
    </span>
  );
}

export function TickerDemo() {
  const [yearly, setYearly] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [ping, setPing] = useState(12);
  const price = yearly ? 120 : 12;
  const total = quantity * (yearly ? 104 : 48);

  useEffect(() => {
    const timer = window.setInterval(() => setPing((value) => value + 1), 100);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <Demo>
      <div className={styles.stack}>
        <div className={styles.stage}>
          <div
            className={styles.row}
            style={{ justifyContent: "space-between" }}
          >
            <span>Pro</span>
            <Amount value={price} />
          </div>
          <div className={styles.row}>
            <button
              type="button"
              className={styles.choice}
              aria-pressed={!yearly}
              onClick={() => setYearly(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              className={styles.choice}
              aria-pressed={yearly}
              onClick={() => setYearly(true)}
            >
              Yearly
            </button>
          </div>
          <div
            className={styles.row}
            style={{ justifyContent: "space-between" }}
          >
            <span>Cart</span>
            <span>
              <button
                type="button"
                className={styles.button}
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                Minus
              </button>{" "}
              <Amount value={quantity} />{" "}
              <button
                type="button"
                className={styles.button}
                onClick={() => setQuantity((value) => value + 1)}
              >
                Plus
              </button>
            </span>
          </div>
          <div
            className={styles.row}
            style={{ justifyContent: "space-between" }}
          >
            <span>Line total</span>
            <Amount value={total} />
          </div>
          <p className={styles.note}>
            Order 1042. Since 2019. Unit price €48 is a literal. Ping {ping},
            left still because it updates faster than 4 times a second.
          </p>
        </div>
      </div>
    </Demo>
  );
}
