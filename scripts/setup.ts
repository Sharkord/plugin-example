import { $ } from "bun";
import fs from "fs";

const repos: [string, string[]][] = [
  ["sharkord", ["packages/plugin-sdk", "packages/ui"]],
  ["plugin-builder", ["."]],
];

const links = [
  "@sharkord/plugin-sdk",
  "@sharkord/ui",
  "@sharkord/plugin-builder",
];

for (const [name, packages] of repos) {
  const dir = `.repos/${name}`;

  if (fs.existsSync(dir)) {
    console.log(`Updating ${name}...`);
    await $`git -C ${dir} fetch --depth 1 origin`;
    await $`git -C ${dir} reset --hard FETCH_HEAD`;
  } else {
    console.log(`Cloning ${name}...`);
    await $`git clone --depth 1 https://github.com/Sharkord/${name}.git ${dir}`;
  }

  // --ignore-scripts: sharkord trusts mediasoup, whose install step compiles a
  // native worker from source on every core. Plugins only need its types.
  await $`bun install --ignore-scripts`.cwd(dir);
  for (const pkg of packages) await $`bun link`.cwd(`${dir}/${pkg}`);
}

await $`bun install`;
await $`bun link ${links}`;

console.log(
  "\nReady. Set SHARKORD_PLUGINS_PATH in .env, then `bun run build`.",
);
