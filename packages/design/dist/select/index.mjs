import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "../chunk-FWCSY2DS.mjs";

// src/select/index.tsx
import { Select } from "@base-ui-components/react/select";
import { jsx } from "react/jsx-runtime";
var SelectRoot = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx("div", { className: "select", children: /* @__PURE__ */ jsx(Select.Root, __spreadProps(__spreadValues({}, props), { children })) });
};
var SelectLabel = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx("span", __spreadProps(__spreadValues({ className: "label" }, props), { children }));
};
var SelectTrigger = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx(Select.Trigger, __spreadProps(__spreadValues({ className: "trigger" }, props), { children }));
};
var SelectValue = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx(Select.Value, __spreadProps(__spreadValues({ className: "value" }, props), { children }));
};
var SelectIcon = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx(Select.Icon, __spreadProps(__spreadValues({ className: "icon" }, props), { children }));
};
var SelectPortal = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx(Select.Portal, __spreadProps(__spreadValues({}, props), { children }));
};
var SelectPositioner = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx(Select.Positioner, __spreadProps(__spreadValues({ className: "positioner" }, props), { children }));
};
var SelectPopup = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx(Select.Popup, __spreadProps(__spreadValues({ className: "popup" }, props), { children }));
};
var SelectArrow = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx(Select.Arrow, __spreadProps(__spreadValues({}, props), { children }));
};
var SelectItem = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx(Select.Item, __spreadProps(__spreadValues({ className: "item" }, props), { children }));
};
var SelectItemIndicator = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx(Select.ItemIndicator, __spreadProps(__spreadValues({}, props), { children }));
};
var SelectItemText = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx(Select.ItemText, __spreadProps(__spreadValues({ className: "text" }, props), { children }));
};
export {
  SelectArrow as Arrow,
  SelectIcon as Icon,
  SelectItem as Item,
  SelectItemIndicator as ItemIndicator,
  SelectItemText as ItemText,
  SelectLabel as Label,
  SelectPopup as Popup,
  SelectPortal as Portal,
  SelectPositioner as Positioner,
  SelectRoot as Root,
  SelectTrigger as Trigger,
  SelectValue as Value
};
