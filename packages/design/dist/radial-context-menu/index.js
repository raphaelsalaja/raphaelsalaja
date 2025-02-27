"use strict";
"use client";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/radial-context-menu/index.tsx
var radial_context_menu_exports = {};
__export(radial_context_menu_exports, {
  RadialContextMenuArrow: () => RadialContextMenuArrow,
  RadialContextMenuCheckboxItem: () => RadialContextMenuCheckboxItem,
  RadialContextMenuContent: () => RadialContextMenuContent,
  RadialContextMenuGroup: () => RadialContextMenuGroup,
  RadialContextMenuItem: () => RadialContextMenuItem,
  RadialContextMenuItemIndicator: () => RadialContextMenuItemIndicator,
  RadialContextMenuLabel: () => RadialContextMenuLabel,
  RadialContextMenuPortal: () => RadialContextMenuPortal,
  RadialContextMenuRadioGroup: () => RadialContextMenuRadioGroup,
  RadialContextMenuRadioItem: () => RadialContextMenuRadioItem,
  RadialContextMenuRoot: () => RadialContextMenuRoot,
  RadialContextMenuSeparator: () => RadialContextMenuSeparator,
  RadialContextMenuSub: () => RadialContextMenuSub,
  RadialContextMenuSubContent: () => RadialContextMenuSubContent,
  RadialContextMenuSubTrigger: () => RadialContextMenuSubTrigger,
  RadialContextMenuTrigger: () => RadialContextMenuTrigger
});
module.exports = __toCommonJS(radial_context_menu_exports);
var RadixContextMenu = __toESM(require("@radix-ui/react-context-menu"));
var import_jsx_runtime = require("react/jsx-runtime");
var RadialContextMenuRoot = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixContextMenu.Root, __spreadProps(__spreadValues({}, props), { "data-shunpo-radial-context-menu-root": true }));
};
var RadialContextMenuTrigger = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixContextMenu.Trigger, __spreadProps(__spreadValues({}, props), { "data-shunpo-radial-context-menu-trigger": true }));
};
var RadialContextMenuPortal = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixContextMenu.Portal, __spreadProps(__spreadValues({}, props), { "data-shunpo-radial-context-menu-portal": true }));
};
var RadialContextMenuLabel = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", __spreadProps(__spreadValues({}, props), { "data-shunpo-radial-context-menu-label": true }));
};
var RadialContextMenuContent = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixContextMenu.Content, __spreadProps(__spreadValues({}, props), { "data-shunpo-radial-context-menu-content": true }));
};
var RadialContextMenuGroup = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixContextMenu.Group, __spreadProps(__spreadValues({}, props), { "data-shunpo-radial-context-menu-group": true }));
};
var RadialContextMenuItem = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixContextMenu.Item, __spreadProps(__spreadValues({}, props), { "data-shunpo-radial-context-menu-item": true }));
};
var RadialContextMenuCheckboxItem = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixContextMenu.CheckboxItem, __spreadProps(__spreadValues({}, props), { "data-shunpo-radial-context-menu-checkbox-item": true }));
};
var RadialContextMenuRadioGroup = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixContextMenu.RadioGroup, __spreadProps(__spreadValues({}, props), { "data-shunpo-radial-context-menu-radio-group": true }));
};
var RadialContextMenuRadioItem = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixContextMenu.RadioItem, __spreadProps(__spreadValues({}, props), { "data-shunpo-radial-context-menu-radio-item": true }));
};
var RadialContextMenuItemIndicator = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixContextMenu.ItemIndicator, __spreadProps(__spreadValues({}, props), { "data-shunpo-radial-context-menu-item-indicator": true }));
};
var RadialContextMenuSeparator = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixContextMenu.Separator, __spreadProps(__spreadValues({}, props), { "data-shunpo-radial-context-menu-separator": true }));
};
var RadialContextMenuArrow = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixContextMenu.Arrow, __spreadProps(__spreadValues({}, props), { "data-shunpo-radial-context-menu-arrow": true }));
};
var RadialContextMenuSub = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixContextMenu.Sub, __spreadProps(__spreadValues({}, props), { "data-shunpo-radial-context-menu-sub": true }));
};
var RadialContextMenuSubTrigger = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixContextMenu.SubTrigger, __spreadProps(__spreadValues({}, props), { "data-shunpo-radial-context-menu-sub-trigger": true }));
};
var RadialContextMenuSubContent = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadixContextMenu.SubContent, __spreadProps(__spreadValues({}, props), { "data-shunpo-radial-context-menu-sub-content": true }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RadialContextMenuArrow,
  RadialContextMenuCheckboxItem,
  RadialContextMenuContent,
  RadialContextMenuGroup,
  RadialContextMenuItem,
  RadialContextMenuItemIndicator,
  RadialContextMenuLabel,
  RadialContextMenuPortal,
  RadialContextMenuRadioGroup,
  RadialContextMenuRadioItem,
  RadialContextMenuRoot,
  RadialContextMenuSeparator,
  RadialContextMenuSub,
  RadialContextMenuSubContent,
  RadialContextMenuSubTrigger,
  RadialContextMenuTrigger
});
