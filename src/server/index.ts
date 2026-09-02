import {
  type PluginContext,
  type TUpgradeInfo,
  type UnloadPluginContext,
  type UpgradePluginContext,
} from "@sharkord/plugin-sdk";
import path from "path";
import type { TPlugin, TRoll } from "../types";

const onLoad = async (ctx: PluginContext<TPlugin>) => {
  ctx.logger.log("Plugin example loaded");

  const settings = await ctx.settings.register([
    {
      key: "maxSides",
      name: "Maximum sides",
      description: "The largest die this plugin will roll.",
      type: "number",
      defaultValue: 20,
    },
  ] as const);

  const totalPath = path.join(ctx.dataPath, "total-rolls.txt");

  const readTotal = async () => {
    try {
      const file = Bun.file(totalPath);
      const text = await file.text();

      return Number(text) || 0;
    } catch (error) {
      return 0;
    }
  };

  const roll = async (userId: number, sides: number): Promise<TRoll> => {
    const max = Math.min(sides, settings.get("maxSides"));
    const total = (await readTotal()) + 1;

    await Bun.write(totalPath, String(total));

    const result = {
      userId,
      total,
      sides: max,
      value: 1 + Math.floor(Math.random() * max),
    };

    // every client of this plugin gets this, through `usePush` on the client
    ctx.push.toAll(result);

    return result;
  };

  // makes this plugin's components render. Pass a `{ [slot]: Permission }` map
  // to only show a slot to users who hold that permission.
  ctx.ui.enable();

  ctx.events.on("user:joined", ({ username }) => {
    ctx.logger.debug(`${username} joined`);
  });

  // typed in chat as `/roll 20`. The name and the shape of `execute` come from
  ctx.commands.register({
    name: "roll",
    description: "Rolls a die.",
    args: [{ name: "sides", type: "number", required: true }],
    // requires: Permission.JOIN_VOICE_CHANNELS, // uncomment to require a specific permission to use this command
    executes: async (invoker, args) => {
      const { value, sides } = await roll(invoker.userId, args.sides);

      return `You rolled ${value} on a d${sides}.`;
    },
  });

  // the same thing for your own UI: called from the client, runs here, so it
  // can reach secrets, the filesystem, and the rest of `ctx`.
  ctx.actions.register({
    name: "roll",
    // requires: Permission.JOIN_VOICE_CHANNELS, // uncomment to require a permission to use this action
    executes: (invoker, payload) => roll(invoker.userId, payload.sides),
  });
};

const onUnload = (ctx: UnloadPluginContext) => {
  ctx.logger.log("Plugin example unloaded");
};

const onUpgrade = (ctx: UpgradePluginContext, info: TUpgradeInfo) => {
  ctx.logger.log(`Upgraded from ${info.previousVersion} to ${info.version}`);
};

export { onLoad, onUnload, onUpgrade };
