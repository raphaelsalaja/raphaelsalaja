"use client";

import { Toast } from "@base-ui/react/toast";
import { useMotionBlur } from "@web-kits/motion-blur/react";
import { useEffect, useState } from "react";
import type { ExampleProps } from "./index";
import shared from "./styles.module.css";
import styles from "./toast.module.css";

const MESSAGES = [
  { title: "Saved", description: "Your changes are live." },
  { title: "Copied", description: "The link is on your clipboard." },
  { title: "Uploaded", description: "Three files were added." },
];

export function ToastExample({
  blur,
  options,
  rate,
  step,
  container,
}: ExampleProps) {
  const [manager] = useState(Toast.createToastManager);

  useEffect(() => {
    if (step % 2 !== 0) return;
    manager.add(MESSAGES[(step / 2) % MESSAGES.length]);
  }, [manager, step]);

  return (
    <Toast.Provider toastManager={manager} limit={1} timeout={1400 / rate}>
      <Toast.Portal container={container} className={shared.portal}>
        <Toast.Viewport className={styles.viewport}>
          <List blur={blur} options={options} />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

type Blur = Pick<ExampleProps, "blur" | "options">;

function List(props: Blur) {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => (
    <Item key={toast.id} toast={toast} {...props} />
  ));
}

function Item({
  toast,
  blur,
  options,
}: Blur & { toast: Toast.Root.ToastObject }) {
  const motion = useMotionBlur(options);
  return (
    <Toast.Root
      ref={blur ? motion.ref : undefined}
      toast={toast}
      className={styles.toast}
    >
      <Toast.Content className={`${shared.surface} ${styles.surface}`}>
        <Toast.Title className={shared.title} />
        <Toast.Description className={shared.text} />
      </Toast.Content>
    </Toast.Root>
  );
}
