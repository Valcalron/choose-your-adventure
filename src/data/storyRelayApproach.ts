import type { StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyPack";

const relayApproach: StoryScene = {
  id: "HUMAN_RELAY_APPROACH",
  origin: "human",
  chapter: 1,
  title: "At the Roadblocks",
  body: `Emergency crews and police have blocked the main roads leading toward the damaged power-relay center.

From a distance, the three of you can see the checkpoint, the emergency vehicles, and smoke still rising beyond the hills.

{{friendOne}} studies the roadblock.

“Driving up openly would tell us whether anyone is being allowed through.”

{{friendTwo}} looks toward an older utility route leaving the highway before the checkpoint.

“Or we could decide this is far enough and leave.”

The trio has not crossed the restricted perimeter yet. You still have a choice about how far to push the investigation.`,
  choices: [
    {
      id: "human_drive_to_relay_roadblock",
      label: "Drive to the roadblock and ask whether you can enter.",
      nextSceneId: "HUMAN_RELAY_ROADBLOCK",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "approached_relay_roadblock", value: true },
        { type: "stat", group: "personality", key: "honesty", amount: 1 }
      ]
    },
    {
      id: "human_use_relay_maintenance_route",
      label: "Leave the vehicle before the checkpoint and use the old maintenance route.",
      nextSceneId: "HUMAN_RELAY_DEVICE_HUB",
      timeCostHours: 2,
      effects: [
        { type: "flag", key: "entered_relay_by_maintenance_route", value: true },
        { type: "stat", group: "personality", key: "curiosity", amount: 1 },
        { type: "stat", group: "personality", key: "ambition", amount: 1 }
      ]
    },
    {
      id: "human_turn_away_from_relay",
      label: "Turn around and leave before approaching the roadblock.",
      nextSceneId: "HUMAN_RELAY_TURN_BACK",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "turned_back_from_relay", value: true }]
    }
  ]
};

const relayRoadblock: StoryScene = {
  id: "HUMAN_RELAY_ROADBLOCK",
  origin: "human",
  chapter: 1,
  title: "The Checkpoint",
  body: `A police officer signals for the vehicle to stop before it reaches the temporary barriers.

You ask whether civilians are being allowed into the relay station.

The answer is immediate: no.

The site is unstable, emergency crews are still working, and no one without official authorization is being admitted. The officer directs you toward the open lane leading away from the checkpoint.

{{friendOne}} waits until the officer steps back before speaking.

“We asked. Now we either leave, or we find another way after we are out of sight.”`,
  choices: [
    {
      id: "human_accept_relay_roadblock_and_leave",
      label: "Accept the refusal, turn around, and leave.",
      nextSceneId: "HUMAN_RELAY_TURN_BACK",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "accepted_relay_roadblock", value: true }]
    },
    {
      id: "human_leave_roadblock_for_maintenance_route",
      label: "Drive away from the checkpoint, park out of sight, and use the maintenance route.",
      nextSceneId: "HUMAN_RELAY_DEVICE_HUB",
      timeCostHours: 2,
      effects: [
        { type: "flag", key: "circumvented_relay_roadblock", value: true },
        { type: "stat", group: "personality", key: "curiosity", amount: 1 },
        { type: "stat", group: "personality", key: "ambition", amount: 1 }
      ]
    }
  ]
};

const relayTurnBack: StoryScene = {
  id: "HUMAN_RELAY_TURN_BACK",
  origin: "human",
  chapter: 1,
  title: "Back From the Perimeter",
  body: `The damaged power station disappears behind you as the trio drives away.

Turning back does not erase what happened there. It only means you chose not to cross a guarded perimeter today.

At home, the television, the newspapers, and the road map are still available. So is the choice to stop involving yourselves entirely.`,
  choices: [
    {
      id: "human_map_autobots_after_relay_turnback",
      label: "Stay home, gather reports, and map the Autobots' movements instead.",
      nextSceneId: "HUMAN_FIND_ARK_MAP",
      timeCostHours: 48,
      effects: [
        { type: "flag", key: "researched_autobots", value: true },
        { type: "flag", key: "built_autobot_sighting_map", value: true },
        { type: "flag", key: "map_built_after_relay_turnback", value: true }
      ]
    },
    {
      id: "human_return_to_relay_after_turnback",
      label: "Reconsider and prepare to return to the relay station.",
      nextSceneId: "HUMAN_RELAY_TRIP_PREPARATION",
      timeCostHours: 1
    },
    {
      id: "human_stop_after_relay_turnback",
      label: "Stay home and stop looking for either faction.",
      nextSceneId: "ENDING_DOOR_STAYED_CLOSED",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "chose_isolation_after_relay_turnback", value: true }]
    }
  ]
};

const relayDeviceHub: StoryScene = {
  ...BASE_STORY.HUMAN_RELAY_DEVICE_HUB,
  body: `You are careful enough to get inside.

${BASE_STORY.HUMAN_RELAY_DEVICE_HUB.body}`
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_RELAY_APPROACH: relayApproach,
  HUMAN_RELAY_ROADBLOCK: relayRoadblock,
  HUMAN_RELAY_TURN_BACK: relayTurnBack,
  HUMAN_RELAY_DEVICE_HUB: relayDeviceHub
};
