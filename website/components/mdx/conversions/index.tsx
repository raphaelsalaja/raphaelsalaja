"use client";

import {
  MeasurementQuantity,
  MeasurementRoot,
  MeasurementUnit,
} from "@rs/i18n";

import styles from "./styles.module.scss";

export const Conversions: React.FC = () => {
  return (
    <span className={styles.paragraph}>
      Start by preheating the oven to{" "}
      <MeasurementRoot value={375} unit="F">
        <MeasurementQuantity />
        °<MeasurementUnit />
      </MeasurementRoot>
      . In a large bowl, mix{" "}
      <MeasurementRoot value={2} unit="cups">
        <MeasurementQuantity />
        <MeasurementUnit />
      </MeasurementRoot>{" "}
      of flour with{" "}
      <MeasurementRoot value={1} unit="tbsp">
        <MeasurementQuantity />
        <MeasurementUnit />
      </MeasurementRoot>{" "}
      of baking powder and{" "}
      <MeasurementRoot value={0.5} unit="tsp">
        <MeasurementQuantity />
        <MeasurementUnit />
      </MeasurementRoot>{" "}
      of salt.
      <br />
      <br />
      Slowly add{" "}
      <MeasurementRoot value={1.25} unit="cups">
        <MeasurementQuantity />
        <MeasurementUnit />
      </MeasurementRoot>{" "}
      of milk and{" "}
      <MeasurementRoot value={0.25} unit="cups">
        <MeasurementQuantity />
        <MeasurementUnit />
      </MeasurementRoot>{" "}
      of melted butter, stirring until smooth. Pour the batter into a greased{" "}
      <MeasurementRoot value={9} unit="inch">
        <MeasurementQuantity />
        <MeasurementUnit />
      </MeasurementRoot>{" "}
      round pan and bake for{" "}
      <MeasurementRoot value={30} unit="minutes">
        <MeasurementQuantity />
        <MeasurementUnit />
      </MeasurementRoot>
      .
    </span>
  );
};
