# Sharkord Plugin Example

A working plugin: a chat command, a server action called from a React
component, a setting, an event listener, persistent storage, and a
server-to-client push. Rename it and start deleting.

Read the [plugin docs](https://sharkord.com/docs/plugins/overview) for
everything this scaffold leaves out.

## Layout

```
manifest.json          the plugin's identity, and the SDK version it targets
src/server/index.ts    runs in the Sharkord server process
src/client/index.ts    declares which components render where
src/client/home.tsx    a component
```

The two halves share types, not code. `src/server/index.ts` declares one
`TSharkord` contract — its actions, its commands, and what it pushes — and the
server passes it to `PluginContext<TSharkord>` while the client imports it with
`import type`. Names and payloads are then checked on both sides, and the
import is erased before anything reaches the browser.

## Running it

```bash
bun install
```

Point `SHARKORD_PLUGINS_PATH` in `.env` at your server's plugins folder (see
`.env.example`), then:

```bash
bun run build
```

The plugin lands in `dist/plugin-example/` and is copied into your server.
Enable plugins in the server settings, then enable this one. Restart the
server to pick up a rebuild.

## Things that will bite you

- **`ctx.path` is deleted on every update.** Anything you want to keep goes in
  `ctx.dataPath`, which survives updates and is removed with the plugin.
- **Tailwind classes mostly do not work.** Sharkord compiles Tailwind from its
  own sources, so a class no Sharkord file uses is not in the stylesheet. Use
  inline styles, and reach for the host's CSS variables (`var(--foreground)`,
  `var(--primary)`, `var(--radius)`) so you stay in the user's theme.
- **`sdkVersion` must match the server's exactly** or the plugin refuses to
  load. `bun run build` writes the right one into `manifest.json` for you.
- **`version` comes from `package.json`**, not from `manifest.json`.
- **Keep `as const` on your settings definitions**, otherwise `settings.get`
  loses the type of what it returns.
- **`bun tsc --noEmit` reports errors from the linked SDK packages**, not from
  your code. Yours are the ones under `src/`.

## What else is there

Not in this scaffold, all in `PluginContext` with autocomplete: HTTP routes
with authentication, `hooks` that can reject or rewrite a message, file,
channel, voice join or login before it happens, 31 server events, per-user
storage (`ctx.userData`), moderation (`ctx.users`, `ctx.roles`,
`ctx.permissions`), channel and category CRUD, message pinning and reactions,
voice streams via mediasoup, and a `tabs` export that adds your own tabs to
the plugin's settings screen.
