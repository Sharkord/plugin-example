import { build } from "@sharkord/plugin-cli";
import { PLUGIN_SDK_VERSION } from "@sharkord/plugin-sdk";
import fs from "fs/promises";

const copyPluginToSharkord = async (builtPluginPath: string) => {
  // adjust if necessary
  const sharkordPluginsPath = `${process.env.HOME}/.config/sharkord/plugins`;

  console.log(
    `Copying built plugin from ${builtPluginPath} to ${sharkordPluginsPath}...`,
  );

  await fs.cp(builtPluginPath, sharkordPluginsPath, {
    recursive: true,
  });
};

const result = await build({
  sdkRange: PLUGIN_SDK_VERSION,
});

// uncomment the following line to move the built plugin directly to the Sharkord plugins directory
// await copyPluginToSharkord(result.outDir);
