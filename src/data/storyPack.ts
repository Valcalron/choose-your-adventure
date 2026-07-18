import type { StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storySoundwaveDevice";

const humanStart: StoryScene = {
  ...BASE_STORY.HUMAN_START,
  choices: BASE_STORY.HUMAN_START.choices.map((choice) =>
    choice.id === "human_investigate"
      ? {
          ...choice,
          nextSceneId: "HUMAN_RELAY_TRIP_PREPARATION"
        }
      : choice
  )
};

const relayTripPreparation: StoryScene = {
  id: "HUMAN_RELAY_TRIP_PREPARATION",
  origin: "human",
  chapter: 1,
  title: "Before You Leave",
  body: `The decision is made, but the damaged relay station is far enough away that the trio has time to stop at your house before heading toward the roadblocks.

{{friendOne}} is already checking the route.

{{friendTwo}} looks at the things scattered near the door.

“If we are really doing this, we should decide what we are carrying.”

You have pockets for small items. A backpack would make it easier to carry photographs, notes, supplies, or anything found at the site—but it would also be one more thing to keep track of while sneaking through a restricted area.`,
  choices: [
    {
      id: "human_take_backpack_to_relay",
      label: "Take a backpack before leaving the house.",
      nextSceneId: "HUMAN_RELAY_APPROACH",
      timeCostHours: 0,
      effects: [
        { type: "inventory_add", item: "Backpack" },
        { type: "flag", key: "relay_trip_carry_choice", value: "backpack" }
      ]
    },
    {
      id: "human_leave_with_pockets_only",
      label: "Leave without a pack and rely on your pockets.",
      nextSceneId: "HUMAN_RELAY_APPROACH",
      timeCostHours: 0,
      effects: [
        { type: "flag", key: "relay_trip_carry_choice", value: "pockets" }
      ]
    }
  ]
};

const relaySearchSite: StoryScene = {
  ...BASE_STORY.HUMAN_RELAY_SEARCH_SITE,
  body: `${BASE_STORY.HUMAN_RELAY_SEARCH_SITE.body}

{{relayComponentCarry}}`
};

const relayDeviceAlarm: StoryScene = {
  ...BASE_STORY.HUMAN_SOUNDWAVE_RELAY_DEVICE_ALARM,
  body: BASE_STORY.HUMAN_SOUNDWAVE_RELAY_DEVICE_ALARM.body.replace(
    "A warning tone erupts from the casing.",
    "{{relayDeviceCarry}}\n\nA warning tone erupts from the casing."
  )
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_START: humanStart,
  HUMAN_RELAY_TRIP_PREPARATION: relayTripPreparation,
  HUMAN_RELAY_SEARCH_SITE: relaySearchSite,
  HUMAN_SOUNDWAVE_RELAY_DEVICE_ALARM: relayDeviceAlarm
};
