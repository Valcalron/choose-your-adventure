import type { StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storySoundwaveDevice";

const humanStart: StoryScene = {
  ...BASE_STORY.HUMAN_START,
  choices: BASE_STORY.HUMAN_START.choices.map((choice) => {
    if (choice.id === "human_investigate") {
      return {
        ...choice,
        nextSceneId: "HUMAN_RELAY_TRIP_PREPARATION"
      };
    }

    if (choice.id === "human_cautious") {
      return {
        ...choice,
        label: "Keep the three of you together, spend time gathering reports, and map the Autobots' movements.",
        nextSceneId: "HUMAN_FIND_ARK_MAP",
        timeCostHours: 48,
        effects: [
          ...(choice.effects ?? []),
          { type: "flag", key: "researched_autobots", value: true },
          { type: "flag", key: "built_autobot_sighting_map", value: true },
          { type: "flag", key: "map_built_without_direct_contact", value: true }
        ]
      };
    }

    return choice;
  })
};

const humanRun: StoryScene = {
  ...BASE_STORY.HUMAN_RUN,
  choices: BASE_STORY.HUMAN_RUN.choices
    .filter((choice) => choice.id !== "human_run_leave_area")
    .map((choice) =>
      choice.id === "human_run_leave_state"
        ? {
            ...choice,
            label: "Get in the car, leave the state, and stay out of the Cybertronian conflict."
          }
        : choice
    )
};

const humanLeaveState: StoryScene = {
  id: "HUMAN_LEAVE_STATE",
  origin: "human",
  chapter: 1,
  title: "Distance From the War",
  body: `The three of you get into the car and leave.

There is no investigation, no attempt to identify another disguised vehicle, and no plan to find either faction. You take the first open road leading away from the state and keep moving.

Traffic thickens near the state line. Radio stations repeat warnings about alien machines, damaged power systems, and roads closed after sightings. Whenever a report suggests Cybertronian activity ahead, you change direction.

{{friendOne}} and {{friendTwo}} remain with you. All three of you agree that surviving this means refusing to become part of it.

The Autobots and Decepticons continue their war on Earth, but the trio does not go looking for them again.

ENDING: DISTANCE FROM THE WAR`,
  choices: [],
  isEnding: true
};

const findArkMap: StoryScene = {
  ...BASE_STORY.HUMAN_FIND_ARK_MAP,
  body: `The three of you spread a road map across the table.

For two days, you gather every credible report available from television, radio, newspapers, and eyewitness calls. Information is slow and incomplete in 1984, but the Autobots keep appearing often enough to leave a pattern.

They travel as ground vehicles. After rescues and battles, they return to ordinary roads instead of flying away or disappearing over the ocean. Wherever they are staying, they must be able to reach it by road.

{{friendOne}} marks where Autobots have been seen and when each sighting occurred.

{{friendTwo}} traces the direction they arrived from and the roads they used when leaving.

You compare reports, cross out obvious mistakes, and watch for the places where several routes begin pointing toward the same broad region.

The map cannot reveal an exact entrance. It can show where the Autobots repeatedly disappear from public view.`
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
  HUMAN_RUN: humanRun,
  HUMAN_LEAVE_STATE: humanLeaveState,
  HUMAN_FIND_ARK_MAP: findArkMap,
  HUMAN_RELAY_TRIP_PREPARATION: relayTripPreparation,
  HUMAN_RELAY_SEARCH_SITE: relaySearchSite,
  HUMAN_SOUNDWAVE_RELAY_DEVICE_ALARM: relayDeviceAlarm
};