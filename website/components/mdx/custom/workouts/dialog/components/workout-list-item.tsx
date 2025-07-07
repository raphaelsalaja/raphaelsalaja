"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { format, fromUnixTime } from "date-fns";
import { X } from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import type { Workouts } from "@/data/health/types";
import { getStatistic, jsonToStatistic } from "@/data/health/utils/getStatistic";
import { QuantityType } from "@/types/quantity";
import styles from "../styles.module.scss";
import { formatDuration } from "../utils/formatDuration";
import { Metric } from "./metric";

interface WorkoutListItemProps {
  workout: Workouts;
}

export const WorkoutListItem: React.FC<WorkoutListItemProps> = ({ workout }) => {
  const { parts } = formatDuration(workout.start_timestamp, workout.end_timestamp);

  const [openDetail, setOpenDetail] = useState(false);

  const statistics = jsonToStatistic(Array.isArray(workout.statistics) ? workout.statistics : []);

  return (
    <Dialog.Root open={openDetail} onOpenChange={setOpenDetail}>
      <Dialog.Trigger render={<motion.li className={styles.activity} whileHover={{ scale: 0.98, opacity: 0.5 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} />}>
        <div data-activity>
          <div data-activity-details>
            <span data-activity-type>{workout.description}</span>
            <div data-activity-metrics>
              {parts.map((p) => (
                <span key={p} data-measurement-quantity>
                  {p}
                </span>
              ))}
              {workout.total_energy_burned != null && (
                <>
                  <div data-seperator />
                  <span data-measurement-quantity>
                    {Math.round(workout.total_energy_burned)}
                    <span data-measurement-unit>{workout.total_energy_burned_unit}</span>
                  </span>
                </>
              )}
              {workout.total_distance != null && (
                <>
                  <div data-seperator />
                  <span data-measurement-quantity>
                    {(workout.total_distance / 1000).toFixed(2)}
                    <span data-measurement-unit>{workout.total_distance_unit}</span>
                  </span>
                </>
              )}
            </div>
          </div>
          <span data-activity-date>
            {fromUnixTime(workout.start_timestamp).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Popup className={styles.popup}>
          <Dialog.Title className={styles.title}>
            <span data-title>{format(fromUnixTime(workout.start_timestamp), "eee, d MMM")}</span>
          </Dialog.Title>
          <Dialog.Close className={styles.close}>
            <X strokeWidth={2.5} />
          </Dialog.Close>

          <div className={styles.summary}>
            <div className={styles.metrics}>
              <Metric color="red" label="Total Calories" value={`${Math.round(workout.total_energy_burned ?? 0)} KCAL`} />
              {workout.total_distance != null && <Metric color="blue" label="Total Distance" value={`${((workout.total_distance ?? 0) / 1000).toFixed(2)} KM`} />}
              <Metric color="green" label="Workout Time" value={formatDuration(workout.start_timestamp, workout.end_timestamp).full} />
              <Metric color="violet" label="Avg Heart Rate" value={`${Math.round(getStatistic(statistics, QuantityType.heartRate)?.average ?? 0)} BPM`} />
              <Metric color="orange" label="Max Heart Rate" value={`${Math.round(getStatistic(statistics, QuantityType.heartRate)?.max ?? 0)} BPM`} />
              <Metric color="yellow" label="Min Heart Rate" value={`${Math.round(getStatistic(statistics, QuantityType.heartRate)?.min ?? 0)} BPM`} />
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
