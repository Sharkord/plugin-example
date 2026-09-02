import {
  createCallAction,
  usePush,
  useStoreSelector,
} from "@sharkord/plugin-sdk/client";
import { memo, useCallback, useState, type CSSProperties } from "react";
import type { TPlugin, TRoll } from "../types";

const callAction = createCallAction<TPlugin>();

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 12,
  padding: 16,
  color: "var(--foreground)",
};

const rowStyle: CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "center",
};

const buttonStyle: CSSProperties = {
  padding: "6px 14px",
  borderRadius: "var(--radius)",
  background: "var(--primary)",
  color: "var(--primary-foreground)",
};

const inputStyle: CSSProperties = {
  width: 80,
  padding: "6px 10px",
  borderRadius: "var(--radius)",
  border: "1px solid var(--border)",
};

const Home = memo(() => {
  const [sides, setSides] = useState(20);
  const [last, setLast] = useState<TRoll>();

  // a slice of Sharkord's own state, re-rendering when it changes
  const users = useStoreSelector((state) => state.users);

  // anything the server sent with `ctx.push`, including rolls other people
  // made. The contract types `data`, so there is nothing to cast.
  usePush<TPlugin>((roll) => setLast(roll));

  const onRoll = useCallback(async () => {
    // runs on the server, so the result is the same for everyone
    setLast(await callAction("roll", { sides }));
  }, [sides]);

  return (
    <div style={panelStyle}>
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>Plugin example</h1>

      <div style={rowStyle}>
        <input
          style={inputStyle}
          type="number"
          value={sides}
          onChange={(event) => setSides(Number(event.target.value))}
        />

        <button style={buttonStyle} onClick={onRoll}>
          Roll
        </button>
      </div>

      <span style={{ color: "var(--muted-foreground)" }}>
        {last
          ? `User ${last.userId} rolled ${last.value} on a d${last.sides}. (${last.total} rolls so far)`
          : `Nobody has rolled yet. ${users.length} user(s) on this server.`}
      </span>
    </div>
  );
});

export { Home };
