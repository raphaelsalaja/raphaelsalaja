import * as BasePopover from "@rs/design/popover";
import * as BaseSelect from "@rs/design/select";

import { AnimatePresence, motion } from "motion/react";
import React from "react";
import useMeasure from "react-use-measure";
import { Check, Chevron } from "../icons";
import styles from "./styles.module.css";

interface SelectProps {
  label: string;
  items: SelectItem[] | Record<string, SelectItem>;
}

interface SelectItem {
  label: string;
  value: string;
  title?: string;
  description?: string | React.ReactNode;
}

export const Select: React.FC<SelectProps> = (props) => {
  const { items } = props;
  const [highlightedItem, setHighlightedItem] = React.useState<SelectItem | null>(null);
  const [previousItem, setPreviousItem] = React.useState<SelectItem | null>(null);
  const [ref, bounds] = useMeasure();

  // Find the highlighted item or use the first item as default
  const displayItem = highlightedItem || (Array.isArray(items) ? items[0] : null);

  // Transform items to Base UI format
  const baseUIItems = Array.isArray(items) ? items.map((item) => ({ label: item.label, value: item.value })) : undefined;

  // Calculate direction based on item indices
  const getDirection = (currentItem: SelectItem | null, prevItem: SelectItem | null) => {
    if (!Array.isArray(items) || !currentItem || !prevItem) return 1;

    const currentIndex = items.findIndex((item) => item.value === currentItem.value);
    const prevIndex = items.findIndex((item) => item.value === prevItem.value);

    return currentIndex > prevIndex ? 1 : -1;
  };

  const _direction = getDirection(displayItem, previousItem);

  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  };

  // Update previous item when highlighted item changes
  React.useEffect(() => {
    if (highlightedItem) {
      setPreviousItem(displayItem);
    }
  }, [highlightedItem, displayItem]);

  return (
    <div className={styles.select}>
      <span className={styles.label}>{props.label}</span>
      <BaseSelect.Root items={baseUIItems} defaultValue={Array.isArray(items) ? items[0]?.value : undefined}>
        <BaseSelect.Trigger>
          <BaseSelect.Value />
          <BaseSelect.Icon>
            <Chevron direction={270} size={16} />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
        <BaseSelect.Portal>
          <BaseSelect.Positioner alignItemWithTrigger={false} sideOffset={8} align="start">
            <BasePopover.Root openOnHover>
              <BasePopover.Trigger className={styles.iconButton}>
                <BaseSelect.Popup>
                  {Array.isArray(items) &&
                    items.map((item) => (
                      <BaseSelect.Item key={item.label} value={item.value} className={styles.item} onMouseEnter={() => setHighlightedItem(item)} onMouseLeave={() => setHighlightedItem(null)}>
                        <BaseSelect.ItemText className={styles.itemText}>{item.label}</BaseSelect.ItemText>
                        <BaseSelect.ItemIndicator className={styles.itemIndicator}>
                          <Check size={16} />
                        </BaseSelect.ItemIndicator>
                      </BaseSelect.Item>
                    ))}
                </BaseSelect.Popup>
              </BasePopover.Trigger>
              <BasePopover.Portal>
                <BasePopover.Positioner side="right" align="start" sideOffset={8}>
                  <BasePopover.Popup>
                    {displayItem && (
                      <React.Fragment>
                        <BasePopover.Title>
                          <AnimatePresence mode="popLayout">
                            <motion.div key={displayItem.value} className={styles.title} {...animation}>
                              {displayItem.title}
                            </motion.div>
                          </AnimatePresence>
                        </BasePopover.Title>
                        <BasePopover.Description>
                          <motion.div initial={false} animate={{ height: bounds.height }} transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1], delay: 0.01 }}>
                            <div ref={ref}>
                              <AnimatePresence mode="popLayout">
                                <motion.div key={displayItem.value} className={styles.description} {...animation}>
                                  {displayItem.description}
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        </BasePopover.Description>
                      </React.Fragment>
                    )}
                  </BasePopover.Popup>
                </BasePopover.Positioner>
              </BasePopover.Portal>
            </BasePopover.Root>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </div>
  );
};
