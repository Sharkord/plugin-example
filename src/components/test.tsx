import { type TPluginSlotContext } from "@sharkord/plugin-sdk";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@sharkord/ui";
import { useState } from "react";

const HomeTest = ({ currentVoiceChannelId }: TPluginSlotContext) => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="flex flex-col gap-2 w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Hello from Test Plugin!</h1>
      <p>This is a custom component rendered in the Home Screen slot.</p>
      <Button>This is a button from Sharkord UI</Button>

      <span>Counter: {counter}</span>
      <Button onClick={() => setCounter((prev) => prev + 1)}>
        Increment Counter
      </Button>

      <p className="mt-4">
        {currentVoiceChannelId
          ? `You are currently in voice channel ID: ${currentVoiceChannelId}`
          : "You are not currently in a voice channel."}
      </p>
    </div>
  );
};

export { HomeTest };
