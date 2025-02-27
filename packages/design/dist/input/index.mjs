import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "../chunk-FWCSY2DS.mjs";

// src/input/index.tsx
import { Input as InputPrimitive } from "@base-ui-components/react/input";
import { jsx, jsxs } from "react/jsx-runtime";
var Input = (_a) => {
  var _b = _a, { children, label } = _b, props = __objRest(_b, ["children", "label"]);
  return /* @__PURE__ */ jsxs("div", { className: "input", children: [
    label && /* @__PURE__ */ jsx("label", { htmlFor: label, className: "label", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "field", children: [
      /* @__PURE__ */ jsx(InputPrimitive, __spreadProps(__spreadValues({ id: label }, props), { children })),
      props.suffix && /* @__PURE__ */ jsx("span", { className: "suffix", children: props.suffix })
    ] })
  ] });
};
export {
  Input
};
