import type { BunPlugin } from "bun";
import fs from "fs/promises";
import { PLUGIN_SDK_VERSION } from "@sharkord/plugin-sdk";

const pluginId = "plugin-example";
const outdir = `dist/${pluginId}`;

const clientGlobals: BunPlugin = {
  name: "client-globals",
  setup(build) {
    // since the client bundle is meant to run in the host app's context
    // we need to make sure it uses the same React instance as Sharkord instead of bundling its own copy
    // we workaround this by rewriting bare react/react-dom imports to reference the host app's React globals, which Sharkord exposes on the window object
    const globals: Record<string, string> = {
      react: "window.__SHARKORD_REACT__",
      "react/jsx-runtime": "window.__SHARKORD_REACT_JSX__",
      "react/jsx-dev-runtime": "window.__SHARKORD_REACT_JSX_DEV__",
      "react-dom": "window.__SHARKORD_REACT_DOM__",
      "react-dom/client": "window.__SHARKORD_REACT_DOM_CLIENT__",
    };

    for (const [mod, global] of Object.entries(globals)) {
      build.onResolve(
        { filter: new RegExp(`^${mod.replace("/", "\\/")}$`) },
        () => ({
          path: mod,
          namespace: "client-global",
        }),
      );

      build.onLoad(
        {
          filter: new RegExp(`^${mod.replace("/", "\\/")}$`),
          namespace: "client-global",
        },
        () => ({
          contents: `module.exports = ${global};`,
          loader: "js",
        }),
      );
    }
  },
};

await fs.rm(outdir, { recursive: true, force: true });

await Promise.all([
  Bun.build({
    entrypoints: ["src/server/index.ts"],
    outdir: `${outdir}/server`,
    target: "bun",
    minify: true,
    format: "esm",
    external: ["react", "react-dom"],
  }),

  Bun.build({
    entrypoints: ["src/client/index.ts"],
    outdir: `${outdir}/client`,
    target: "browser",
    minify: true,
    format: "esm",
    plugins: [clientGlobals],
  }),
]);

// patch package.json with correct plugin sdk version
const pkg = JSON.parse(await fs.readFile("package.json", "utf-8"));

pkg.sharkord.sdkRange = `${PLUGIN_SDK_VERSION}`;

await fs.writeFile(
  `${outdir}/package.json`,
  JSON.stringify(pkg, null, 2),
  "utf-8",
);
