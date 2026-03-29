import {
  createRegisterAction,
  createRegisterCommand,
  type PluginContext,
} from "@sharkord/plugin-sdk";
import type { Actions } from "../contracts/actions";
import type { Commands } from "../contracts/commands";

const onLoad = async (ctx: PluginContext) => {
  ctx.log("My Plugin loaded");

  const registerAction = createRegisterAction<Actions>(ctx);
  const registerCommand = createRegisterCommand<Commands>(ctx);

  // register settings that users can configure for your plugin in the settings menu
  const settings = await ctx.settings.register([
    {
      key: "exampleValue",
      name: "Example Value",
      description: "An example setting for demonstration purposes",
      type: "string",
      defaultValue: "Hello World",
    },
  ]);

  // enable the plugin's components (if any) to make them active in the UI
  ctx.ui.enable();

  // listen to an event (e.g., when a user joins the server) and log it to the console
  ctx.events.on("user:joined", ({ userId, username }) => {
    ctx.log(`User joined: ${username} (ID: ${userId})`);
  });

  // register a command that users can execute by typing "/hello" in the chat
  registerCommand(
    "hello",
    {
      description: "Tells the executor hello with their user id.",
      args: [{ name: "name", type: "string", required: true }],
    },
    async (invoker, args) => {
      const value = await settings.get("exampleValue");

      return `Hello, ${args.name}! The current value of exampleValue is: ${value}. Your user ID is: ${invoker.userId}`;
    },
  );

  // register a server action that can be called from the client
  registerAction("sum", async (invoker, payload) => {
    // this is a secure context, runs on the server, can access secrets and perform actions that the client cannot do
    return payload.a + payload.b;
  });
};

const onUnload = (ctx: PluginContext) => {
  ctx.log("My Plugin unloaded");
};

export { onLoad, onUnload };
