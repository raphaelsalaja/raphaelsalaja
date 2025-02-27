"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/tabs/index.tsx
var tabs_exports = {};
__export(tabs_exports, {
  Indicator: () => TabsIndicator,
  Label: () => TabsLabel,
  List: () => TabsList,
  Panel: () => TabsPanel,
  Root: () => TabsRoot,
  Tab: () => TabsTab
});
module.exports = __toCommonJS(tabs_exports);
var import_tabs = require("@base-ui-components/react/tabs");
var import_jsx_runtime = require("react/jsx-runtime");
var TabsRoot = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tabs", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsLabel, { children: props.label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_tabs.Tabs.Root, __spreadProps(__spreadValues({ className: "root" }, props), { children }))
  ] });
};
var TabsList = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_tabs.Tabs.List, __spreadProps(__spreadValues({ className: "list" }, props), { children }));
};
var TabsTab = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_tabs.Tabs.Tab, __spreadProps(__spreadValues({ className: "tab" }, props), { children }));
};
var TabsIndicator = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_tabs.Tabs.Indicator, __spreadProps(__spreadValues({ className: "indicator" }, props), { children }));
};
var TabsPanel = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_tabs.Tabs.Panel, __spreadProps(__spreadValues({ className: "panel" }, props), { children }));
};
var TabsLabel = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", __spreadProps(__spreadValues({ className: "label" }, props), { children }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Indicator,
  Label,
  List,
  Panel,
  Root,
  Tab
});
