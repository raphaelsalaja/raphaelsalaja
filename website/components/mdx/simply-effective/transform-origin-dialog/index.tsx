"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { useRef, useState } from "react";
import styles from "./styles.module.css";
import { useTransformOrigin } from "./useTransformOrigin";

export const TransformOriginDialog = () => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useTransformOrigin({
    trigger: triggerRef,
    popup: popupRef,
    open,
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger ref={triggerRef} className={styles.button}>
        <span className={styles.text}>New Session</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.Backdrop} />
        <Dialog.Popup ref={popupRef} className={styles.Popup}>
          <Dialog.Title className={styles.Title}>Notifications</Dialog.Title>
          <Dialog.Description className={styles.Description}>
            You are all caught up. Good job!
          </Dialog.Description>
          <div className={styles.Actions}>
            <Dialog.Close className={styles.Button}>Close</Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
