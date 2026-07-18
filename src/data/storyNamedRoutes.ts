import type { StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyShermanDamAccess";

const relayDeviceHub: StoryScene = {
  ...BASE_STORY.HUMAN_RELAY_DEVICE_HUB,
  title: "Among the Damage"
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_RELAY_DEVICE_HUB: relayDeviceHub
};
