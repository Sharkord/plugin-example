import {
  PluginSlot,
  type TPluginComponentsMapBySlotId,
} from "@sharkord/plugin-sdk";
import { HomeTest } from "./components/test";

const components: TPluginComponentsMapBySlotId = {
  [PluginSlot.HOME_SCREEN]: [HomeTest],
};

export { components };
