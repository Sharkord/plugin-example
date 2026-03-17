import {
  PluginSlot,
  type TPluginComponentsMapBySlotId,
} from "@sharkord/plugin-sdk";
import { Home } from "./components/home";

const components: TPluginComponentsMapBySlotId = {
  [PluginSlot.HOME_SCREEN]: [Home],
};

export { components };
