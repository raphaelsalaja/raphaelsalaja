import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "../chunk-FWCSY2DS.mjs";

// src/button/index.tsx
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { motion } from "motion/react";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
var Button = forwardRef(
  (_a, ref) => {
    var _b = _a, { asChild, children, variant = "primary", disabled = false, focused, className, asMotion } = _b, props = __objRest(_b, ["asChild", "children", "variant", "disabled", "focused", "className", "asMotion"]);
    const Comp = asChild ? Slot : asMotion ? motion.button : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      __spreadProps(__spreadValues({
        ref,
        "data-shunpo-button": true,
        "data-shunpo-button-variant": variant,
        "data-shunpo-button-disabled": disabled,
        "data-shunpo-button-focus-visible": focused,
        className: clsx("button", className),
        "aria-disabled": disabled
      }, props), {
        children: children && /* @__PURE__ */ jsx("button", { type: "button", className: "children", children })
      })
    );
  }
);
Button.displayName = "Button";
var button_default = Button;
export {
  button_default as default
};
