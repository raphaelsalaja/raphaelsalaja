module.exports = {

"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/mergeReactProps.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/**
 * Merges multiple sets of React props such that their event handlers are called in sequence (the user's
 * before our internal ones), and allows the user to prevent the internal event handlers from being
 * executed by attaching a `preventBaseUIHandler` method. It also merges the `style` prop, whereby
 * the user's styles overwrite the internal ones.
 * @important **`className` and `ref` are not merged.**
 * @param externalProps the user's external props.
 * @param internalProps our own internal props.
 * @returns the merged props.
 */ __turbopack_esm__({
    "mergeReactProps": (()=>mergeReactProps)
});
function mergeReactProps(externalProps, ...internalProps) {
    let mergedInternalProps = internalProps[0];
    for(let i = 1; i < internalProps.length; i += 1){
        mergedInternalProps = merge(mergedInternalProps, internalProps[i]);
    }
    return merge(externalProps, mergedInternalProps);
}
function merge(externalProps, internalProps) {
    if (!externalProps) {
        return internalProps;
    }
    return Object.entries(externalProps).reduce((acc, [key, value])=>{
        if (// This approach is more efficient than using a regex.
        key[0] === 'o' && key[1] === 'n' && key.charCodeAt(2) >= 65 /* A */  && key.charCodeAt(2) <= 90 /* Z */  && typeof value === 'function') {
            acc[key] = (event)=>{
                let isPrevented = false;
                const theirHandler = value;
                const ourHandler = internalProps[key];
                const baseUIEvent = event;
                baseUIEvent.preventBaseUIHandler = ()=>{
                    isPrevented = true;
                };
                const result = theirHandler(baseUIEvent);
                if (!isPrevented) {
                    ourHandler?.(baseUIEvent);
                }
                return result;
            };
        } else if (key === 'style') {
            if (value || internalProps.style) {
                acc[key] = {
                    ...internalProps.style,
                    ...value || {}
                };
            }
        } else if (key === 'className') {
            if (value) {
                if (internalProps.className) {
                    // eslint-disable-next-line prefer-template
                    acc[key] = value + ' ' + internalProps.className;
                } else {
                    acc[key] = value;
                }
            } else {
                acc[key] = internalProps.className;
            }
        } else {
            acc[key] = value;
        }
        return acc;
    }, {
        ...internalProps
    });
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/arrow/useMenuArrow.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useMenuArrow": (()=>useMenuArrow)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/mergeReactProps.js [app-ssr] (ecmascript)");
'use client';
;
;
function useMenuArrow(params) {
    const { arrowStyles } = params;
    const getArrowProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((externalProps = {})=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeReactProps"])(externalProps, {
            style: arrowStyles
        });
    }, [
        arrowStyles
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            getArrowProps
        }), [
        getArrowProps
    ]);
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/positioner/MenuPositionerContext.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuPositionerContext": (()=>MenuPositionerContext),
    "useMenuPositionerContext": (()=>useMenuPositionerContext)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const MenuPositionerContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.createContext(undefined);
if ("TURBOPACK compile-time truthy", 1) {
    MenuPositionerContext.displayName = 'MenuPositionerContext';
}
function useMenuPositionerContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useContext(MenuPositionerContext);
    if (context === undefined) {
        throw new Error('Base UI: MenuPositionerContext is missing. MenuPositioner parts must be placed within <Menu.Positioner>.');
    }
    return context;
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/MenuRootContext.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuRootContext": (()=>MenuRootContext),
    "useMenuRootContext": (()=>useMenuRootContext)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const MenuRootContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.createContext(undefined);
if ("TURBOPACK compile-time truthy", 1) {
    MenuRootContext.displayName = 'MenuRootContext';
}
function useMenuRootContext(optional) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useContext(MenuRootContext);
    if (context === undefined && !optional) {
        throw new Error('Base UI: MenuRootContext is missing. Menu parts must be placed within <Menu.Root>.');
    }
    return context;
}
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/getStyleHookProps.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "getStyleHookProps": (()=>getStyleHookProps)
});
function getStyleHookProps(state, customMapping) {
    let props = {};
    Object.entries(state).forEach(([key, value])=>{
        if (customMapping?.hasOwnProperty(key)) {
            const customProps = customMapping[key](value);
            if (customProps != null) {
                props = {
                    ...props,
                    ...customProps
                };
            }
            return;
        }
        if (value === true) {
            props[`data-${key.toLowerCase()}`] = '';
        } else if (value) {
            props[`data-${key.toLowerCase()}`] = value.toString();
        }
    });
    return props;
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/resolveClassName.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/**
 * If the provided className is a string, it will be returned as is.
 * Otherwise, the function will call the className function with the state as the first argument.
 *
 * @param className
 * @param state
 */ __turbopack_esm__({
    "resolveClassName": (()=>resolveClassName)
});
function resolveClassName(className, state) {
    return typeof className === 'function' ? className(state) : className;
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/evaluateRenderProp.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "evaluateRenderProp": (()=>evaluateRenderProp)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/mergeReactProps.js [app-ssr] (ecmascript)");
;
;
function evaluateRenderProp(render, props, state) {
    return typeof render === 'function' ? render(props, state) : /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.cloneElement(render, {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeReactProps"])(render.props, props),
        ref: props.ref
    });
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useForkRef.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useForkRef": (()=>useForkRef)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function useForkRef(...refs) {
    /**
   * This will create a new function if the refs passed to this hook change and are all defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */ return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>{
        if (refs.every((ref)=>ref == null)) {
            return null;
        }
        return (instance)=>{
            refs.forEach((ref)=>{
                setRef(ref, instance);
            });
        };
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- intentionally ignoring that the dependency array must be an array literal
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, refs);
}
function setRef(ref, value) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref) {
        ref.current = value;
    }
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/reactVersion.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "isReactVersionAtLeast": (()=>isReactVersionAtLeast)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const majorVersion = parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.version, 10);
function isReactVersionAtLeast(reactVersionToCheck) {
    return majorVersion >= reactVersionToCheck;
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useRenderPropForkRef.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useRenderPropForkRef": (()=>useRenderPropForkRef)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useForkRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$reactVersion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/reactVersion.js [app-ssr] (ecmascript)");
;
;
function useRenderPropForkRef(render, ...refs) {
    let childRef;
    if (typeof render !== 'function') {
        childRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$reactVersion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isReactVersionAtLeast"])(19) ? render.props.ref : render.ref;
    } else {
        childRef = null;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForkRef"])(childRef, ...refs);
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/defaultRenderFunctions.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "defaultRenderFunctions": (()=>defaultRenderFunctions)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
const defaultRenderFunctions = {
    button: (props)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("button", {
            type: "button",
            ...props
        });
    },
    div: (props)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
            ...props
        });
    },
    h2: (props)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("h2", {
            ...props
        });
    },
    h3: (props)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("h3", {
            ...props
        });
    },
    output: (props)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("output", {
            ...props
        });
    },
    p: (props)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("p", {
            ...props
        });
    },
    span: (props)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
            ...props
        });
    },
    a: (props)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("a", {
            ...props
        });
    },
    label: (props)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("label", {
            ...props
        });
    },
    input: (props)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("input", {
            ...props
        });
    },
    fieldset: (props)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("fieldset", {
            ...props
        });
    },
    form: (props)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("form", {
            ...props
        });
    }
};
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useComponentRenderer.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useComponentRenderer": (()=>useComponentRenderer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$getStyleHookProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/getStyleHookProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$resolveClassName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/resolveClassName.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$evaluateRenderProp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/evaluateRenderProp.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderPropForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useRenderPropForkRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$defaultRenderFunctions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/defaultRenderFunctions.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
function useComponentRenderer(settings) {
    const { render: renderProp, className: classNameProp, state, ref, propGetter = (props)=>props, extraProps, customStyleHookMapping } = settings;
    const className = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$resolveClassName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveClassName"])(classNameProp, state);
    const styleHooks = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$getStyleHookProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStyleHookProps"])(state, customStyleHookMapping);
    }, [
        state,
        customStyleHookMapping
    ]);
    const ownProps = {
        ...styleHooks,
        ...extraProps
    };
    let resolvedRenderProp;
    if (typeof renderProp === 'string') {
        resolvedRenderProp = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$defaultRenderFunctions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultRenderFunctions"][renderProp];
    } else {
        resolvedRenderProp = renderProp;
    }
    const renderedElementProps = propGetter(ownProps);
    const propsWithRef = {
        ...renderedElementProps,
        ref: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRenderPropForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRenderPropForkRef"])(resolvedRenderProp, ref, renderedElementProps.ref)
    };
    if (className !== undefined) {
        propsWithRef.className = className;
    }
    const renderElement = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$evaluateRenderProp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["evaluateRenderProp"])(resolvedRenderProp, propsWithRef, state);
    return {
        renderElement
    };
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "popupStateMapping": (()=>popupStateMapping),
    "pressableTriggerOpenStateMapping": (()=>pressableTriggerOpenStateMapping),
    "triggerOpenStateMapping": (()=>triggerOpenStateMapping)
});
const TRIGGER_HOOK = {
    'data-popup-open': ''
};
const PRESSABLE_TRIGGER_HOOK = {
    'data-popup-open': '',
    'data-pressed': ''
};
const POPUP_OPEN_HOOK = {
    'data-open': ''
};
const POPUP_CLOSED_HOOK = {
    'data-closed': ''
};
const ANCHOR_HIDDEN_HOOK = {
    'data-anchor-hidden': ''
};
const triggerOpenStateMapping = {
    open (value) {
        if (value) {
            return TRIGGER_HOOK;
        }
        return null;
    }
};
const pressableTriggerOpenStateMapping = {
    open (value) {
        if (value) {
            return PRESSABLE_TRIGGER_HOOK;
        }
        return null;
    }
};
const popupStateMapping = {
    open (value) {
        if (value) {
            return POPUP_OPEN_HOOK;
        }
        return POPUP_CLOSED_HOOK;
    },
    anchorHidden (value) {
        if (value) {
            return ANCHOR_HIDDEN_HOOK;
        }
        return null;
    }
};
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/arrow/MenuArrow.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuArrow": (()=>MenuArrow)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$arrow$2f$useMenuArrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/arrow/useMenuArrow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$positioner$2f$MenuPositionerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/positioner/MenuPositionerContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/MenuRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useComponentRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useForkRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
/**
 * Displays an element positioned against the menu anchor.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ const MenuArrow = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function MenuArrow(props, forwardedRef) {
    const { className, render, ...otherProps } = props;
    const { open } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuRootContext"])();
    const { arrowRef, side, align, arrowUncentered, arrowStyles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$positioner$2f$MenuPositionerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuPositionerContext"])();
    const { getArrowProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$arrow$2f$useMenuArrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuArrow"])({
        arrowStyles
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            open,
            side,
            align,
            uncentered: arrowUncentered
        }), [
        open,
        side,
        align,
        arrowUncentered
    ]);
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForkRef"])(arrowRef, forwardedRef);
    const { renderElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComponentRenderer"])({
        propGetter: getArrowProps,
        render: render ?? 'div',
        className,
        state,
        ref: mergedRef,
        extraProps: otherProps,
        customStyleHookMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["popupStateMapping"]
    });
    return renderElement();
});
("TURBOPACK compile-time truthy", 1) ? MenuArrow.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component’s state.
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * Allows you to replace the component’s HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */ render: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].element,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ])
} : ("TURBOPACK unreachable", undefined);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/styleHookMapping.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "transitionStatusMapping": (()=>transitionStatusMapping)
});
const STARTING_HOOK = {
    'data-starting-style': ''
};
const ENDING_HOOK = {
    'data-ending-style': ''
};
const transitionStatusMapping = {
    transitionStatus (value) {
        if (value === 'starting') {
            return STARTING_HOOK;
        }
        if (value === 'ending') {
            return ENDING_HOOK;
        }
        return null;
    }
};
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/backdrop/MenuBackdrop.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuBackdrop": (()=>MenuBackdrop)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/MenuRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useComponentRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$styleHookMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/styleHookMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const customStyleHookMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["popupStateMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$styleHookMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transitionStatusMapping"]
};
/**
 * An overlay displayed beneath the menu popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ const MenuBackdrop = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function MenuBackdrop(props, forwardedRef) {
    const { className, render, keepMounted = false, ...other } = props;
    const { open, mounted, transitionStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuRootContext"])();
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            open,
            transitionStatus
        }), [
        open,
        transitionStatus
    ]);
    const { renderElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComponentRenderer"])({
        render: render ?? 'div',
        className,
        state,
        ref: forwardedRef,
        extraProps: {
            role: 'presentation',
            hidden: !mounted,
            ...other
        },
        customStyleHookMapping
    });
    const shouldRender = keepMounted || mounted;
    if (!shouldRender) {
        return null;
    }
    return renderElement();
});
("TURBOPACK compile-time truthy", 1) ? MenuBackdrop.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component’s state.
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * Whether to keep the HTML element in the DOM while the menu is hidden.
   * @default false
   */ keepMounted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Allows you to replace the component’s HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */ render: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].element,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ])
} : ("TURBOPACK unreachable", undefined);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/extractEventHandlers.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/**
 * Extracts event handlers from a given object.
 * A prop is considered an event handler if it is a function and its name starts with `on`.
 *
 * @param object An object to extract event handlers from.
 * @param excludeKeys An array of keys to exclude from the returned object.
 */ __turbopack_esm__({
    "extractEventHandlers": (()=>extractEventHandlers)
});
function extractEventHandlers(object, excludeKeys = []) {
    if (object === undefined) {
        return {};
    }
    const result = {};
    Object.keys(object).filter((prop)=>prop.match(/^on[A-Z]/) && typeof object[prop] === 'function' && !excludeKeys.includes(prop)).forEach((prop)=>{
        result[prop] = object[prop];
    });
    return result;
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useRootElementName.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useRootElementName": (()=>useRootElementName)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function useRootElementName(parameters) {
    const { rootElementName: rootElementNameProp = '', componentName } = parameters;
    const [rootElementName, setRootElementName] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(rootElementNameProp.toUpperCase());
    if ("TURBOPACK compile-time truthy", 1) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
            if (rootElementNameProp && rootElementName !== rootElementNameProp.toUpperCase()) {
                console.error(`useRootElementName: the \`rootElementName\` prop of ${componentName ? `the ${componentName} component` : 'a component'} expected the '${rootElementNameProp}' element, but a '${rootElementName.toLowerCase()}' was rendered instead`, 'This may cause hydration issues in an SSR context, for example in a Next.js app');
            }
        }, [
            rootElementNameProp,
            rootElementName,
            componentName
        ]);
    }
    const updateRootElementName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((instance)=>{
        setRootElementName(instance?.tagName ?? '');
    }, []);
    return [
        rootElementName,
        updateRootElementName
    ];
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/use-button/useButton.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useButton": (()=>useButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useForkRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$extractEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/extractEventHandlers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRootElementName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useRootElementName.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function useButton(parameters = {}) {
    const { disabled = false, focusableWhenDisabled, buttonRef: externalRef, tabIndex, type, elementName: elementNameProp } = parameters;
    const buttonRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(null);
    const [elementName, updateElementName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useRootElementName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRootElementName"])({
        rootElementName: elementNameProp,
        componentName: 'Button'
    });
    const isNativeButton = ()=>{
        const button = buttonRef.current;
        return elementName === 'BUTTON' || elementName === 'INPUT' && [
            'button',
            'submit',
            'reset'
        ].includes(button?.type);
    };
    const createHandleClick = (otherHandlers)=>(event)=>{
            if (!disabled) {
                otherHandlers.onClick?.(event);
            }
        };
    const createHandleKeyDown = (otherHandlers)=>(event)=>{
            otherHandlers.onKeyDown?.(event);
            if (event.defaultMuiPrevented) {
                return;
            }
            if (event.target === event.currentTarget && !isNativeButton() && event.key === ' ') {
                event.preventDefault();
            }
            // Keyboard accessibility for non interactive elements
            if (event.target === event.currentTarget && !isNativeButton() && event.key === 'Enter' && !disabled) {
                otherHandlers.onClick?.(event);
                event.preventDefault();
            }
        };
    const createHandleKeyUp = (otherHandlers)=>(event)=>{
            // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
            // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0
            otherHandlers.onKeyUp?.(event);
            // Keyboard accessibility for non interactive elements
            if (event.target === event.currentTarget && !isNativeButton() && !disabled && event.key === ' ' && !event.defaultMuiPrevented) {
                otherHandlers.onClick?.(event);
            }
        };
    const handleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForkRef"])(updateElementName, externalRef, buttonRef);
    const buttonProps = {};
    if (tabIndex !== undefined) {
        buttonProps.tabIndex = tabIndex;
    }
    if (elementName === 'BUTTON' || elementName === 'INPUT') {
        if (focusableWhenDisabled) {
            buttonProps['aria-disabled'] = disabled;
        } else {
            buttonProps.disabled = disabled;
        }
    } else if (elementName !== '') {
        buttonProps.role = 'button';
        buttonProps.tabIndex = tabIndex ?? 0;
        if (disabled) {
            buttonProps['aria-disabled'] = disabled;
            buttonProps.tabIndex = focusableWhenDisabled ? tabIndex ?? 0 : -1;
        }
    }
    const getButtonProps = (externalProps)=>{
        const externalEventHandlers = {
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$extractEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractEventHandlers"])(parameters),
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$extractEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractEventHandlers"])(externalProps)
        };
        const props = {
            type,
            ...externalEventHandlers,
            ...buttonProps,
            ...externalProps,
            onClick: createHandleClick(externalEventHandlers),
            onKeyDown: createHandleKeyDown(externalEventHandlers),
            onKeyUp: createHandleKeyUp(externalEventHandlers),
            ref: handleRef
        };
        return props;
    };
    return {
        getButtonProps,
        buttonRef: handleRef
    };
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/use-button/index.js [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/use-button/index.js [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/use-button/useButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/use-button/index.js [app-ssr] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/item/useMenuItem.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useMenuItem": (()=>useMenuItem)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/use-button/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/mergeReactProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useForkRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/use-button/useButton.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function useMenuItem(params) {
    const { closeOnClick, disabled = false, highlighted, id, menuEvents, ref: externalRef, allowMouseUpTriggerRef, typingRef } = params;
    const itemRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(null);
    const { getButtonProps, buttonRef: mergedRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useButton"])({
        disabled,
        focusableWhenDisabled: true,
        buttonRef: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForkRef"])(externalRef, itemRef)
    });
    const getRootProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((externalProps)=>{
        return getButtonProps((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeReactProps"])(externalProps, {
            id,
            role: 'menuitem',
            tabIndex: highlighted ? 0 : -1,
            onKeyUp: (event)=>{
                if (event.key === ' ' && typingRef.current) {
                    event.defaultMuiPrevented = true;
                }
            },
            onClick: (event)=>{
                if (closeOnClick) {
                    menuEvents.emit('close', event);
                }
            },
            onMouseUp: (event)=>{
                if (itemRef.current && allowMouseUpTriggerRef.current) {
                    // This fires whenever the user clicks on the trigger, moves the cursor, and releases it over the item.
                    // We trigger the click and override the `closeOnClick` preference to always close the menu.
                    itemRef.current.click();
                    menuEvents.emit('close', event);
                }
            }
        }));
    }, [
        closeOnClick,
        getButtonProps,
        highlighted,
        id,
        menuEvents,
        allowMouseUpTriggerRef,
        typingRef
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            getRootProps,
            rootRef: mergedRef
        }), [
        getRootProps,
        mergedRef
    ]);
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useControlled.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useControlled": (()=>useControlled)
});
// TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- process.env never changes, dependency arrays are intentionally ignored
/* eslint-disable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function useControlled({ controlled, default: defaultProp, name, state = 'value' }) {
    // isControlled is ignored in the hook dependency lists as it should never change.
    const { current: isControlled } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(controlled !== undefined);
    const [valueState, setValue] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(defaultProp);
    const value = isControlled ? controlled : valueState;
    if ("TURBOPACK compile-time truthy", 1) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
            if (isControlled !== (controlled !== undefined)) {
                console.error([
                    `Base UI: A component is changing the ${isControlled ? '' : 'un'}controlled ${state} state of ${name} to be ${isControlled ? 'un' : ''}controlled.`,
                    'Elements should not switch from uncontrolled to controlled (or vice versa).',
                    `Decide between using a controlled or uncontrolled ${name} ` + 'element for the lifetime of the component.',
                    "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
                    'More info: https://fb.me/react-controlled-components'
                ].join('\n'));
            }
        }, [
            state,
            name,
            controlled
        ]);
        const { current: defaultValue } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(defaultProp);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
            // Object.is() is not equivalent to the === operator.
            // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is for more details.
            if (!isControlled && !Object.is(defaultValue, defaultProp)) {
                console.error([
                    `Base UI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. ` + `To suppress this warning opt to use a controlled ${name}.`
                ].join('\n'));
            }
        }, [
            JSON.stringify(defaultProp)
        ]);
    }
    const setValueIfUncontrolled = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((newValue)=>{
        if (!isControlled) {
            setValue(newValue);
        }
    }, []);
    return [
        value,
        setValueIfUncontrolled
    ];
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/checkbox-item/useMenuCheckboxItem.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useMenuCheckboxItem": (()=>useMenuCheckboxItem)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$item$2f$useMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/item/useMenuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useControlled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useControlled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/mergeReactProps.js [app-ssr] (ecmascript)");
;
;
;
;
function useMenuCheckboxItem(params) {
    const { checked: checkedProp, defaultChecked, onCheckedChange, ...other } = params;
    const [checked, setChecked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useControlled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useControlled"])({
        controlled: checkedProp,
        default: defaultChecked ?? false,
        name: 'MenuCheckboxItem',
        state: 'checked'
    });
    const { getRootProps: getMenuItemRootProps, ...menuItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$item$2f$useMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuItem"])(other);
    const getRootProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((externalProps)=>{
        return getMenuItemRootProps((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeReactProps"])(externalProps, {
            role: 'menuitemcheckbox',
            'aria-checked': checked,
            onClick: (event)=>{
                setChecked((currentlyChecked)=>!currentlyChecked);
                onCheckedChange?.(!checked, event.nativeEvent);
            }
        }));
    }, [
        checked,
        getMenuItemRootProps,
        onCheckedChange,
        setChecked
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            ...menuItem,
            getRootProps,
            checked
        }), [
        checked,
        getRootProps,
        menuItem
    ]);
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/checkbox-item/MenuCheckboxItemContext.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuCheckboxItemContext": (()=>MenuCheckboxItemContext),
    "useMenuCheckboxItemContext": (()=>useMenuCheckboxItemContext)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const MenuCheckboxItemContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.createContext(undefined);
function useMenuCheckboxItemContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useContext(MenuCheckboxItemContext);
    if (context === undefined) {
        throw new Error('Base UI: MenuCheckboxItemContext is missing. MenuCheckboxItem parts must be placed within <Menu.CheckboxItem>.');
    }
    return context;
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useId.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useId": (()=>useId)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
let globalId = 0;
// TODO React 17: Remove `useGlobalId` once React 17 support is removed
function useGlobalId(idOverride, prefix = 'mui') {
    const [defaultId, setDefaultId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(idOverride);
    const id = idOverride || defaultId;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
        if (defaultId == null) {
            // Fallback to this default id when possible.
            // Use the incrementing value for client-side rendering only.
            // We can't use it server-side.
            // If you want to use random values please consider the Birthday Problem: https://en.wikipedia.org/wiki/Birthday_problem
            globalId += 1;
            setDefaultId(`${prefix}-${globalId}`);
        }
    }, [
        defaultId,
        prefix
    ]);
    return id;
}
// See https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379 for why
const safeReact = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
};
const maybeReactUseId = safeReact.useId;
function useId(idOverride, prefix) {
    // React.useId() is only available from React 17.0.0.
    if (maybeReactUseId !== undefined) {
        const reactId = maybeReactUseId();
        return idOverride ?? (prefix ? `${prefix}-${reactId}` : reactId);
    }
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/rules-of-hooks -- `React.useId` is invariant at runtime.
    return useGlobalId(idOverride, prefix);
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useBaseUiId": (()=>useBaseUiId)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useId.js [app-ssr] (ecmascript)");
'use client';
;
function useBaseUiId(idOverride) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])(idOverride, 'base-ui');
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/utils/styleHookMapping.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "itemMapping": (()=>itemMapping)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$styleHookMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/styleHookMapping.js [app-ssr] (ecmascript)");
;
const itemMapping = {
    checked (value) {
        if (value) {
            return {
                'data-checked': ''
            };
        }
        return {
            'data-unchecked': ''
        };
    },
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$styleHookMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transitionStatusMapping"]
};
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useEnhancedEffect.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useEnhancedEffect": (()=>useEnhancedEffect)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const useEnhancedEffect = typeof window !== 'undefined' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useLayoutEffect : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/composite/list/CompositeListContext.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "CompositeListContext": (()=>CompositeListContext),
    "useCompositeListContext": (()=>useCompositeListContext)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const CompositeListContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.createContext({
    register: ()=>{},
    unregister: ()=>{},
    map: new Map(),
    elementsRef: {
        current: []
    }
});
if ("TURBOPACK compile-time truthy", 1) {
    CompositeListContext.displayName = 'CompositeListContext';
}
function useCompositeListContext() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useContext(CompositeListContext);
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/composite/list/useCompositeListItem.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useCompositeListItem": (()=>useCompositeListItem)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useEnhancedEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/composite/list/CompositeListContext.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function useCompositeListItem(params = {}) {
    const { label, metadata } = params;
    const { register, unregister, map, elementsRef, labelsRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompositeListContext"])();
    const [index, setIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(null);
    const componentRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(null);
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((node)=>{
        componentRef.current = node;
        if (index !== null) {
            elementsRef.current[index] = node;
            if (labelsRef) {
                const isLabelDefined = label !== undefined;
                labelsRef.current[index] = isLabelDefined ? label : node?.textContent ?? null;
            }
        }
    }, [
        index,
        elementsRef,
        labelsRef,
        label
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEnhancedEffect"])(()=>{
        const node = componentRef.current;
        if (node) {
            register(node, metadata);
            return ()=>{
                unregister(node);
            };
        }
        return undefined;
    }, [
        register,
        unregister,
        metadata
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEnhancedEffect"])(()=>{
        const i = componentRef.current ? map.get(componentRef.current)?.index : null;
        if (i != null) {
            setIndex(i);
        }
    }, [
        map
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            ref,
            index: index == null ? -1 : index
        }), [
        index,
        ref
    ]);
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/checkbox-item/MenuCheckboxItem.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuCheckboxItem": (()=>MenuCheckboxItem)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$checkbox$2d$item$2f$useMenuCheckboxItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/checkbox-item/useMenuCheckboxItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$checkbox$2d$item$2f$MenuCheckboxItemContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/checkbox-item/MenuCheckboxItemContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/MenuRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useComponentRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useForkRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$utils$2f$styleHookMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/utils/styleHookMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/composite/list/useCompositeListItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@floating-ui+react@0.27.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@floating-ui/react/dist/floating-ui.react.mjs [app-ssr] (ecmascript) <locals>");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const InnerMenuCheckboxItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function InnerMenuItem(props, forwardedRef) {
    const { checked: checkedProp, defaultChecked, onCheckedChange, className, closeOnClick, disabled = false, highlighted, id, menuEvents, propGetter, render, allowMouseUpTriggerRef, typingRef, ...other } = props;
    const { getRootProps, checked } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$checkbox$2d$item$2f$useMenuCheckboxItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuCheckboxItem"])({
        closeOnClick,
        disabled,
        highlighted,
        id,
        menuEvents,
        ref: forwardedRef,
        allowMouseUpTriggerRef,
        checked: checkedProp,
        defaultChecked,
        onCheckedChange,
        typingRef
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            disabled,
            highlighted,
            checked
        }), [
        disabled,
        highlighted,
        checked
    ]);
    const { renderElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComponentRenderer"])({
        render: render || 'div',
        className,
        state,
        propGetter: (externalProps)=>propGetter(getRootProps(externalProps)),
        customStyleHookMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$utils$2f$styleHookMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["itemMapping"],
        extraProps: other
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$checkbox$2d$item$2f$MenuCheckboxItemContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuCheckboxItemContext"].Provider, {
        value: state,
        children: renderElement()
    });
});
("TURBOPACK compile-time truthy", 1) ? InnerMenuCheckboxItem.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ allowMouseUpTriggerRef: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        current: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool.isRequired
    }).isRequired,
    /**
   * Whether the checkbox item is currently ticked.
   *
   * To render an uncontrolled checkbox item, use the `defaultChecked` prop instead.
   */ checked: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component’s state.
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * Whether to close the menu when the item is clicked.
   */ closeOnClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool.isRequired,
    /**
   * Whether the checkbox item is initially ticked.
   *
   * To render a controlled checkbox item, use the `checked` prop instead.
   * @default false
   */ defaultChecked: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Whether the component should ignore user interaction.
   * @default false
   */ disabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * @ignore
   */ highlighted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool.isRequired,
    /**
   * @ignore
   */ id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */ label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * @ignore
   */ menuEvents: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        emit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func.isRequired,
        off: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func.isRequired,
        on: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func.isRequired
    }).isRequired,
    /**
   * Event handler called when the checkbox item is ticked or unticked.
   */ onCheckedChange: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * The click handler for the menu item.
   */ onClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * @ignore
   */ propGetter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func.isRequired,
    /**
   * Allows you to replace the component’s HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */ render: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].element,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ]),
    /**
   * @ignore
   */ typingRef: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        current: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool.isRequired
    }).isRequired
} : ("TURBOPACK unreachable", undefined);
const MemoizedInnerMenuCheckboxItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.memo(InnerMenuCheckboxItem);
/**
 * A menu item that toggles a setting on or off.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ const MenuCheckboxItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function MenuCheckboxItem(props, forwardedRef) {
    const { id: idProp, label, closeOnClick = false, ...other } = props;
    const itemRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(null);
    const listItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompositeListItem"])({
        label
    });
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForkRef"])(forwardedRef, listItem.ref, itemRef);
    const { getItemProps, activeIndex, allowMouseUpTriggerRef, typingRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuRootContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const highlighted = listItem.index === activeIndex;
    const { events: menuEvents } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFloatingTree"])();
    // This wrapper component is used as a performance optimization.
    // MenuCheckboxItem reads the context and re-renders the actual MenuCheckboxItem
    // only when it needs to.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(MemoizedInnerMenuCheckboxItem, {
        ...other,
        id: id,
        ref: mergedRef,
        highlighted: highlighted,
        menuEvents: menuEvents,
        propGetter: getItemProps,
        allowMouseUpTriggerRef: allowMouseUpTriggerRef,
        typingRef: typingRef,
        closeOnClick: closeOnClick
    });
});
("TURBOPACK compile-time truthy", 1) ? MenuCheckboxItem.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * Whether the checkbox item is currently ticked.
   *
   * To render an uncontrolled checkbox item, use the `defaultChecked` prop instead.
   */ checked: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * Whether to close the menu when the item is clicked.
   * @default false
   */ closeOnClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Whether the checkbox item is initially ticked.
   *
   * To render a controlled checkbox item, use the `checked` prop instead.
   * @default false
   */ defaultChecked: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Whether the component should ignore user interaction.
   * @default false
   */ disabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * @ignore
   */ id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */ label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * Event handler called when the checkbox item is ticked or unticked.
   */ onCheckedChange: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * The click handler for the menu item.
   */ onClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
} : ("TURBOPACK unreachable", undefined);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useTransitionStatus.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useTransitionStatus": (()=>useTransitionStatus)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useEnhancedEffect.js [app-ssr] (ecmascript)");
'use client';
;
;
function useTransitionStatus(open, delayStartingStatus = false) {
    const [transitionStatus, setTransitionStatus] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState();
    const [mounted, setMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(open);
    if (open && !mounted) {
        setMounted(true);
        if (transitionStatus !== 'starting' && !delayStartingStatus) {
            setTransitionStatus('starting');
        }
    }
    if (!open && mounted && transitionStatus !== 'ending') {
        setTransitionStatus('ending');
    }
    if (!open && !mounted && transitionStatus === 'ending') {
        setTransitionStatus(undefined);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEnhancedEffect"])(()=>{
        if (!open) {
            return undefined;
        }
        if (delayStartingStatus) {
            setTransitionStatus('starting');
        }
        const frame = requestAnimationFrame(()=>{
            setTransitionStatus(undefined);
        });
        return ()=>{
            cancelAnimationFrame(frame);
        };
    }, [
        open,
        delayStartingStatus
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            mounted,
            setMounted,
            transitionStatus
        }), [
        mounted,
        transitionStatus
    ]);
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useEventCallback.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useEventCallback": (()=>useEventCallback)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useEnhancedEffect.js [app-ssr] (ecmascript)");
'use client';
;
;
/**
 * Inspired by https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * See RFC in https://github.com/reactjs/rfcs/pull/220
 */ function useEventCallback(fn) {
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(fn);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEnhancedEffect"])(()=>{
        ref.current = fn;
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef((...args)=>// @ts-expect-error hide `this`
        (0, ref.current)(...args)).current;
}
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useAnimationsFinished.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useAnimationsFinished": (()=>useAnimationsFinished)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useEventCallback.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function useAnimationsFinished(ref) {
    const frameRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(-1);
    const cancelFrames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])(()=>{
        cancelAnimationFrame(frameRef.current);
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>cancelFrames, [
        cancelFrames
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((fnToExecute)=>{
        cancelFrames();
        const element = ref.current;
        if (!element) {
            return;
        }
        if (typeof element.getAnimations !== 'function' || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
            fnToExecute();
        } else {
            frameRef.current = requestAnimationFrame(()=>{
                Promise.allSettled(element.getAnimations().map((anim)=>anim.finished)).then(()=>{
                    // Synchronously flush the unmounting of the component so that the browser doesn't
                    // paint: https://github.com/mui/base-ui/issues/979
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.flushSync(fnToExecute);
                });
            });
        }
    });
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useLatestRef.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useLatestRef": (()=>useLatestRef)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useEnhancedEffect.js [app-ssr] (ecmascript)");
'use client';
;
;
function useLatestRef(value) {
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(value);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEnhancedEffect"])(()=>{
        ref.current = value;
    });
    return ref;
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useAfterExitAnimation.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useAfterExitAnimation": (()=>useAfterExitAnimation)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useAnimationsFinished$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useAnimationsFinished.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useEnhancedEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useLatestRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useLatestRef.js [app-ssr] (ecmascript)");
;
;
;
;
function useAfterExitAnimation(parameters) {
    const { open, animatedElementRef, onFinished: onFinishedParam } = parameters;
    const onFinished = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])(onFinishedParam);
    const runOnceAnimationsFinish = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useAnimationsFinished$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAnimationsFinished"])(animatedElementRef);
    const openRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useLatestRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLatestRef"])(open);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEnhancedEffect"])(()=>{
        function callOnFinished() {
            if (!openRef.current) {
                onFinished();
            }
        }
        if (!open) {
            runOnceAnimationsFinish(callOnFinished);
        }
    }, [
        open,
        openRef,
        runOnceAnimationsFinish,
        onFinished
    ]);
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/checkbox-item-indicator/MenuCheckboxItemIndicator.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuCheckboxItemIndicator": (()=>MenuCheckboxItemIndicator)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$checkbox$2d$item$2f$MenuCheckboxItemContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/checkbox-item/MenuCheckboxItemContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useComponentRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$utils$2f$styleHookMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/utils/styleHookMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/mergeReactProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useTransitionStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useTransitionStatus.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useAfterExitAnimation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useAfterExitAnimation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useForkRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
/**
 * Indicates whether the checkbox item is ticked.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ const MenuCheckboxItemIndicator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function MenuCheckboxItemIndicator(props, forwardedRef) {
    const { render, className, keepMounted = false, ...other } = props;
    const item = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$checkbox$2d$item$2f$MenuCheckboxItemContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuCheckboxItemContext"])();
    const indicatorRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(null);
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForkRef"])(forwardedRef, indicatorRef);
    const { mounted, transitionStatus, setMounted } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useTransitionStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransitionStatus"])(item.checked);
    const getItemProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((externalProps = {})=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeReactProps"])(externalProps, {
            'aria-hidden': true,
            hidden: !mounted
        }), [
        mounted
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useAfterExitAnimation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAfterExitAnimation"])({
        open: item.checked,
        animatedElementRef: indicatorRef,
        onFinished () {
            setMounted(false);
        }
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            checked: item.checked,
            disabled: item.disabled,
            highlighted: item.highlighted,
            transitionStatus
        }), [
        item.checked,
        item.disabled,
        item.highlighted,
        transitionStatus
    ]);
    const { renderElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComponentRenderer"])({
        propGetter: getItemProps,
        render: render || 'span',
        className,
        state,
        customStyleHookMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$utils$2f$styleHookMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["itemMapping"],
        extraProps: other,
        ref: mergedRef
    });
    const shouldRender = keepMounted || item.checked;
    if (!shouldRender) {
        return null;
    }
    return renderElement();
});
("TURBOPACK compile-time truthy", 1) ? MenuCheckboxItemIndicator.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component’s state.
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * Whether to keep the HTML element in the DOM when the checkbox item is not checked.
   * @default false
   */ keepMounted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Allows you to replace the component’s HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */ render: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].element,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ])
} : ("TURBOPACK unreachable", undefined);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/group/MenuGroupContext.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuGroupContext": (()=>MenuGroupContext),
    "useMenuGroupRootContext": (()=>useMenuGroupRootContext)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const MenuGroupContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.createContext(undefined);
if ("TURBOPACK compile-time truthy", 1) {
    MenuGroupContext.displayName = 'MenuGroupContext';
}
function useMenuGroupRootContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useContext(MenuGroupContext);
    if (context === undefined) {
        throw new Error('Base UI: Missing MenuGroupRootContext provider');
    }
    return context;
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/group/MenuGroup.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuGroup": (()=>MenuGroup)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useComponentRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$group$2f$MenuGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/group/MenuGroupContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const state = {};
/**
 * Groups related menu items with the corresponding label.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ const MenuGroup = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function MenuGroup(props, forwardedRef) {
    const { render, className, ...other } = props;
    const [labelId, setLabelId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(undefined);
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            setLabelId
        }), [
        setLabelId
    ]);
    const { renderElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComponentRenderer"])({
        render: render || 'div',
        className,
        state,
        extraProps: {
            role: 'group',
            'aria-labelledby': labelId,
            ...other
        },
        ref: forwardedRef
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$group$2f$MenuGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuGroupContext"].Provider, {
        value: context,
        children: renderElement()
    });
});
("TURBOPACK compile-time truthy", 1) ? MenuGroup.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * The content of the component.
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component’s state.
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * Allows you to replace the component’s HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */ render: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].element,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ])
} : ("TURBOPACK unreachable", undefined);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/group-label/MenuGroupLabel.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuGroupLabel": (()=>MenuGroupLabel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useComponentRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$group$2f$MenuGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/group/MenuGroupContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useEnhancedEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const state = {};
/**
 * An accessible label that is automatically associated with its parent group.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ const MenuGroupLabel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function MenuGroupLabelComponent(props, forwardedRef) {
    const { className, render, id: idProp, ...other } = props;
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const { setLabelId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$group$2f$MenuGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuGroupRootContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEnhancedEffect"])(()=>{
        setLabelId(id);
        return ()=>{
            setLabelId(undefined);
        };
    }, [
        setLabelId,
        id
    ]);
    const { renderElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComponentRenderer"])({
        render: render ?? 'div',
        className,
        state,
        extraProps: {
            role: 'presentation',
            id,
            ...other
        },
        ref: forwardedRef
    });
    return renderElement();
});
("TURBOPACK compile-time truthy", 1) ? MenuGroupLabel.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component’s state.
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * @ignore
   */ id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * Allows you to replace the component’s HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */ render: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].element,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ])
} : ("TURBOPACK unreachable", undefined);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/item/MenuItem.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuItem": (()=>MenuItem)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$item$2f$useMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/item/useMenuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/MenuRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useComponentRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useForkRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/composite/list/useCompositeListItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@floating-ui+react@0.27.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@floating-ui/react/dist/floating-ui.react.mjs [app-ssr] (ecmascript) <locals>");
'use client';
;
;
;
;
;
;
;
;
;
;
const InnerMenuItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function InnerMenuItem(props, forwardedRef) {
    const { className, closeOnClick = true, disabled = false, highlighted, id, menuEvents, propGetter, render, allowMouseUpTriggerRef, typingRef, ...other } = props;
    const { getRootProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$item$2f$useMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuItem"])({
        closeOnClick,
        disabled,
        highlighted,
        id,
        menuEvents,
        ref: forwardedRef,
        allowMouseUpTriggerRef,
        typingRef
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            disabled,
            highlighted
        }), [
        disabled,
        highlighted
    ]);
    const { renderElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComponentRenderer"])({
        render: render || 'div',
        className,
        state,
        propGetter: (externalProps)=>propGetter(getRootProps(externalProps)),
        extraProps: other
    });
    return renderElement();
});
const MemoizedInnerMenuItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.memo(InnerMenuItem);
/**
 * An individual interactive item in the menu.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ ("TURBOPACK compile-time truthy", 1) ? InnerMenuItem.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ allowMouseUpTriggerRef: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        current: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool.isRequired
    }).isRequired,
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component’s state.
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * Whether to close the menu when the item is clicked.
   *
   * @default true
   */ closeOnClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Whether the component should ignore user interaction.
   * @default false
   */ disabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * @ignore
   */ highlighted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool.isRequired,
    /**
   * @ignore
   */ id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */ label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * @ignore
   */ menuEvents: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        emit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func.isRequired,
        off: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func.isRequired,
        on: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func.isRequired
    }).isRequired,
    /**
   * The click handler for the menu item.
   */ onClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * @ignore
   */ propGetter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func.isRequired,
    /**
   * Allows you to replace the component’s HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */ render: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].element,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ]),
    /**
   * @ignore
   */ typingRef: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        current: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool.isRequired
    }).isRequired
} : ("TURBOPACK unreachable", undefined);
/**
 * An individual interactive item in the menu.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ const MenuItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function MenuItem(props, forwardedRef) {
    const { id: idProp, label, ...other } = props;
    const itemRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(null);
    const listItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompositeListItem"])({
        label
    });
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForkRef"])(forwardedRef, listItem.ref, itemRef);
    const { getItemProps, activeIndex, allowMouseUpTriggerRef, typingRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuRootContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const highlighted = listItem.index === activeIndex;
    const { events: menuEvents } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFloatingTree"])();
    // This wrapper component is used as a performance optimization.
    // MenuItem reads the context and re-renders the actual MenuItem
    // only when it needs to.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(MemoizedInnerMenuItem, {
        ...other,
        id: id,
        ref: mergedRef,
        highlighted: highlighted,
        menuEvents: menuEvents,
        propGetter: getItemProps,
        allowMouseUpTriggerRef: allowMouseUpTriggerRef,
        typingRef: typingRef
    });
});
("TURBOPACK compile-time truthy", 1) ? MenuItem.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * Whether to close the menu when the item is clicked.
   *
   * @default true
   */ closeOnClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Whether the component should ignore user interaction.
   * @default false
   */ disabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * @ignore
   */ id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */ label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * The click handler for the menu item.
   */ onClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
} : ("TURBOPACK unreachable", undefined);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/popup/useMenuPopup.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useMenuPopup": (()=>useMenuPopup)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function useMenuPopup(parameters) {
    const { menuEvents, setOpen } = parameters;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
        function handleClose(event) {
            setOpen(false, event);
        }
        menuEvents.on('close', handleClose);
        return ()=>{
            menuEvents.off('close', handleClose);
        };
    }, [
        menuEvents,
        setOpen
    ]);
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/popup/MenuPopup.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuPopup": (()=>MenuPopup)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$popup$2f$useMenuPopup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/popup/useMenuPopup.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/MenuRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$positioner$2f$MenuPositionerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/positioner/MenuPositionerContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useComponentRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useForkRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/mergeReactProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$styleHookMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/styleHookMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@floating-ui+react@0.27.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@floating-ui/react/dist/floating-ui.react.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const customStyleHookMapping = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["popupStateMapping"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$styleHookMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transitionStatusMapping"]
};
/**
 * A container for the menu items.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ const MenuPopup = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function MenuPopup(props, forwardedRef) {
    const { render, className, ...other } = props;
    const { open, setOpen, popupRef, transitionStatus, nested, mounted, getPopupProps, modal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuRootContext"])();
    const { side, align, floatingContext } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$positioner$2f$MenuPositionerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuPositionerContext"])();
    const { events: menuEvents } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFloatingTree"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$popup$2f$useMenuPopup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuPopup"])({
        setOpen,
        menuEvents
    });
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForkRef"])(forwardedRef, popupRef);
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            transitionStatus,
            side,
            align,
            open,
            nested
        }), [
        transitionStatus,
        side,
        align,
        open,
        nested
    ]);
    const { renderElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComponentRenderer"])({
        propGetter: getPopupProps,
        render: render || 'div',
        className,
        state,
        extraProps: transitionStatus === 'starting' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeReactProps"])(other, {
            style: {
                transition: 'none'
            }
        }) : other,
        customStyleHookMapping,
        ref: mergedRef
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FloatingFocusManager"], {
        context: floatingContext,
        modal: false,
        initialFocus: nested ? -1 : popupRef,
        returnFocus: true,
        disabled: !mounted,
        visuallyHiddenDismiss: modal ? 'Dismiss popup' : undefined,
        order: !nested ? [
            'content',
            'reference'
        ] : undefined,
        children: renderElement()
    });
});
("TURBOPACK compile-time truthy", 1) ? MenuPopup.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component’s state.
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * @ignore
   */ id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * Allows you to replace the component’s HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */ render: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].element,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ])
} : ("TURBOPACK unreachable", undefined);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/portal/PortalContext.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "PortalContext": (()=>PortalContext),
    "usePortalContext": (()=>usePortalContext)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const PortalContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.createContext(undefined);
if ("TURBOPACK compile-time truthy", 1) {
    PortalContext.displayName = 'PortalContext';
}
function usePortalContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useContext(PortalContext);
    if (context === undefined) {
        throw new Error('Base UI: PortalContext is missing. Portal parts must be placed within the Root of a component.');
    }
    return context;
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/proptypes.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "HTMLElementType": (()=>HTMLElementType),
    "exactProp": (()=>exactProp),
    "refType": (()=>refType)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
;
const refType = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
]);
function HTMLElementType(props, propName, componentName, location, propFullName) {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    const propValue = props[propName];
    const safePropName = propFullName || propName;
    if (propValue == null) {
        return null;
    }
    if (propValue && propValue.nodeType !== 1) {
        return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. ` + `Expected an HTMLElement.`);
    }
    return null;
}
const specialProperty = 'exact-prop: \u200b';
function exactProp(propTypes) {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return {
        ...propTypes,
        [specialProperty]: (props)=>{
            const unsupportedProps = Object.keys(props).filter((prop)=>!propTypes.hasOwnProperty(prop));
            if (unsupportedProps.length > 0) {
                return new Error(`The following props are not supported: ${unsupportedProps.map((prop)=>`\`${prop}\``).join(', ')}. Please remove them.`);
            }
            return null;
        }
    };
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/portal/Portal.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Portal": (()=>Portal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$portal$2f$PortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/portal/PortalContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$proptypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/proptypes.js [app-ssr] (ecmascript)");
/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 *
 * Documentation: https://base-ui.com
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@floating-ui+react@0.27.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@floating-ui/react/dist/floating-ui.react.mjs [app-ssr] (ecmascript) <locals>");
'use client';
;
;
;
;
;
;
function Portal(props) {
    const { children, container, keepMounted = false } = props;
    const mounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$portal$2f$PortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePortalContext"])();
    const shouldRender = mounted || keepMounted;
    if (!shouldRender) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FloatingPortal"], {
        root: container,
        children: children
    });
}
("TURBOPACK compile-time truthy", 1) ? Portal.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * A parent element to render the portal into.
   */ container: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ /* @typescript-to-proptypes-ignore */ ["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$proptypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HTMLElementType"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$proptypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["refType"]
    ]),
    /**
   * Whether to keep the portal mounted in the DOM while the popup is hidden.
   * @default false
   */ keepMounted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool
} : ("TURBOPACK unreachable", undefined);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/direction-provider/DirectionContext.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "DirectionContext": (()=>DirectionContext),
    "useDirection": (()=>useDirection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const DirectionContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.createContext(undefined);
if ("TURBOPACK compile-time truthy", 1) {
    DirectionContext.displayName = 'DirectionContext';
}
function useDirection(optional = true) {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useContext(DirectionContext);
    if (context === undefined && !optional) {
        throw new Error('Base UI: DirectionContext is missing.');
    }
    return context?.direction ?? 'ltr';
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useAnchorPositioning.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useAnchorPositioning": (()=>useAnchorPositioning)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useEnhancedEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/direction-provider/DirectionContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@floating-ui+react-dom@2.1.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$8$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@floating-ui+utils@0.2.8/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@floating-ui+react@0.27.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@floating-ui/react/dist/floating-ui.react.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$dom$40$1$2e$6$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@floating-ui+dom@1.6.12/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs [app-ssr] (ecmascript) <locals>");
'use client';
;
;
;
;
;
function useAnchorPositioning(params) {
    const { anchor, floatingRootContext, positionMethod = 'absolute', side: sideParam = 'top', sideOffset = 0, align = 'center', alignOffset = 0, collisionBoundary, collisionPadding = 5, fallbackAxisSideDirection = 'none', sticky = false, keepMounted = false, arrowPadding = 5, mounted, trackAnchor = true, allowAxisFlip = true, nodeId } = params;
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDirection"])();
    const isRtl = direction === 'rtl';
    const side = {
        top: 'top',
        right: 'right',
        bottom: 'bottom',
        left: 'left',
        'inline-end': isRtl ? 'left' : 'right',
        'inline-start': isRtl ? 'right' : 'left'
    }[sideParam];
    const placement = align === 'center' ? side : `${side}-${align}`;
    const commonCollisionProps = {
        boundary: collisionBoundary === 'clipping-ancestors' ? 'clippingAncestors' : collisionBoundary,
        padding: collisionPadding
    };
    // Using a ref assumes that the arrow element is always present in the DOM for the lifetime of the
    // tooltip. If this assumption ends up being false, we can switch to state to manage the arrow's
    // presence.
    const arrowRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(null);
    const middleware = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["offset"])({
            mainAxis: sideOffset,
            crossAxis: alignOffset,
            alignmentAxis: alignOffset
        })
    ];
    const flipMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flip"])({
        ...commonCollisionProps,
        fallbackAxisSideDirection: allowAxisFlip ? fallbackAxisSideDirection : 'none'
    });
    const shiftMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["shift"])({
        ...commonCollisionProps,
        crossAxis: sticky,
        limiter: sticky ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["limitShift"])(()=>{
            if (!arrowRef.current) {
                return {};
            }
            const { height } = arrowRef.current.getBoundingClientRect();
            return {
                offset: height / 2 + (typeof collisionPadding === 'number' ? collisionPadding : 0)
            };
        })
    });
    // https://floating-ui.com/docs/flip#combining-with-shift
    if (align !== 'center') {
        middleware.push(flipMiddleware, shiftMiddleware);
    } else {
        middleware.push(shiftMiddleware, flipMiddleware);
    }
    middleware.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["size"])({
        ...commonCollisionProps,
        apply ({ elements: { floating }, rects: { reference }, availableWidth, availableHeight }) {
            Object.entries({
                '--available-width': `${availableWidth}px`,
                '--available-height': `${availableHeight}px`,
                '--anchor-width': `${reference.width}px`,
                '--anchor-height': `${reference.height}px`
            }).forEach(([key, value])=>{
                floating.style.setProperty(key, value);
            });
        }
    }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["arrow"])(()=>({
            // `transform-origin` calculations rely on an element existing. If the arrow hasn't been set,
            // we'll create a fake element.
            element: arrowRef.current || document.createElement('div'),
            padding: arrowPadding
        }), [
        arrowPadding
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$2d$dom$40$2$2e$1$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2d$dom$2f$dist$2f$floating$2d$ui$2e$react$2d$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hide"])(), {
        name: 'transformOrigin',
        fn ({ elements, middlewareData, placement: renderedPlacement }) {
            const currentRenderedSide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$8$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSide"])(renderedPlacement);
            const arrowEl = arrowRef.current;
            const arrowX = middlewareData.arrow?.x ?? 0;
            const arrowY = middlewareData.arrow?.y ?? 0;
            const arrowWidth = arrowEl?.clientWidth ?? 0;
            const arrowHeight = arrowEl?.clientHeight ?? 0;
            const transformX = arrowX + arrowWidth / 2;
            const transformY = arrowY + arrowHeight / 2;
            const transformOrigin = {
                top: `${transformX}px calc(100% + ${sideOffset}px)`,
                bottom: `${transformX}px ${-sideOffset}px`,
                left: `calc(100% + ${sideOffset}px) ${transformY}px`,
                right: `${-sideOffset}px ${transformY}px`
            }[currentRenderedSide];
            elements.floating.style.setProperty('--transform-origin', transformOrigin);
            return {};
        }
    });
    // Ensure positioning doesn't run initially for `keepMounted` elements that
    // aren't initially open.
    let rootContext = floatingRootContext;
    if (!mounted && floatingRootContext) {
        rootContext = {
            ...floatingRootContext,
            elements: {
                reference: null,
                floating: null,
                domReference: null
            }
        };
    }
    const autoUpdateOptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            // Keep `ancestorResize` for window resizing. TODO: determine the best configuration, or
            // if we need to allow options.
            ancestorScroll: trackAnchor,
            elementResize: trackAnchor && typeof ResizeObserver !== 'undefined',
            layoutShift: trackAnchor && typeof IntersectionObserver !== 'undefined'
        }), [
        trackAnchor
    ]);
    const { refs, elements, floatingStyles, middlewareData, update, placement: renderedPlacement, context: positionerContext, isPositioned } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFloating"])({
        rootContext,
        placement,
        middleware,
        strategy: positionMethod,
        whileElementsMounted: keepMounted ? undefined : (...args)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$dom$40$1$2e$6$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["autoUpdate"])(...args, autoUpdateOptions),
        nodeId
    });
    const registeredPositionReferenceRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEnhancedEffect"])(()=>{
        if (!mounted) {
            return;
        }
        const resolvedAnchor = typeof anchor === 'function' ? anchor() : anchor;
        if (resolvedAnchor) {
            const unwrappedElement = isRef(resolvedAnchor) ? resolvedAnchor.current : resolvedAnchor;
            refs.setPositionReference(unwrappedElement);
            registeredPositionReferenceRef.current = unwrappedElement;
        }
    }, [
        mounted,
        refs,
        anchor
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
        if (!mounted) {
            return;
        }
        // Refs from parent components are set after useLayoutEffect runs and are available in useEffect.
        // Therefore, if the anchor is a ref, we need to update the position reference in useEffect.
        if (typeof anchor === 'function') {
            return;
        }
        if (isRef(anchor) && anchor.current !== registeredPositionReferenceRef.current) {
            refs.setPositionReference(anchor.current);
            registeredPositionReferenceRef.current = anchor.current;
        }
    }, [
        mounted,
        refs,
        anchor
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
        if (keepMounted && mounted && elements.domReference && elements.floating) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$dom$40$1$2e$6$2e$12$2f$node_modules$2f40$floating$2d$ui$2f$dom$2f$dist$2f$floating$2d$ui$2e$dom$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["autoUpdate"])(elements.domReference, elements.floating, update, autoUpdateOptions);
        }
        return undefined;
    }, [
        keepMounted,
        mounted,
        elements,
        update,
        autoUpdateOptions
    ]);
    const renderedSide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$8$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSide"])(renderedPlacement);
    const isLogicalSideParam = sideParam === 'inline-start' || sideParam === 'inline-end';
    const logicalRight = isRtl ? 'inline-start' : 'inline-end';
    const logicalLeft = isRtl ? 'inline-end' : 'inline-start';
    const logicalRenderedSide = {
        top: 'top',
        right: isLogicalSideParam ? logicalRight : 'right',
        bottom: 'bottom',
        left: isLogicalSideParam ? logicalLeft : 'left'
    }[renderedSide];
    const renderedAlign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$utils$40$0$2e$2$2e$8$2f$node_modules$2f40$floating$2d$ui$2f$utils$2f$dist$2f$floating$2d$ui$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAlignment"])(renderedPlacement) || 'center';
    const anchorHidden = Boolean(middlewareData.hide?.referenceHidden);
    const arrowStyles = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            position: 'absolute',
            top: middlewareData.arrow?.y,
            left: middlewareData.arrow?.x
        }), [
        middlewareData.arrow
    ]);
    const arrowUncentered = middlewareData.arrow?.centerOffset !== 0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            positionerStyles: floatingStyles,
            arrowStyles,
            arrowRef,
            arrowUncentered,
            renderedSide: logicalRenderedSide,
            renderedAlign,
            anchorHidden,
            refs,
            positionerContext,
            isPositioned
        }), [
        floatingStyles,
        arrowStyles,
        arrowRef,
        arrowUncentered,
        logicalRenderedSide,
        renderedAlign,
        anchorHidden,
        refs,
        positionerContext,
        isPositioned
    ]);
}
function isRef(param) {
    return param != null && 'current' in param;
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/positioner/useMenuPositioner.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useMenuPositioner": (()=>useMenuPositioner)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/mergeReactProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useAnchorPositioning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useAnchorPositioning.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/MenuRootContext.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function useMenuPositioner(params) {
    const { keepMounted, mounted, menuEvents, nodeId, parentNodeId, setOpen } = params;
    const { open } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuRootContext"])();
    const { positionerStyles, arrowStyles, anchorHidden, arrowRef, arrowUncentered, renderedSide, renderedAlign, positionerContext: floatingContext } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useAnchorPositioning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAnchorPositioning"])(params);
    const getPositionerProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((externalProps = {})=>{
        const hiddenStyles = {};
        if (keepMounted && !open) {
            hiddenStyles.pointerEvents = 'none';
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeReactProps"])(externalProps, {
            role: 'presentation',
            hidden: !mounted,
            style: {
                ...positionerStyles,
                ...hiddenStyles
            }
        });
    }, [
        keepMounted,
        open,
        positionerStyles,
        mounted
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
        function onMenuOpened(event) {
            if (event.nodeId !== nodeId && event.parentNodeId === parentNodeId) {
                setOpen(false);
            }
        }
        menuEvents.on('opened', onMenuOpened);
        return ()=>{
            menuEvents.off('opened', onMenuOpened);
        };
    }, [
        menuEvents,
        nodeId,
        parentNodeId,
        setOpen
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
        if (open) {
            menuEvents.emit('opened', {
                nodeId,
                parentNodeId
            });
        }
    }, [
        menuEvents,
        open,
        nodeId,
        parentNodeId
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            getPositionerProps,
            arrowRef,
            arrowUncentered,
            arrowStyles,
            side: renderedSide,
            align: renderedAlign,
            floatingContext,
            anchorHidden
        }), [
        getPositionerProps,
        arrowRef,
        arrowUncentered,
        arrowStyles,
        renderedSide,
        renderedAlign,
        floatingContext,
        anchorHidden
    ]);
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/fastObjectShallowCompare.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// https://github.com/mui/mui-x/blob/master/packages/x-internals/src/fastObjectShallowCompare/fastObjectShallowCompare.ts
__turbopack_esm__({
    "fastObjectShallowCompare": (()=>fastObjectShallowCompare)
});
const is = Object.is;
function fastObjectShallowCompare(a, b) {
    if (a === b) {
        return true;
    }
    if (!(a instanceof Object) || !(b instanceof Object)) {
        return false;
    }
    let aLength = 0;
    let bLength = 0;
    /* eslint-disable guard-for-in */ for(const key in a){
        aLength += 1;
        if (!is(a[key], b[key])) {
            return false;
        }
        if (!(key in b)) {
            return false;
        }
    }
    /* eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars */ for(const _ in b){
        bLength += 1;
    }
    return aLength === bLength;
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/composite/list/CompositeList.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/* eslint-disable no-bitwise */ __turbopack_esm__({
    "CompositeList": (()=>CompositeList)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$fastObjectShallowCompare$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/fastObjectShallowCompare.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useEnhancedEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/composite/list/CompositeListContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function sortByDocumentPosition(a, b) {
    const position = a.compareDocumentPosition(b);
    if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        return -1;
    }
    if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
        return 1;
    }
    return 0;
}
function areMapsEqual(map1, map2) {
    if (map1.size !== map2.size) {
        return false;
    }
    for (const [key, value] of map1.entries()){
        const value2 = map2.get(key);
        // compare the index before comparing everything else
        if (value?.index !== value2?.index) {
            return false;
        }
        if (value2 !== undefined && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$fastObjectShallowCompare$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fastObjectShallowCompare"])(value, value2)) {
            return false;
        }
    }
    return true;
}
/**
 * Provides context for a list of items in a composite component.
 * @ignore - internal component.
 */ function CompositeList(props) {
    const { children, elementsRef, labelsRef, onMapChange } = props;
    const [map, setMap] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(()=>new Map());
    const register = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((node, metadata)=>{
        setMap((prevMap)=>new Map(prevMap).set(node, metadata ?? null));
    }, []);
    const unregister = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((node)=>{
        setMap((prevMap)=>{
            const nextMap = new Map(prevMap);
            nextMap.delete(node);
            return nextMap;
        });
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEnhancedEffect"])(()=>{
        const newMap = new Map(map);
        const nodes = Array.from(newMap.keys()).sort(sortByDocumentPosition);
        nodes.forEach((node, index)=>{
            const metadata = map.get(node) ?? {};
            newMap.set(node, {
                ...metadata,
                index
            });
        });
        if (!areMapsEqual(map, newMap)) {
            setMap(newMap);
            onMapChange?.(newMap);
        }
    }, [
        map,
        onMapChange
    ]);
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            register,
            unregister,
            map,
            elementsRef,
            labelsRef
        }), [
        register,
        unregister,
        map,
        elementsRef,
        labelsRef
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeListContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompositeListContext"].Provider, {
        value: contextValue,
        children: children
    });
}
;
("TURBOPACK compile-time truthy", 1) ? CompositeList.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * A ref to the list of HTML elements, ordered by their index.
   * `useListNavigation`'s `listRef` prop.
   */ elementsRef: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ /* @typescript-to-proptypes-ignore */ ["default"].any,
    /**
   * A ref to the list of element labels, ordered by their index.
   * `useTypeahead`'s `listRef` prop.
   */ labelsRef: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        current: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].arrayOf(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string).isRequired
    }),
    /**
   * @ignore
   */ onMapChange: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
} : ("TURBOPACK unreachable", undefined);
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/positioner/MenuPositioner.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuPositioner": (()=>MenuPositioner)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$positioner$2f$MenuPositionerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/positioner/MenuPositionerContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/MenuRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useComponentRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useForkRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$positioner$2f$useMenuPositioner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/positioner/useMenuPositioner.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$proptypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/proptypes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/composite/list/CompositeList.js [app-ssr] (ecmascript)");
/**
 * Positions the menu popup against the trigger.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@floating-ui+react@0.27.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@floating-ui/react/dist/floating-ui.react.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const MenuPositioner = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function MenuPositioner(props, forwardedRef) {
    const { anchor, positionMethod = 'absolute', className, render, keepMounted = false, side, align, sideOffset = 0, alignOffset = 0, collisionBoundary = 'clipping-ancestors', collisionPadding = 5, arrowPadding = 5, sticky = false, ...otherProps } = props;
    const { open, floatingRootContext, setPositionerElement, itemDomElements, itemLabels, mounted, nested, setOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuRootContext"])();
    const { events: menuEvents } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFloatingTree"])();
    const nodeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFloatingNodeId"])();
    const parentNodeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFloatingParentNodeId"])();
    let computedSide = side;
    let computedAlign = align;
    if (!side) {
        computedSide = nested ? 'inline-end' : 'bottom';
    }
    if (!align) {
        computedAlign = nested ? 'start' : 'center';
    }
    const positioner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$positioner$2f$useMenuPositioner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuPositioner"])({
        anchor,
        floatingRootContext,
        positionMethod,
        open,
        mounted,
        side: computedSide,
        sideOffset,
        align: computedAlign,
        alignOffset,
        arrowPadding,
        collisionBoundary,
        collisionPadding,
        sticky,
        nodeId,
        parentNodeId,
        menuEvents,
        setOpen
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            open,
            side: positioner.side,
            align: positioner.align,
            anchorHidden: positioner.anchorHidden,
            nested
        }), [
        open,
        positioner.side,
        positioner.align,
        positioner.anchorHidden,
        nested
    ]);
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            side: positioner.side,
            align: positioner.align,
            arrowRef: positioner.arrowRef,
            arrowUncentered: positioner.arrowUncentered,
            arrowStyles: positioner.arrowStyles,
            floatingContext: positioner.floatingContext
        }), [
        positioner.side,
        positioner.align,
        positioner.arrowRef,
        positioner.arrowUncentered,
        positioner.arrowStyles,
        positioner.floatingContext
    ]);
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForkRef"])(forwardedRef, setPositionerElement);
    const { renderElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComponentRenderer"])({
        propGetter: positioner.getPositionerProps,
        render: render ?? 'div',
        className,
        state,
        customStyleHookMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["popupStateMapping"],
        ref: mergedRef,
        extraProps: otherProps
    });
    const shouldRender = keepMounted || mounted;
    if (!shouldRender) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$positioner$2f$MenuPositionerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuPositionerContext"].Provider, {
        value: contextValue,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FloatingNode"], {
            id: nodeId,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$CompositeList$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompositeList"], {
                elementsRef: itemDomElements,
                labelsRef: itemLabels,
                children: renderElement()
            })
        })
    });
});
("TURBOPACK compile-time truthy", 1) ? MenuPositioner.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * How to align the popup relative to the specified side.
   */ align: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOf([
        'center',
        'end',
        'start'
    ]),
    /**
   * Additional offset along the alignment axis of the element.
   * @default 0
   */ alignOffset: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
    /**
   * An element to position the popup against.
   * By default, the popup will be positioned against the trigger.
   */ anchor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ /* @typescript-to-proptypes-ignore */ ["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$proptypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HTMLElementType"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ]),
    /**
   * Minimum distance to maintain between the arrow and the edges of the popup.
   *
   * Use it to prevent the arrow element from hanging out of the rounded corners of a popup.
   * @default 5
   */ arrowPadding: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component’s state.
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * An element or a rectangle that delimits the area that the popup is confined to.
   * @default 'clipping-ancestors'
   */ collisionBoundary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ /* @typescript-to-proptypes-ignore */ ["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$proptypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HTMLElementType"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].arrayOf(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$proptypes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HTMLElementType"]),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
            height: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
            width: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
            x: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
            y: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number
        })
    ]),
    /**
   * Additional space to maintain from the edge of the collision boundary.
   * @default 5
   */ collisionPadding: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
            bottom: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
            left: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
            right: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
            top: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number
        })
    ]),
    /**
   * Whether to keep the HTML element in the DOM while the menu is hidden.
   * @default false
   */ keepMounted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Determines which CSS `position` property to use.
   * @default 'absolute'
   */ positionMethod: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOf([
        'absolute',
        'fixed'
    ]),
    /**
   * Allows you to replace the component’s HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */ render: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].element,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ]),
    /**
   * Which side of the anchor element to align the popup against.
   * May automatically change to avoid collisions.
   */ side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOf([
        'bottom',
        'inline-end',
        'inline-start',
        'left',
        'right',
        'top'
    ]),
    /**
   * Distance between the anchor and the popup.
   * @default 0
   */ sideOffset: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
    /**
   * Whether to maintain the menu in the viewport after
   * the anchor element is scrolled out of view.
   * @default false
   */ sticky: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool
} : ("TURBOPACK unreachable", undefined);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-group/MenuRadioGroupContext.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuRadioGroupContext": (()=>MenuRadioGroupContext),
    "useMenuRadioGroupContext": (()=>useMenuRadioGroupContext)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const MenuRadioGroupContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.createContext(undefined);
if ("TURBOPACK compile-time truthy", 1) {
    MenuRadioGroupContext.displayName = 'MenuRadioGroupContext';
}
function useMenuRadioGroupContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useContext(MenuRadioGroupContext);
    if (context === undefined) {
        throw new Error('Base UI: MenuRadioGroupContext is missing. MenuRadioGroup parts must be placed within <Menu.RadioGroup>.');
    }
    return context;
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-group/MenuRadioGroup.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuRadioGroup": (()=>MemoizedMenuRadioGroup)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$group$2f$MenuRadioGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-group/MenuRadioGroupContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useComponentRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useControlled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useControlled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const EMPTY_OBJECT = {};
const NOOP = ()=>{};
/**
 * Groups related radio items.
 * Renders a `<div>` element.
 */ const MenuRadioGroup = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function MenuRadioGroup(props, forwardedRef) {
    const { render, className, value: valueProp, defaultValue, onValueChange: onValueChangeProp = NOOP, ...other } = props;
    const [value, setValueUnwrapped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useControlled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useControlled"])({
        controlled: valueProp,
        default: defaultValue,
        name: 'MenuRadioGroup'
    });
    const onValueChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])(onValueChangeProp);
    const setValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((newValue, event)=>{
        setValueUnwrapped(newValue);
        onValueChange?.(newValue, event);
    }, [
        onValueChange,
        setValueUnwrapped
    ]);
    const { renderElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComponentRenderer"])({
        render: render || 'div',
        className,
        state: EMPTY_OBJECT,
        extraProps: {
            role: 'group',
            ...other
        },
        ref: forwardedRef
    });
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            value,
            setValue
        }), [
        value,
        setValue
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$group$2f$MenuRadioGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuRadioGroupContext"].Provider, {
        value: context,
        children: renderElement()
    });
});
("TURBOPACK compile-time truthy", 1) ? MenuRadioGroup.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * The content of the component.
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component’s state.
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * The uncontrolled value of the radio item that should be initially selected.
   *
   * To render a controlled radio group, use the `value` prop instead.
   */ defaultValue: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].any,
    /**
   * Function called when the selected value changes.
   *
   * @default () => {}
   */ onValueChange: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * Allows you to replace the component’s HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */ render: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].element,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ]),
    /**
   * The controlled value of the radio item that should be currently selected.
   *
   * To render an uncontrolled radio group, use the `defaultValue` prop instead.
   */ value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].any
} : ("TURBOPACK unreachable", undefined);
const MemoizedMenuRadioGroup = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.memo(MenuRadioGroup);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-item/useMenuRadioItem.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useMenuRadioItem": (()=>useMenuRadioItem)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$item$2f$useMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/item/useMenuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/mergeReactProps.js [app-ssr] (ecmascript)");
;
;
;
function useMenuRadioItem(params) {
    const { checked, setChecked, ...other } = params;
    const { getRootProps: getMenuItemRootProps, ...menuItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$item$2f$useMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuItem"])(other);
    const getRootProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((externalProps)=>{
        return getMenuItemRootProps((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeReactProps"])(externalProps, {
            role: 'menuitemradio',
            'aria-checked': checked,
            onClick: (event)=>{
                setChecked(event.nativeEvent);
            }
        }));
    }, [
        checked,
        getMenuItemRootProps,
        setChecked
    ]);
    return {
        ...menuItem,
        getRootProps,
        checked
    };
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-item/MenuRadioItemContext.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuRadioItemContext": (()=>MenuRadioItemContext),
    "useMenuRadioItemContext": (()=>useMenuRadioItemContext)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const MenuRadioItemContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.createContext(undefined);
if ("TURBOPACK compile-time truthy", 1) {
    MenuRadioItemContext.displayName = 'MenuRadioItemContext';
}
function useMenuRadioItemContext() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useContext(MenuRadioItemContext);
    if (context === undefined) {
        throw new Error('Base UI: MenuRadioItemContext is missing. MenuRadioItem parts must be placed within <Menu.RadioItem>.');
    }
    return context;
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-item/MenuRadioItem.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuRadioItem": (()=>MenuRadioItem)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$item$2f$useMenuRadioItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-item/useMenuRadioItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/MenuRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useComponentRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useForkRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$group$2f$MenuRadioGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-group/MenuRadioGroupContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$item$2f$MenuRadioItemContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-item/MenuRadioItemContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$utils$2f$styleHookMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/utils/styleHookMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/composite/list/useCompositeListItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@floating-ui+react@0.27.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@floating-ui/react/dist/floating-ui.react.mjs [app-ssr] (ecmascript) <locals>");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
const InnerMenuRadioItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function InnerMenuItem(props, forwardedRef) {
    const { checked, setChecked, className, closeOnClick, disabled = false, highlighted, id, menuEvents, propGetter, render, allowMouseUpTriggerRef, typingRef, ...other } = props;
    const { getRootProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$item$2f$useMenuRadioItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuRadioItem"])({
        checked,
        setChecked,
        closeOnClick,
        disabled,
        highlighted,
        id,
        menuEvents,
        ref: forwardedRef,
        allowMouseUpTriggerRef,
        typingRef
    });
    const state = {
        disabled,
        highlighted,
        checked
    };
    const { renderElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComponentRenderer"])({
        render: render || 'div',
        className,
        state,
        propGetter: (externalProps)=>propGetter(getRootProps(externalProps)),
        customStyleHookMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$utils$2f$styleHookMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["itemMapping"],
        extraProps: other
    });
    return renderElement();
});
/**
 * A menu item that works like a radio button in a given group.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ ("TURBOPACK compile-time truthy", 1) ? InnerMenuRadioItem.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ allowMouseUpTriggerRef: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        current: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool.isRequired
    }).isRequired,
    /**
   * @ignore
   */ checked: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool.isRequired,
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component’s state.
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * Whether to close the menu when the item is clicked.
   */ closeOnClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool.isRequired,
    /**
   * Whether the component should ignore user interaction.
   * @default false
   */ disabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * @ignore
   */ highlighted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool.isRequired,
    /**
   * @ignore
   */ id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */ label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * @ignore
   */ menuEvents: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        emit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func.isRequired,
        off: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func.isRequired,
        on: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func.isRequired
    }).isRequired,
    /**
   * The click handler for the menu item.
   */ onClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * @ignore
   */ propGetter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func.isRequired,
    /**
   * Allows you to replace the component’s HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */ render: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].element,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ]),
    /**
   * @ignore
   */ setChecked: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func.isRequired,
    /**
   * @ignore
   */ typingRef: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        current: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool.isRequired
    }).isRequired
} : ("TURBOPACK unreachable", undefined);
const MemoizedInnerMenuRadioItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.memo(InnerMenuRadioItem);
/**
 * A menu item that works like a radio button in a given group.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ const MenuRadioItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function MenuRadioItem(props, forwardedRef) {
    const { id: idProp, value, label, disabled = false, closeOnClick = false, ...other } = props;
    const itemRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(null);
    const listItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompositeListItem"])({
        label
    });
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForkRef"])(forwardedRef, listItem.ref, itemRef);
    const { getItemProps, activeIndex, allowMouseUpTriggerRef, typingRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuRootContext"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const highlighted = listItem.index === activeIndex;
    const { events: menuEvents } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFloatingTree"])();
    const { value: selectedValue, setValue: setSelectedValue } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$group$2f$MenuRadioGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuRadioGroupContext"])();
    // This wrapper component is used as a performance optimization.
    // MenuRadioItem reads the context and re-renders the actual MenuRadioItem
    // only when it needs to.
    const checked = selectedValue === value;
    const setChecked = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((event)=>{
        setSelectedValue(value, event);
    }, [
        setSelectedValue,
        value
    ]);
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            checked,
            highlighted,
            disabled
        }), [
        checked,
        highlighted,
        disabled
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$item$2f$MenuRadioItemContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuRadioItemContext"].Provider, {
        value: contextValue,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(MemoizedInnerMenuRadioItem, {
            ...other,
            id: id,
            ref: mergedRef,
            highlighted: highlighted,
            menuEvents: menuEvents,
            propGetter: getItemProps,
            allowMouseUpTriggerRef: allowMouseUpTriggerRef,
            checked: selectedValue === value,
            setChecked: setChecked,
            typingRef: typingRef,
            closeOnClick: closeOnClick
        })
    });
});
("TURBOPACK compile-time truthy", 1) ? MenuRadioItem.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * Whether to close the menu when the item is clicked.
   * @default false
   */ closeOnClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Whether the component should ignore user interaction.
   * @default false
   */ disabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * @ignore
   */ id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */ label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * The click handler for the menu item.
   */ onClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * Value of the radio item.
   * This is the value that will be set in the MenuRadioGroup when the item is selected.
   */ value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].any.isRequired
} : ("TURBOPACK unreachable", undefined);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-item-indicator/MenuRadioItemIndicator.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuRadioItemIndicator": (()=>MenuRadioItemIndicator)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$item$2f$MenuRadioItemContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-item/MenuRadioItemContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useComponentRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$utils$2f$styleHookMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/utils/styleHookMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/mergeReactProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useTransitionStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useTransitionStatus.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useAfterExitAnimation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useAfterExitAnimation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useForkRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
/**
 * Indicates whether the radio item is selected.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ const MenuRadioItemIndicator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function MenuRadioItemIndicator(props, forwardedRef) {
    const { render, className, keepMounted = false, ...other } = props;
    const item = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$item$2f$MenuRadioItemContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuRadioItemContext"])();
    const indicatorRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(null);
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForkRef"])(forwardedRef, indicatorRef);
    const { mounted, transitionStatus, setMounted } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useTransitionStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransitionStatus"])(item.checked);
    const getItemProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((externalProps = {})=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeReactProps"])(externalProps, {
            'aria-hidden': true,
            hidden: !mounted
        }), [
        mounted
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useAfterExitAnimation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAfterExitAnimation"])({
        open: item.checked,
        animatedElementRef: indicatorRef,
        onFinished () {
            setMounted(false);
        }
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            checked: item.checked,
            disabled: item.disabled,
            highlighted: item.highlighted,
            transitionStatus
        }), [
        item.checked,
        item.disabled,
        item.highlighted,
        transitionStatus
    ]);
    const { renderElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComponentRenderer"])({
        propGetter: getItemProps,
        render: render || 'span',
        className,
        state,
        customStyleHookMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$utils$2f$styleHookMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["itemMapping"],
        extraProps: other,
        ref: mergedRef
    });
    const shouldRender = keepMounted || item.checked;
    if (!shouldRender) {
        return null;
    }
    return renderElement();
});
("TURBOPACK compile-time truthy", 1) ? MenuRadioItemIndicator.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component’s state.
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * Whether to keep the HTML element in the DOM when the radio item is inactive.
   * @default false
   */ keepMounted: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Allows you to replace the component’s HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */ render: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].element,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ])
} : ("TURBOPACK unreachable", undefined);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/constants.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "TYPEAHEAD_RESET_MS": (()=>TYPEAHEAD_RESET_MS)
});
const TYPEAHEAD_RESET_MS = 500;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/detectBrowser.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Avoid Chrome DevTools blue warning.
__turbopack_esm__({
    "getPlatform": (()=>getPlatform),
    "isIOS": (()=>isIOS),
    "isWebKit": (()=>isWebKit)
});
function getPlatform() {
    if (typeof navigator === 'undefined') {
        return '';
    }
    const uaData = navigator.userAgentData;
    if (uaData?.platform) {
        return uaData.platform;
    }
    return navigator.platform;
}
function isWebKit() {
    if (typeof CSS === 'undefined' || !CSS.supports) {
        return false;
    }
    return CSS.supports('-webkit-backdrop-filter:none');
}
function isIOS() {
    return /iP(hone|ad|od)|iOS/.test(getPlatform());
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/owner.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ownerDocument": (()=>ownerDocument),
    "ownerWindow": (()=>ownerWindow)
});
function ownerDocument(node) {
    return node && node.ownerDocument || document;
}
function ownerWindow(node) {
    const doc = ownerDocument(node);
    return doc.defaultView || window;
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useScrollLock.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useScrollLock": (()=>useScrollLock)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/detectBrowser.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/owner.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useEnhancedEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@floating-ui+react@0.27.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@floating-ui/react/dist/floating-ui.react.utils.mjs [app-ssr] (ecmascript)");
;
;
;
;
let originalHtmlStyles = {};
let originalBodyStyles = {};
let preventScrollCount = 0;
let restore = ()=>{};
function getVisualOffsets(doc) {
    const win = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ownerWindow"])(doc);
    const vV = win.visualViewport;
    return {
        x: Math.floor(vV?.offsetLeft || 0),
        y: Math.floor(vV?.offsetTop || 0)
    };
}
function preventScrollIOS(referenceElement) {
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ownerDocument"])(referenceElement);
    const html = doc.documentElement;
    const body = doc.body;
    const htmlStyle = html.style;
    const bodyStyle = body.style;
    // iOS 12 does not support `visualViewport`.
    const { x, y } = getVisualOffsets(doc);
    const scrollX = bodyStyle.left ? parseFloat(bodyStyle.left) : window.scrollX;
    const scrollY = bodyStyle.top ? parseFloat(bodyStyle.top) : window.scrollY;
    originalHtmlStyles = {
        overflowX: htmlStyle.overflowX,
        overflowY: htmlStyle.overflowY
    };
    originalBodyStyles = {
        position: bodyStyle.position,
        top: bodyStyle.top,
        left: bodyStyle.left,
        right: bodyStyle.right,
        overflowX: bodyStyle.overflowX,
        overflowY: bodyStyle.overflowY
    };
    Object.assign(htmlStyle, {
        overflow: 'visible'
    });
    Object.assign(bodyStyle, {
        position: 'fixed',
        top: `${-(scrollY - y)}px`,
        left: `${-(scrollX - x)}px`,
        right: '0',
        overflow: 'hidden'
    });
    return ()=>{
        Object.assign(htmlStyle, originalHtmlStyles);
        Object.assign(bodyStyle, originalBodyStyles);
        window.scrollTo({
            left: scrollX,
            top: scrollY,
            behavior: 'instant'
        });
    };
}
function preventScrollStandard(referenceElement) {
    const isFirefox = /firefox/i.test((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserAgent"])());
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ownerDocument"])(referenceElement);
    const html = doc.documentElement;
    const body = doc.body;
    const win = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ownerWindow"])(doc);
    const htmlStyle = html.style;
    const bodyStyle = body.style;
    let resizeRaf;
    let scrollX;
    let scrollY;
    let paddingProp;
    function lockScroll() {
        if (isFirefox) {
            // RTL <body> scrollbar
            const scrollbarX = Math.round(doc.documentElement.getBoundingClientRect().left) + doc.documentElement.scrollLeft;
            paddingProp = scrollbarX ? 'paddingLeft' : 'paddingRight';
            const scrollbarWidth = win.innerWidth - doc.documentElement.clientWidth;
            bodyStyle.overflow = 'hidden';
            htmlStyle.overflow = 'visible';
            if (scrollbarWidth) {
                bodyStyle[paddingProp] = `${scrollbarWidth}px`;
            }
            return;
        }
        const htmlComputedStyles = getComputedStyle(html);
        const bodyComputedStyles = getComputedStyle(body);
        const hasConstantOverflowY = htmlComputedStyles.overflowY === 'scroll' || bodyComputedStyles.overflowY === 'scroll';
        const hasConstantOverflowX = htmlComputedStyles.overflowX === 'scroll' || bodyComputedStyles.overflowX === 'scroll';
        scrollX = htmlStyle.left ? parseFloat(htmlStyle.left) : window.scrollX;
        scrollY = htmlStyle.top ? parseFloat(htmlStyle.top) : window.scrollY;
        originalHtmlStyles = {
            position: htmlStyle.position,
            top: htmlStyle.top,
            left: htmlStyle.left,
            right: htmlStyle.right,
            overflowX: htmlStyle.overflowX,
            overflowY: htmlStyle.overflowY
        };
        originalBodyStyles = {
            overflowX: bodyStyle.overflowX,
            overflowY: bodyStyle.overflowY
        };
        const isScrollableY = html.scrollHeight > html.clientHeight;
        const isScrollableX = html.scrollWidth > html.clientWidth;
        // Handle `scrollbar-gutter` in Chrome when there is no scrollable content.
        const hasScrollbarGutterStable = htmlComputedStyles.scrollbarGutter?.includes('stable');
        // Safari needs visual viewport offsets added to account for pinch-zoom
        const webkit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isWebKit"])();
        const { x, y } = getVisualOffsets(doc);
        const visualX = webkit ? x : 0;
        const visualY = webkit ? y : 0;
        if (!hasScrollbarGutterStable) {
            Object.assign(htmlStyle, {
                position: 'fixed',
                top: `${-scrollY + visualY}px`,
                left: `${-scrollX + visualX}px`,
                right: '0'
            });
        }
        Object.assign(htmlStyle, {
            overflowY: !hasScrollbarGutterStable && (isScrollableY || hasConstantOverflowY) ? 'scroll' : 'hidden',
            overflowX: !hasScrollbarGutterStable && (isScrollableX || hasConstantOverflowX) ? 'scroll' : 'hidden'
        });
        // Ensure two scrollbars can't appear since `<html>` now has a forced scrollbar, but the
        // `<body>` may have one too.
        if (isScrollableY || hasConstantOverflowY) {
            bodyStyle.overflowY = 'visible';
        }
        if (isScrollableX || hasConstantOverflowX) {
            bodyStyle.overflowX = 'visible';
        }
    }
    function cleanup() {
        if (isFirefox) {
            Object.assign(bodyStyle, {
                overflow: '',
                [paddingProp]: ''
            });
            Object.assign(htmlStyle, {
                overflow: ''
            });
            return;
        }
        Object.assign(htmlStyle, originalHtmlStyles);
        Object.assign(bodyStyle, originalBodyStyles);
        if (window.scrollTo.toString().includes('[native code]')) {
            window.scrollTo({
                left: scrollX,
                top: scrollY,
                behavior: 'instant'
            });
        }
    }
    function handleResize() {
        cleanup();
        cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(lockScroll);
    }
    lockScroll();
    window.addEventListener('resize', handleResize);
    return ()=>{
        cancelAnimationFrame(resizeRaf);
        cleanup();
        window.removeEventListener('resize', handleResize);
    };
}
function useScrollLock(enabled = true, referenceElement) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEnhancedEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEnhancedEffect"])(()=>{
        if (!enabled) {
            return undefined;
        }
        preventScrollCount += 1;
        if (preventScrollCount === 1) {
            restore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$detectBrowser$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isIOS"])() ? preventScrollIOS(referenceElement) : preventScrollStandard(referenceElement);
        }
        return ()=>{
            preventScrollCount -= 1;
            if (preventScrollCount === 0) {
                restore();
            }
        };
    }, [
        enabled,
        referenceElement
    ]);
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/useMenuRoot.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useMenuRoot": (()=>useMenuRoot)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/mergeReactProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useTransitionStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useTransitionStatus.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useEventCallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useControlled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useControlled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useAfterExitAnimation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useAfterExitAnimation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useScrollLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useScrollLock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@floating-ui+react@0.27.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@floating-ui/react/dist/floating-ui.react.mjs [app-ssr] (ecmascript) <locals>");
'use client';
;
;
;
;
;
;
;
;
;
const EMPTY_ARRAY = [];
function useMenuRoot(parameters) {
    const { open: openParam, defaultOpen, onOpenChange, orientation, direction, disabled, nested, closeParentOnEsc, loop, delay, openOnHover, onTypingChange, modal } = parameters;
    const [triggerElement, setTriggerElement] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(null);
    const [positionerElement, setPositionerElementUnwrapped] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(null);
    const popupRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(null);
    const positionerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(null);
    const [hoverEnabled, setHoverEnabled] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(true);
    const [activeIndex, setActiveIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(null);
    const [open, setOpenUnwrapped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useControlled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useControlled"])({
        controlled: openParam,
        default: defaultOpen,
        name: 'useMenuRoot',
        state: 'open'
    });
    const setPositionerElement = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((value)=>{
        positionerRef.current = value;
        setPositionerElementUnwrapped(value);
    }, []);
    const allowMouseUpTriggerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useScrollLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScrollLock"])(modal && open, triggerElement);
    const { mounted, setMounted, transitionStatus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useTransitionStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransitionStatus"])(open);
    const setOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventCallback"])((nextOpen, event)=>{
        onOpenChange?.(nextOpen, event);
        setOpenUnwrapped(nextOpen);
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useAfterExitAnimation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAfterExitAnimation"])({
        open,
        animatedElementRef: popupRef,
        onFinished: ()=>setMounted(false)
    });
    const floatingRootContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFloatingRootContext"])({
        elements: {
            reference: triggerElement,
            floating: positionerElement
        },
        open,
        onOpenChange: setOpen
    });
    const hover = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useHover"])(floatingRootContext, {
        enabled: hoverEnabled && openOnHover && !disabled,
        handleClose: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["safePolygon"])({
            blockPointerEvents: true
        }),
        mouseOnly: true,
        delay: {
            open: delay
        }
    });
    const click = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useClick"])(floatingRootContext, {
        enabled: !disabled,
        event: 'mousedown',
        toggle: !nested,
        ignoreMouse: nested
    });
    const dismiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useDismiss"])(floatingRootContext, {
        bubbles: closeParentOnEsc && nested,
        outsidePressEvent: 'mousedown'
    });
    const role = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useRole"])(floatingRootContext, {
        role: 'menu'
    });
    const itemDomElements = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef([]);
    const itemLabels = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef([]);
    const listNavigation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useListNavigation"])(floatingRootContext, {
        enabled: !disabled,
        listRef: itemDomElements,
        activeIndex,
        nested,
        loop,
        orientation,
        rtl: direction === 'rtl',
        disabledIndices: EMPTY_ARRAY,
        onNavigate: setActiveIndex
    });
    const typeahead = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useTypeahead"])(floatingRootContext, {
        listRef: itemLabels,
        activeIndex,
        resetMs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TYPEAHEAD_RESET_MS"],
        onMatch: (index)=>{
            if (open && index !== activeIndex) {
                setActiveIndex(index);
            }
        },
        onTypingChange
    });
    const { getReferenceProps, getFloatingProps, getItemProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useInteractions"])([
        hover,
        click,
        dismiss,
        role,
        listNavigation,
        typeahead
    ]);
    const getTriggerProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((externalProps)=>getReferenceProps((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeReactProps"])(externalProps, {
            onMouseEnter: ()=>{
                setHoverEnabled(true);
            }
        })), [
        getReferenceProps
    ]);
    const getPopupProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((externalProps)=>getFloatingProps((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeReactProps"])(externalProps, {
            onMouseEnter: ()=>{
                setHoverEnabled(false);
            }
        })), [
        getFloatingProps
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            activeIndex,
            allowMouseUpTriggerRef,
            floatingRootContext,
            getItemProps,
            getPopupProps,
            getTriggerProps,
            itemDomElements,
            itemLabels,
            mounted,
            open,
            popupRef,
            positionerRef,
            setOpen,
            setPositionerElement,
            setTriggerElement,
            transitionStatus
        }), [
        activeIndex,
        floatingRootContext,
        getItemProps,
        getPopupProps,
        getTriggerProps,
        itemDomElements,
        itemLabels,
        mounted,
        open,
        positionerRef,
        setOpen,
        transitionStatus,
        setPositionerElement
    ]);
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/MenuRoot.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuRoot": (()=>MenuRoot)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/direction-provider/DirectionContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/MenuRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$useMenuRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/useMenuRoot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$portal$2f$PortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/portal/PortalContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@floating-ui+react@0.27.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@floating-ui/react/dist/floating-ui.react.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const inertStyle = `
  [data-floating-ui-inert] {
    pointer-events: none !important;
  }
`;
/**
 * Groups all parts of the menu.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ const MenuRoot = function MenuRoot(props) {
    const { children, defaultOpen = false, disabled = false, closeParentOnEsc = true, loop = true, modal = true, onOpenChange, open, orientation = 'vertical', delay = 100, openOnHover: openOnHoverProp } = props;
    const direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$direction$2d$provider$2f$DirectionContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDirection"])();
    const parentContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuRootContext"])(true);
    const nested = parentContext != null;
    const openOnHover = openOnHoverProp ?? nested;
    const typingRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(false);
    const onTypingChange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((nextTyping)=>{
        typingRef.current = nextTyping;
    }, []);
    const menuRoot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$useMenuRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuRoot"])({
        direction,
        disabled,
        closeParentOnEsc,
        onOpenChange,
        loop,
        defaultOpen,
        open,
        orientation,
        nested,
        openOnHover,
        delay,
        onTypingChange,
        modal
    });
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            ...menuRoot,
            nested,
            parentContext,
            disabled,
            allowMouseUpTriggerRef: parentContext?.allowMouseUpTriggerRef ?? menuRoot.allowMouseUpTriggerRef,
            typingRef,
            modal
        }), [
        menuRoot,
        nested,
        parentContext,
        disabled,
        modal
    ]);
    if (!nested) {
        // set up a FloatingTree to provide the context to nested menus
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FloatingTree"], {
            children: [
                menuRoot.open && modal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("style", {
                    dangerouslySetInnerHTML: {
                        __html: inertStyle
                    }
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuRootContext"].Provider, {
                    value: context,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$portal$2f$PortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PortalContext"].Provider, {
                        value: context.mounted,
                        children: children
                    })
                })
            ]
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuRootContext"].Provider, {
        value: context,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$portal$2f$PortalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PortalContext"].Provider, {
            value: context.mounted,
            children: children
        })
    });
};
("TURBOPACK compile-time truthy", 1) ? MenuRoot.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * When in a submenu, determines whether pressing the Escape key
   * closes the entire menu, or only the current child menu.
   * @default true
   */ closeParentOnEsc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Whether the menu is initially open.
   *
   * To render a controlled menu, use the `open` prop instead.
   * @default false
   */ defaultOpen: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * How long to wait before the menu may be opened on hover. Specified in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 100
   */ delay: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
    /**
   * Whether the component should ignore user interaction.
   * @default false
   */ disabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Whether to loop keyboard focus back to the first item
   * when the end of the list is reached while using the arrow keys.
   * @default true
   */ loop: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Whether the menu should prevent outside clicks and lock page scroll when open.
   * @default true
   */ modal: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Event handler called when the menu is opened or closed.
   */ onOpenChange: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * Whether the menu is currently open.
   */ open: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Whether the menu should also open when the trigger is hovered.
   *
   * Defaults to `true` for nested menus.
   */ openOnHover: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * The visual orientation of the menu.
   * Controls whether roving focus uses up/down or left/right arrow keys.
   * @default 'vertical'
   */ orientation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOf([
        'horizontal',
        'vertical'
    ])
} : ("TURBOPACK unreachable", undefined);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/trigger/useMenuTrigger.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useMenuTrigger": (()=>useMenuTrigger)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/use-button/useButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useForkRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/mergeReactProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/owner.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@floating-ui+react@0.27.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@floating-ui/react/dist/floating-ui.react.utils.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function useMenuTrigger(parameters) {
    const { disabled = false, rootRef: externalRef, open, setOpen, setTriggerElement, positionerRef, allowMouseUpTriggerRef } = parameters;
    const triggerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(null);
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForkRef"])(externalRef, triggerRef);
    const eventHandlerTimeoutRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(-1);
    const allowMouseUpTriggerTimeoutRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(-1);
    const { getButtonProps, buttonRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$use$2d$button$2f$useButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useButton"])({
        disabled,
        buttonRef: mergedRef
    });
    const handleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForkRef"])(buttonRef, setTriggerElement);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
        if (open) {
            // mousedown -> mouseup on menu item should not trigger it within 200ms.
            allowMouseUpTriggerTimeoutRef.current = window.setTimeout(()=>{
                allowMouseUpTriggerRef.current = true;
            }, 200);
            return ()=>{
                clearTimeout(allowMouseUpTriggerTimeoutRef.current);
                allowMouseUpTriggerTimeoutRef.current = -1;
            };
        }
        allowMouseUpTriggerRef.current = false;
        if (eventHandlerTimeoutRef.current !== -1) {
            clearTimeout(eventHandlerTimeoutRef.current);
            eventHandlerTimeoutRef.current = -1;
        }
        return undefined;
    }, [
        allowMouseUpTriggerRef,
        open
    ]);
    const getTriggerProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((externalProps)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$mergeReactProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeReactProps"])(externalProps, {
            'aria-haspopup': 'menu',
            tabIndex: 0,
            // this is needed to make the button focused after click in Safari
            ref: handleRef,
            onMouseDown: (event)=>{
                if (open) {
                    return;
                }
                const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ownerDocument"])(event.currentTarget);
                function handleMouseUp(mouseEvent) {
                    if (!triggerRef.current) {
                        return;
                    }
                    const mouseUpTarget = mouseEvent.target;
                    const triggerRect = triggerRef.current.getBoundingClientRect();
                    const isInsideTrigger = mouseEvent.clientX >= triggerRect.left && mouseEvent.clientX <= triggerRect.right && mouseEvent.clientY >= triggerRect.top && mouseEvent.clientY <= triggerRect.bottom;
                    if (isInsideTrigger || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(positionerRef.current, mouseUpTarget) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["contains"])(triggerRef.current, mouseUpTarget)) {
                        return;
                    }
                    setOpen(false, mouseEvent);
                }
                // Firefox can fire this upon mousedown
                eventHandlerTimeoutRef.current = window.setTimeout(()=>{
                    doc.addEventListener('mouseup', handleMouseUp, {
                        once: true
                    });
                });
            },
            onClick: ()=>{
                allowMouseUpTriggerRef.current = false;
                if (allowMouseUpTriggerTimeoutRef.current !== -1) {
                    clearTimeout(allowMouseUpTriggerTimeoutRef.current);
                    allowMouseUpTriggerTimeoutRef.current = -1;
                }
            }
        }, getButtonProps());
    }, [
        getButtonProps,
        handleRef,
        open,
        setOpen,
        positionerRef,
        allowMouseUpTriggerRef
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            getTriggerProps,
            triggerRef: handleRef
        }), [
        getTriggerProps,
        handleRef
    ]);
}
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/trigger/MenuTrigger.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuTrigger": (()=>MenuTrigger)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$trigger$2f$useMenuTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/trigger/useMenuTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/MenuRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useComponentRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
/**
 * A button that opens the menu.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ const MenuTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function MenuTrigger(props, forwardedRef) {
    const { render, className, disabled = false, ...other } = props;
    const { getTriggerProps: getRootTriggerProps, disabled: menuDisabled, setTriggerElement, open, setOpen, allowMouseUpTriggerRef, positionerRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuRootContext"])();
    const { getTriggerProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$trigger$2f$useMenuTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuTrigger"])({
        disabled: disabled || menuDisabled,
        rootRef: forwardedRef,
        setTriggerElement,
        open,
        setOpen,
        allowMouseUpTriggerRef,
        positionerRef
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            open
        }), [
        open
    ]);
    const { renderElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComponentRenderer"])({
        render: render || 'button',
        className,
        state,
        propGetter: (externalProps)=>getRootTriggerProps(getTriggerProps(externalProps)),
        customStyleHookMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressableTriggerOpenStateMapping"],
        extraProps: other
    });
    return renderElement();
});
("TURBOPACK compile-time truthy", 1) ? MenuTrigger.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component’s state.
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * Whether the component should ignore user interaction.
   * @default false
   */ disabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Allows you to replace the component’s HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */ render: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].element,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ])
} : ("TURBOPACK unreachable", undefined);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/separator/Separator.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Separator": (()=>Separator)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useComponentRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const EMPTY_OBJECT = {};
/**
 * A separator element accessible to screen readers.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Separator](https://base-ui.com/react/components/separator)
 */ const Separator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function SeparatorComponent(props, forwardedRef) {
    const { className, render, ...other } = props;
    const { renderElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComponentRenderer"])({
        render: render ?? 'div',
        className,
        state: EMPTY_OBJECT,
        extraProps: {
            role: 'separator',
            ...other
        },
        ref: forwardedRef
    });
    return renderElement();
});
("TURBOPACK compile-time truthy", 1) ? Separator.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component’s state.
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * Allows you to replace the component’s HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */ render: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].element,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ])
} : ("TURBOPACK unreachable", undefined);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/submenu-trigger/useMenuSubmenuTrigger.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useMenuSubmenuTrigger": (()=>useMenuSubmenuTrigger),
    "useSubmenuTrigger": (()=>useSubmenuTrigger)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$item$2f$useMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/item/useMenuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useForkRef.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function useMenuSubmenuTrigger(parameters) {
    const { id, highlighted, disabled, ref: externalRef, menuEvents, setTriggerElement, allowMouseUpTriggerRef, typingRef } = parameters;
    const { getRootProps: getMenuItemProps, rootRef: menuItemRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$item$2f$useMenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuItem"])({
        closeOnClick: false,
        disabled,
        highlighted,
        id,
        menuEvents,
        ref: externalRef,
        allowMouseUpTriggerRef,
        typingRef
    });
    const menuTriggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForkRef"])(menuItemRef, setTriggerElement);
    const getRootProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useCallback((externalProps)=>{
        return {
            ...getMenuItemProps({
                'aria-haspopup': 'menu',
                ...externalProps
            }),
            ref: menuTriggerRef
        };
    }, [
        getMenuItemProps,
        menuTriggerRef
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            getRootProps,
            rootRef: menuTriggerRef
        }), [
        getRootProps,
        menuTriggerRef
    ]);
}
let useSubmenuTrigger;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/submenu-trigger/MenuSubmenuTrigger.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MenuSubmenuTrigger": (()=>MenuSubmenuTrigger)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/MenuRootContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useBaseUiId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useComponentRenderer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$submenu$2d$trigger$2f$useMenuSubmenuTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/submenu-trigger/useMenuSubmenuTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/useForkRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/utils/popupStateMapping.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/composite/list/useCompositeListItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@floating-ui+react@0.27.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@floating-ui/react/dist/floating-ui.react.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/prop-types@15.8.1/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
/**
 * A menu item that opens a submenu.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */ const MenuSubmenuTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(function SubmenuTriggerComponent(props, forwardedRef) {
    const { render, className, disabled = false, label, id: idProp, ...other } = props;
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useBaseUiId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseUiId"])(idProp);
    const { getTriggerProps, parentContext, setTriggerElement, allowMouseUpTriggerRef, open, typingRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRootContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuRootContext"])();
    if (parentContext === undefined) {
        throw new Error('Base UI: ItemTrigger must be placed in a nested Menu.');
    }
    const { activeIndex, getItemProps } = parentContext;
    const item = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$composite$2f$list$2f$useCompositeListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompositeListItem"])();
    const highlighted = activeIndex === item.index;
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForkRef"])(forwardedRef, item.ref);
    const { events: menuEvents } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$floating$2d$ui$2b$react$40$0$2e$27$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$floating$2d$ui$2f$react$2f$dist$2f$floating$2d$ui$2e$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useFloatingTree"])();
    const { getRootProps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$submenu$2d$trigger$2f$useMenuSubmenuTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMenuSubmenuTrigger"])({
        id,
        highlighted,
        ref: mergedRef,
        disabled,
        menuEvents,
        setTriggerElement,
        allowMouseUpTriggerRef,
        typingRef
    });
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$3_$40$babel$2b$core$40$7$2e$26$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_sass$40$1$2e$83$2e$1$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useMemo(()=>({
            disabled,
            highlighted,
            open
        }), [
        disabled,
        highlighted,
        open
    ]);
    const { renderElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$useComponentRenderer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComponentRenderer"])({
        render: render || 'div',
        className,
        state,
        propGetter: (externalProps)=>getTriggerProps(getItemProps(getRootProps(externalProps))),
        customStyleHookMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$utils$2f$popupStateMapping$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["triggerOpenStateMapping"],
        extraProps: other
    });
    return renderElement();
});
("TURBOPACK compile-time truthy", 1) ? MenuSubmenuTrigger.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * @ignore
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * CSS class applied to the element, or a function that
   * returns a class based on the component’s state.
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * Whether the component should ignore user interaction.
   * @default false
   */ disabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * @ignore
   */ id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * Overrides the text label to use when the item is matched during keyboard text navigation.
   */ label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * @ignore
   */ onClick: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * Allows you to replace the component’s HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */ render: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].element,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$prop$2d$types$40$15$2e$8$2e$1$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ])
} : ("TURBOPACK unreachable", undefined);
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/index.parts.js [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/index.parts.js [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$arrow$2f$MenuArrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/arrow/MenuArrow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$backdrop$2f$MenuBackdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/backdrop/MenuBackdrop.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$checkbox$2d$item$2f$MenuCheckboxItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/checkbox-item/MenuCheckboxItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$checkbox$2d$item$2d$indicator$2f$MenuCheckboxItemIndicator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/checkbox-item-indicator/MenuCheckboxItemIndicator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$group$2f$MenuGroup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/group/MenuGroup.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$group$2d$label$2f$MenuGroupLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/group-label/MenuGroupLabel.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$item$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/item/MenuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$popup$2f$MenuPopup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/popup/MenuPopup.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$portal$2f$Portal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/portal/Portal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$positioner$2f$MenuPositioner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/positioner/MenuPositioner.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$group$2f$MenuRadioGroup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-group/MenuRadioGroup.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$item$2f$MenuRadioItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-item/MenuRadioItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$item$2d$indicator$2f$MenuRadioItemIndicator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-item-indicator/MenuRadioItemIndicator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/MenuRoot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$trigger$2f$MenuTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/trigger/MenuTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$separator$2f$Separator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/separator/Separator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$submenu$2d$trigger$2f$MenuSubmenuTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/submenu-trigger/MenuSubmenuTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/index.parts.js [app-ssr] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/index.js [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
;
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/index.js [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/index.parts.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/index.js [app-ssr] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/index.parts.js [app-ssr] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Arrow": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$arrow$2f$MenuArrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuArrow"]),
    "Backdrop": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$backdrop$2f$MenuBackdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuBackdrop"]),
    "CheckboxItem": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$checkbox$2d$item$2f$MenuCheckboxItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuCheckboxItem"]),
    "CheckboxItemIndicator": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$checkbox$2d$item$2d$indicator$2f$MenuCheckboxItemIndicator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuCheckboxItemIndicator"]),
    "Group": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$group$2f$MenuGroup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuGroup"]),
    "GroupLabel": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$group$2d$label$2f$MenuGroupLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuGroupLabel"]),
    "Item": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$item$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuItem"]),
    "Popup": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$popup$2f$MenuPopup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuPopup"]),
    "Portal": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$portal$2f$Portal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"]),
    "Positioner": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$positioner$2f$MenuPositioner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuPositioner"]),
    "RadioGroup": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$group$2f$MenuRadioGroup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuRadioGroup"]),
    "RadioItem": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$item$2f$MenuRadioItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuRadioItem"]),
    "RadioItemIndicator": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$item$2d$indicator$2f$MenuRadioItemIndicator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuRadioItemIndicator"]),
    "Root": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuRoot"]),
    "Separator": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$separator$2f$Separator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"]),
    "SubmenuTrigger": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$submenu$2d$trigger$2f$MenuSubmenuTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuSubmenuTrigger"]),
    "Trigger": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$trigger$2f$MenuTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuTrigger"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$arrow$2f$MenuArrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/arrow/MenuArrow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$backdrop$2f$MenuBackdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/backdrop/MenuBackdrop.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$checkbox$2d$item$2f$MenuCheckboxItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/checkbox-item/MenuCheckboxItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$checkbox$2d$item$2d$indicator$2f$MenuCheckboxItemIndicator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/checkbox-item-indicator/MenuCheckboxItemIndicator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$group$2f$MenuGroup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/group/MenuGroup.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$group$2d$label$2f$MenuGroupLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/group-label/MenuGroupLabel.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$item$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/item/MenuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$popup$2f$MenuPopup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/popup/MenuPopup.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$portal$2f$Portal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/portal/Portal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$positioner$2f$MenuPositioner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/positioner/MenuPositioner.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$group$2f$MenuRadioGroup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-group/MenuRadioGroup.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$item$2f$MenuRadioItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-item/MenuRadioItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$radio$2d$item$2d$indicator$2f$MenuRadioItemIndicator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/radio-item-indicator/MenuRadioItemIndicator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$root$2f$MenuRoot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/root/MenuRoot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$separator$2f$Separator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/separator/Separator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$submenu$2d$trigger$2f$MenuSubmenuTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/submenu-trigger/MenuSubmenuTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$trigger$2f$MenuTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/trigger/MenuTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/index.parts.js [app-ssr] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/index.parts.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Arrow": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["Arrow"]),
    "Backdrop": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["Backdrop"]),
    "CheckboxItem": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["CheckboxItem"]),
    "CheckboxItemIndicator": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["CheckboxItemIndicator"]),
    "Group": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["Group"]),
    "GroupLabel": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["GroupLabel"]),
    "Item": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["Item"]),
    "Popup": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["Popup"]),
    "Portal": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["Portal"]),
    "Positioner": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["Positioner"]),
    "RadioGroup": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["RadioGroup"]),
    "RadioItem": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["RadioItem"]),
    "RadioItemIndicator": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["RadioItemIndicator"]),
    "Root": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["Root"]),
    "Separator": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["Separator"]),
    "SubmenuTrigger": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["SubmenuTrigger"]),
    "Trigger": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["Trigger"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/index.parts.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/index.parts.js [app-ssr] (ecmascript) <exports>");
}}),
"[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/index.parts.js [app-ssr] (ecmascript) <export * as Menu>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Menu": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$base$2d$ui$2d$components$2b$react$40$1$2e$0$2e$0$2d$alpha$2e$4_$40$types$2b$react$40$19$2e$0$2e$2_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f40$base$2d$ui$2d$components$2f$react$2f$esm$2f$menu$2f$index$2e$parts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@base-ui-components+react@1.0.0-alpha.4_@types+react@19.0.2_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/@base-ui-components/react/esm/menu/index.parts.js [app-ssr] (ecmascript)");
}}),

};

//# sourceMappingURL=e9400_%40base-ui-components_react_esm_1e5ddd._.js.map