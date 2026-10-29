import { useCallback, useEffect } from "react";

interface UseTransformOriginOptions {
  trigger: React.RefObject<HTMLElement | null>;
  popup: React.RefObject<HTMLElement | null>;
  open: boolean;
  debug?: boolean;
}

export const useTransformOrigin = ({
  trigger,
  popup,
  open,
  debug = false,
}: UseTransformOriginOptions) => {
  const clearDebugLines = useCallback(() => {
    // Remove any existing debug elements
    document
      .querySelectorAll('[data-debug="transform-origin"]')
      .forEach((el) => {
        el.remove();
      });
  }, []);

  const drawDebugLines = useCallback(
    (
      triggerRect: DOMRect,
      popupRect: DOMRect,
      originX: number,
      originY: number,
    ) => {
      if (!debug) return;

      clearDebugLines();

      // Create container for debug elements
      const debugContainer = document.createElement("div");
      debugContainer.setAttribute("data-debug", "transform-origin");
      debugContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9999;
    `;

      // Draw line from trigger center to transform origin point
      const triggerCenterX = triggerRect.left + triggerRect.width / 2;
      const triggerCenterY = triggerRect.top + triggerRect.height / 2;

      const originPointX = popupRect.left + (popupRect.width * originX) / 100;
      const originPointY = popupRect.top + (popupRect.height * originY) / 100;

      // Line from trigger to origin point
      const line = document.createElement("div");
      const length = Math.sqrt(
        (originPointX - triggerCenterX) ** 2 +
          (originPointY - triggerCenterY) ** 2,
      );
      const angle =
        (Math.atan2(
          originPointY - triggerCenterY,
          originPointX - triggerCenterX,
        ) *
          180) /
        Math.PI;

      line.style.cssText = `
      position: absolute;
      left: ${triggerCenterX}px;
      top: ${triggerCenterY}px;
      width: ${length}px;
      height: 2px;
      background: #ff0000;
      transform-origin: 0 50%;
      transform: rotate(${angle}deg);
    `;

      // Mark trigger center
      const triggerMark = document.createElement("div");
      triggerMark.style.cssText = `
      position: absolute;
      left: ${triggerCenterX - 4}px;
      top: ${triggerCenterY - 4}px;
      width: 8px;
      height: 8px;
      background: #00ff00;
      border-radius: 50%;
      border: 2px solid white;
    `;

      // Mark transform origin point
      const originMark = document.createElement("div");
      originMark.style.cssText = `
      position: absolute;
      left: ${originPointX - 6}px;
      top: ${originPointY - 6}px;
      width: 12px;
      height: 12px;
      background: #ff0000;
      border-radius: 50%;
      border: 2px solid white;
    `;

      // Add text labels
      const triggerLabel = document.createElement("div");
      triggerLabel.style.cssText = `
      position: absolute;
      left: ${triggerCenterX + 10}px;
      top: ${triggerCenterY - 10}px;
      color: #00ff00;
      font-family: inherit;
      font-size: 12px;
      font-variation-settings: var(--font-weight-600);
      text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
    `;
      triggerLabel.textContent = "Trigger Center";

      const originLabel = document.createElement("div");
      originLabel.style.cssText = `
      position: absolute;
      left: ${originPointX + 10}px;
      top: ${originPointY - 10}px;
      color: #ff0000;
      font-family: inherit;
      font-size: 12px;
      font-variation-settings: var(--font-weight-600);
      text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
    `;
      originLabel.textContent = `Origin (${originX.toFixed(1)}%, ${originY.toFixed(1)}%)`;

      debugContainer.appendChild(line);
      debugContainer.appendChild(triggerMark);
      debugContainer.appendChild(originMark);
      debugContainer.appendChild(triggerLabel);
      debugContainer.appendChild(originLabel);

      document.body.appendChild(debugContainer);

      // Auto-remove after 3 seconds
      setTimeout(clearDebugLines, 3000);
    },
    [debug, clearDebugLines],
  );

  const updateTransformOrigin = useCallback(() => {
    if (!trigger.current || !popup.current) return;

    const triggerRect = trigger.current.getBoundingClientRect();
    const popupRect = popup.current.getBoundingClientRect();

    // Get the center of the trigger button
    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    const triggerCenterY = triggerRect.top + triggerRect.height / 2;

    // Calculate where the trigger center is relative to the popup
    const originX = ((triggerCenterX - popupRect.left) / popupRect.width) * 100;
    const originY = ((triggerCenterY - popupRect.top) / popupRect.height) * 100;

    // Set transform origin to the trigger's position
    popup.current.style.setProperty(
      "--transform-origin",
      `${originX}% ${originY}%`,
    );

    // Draw debug lines if enabled
    drawDebugLines(triggerRect, popupRect, originX, originY);
  }, [trigger, popup, drawDebugLines]);

  useEffect(() => {
    if (open) {
      // Calculate when dialog opens
      const frameId = requestAnimationFrame(() => {
        updateTransformOrigin();
      });

      return () => {
        cancelAnimationFrame(frameId);
      };
    }

    // Clear debug lines when dialog closes
    clearDebugLines();
  }, [open, updateTransformOrigin, clearDebugLines]);
};
