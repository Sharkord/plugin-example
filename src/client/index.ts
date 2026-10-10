import type { TPluginComponentsMapBySlotId } from "@sharkord/plugin-sdk/client";
import { Home } from "./home";
import { PluginSlot } from "../../../sharkord/packages/shared/src";

/**
 * Where your components render. A slot takes a list, so one plugin can put
 * several components in the same place. You cannot control the order, other plugins may render before or after you.
 */
const components: TPluginComponentsMapBySlotId = {
  [PluginSlot.HOME_SCREEN]: [Home],
};

export { components };
