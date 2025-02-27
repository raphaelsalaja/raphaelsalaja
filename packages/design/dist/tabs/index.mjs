import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "../chunk-FWCSY2DS.mjs";

// src/tabs/index.tsx
import { Tabs } from "@base-ui-components/react/tabs";
import { jsx, jsxs } from "react/jsx-runtime";
var TabsRoot = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsxs("div", { className: "tabs", children: [
    /* @__PURE__ */ jsx(TabsLabel, { children: props.label }),
    /* @__PURE__ */ jsx(Tabs.Root, __spreadProps(__spreadValues({ className: "root" }, props), { children }))
  ] });
};
var TabsList = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx(Tabs.List, __spreadProps(__spreadValues({ className: "list" }, props), { children }));
};
var TabsTab = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx(Tabs.Tab, __spreadProps(__spreadValues({ className: "tab" }, props), { children }));
};
var TabsIndicator = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx(Tabs.Indicator, __spreadProps(__spreadValues({ className: "indicator" }, props), { children }));
};
var TabsPanel = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx(Tabs.Panel, __spreadProps(__spreadValues({ className: "panel" }, props), { children }));
};
var TabsLabel = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ jsx("span", __spreadProps(__spreadValues({ className: "label" }, props), { children }));
};
export {
  TabsIndicator as Indicator,
  TabsLabel as Label,
  TabsList as List,
  TabsPanel as Panel,
  TabsRoot as Root,
  TabsTab as Tab
};
