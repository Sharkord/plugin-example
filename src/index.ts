import {
  type PluginContext,
  PluginSlot,
  type TPluginComponentsMapBySlotId,
  type TInvokerContext,
} from "@sharkord/plugin-sdk";
import { HomeTest } from "./components/test";

const components: TPluginComponentsMapBySlotId = {
  [PluginSlot.HOME_SCREEN]: [HomeTest],
};

const onLoad = async (ctx: PluginContext) => {
  ctx.log("My Plugin loaded");

  const settings = await ctx.settings.register([
    {
      key: "exampleValue",
      name: "Example Value",
      description: "An example setting for demonstration purposes",
      type: "string",
      defaultValue: "Hello World",
    },
  ]);

  // listen to an event (e.g., when a user joins a voice channel)
  ctx.events.on("user:joined", ({ userId, username }) => {
    ctx.log(`User joined: ${username} (ID: ${userId})`);
  });

  // this will register our components to be rendered in the specified slots
  ctx.ui.registerComponents(components);

  // register a command that users can execute
  ctx.commands.register({
    name: "hello",
    description: "Tells the executor hello with their user id.",
    args: [],
    async executes(invokerCtx: TInvokerContext) {
      return `Hello, ${invokerCtx.userId}! The current value of the example setting is: ${await settings.get("exampleValue")}`;
    },
  });
};

const onUnload = (ctx: PluginContext) => {
  ctx.log("My Plugin unloaded");
};

export { onLoad, onUnload, components };
