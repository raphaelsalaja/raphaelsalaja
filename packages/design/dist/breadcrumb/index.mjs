import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "../chunk-FWCSY2DS.mjs";

// src/breadcrumb/index.tsx
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
var Breadcrumb = React.forwardRef((_a, ref) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsx("nav", __spreadValues({ ref, "aria-label": "breadcrumb" }, props));
});
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx("ol", __spreadValues({ ref, className: "breadcrumb-list" }, props));
  }
);
BreadcrumbList.displayName = "BreadcrumbList";
var BreadcrumbItem = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx("li", __spreadValues({ ref, className: "breadcrumb-item" }, props));
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = React.forwardRef((_a, ref) => {
  var _b = _a, { asChild, className } = _b, props = __objRest(_b, ["asChild", "className"]);
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsx(Comp, __spreadValues({ ref, className: "breadcrumb-link" }, props));
});
BreadcrumbLink.displayName = "BreadcrumbLink";
var BreadcrumbPage = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ jsx(
      "span",
      __spreadValues({
        ref,
        role: "link",
        "aria-disabled": "true",
        "aria-current": "page",
        tabIndex: 0,
        className: "breadcrumb-page"
      }, props)
    );
  }
);
BreadcrumbPage.displayName = "BreadcrumbPage";
var BreadcrumbSeparator = (_a) => {
  var _b = _a, { children, className } = _b, props = __objRest(_b, ["children", "className"]);
  return /* @__PURE__ */ jsx("li", __spreadProps(__spreadValues({ role: "presentation", "aria-hidden": "true", className: "breadcrumb-separator" }, props), { children: children != null ? children : "/" }));
};
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
};
