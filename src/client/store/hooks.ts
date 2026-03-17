import { useStoreSelector } from ".";
import { currentVoiceChannelIdSelector } from "./selectors";

export const useCurrentVoiceChannelId = () =>
  useStoreSelector(currentVoiceChannelIdSelector);
