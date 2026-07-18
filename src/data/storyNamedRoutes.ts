import type { StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyShermanDamAccess";

const relayDeviceHub: StoryScene = {
  ...BASE_STORY.HUMAN_RELAY_DEVICE_HUB,
  title: "Among the Damage"
};

const addDirectEntryChoice = (
  scene: StoryScene,
  choiceId: string
): StoryScene => ({
  ...scene,
  choices: [
    {
      id: choiceId,
      label: "Find a way into the secured area.",
      nextSceneId: "HUMAN_SHERMAN_DAM_SEARCH_FOR_ENTRY",
      timeCostHours: 2,
      effects: [
        { type: "flag", key: "actively_searching_for_sherman_entry", value: true },
        { type: "stat", group: "personality", key: "ambition", amount: 1 }
      ]
    },
    ...scene.choices
  ]
});

const shermanDamDecepticonRoute = addDirectEntryChoice(
  BASE_STORY.HUMAN_SHERMAN_DAM_DECEPTICON_ROUTE,
  "human_find_way_in_from_decepticon_perimeter"
);

const shermanDamAutobotRoute = addDirectEntryChoice(
  BASE_STORY.HUMAN_SHERMAN_DAM_AUTOBOT_ROUTE,
  "human_find_way_in_from_autobot_perimeter"
);

const shermanDamAccessMap: StoryScene = {
  ...BASE_STORY.HUMAN_SHERMAN_DAM_ACCESS_MAP,
  choices: [
    {
      id: "human_keep_searching_for_sherman_entry",
      label: "Keep searching for a way into the secured area.",
      nextSceneId: "HUMAN_SHERMAN_DAM_SEARCH_FOR_ENTRY",
      timeCostHours: 2,
      effects: [
        { type: "flag", key: "actively_searching_for_sherman_entry", value: true },
        { type: "stat", group: "personality", key: "ambition", amount: 1 }
      ]
    },
    ...BASE_STORY.HUMAN_SHERMAN_DAM_ACCESS_MAP.choices
  ]
};

const shermanDamSearchForEntry: StoryScene = {
  id: "HUMAN_SHERMAN_DAM_SEARCH_FOR_ENTRY",
  origin: "human",
  chapter: 2,
  title: "Search for a Way In",
  body: `The trio stops treating the road map as though every useful route must be a road.

You follow the outer edge of the closure on foot, staying on the public side while comparing the terrain with utility markings, drainage lines, and older service access shown on the map.

Most possibilities end at fencing, patrol vehicles, or open ground where anyone crossing would be immediately visible.

One does not.

A concrete drainage channel passes beneath the barricaded road and continues toward a lower utility corridor. It would carry the three of you beyond the first police closure without taking you through the checkpoint.

It would not place you at Sherman Dam. Federal and military security still lies farther ahead, and the channel may be watched from the other side.

{{friendOne}} studies the dark opening.

“It's a way past the first line.”

{{friendTwo}} looks toward the aircraft moving above the river corridor.

“Past one line. Not through all of them.”`,
  choices: [
    {
      id: "human_use_drainage_route_into_sherman_perimeter",
      label: "Use the drainage channel to get past the first closure.",
      nextSceneId: "HUMAN_SHERMAN_DAM_PERIMETER_WATCH",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "entered_first_sherman_closure", value: true },
        { type: "flag", key: "sherman_entry_route", value: "drainage_channel" }
      ]
    },
    {
      id: "human_decline_sherman_drainage_route",
      label: "Do not enter. Stay outside the closures and watch from a safe distance.",
      nextSceneId: "HUMAN_SHERMAN_DAM_OBSERVE_FROM_DISTANCE",
      timeCostHours: 1
    },
    {
      id: "human_turn_back_after_finding_sherman_route",
      label: "Decide that finding a route does not make using it wise, and turn back.",
      nextSceneId: "HUMAN_SHERMAN_DAM_TURN_BACK",
      timeCostHours: 1
    }
  ]
};

const shermanDamPerimeterWatch: StoryScene = {
  ...BASE_STORY.HUMAN_SHERMAN_DAM_PERIMETER_WATCH,
  title: "Between the Lines",
  body: `The trio settles into cover with another secured line still ahead.

Whether you remained outside the marked closure or found a way beyond the first barricade, Sherman Dam itself remains protected by deeper checkpoints, emergency traffic, and an active Cybertronian battle.

Aircraft cross overhead. Distant impacts carry through the terrain. Emergency vehicles continue moving along the controlled routes.

You have found a way farther in than ordinary traffic can go. You have not found a safe path to the dam.

For now, the three of you watch for movement away from the main operation and avoid drawing attention from the patrols between you and the river corridor.`,
  choices: [
    {
      id: "human_leave_between_sherman_lines",
      label: "Backtrack before the next patrol reaches this area.",
      nextSceneId: "HUMAN_SHERMAN_DAM_TURN_BACK",
      timeCostHours: 1
    },
    {
      id: "human_continue_studying_inner_sherman_security",
      label: "Remain concealed and study the deeper security line.",
      nextSceneId: "HUMAN_SHERMAN_DAM_ACCESS_MAP",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "studied_inner_sherman_security", value: true }]
    }
  ]
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_RELAY_DEVICE_HUB: relayDeviceHub,
  HUMAN_SHERMAN_DAM_DECEPTICON_ROUTE: shermanDamDecepticonRoute,
  HUMAN_SHERMAN_DAM_AUTOBOT_ROUTE: shermanDamAutobotRoute,
  HUMAN_SHERMAN_DAM_ACCESS_MAP: shermanDamAccessMap,
  HUMAN_SHERMAN_DAM_SEARCH_FOR_ENTRY: shermanDamSearchForEntry,
  HUMAN_SHERMAN_DAM_PERIMETER_WATCH: shermanDamPerimeterWatch
};