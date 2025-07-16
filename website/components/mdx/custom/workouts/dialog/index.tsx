"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { X } from "lucide-react";
import type { Workouts } from "@/data/health/types";
import { WorkoutListItem } from "./components/workout-list-item";
import styles from "./styles.module.scss";

type WorkoutHeatmapData = {
  date: string;
  workouts: Workouts[];
};

interface WorkoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDayData: WorkoutHeatmapData | null;
}

export const WorkoutDialog: React.FC<WorkoutDialogProps> = ({ open, onOpenChange, selectedDayData }) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Backdrop className={styles.backdrop} />
      <Dialog.Popup className={styles.popup}>
        <Dialog.Title className={styles.title}>
          <span data-title>Day Highlights</span>
        </Dialog.Title>
        <Dialog.Close className={styles.close}>
          <X strokeWidth={2.5} />
        </Dialog.Close>
        {selectedDayData?.workouts.length ? (
          <ul className={styles.list}>
            {selectedDayData.workouts.map((wk) => (
              <WorkoutListItem key={wk.id} workout={wk} />
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>No workouts recorded.</p>
        )}
      </Dialog.Popup>
    </Dialog.Portal>
  </Dialog.Root>
);
