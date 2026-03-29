import {
  PluginSlot,
  type TPluginComponentsMapBySlotId,
} from "@sharkord/plugin-sdk";
import { Home } from "./components/home";
import { FullScreen } from "./components/full-screen";

const components: TPluginComponentsMapBySlotId = {
  [PluginSlot.HOME_SCREEN]: [Home],
  [PluginSlot.FULL_SCREEN]: [FullScreen],
};

export { components };
