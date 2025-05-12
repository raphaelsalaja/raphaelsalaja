"use client";

import { formatISO, fromUnixTime } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import { useWorkouts } from "@/data/health/hooks/get-workouts";
import { Workouts as WorkoutTypes } from "@/data/health/types";
import styles from "./styles.module.scss";
import "./styles.scss";

// @ts-ignore
import CalHeatmap from "cal-heatmap";
import { motion } from "motion/react";
import { WorkoutDialog } from "./dialog";
import { square } from "./templates";

type WorkoutHeatmapData = {
  date: string;
  workouts: WorkoutTypes[];
};

export const Workouts: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedDayData, setSelectedDayData] = useState<WorkoutHeatmapData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toDate = useMemo(() => new Date(), []);
  const fromDate = useMemo(() => new Date(toDate.getFullYear(), toDate.getMonth() - 1, toDate.getDate()), [toDate]);

  const { data: workouts = [], isLoading, isError, error } = useWorkouts({ from: fromDate, to: toDate });

  const map = useMemo(() => {
    const m: Record<string, WorkoutHeatmapData> = {};
    for (const wk of workouts) {
      if (!wk.end_timestamp) continue;
      const day = formatISO(fromUnixTime(wk.end_timestamp), {
        representation: "date",
      });
      if (!m[day]) m[day] = { date: day, workouts: [] };
      m[day].workouts.push(wk);
    }
    return m;
  }, [workouts]);

  useEffect(() => {
    if (!ref.current || Object.keys(map).length === 0) return;
    ref.current.innerHTML = "";
    const cal = new CalHeatmap();
    cal.addTemplates(square);
    cal.paint({
      range: 1,
      animationDuration: 0,
      itemSelector: ref.current,
      verticalOrientation: false,
      date: { start: fromDate, end: toDate },
      scale: {
        opacity: {
          domain: [0, 4],

          baseColor: "#a6ff00",
        },
      },
      domain: { type: "month", label: { text: null } },
      subDomain: {
        type: "square",
        radius: 4,
        gutter: 12,
        width: 24,
        height: 24,
      },
      data: {
        defaultValue: 1,
        source: Object.values(map),
        type: "json",
        x: "date",
        y: (d: { workouts: string | any[] }) => d.workouts.length,
      },
    });
    cal.on("click", (_e: any, ts: string | number | Date) => {
      const day = formatISO(new Date(ts), { representation: "date" });
      setSelectedDayData(map[day] || { date: day, workouts: [] });
      setIsDialogOpen(true);
    });
  }, [map, fromDate, toDate]);

  if (isError) return <p>Error loading workouts: {error.message}</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 1 }}
      className={styles.container}
    >
      <div className={styles.heatmap} ref={ref}>
        {isLoading && <div style={{ width: 168, height: 168 }} />}
      </div>

      <WorkoutDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} selectedDayData={selectedDayData} />
    </motion.div>
  );
};
