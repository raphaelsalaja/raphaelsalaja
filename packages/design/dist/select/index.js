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

// src/select/index.tsx
var select_exports = {};
__export(select_exports, {
  Arrow: () => SelectArrow,
  Icon: () => SelectIcon,
  Item: () => SelectItem,
  ItemIndicator: () => SelectItemIndicator,
  ItemText: () => SelectItemText,
  Label: () => SelectLabel,
  Popup: () => SelectPopup,
  Portal: () => SelectPortal,
  Positioner: () => SelectPositioner,
  Root: () => SelectRoot,
  Trigger: () => SelectTrigger,
  Value: () => SelectValue
});
module.exports = __toCommonJS(select_exports);
var import_select = require("@base-ui-components/react/select");
var import_jsx_runtime = require("react/jsx-runtime");
var SelectRoot = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "select", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_select.Select.Root, __spreadProps(__spreadValues({}, props), { children })) });
};
var SelectLabel = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", __spreadProps(__spreadValues({ className: "label" }, props), { children }));
};
var SelectTrigger = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_select.Select.Trigger, __spreadProps(__spreadValues({ className: "trigger" }, props), { children }));
};
var SelectValue = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_select.Select.Value, __spreadProps(__spreadValues({ className: "value" }, props), { children }));
};
var SelectIcon = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_select.Select.Icon, __spreadProps(__spreadValues({ className: "icon" }, props), { children }));
};
var SelectPortal = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_select.Select.Portal, __spreadProps(__spreadValues({}, props), { children }));
};
var SelectPositioner = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_select.Select.Positioner, __spreadProps(__spreadValues({ className: "positioner" }, props), { children }));
};
var SelectPopup = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_select.Select.Popup, __spreadProps(__spreadValues({ className: "popup" }, props), { children }));
};
var SelectArrow = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_select.Select.Arrow, __spreadProps(__spreadValues({}, props), { children }));
};
var SelectItem = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_select.Select.Item, __spreadProps(__spreadValues({ className: "item" }, props), { children }));
};
var SelectItemIndicator = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_select.Select.ItemIndicator, __spreadProps(__spreadValues({}, props), { children }));
};
var SelectItemText = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_select.Select.ItemText, __spreadProps(__spreadValues({ className: "text" }, props), { children }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Arrow,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Popup,
  Portal,
  Positioner,
  Root,
  Trigger,
  Value
});
