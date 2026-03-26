import { Button, Input, Separator } from "@sharkord/ui";
import { memo, useCallback, useState } from "react";
import { useCallAction } from "../store/hooks";

const Home = memo(() => {
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  const callAction = useCallAction();

  const onSumClick = useCallback(async () => {
    const result = await callAction("sum", { a, b });

    setResult(result);
  }, [a, b, callAction]);

  return (
    <div className="flex flex-col gap-2 w-full h-full p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Hello from Test Plugin!</h1>
        <p>This is a custom component rendered in the Home Screen slot.</p>
        <Button>This is a button from Sharkord UI</Button>
      </div>

      <Separator className="mt-4 mb-4" />

      <div className="flex flex-col gap-2">
        <div className="w-full justify-center flex">
          <span className="text-xs text-muted-foreground">
            The sum is calculated on the server.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
          />

          <p className="flex items-center">+</p>

          <Input
            type="number"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
          />

          <p className="flex items-center">=</p>

          <span className="text-xl">{result}</span>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <Button onClick={onSumClick}>Calculate</Button>
        </div>
      </div>
    </div>
  );
});

export { Home };
