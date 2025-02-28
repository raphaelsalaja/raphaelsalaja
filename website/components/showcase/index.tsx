import styles from "./styles.module.scss";

import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import * as Select from "@rs/design/select";
import * as Tabs from "@rs/design/tabs";
import type { Transition } from "motion/react";

import { Input } from "@rs/design/input";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

interface ShowcaseOption {
  label: string;
  values: string[] | number | boolean | Transition;
  onChange?: (value: any) => void;
}

interface ShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  options?: ShowcaseOption[];
}

export const Showcase = ({ children, options = [] }: ShowcaseProps) => {
  const transition = React.useMemo(
    () => options.find((option) => option.label === "Transition")?.values as Transition,
    [options],
  );

  const hasTransition = options.some((option) => option.label === "Transition");

  const eases = [
    { label: "Linear", value: "linear" },
    { label: "Ease In", value: "easeIn" },
    { label: "Ease Out", value: "easeOut" },
    { label: "Ease In Out", value: "easeInOut" },
    { label: "Circ In", value: "circIn" },
    { label: "Circ Out", value: "circOut" },
    { label: "Circ In Out", value: "circInOut" },
    { label: "Back In", value: "backIn" },
    { label: "Back Out", value: "backOut" },
    { label: "Back In Out", value: "backInOut" },
    { label: "Anticipate", value: "anticipate" },
  ];

  const tabTransition = {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" },
    transition: { duration: 0.4 },
  };

  return (
    <div className={styles.showcase}>
      <div className={styles.component}>
        <div className={styles.options}>{children}</div>
      </div>

      <div className={styles.tray}>
        <div className={styles.options}>
          {options
            .filter((option) => option.label !== "Transition")
            .map((option: ShowcaseOption) => {
              return (
                <React.Fragment key={option.label}>
                  {Array.isArray(option.values) && (
                    <Select.Root
                      alignItemToTrigger={false}
                      value={option.values[0]}
                      onValueChange={(value) => option.onChange?.(value)}
                    >
                      <Select.Label>{option.label}</Select.Label>
                      <Select.Trigger>
                        <Select.Value placeholder={option.values[0]} />
                        <Select.Icon>
                          <ChevronDownIcon />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Positioner sideOffset={8}>
                          <Select.Popup>
                            {option.values.map((value) => (
                              <Select.Item key={value} value={value}>
                                <Select.ItemText>{value}</Select.ItemText>
                                <Select.ItemIndicator>
                                  <CheckIcon />
                                </Select.ItemIndicator>
                              </Select.Item>
                            ))}
                          </Select.Popup>
                        </Select.Positioner>
                      </Select.Portal>
                    </Select.Root>
                  )}
                </React.Fragment>
              );
            })}
        </div>

        {hasTransition && (
          <Tabs.Root
            label="Transition"
            value={transition?.type}
            onValueChange={(value) => {
              options.find((option) => option.label === "Transition")?.onChange?.({ ...transition, type: value });
            }}
          >
            <Tabs.List>
              <Tabs.Tab value="tween">Ease</Tabs.Tab>
              <Tabs.Tab value="spring">Spring</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="tween" keepMounted>
              <AnimatePresence mode="popLayout" initial={false}>
                {transition?.type === "tween" && (
                  <motion.div {...tabTransition} className={styles.ease}>
                    <Select.Root alignItemToTrigger={false} value={transition?.ease}>
                      <Select.Label>Bezier Curve</Select.Label>
                      <Select.Trigger>
                        <Select.Value placeholder={eases.find((ease) => ease.value === transition?.ease)?.label} />
                        <Select.Icon>
                          <ChevronDownIcon />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Positioner sideOffset={8}>
                          <Select.Popup>
                            {eases.map((value) => (
                              <Select.Item key={value.value} value={value.value}>
                                <Select.ItemText>{value.label}</Select.ItemText>
                                <Select.ItemIndicator>
                                  <CheckIcon />
                                </Select.ItemIndicator>
                              </Select.Item>
                            ))}
                          </Select.Popup>
                        </Select.Positioner>
                      </Select.Portal>
                    </Select.Root>
                    <Input
                      min={0}
                      type="number"
                      label="Duration"
                      defaultValue={transition?.duration}
                      value={transition?.duration}
                      onChange={(e) => {
                        const value = Number.parseFloat(e.target.value) || 0;
                        options
                          .find((option) => option.label === "Transition")
                          ?.onChange?.({ ...transition, duration: value });
                      }}
                      suffix="ms"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Tabs.Panel>

            <Tabs.Panel value="spring" keepMounted>
              <AnimatePresence>
                {transition?.type === "spring" && (
                  <motion.div {...tabTransition} className={styles.spring}>
                    <Input
                      label="Damping"
                      type="number"
                      defaultValue={10}
                      value={transition?.damping}
                      min={1}
                      onChange={(e) => {
                        const value = Number.parseFloat(e.target.value) || 0;
                        options
                          .find((option) => option.label === "Transition")
                          ?.onChange?.({ ...transition, damping: value });
                      }}
                    />
                    <Input
                      min={1}
                      label="Stiffness"
                      type="number"
                      defaultValue={100}
                      value={transition?.stiffness}
                      onChange={(e) => {
                        const value = Number.parseFloat(e.target.value) || 0;
                        options
                          .find((option) => option.label === "Transition")
                          ?.onChange?.({ ...transition, stiffness: value });
                      }}
                    />
                    <Input
                      min={1}
                      label="Mass"
                      type="number"
                      defaultValue={1}
                      value={transition?.mass}
                      onChange={(e) => {
                        const value = Number.parseFloat(e.target.value) || 0;
                        options
                          .find((option) => option.label === "Transition")
                          ?.onChange?.({ ...transition, mass: value });
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Tabs.Panel>
          </Tabs.Root>
        )}
      </div>
    </div>
  );
};
