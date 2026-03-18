import { type PluginContext } from "@sharkord/plugin-sdk";

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

  // enable the plugin's components (if any) to make them active in the UI
  ctx.ui.enable();

  // register a command that users can execute
  ctx.commands.register<{
    name: string;
  }>({
    name: "hello",
    description: "Tells the executor hello with their user id.",
    args: [
      {
        name: "name",
        description:
          "An example argument that the user can provide when executing the command",
        type: "string",
        required: true,
      },
    ],
    async executes(invokerCtx, args) {
      const value = await settings.get("exampleValue");

      return `Hello, ${args.name}! The current value of exampleValue is: ${value}. I was invoked by user with ID: ${invokerCtx.userId}`;
    },
  });
};

const onUnload = (ctx: PluginContext) => {
  ctx.log("My Plugin unloaded");
};

export { onLoad, onUnload };
