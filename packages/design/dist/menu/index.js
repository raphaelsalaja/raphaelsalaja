"use strict";
"use client";
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

// src/menu/index.tsx
var menu_exports = {};
__export(menu_exports, {
  Arrow: () => MenuArrow,
  Backdrop: () => MenuBackdrop,
  CheckboxItem: () => MenuCheckboxItem,
  Group: () => MenuGroup,
  GroupLabel: () => MenuGroupLabel,
  Item: () => MenuItem,
  Label: () => MenuLabel,
  Popup: () => MenuPopup,
  Portal: () => MenuPortal,
  Positioner: () => MenuPositioner,
  RadioGroup: () => MenuRadioGroup,
  RadioItem: () => MenuRadioItem,
  Root: () => MenuRoot,
  Separator: () => MenuSeparator,
  Trigger: () => MenuTrigger
});
module.exports = __toCommonJS(menu_exports);
var import_menu = require("@base-ui-components/react/menu");
var import_jsx_runtime = require("react/jsx-runtime");
var MenuRoot = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu.Menu.Root, __spreadProps(__spreadValues({}, props), { "data-shunpo-menu-root": true }));
};
var MenuLabel = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", __spreadProps(__spreadValues({}, props), { "data-shunpo-menu-label": true }));
};
var MenuTrigger = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu.Menu.Trigger, __spreadProps(__spreadValues({}, props), { "data-shunpo-menu-trigger": true }));
};
var MenuPortal = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu.Menu.Portal, __spreadProps(__spreadValues({}, props), { "data-shunpo-menu-portal": true }));
};
var MenuBackdrop = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu.Menu.Backdrop, __spreadProps(__spreadValues({}, props), { "data-shunpo-menu-backdrop": true }));
};
var MenuPositioner = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu.Menu.Positioner, __spreadProps(__spreadValues({}, props), { "data-shunpo-menu-positioner": true }));
};
var MenuPopup = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu.Menu.Popup, __spreadProps(__spreadValues({}, props), { "data-shunpo-menu-popup": true }));
};
var MenuArrow = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu.Menu.Arrow, __spreadProps(__spreadValues({}, props), { "data-shunpo-menu-arrow": true }));
};
var MenuItem = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu.Menu.Item, __spreadProps(__spreadValues({}, props), { "data-shunpo-menu-item": true }));
};
var MenuSeparator = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu.Menu.Separator, __spreadProps(__spreadValues({}, props), { "data-shunpo-menu-separator": true }));
};
var MenuGroup = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu.Menu.Group, __spreadProps(__spreadValues({}, props), { "data-shunpo-menu-group": true }));
};
var MenuGroupLabel = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu.Menu.GroupLabel, __spreadProps(__spreadValues({}, props), { "data-shunpo-menu-group-label": true }));
};
var MenuRadioGroup = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu.Menu.RadioGroup, __spreadProps(__spreadValues({}, props), { "data-shunpo-menu-radio-group": true }));
};
var MenuRadioItem = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu.Menu.RadioItem, __spreadProps(__spreadValues({}, props), { "data-shunpo-menu-radio-item": true }));
};
var MenuCheckboxItem = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu.Menu.CheckboxItem, __spreadProps(__spreadValues({}, props), { "data-shunpo-menu-checkbox-item": true }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Arrow,
  Backdrop,
  CheckboxItem,
  Group,
  GroupLabel,
  Item,
  Label,
  Popup,
  Portal,
  Positioner,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Trigger
});
