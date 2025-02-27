const CHUNK_PUBLIC_PATH = "server/pages/_document.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules__pnpm_ebf299._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__03c53a._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/.pnpm/next@15.1.3_@babel+core@7.26.0_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0_sass@1.83.1/node_modules/next/document.js [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
