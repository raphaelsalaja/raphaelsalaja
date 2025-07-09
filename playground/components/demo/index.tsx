import type React from "react";

import styles from "./styles.module.css";

interface DemoProps extends React.ComponentPropsWithoutRef<"div"> {}

export const Demo = ({ children, ...props }: DemoProps) => {
  return (
    <div className={styles.demo} {...props}>
      <div>{children}</div>
    </div>
  );
};
