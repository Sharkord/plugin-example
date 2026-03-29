import { memo } from "react";

const FullScreen = memo(() => {
  return (
    <div className="flex flex-col gap-2 w-full h-full p-4 items-center justify-center">
      <span className="text-xl font-bold">This is the Full Screen slot!</span>
    </div>
  );
});

export { FullScreen };
