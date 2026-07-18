import type { Effect, StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storySoundwaveDevice";

const beginRelayInvestigationEffects: Effect[] = [
  { type: "flag", key: "examined_relay_device", value: false },
  { type: "flag", key: "documented_relay_device", value: false },
  { type: "flag", key: "searched_relay_site", value: false },
  { type: "flag", key: "contacted_soundwave_at_relay", value: false },
  { type: "flag", key: "relay_guard_interrupted_soundwave", value: false },
  { type: "flag", key: "reported_relay_findings", value: false }
];

const humanStart: StoryScene = {
  ...BASE_STORY.HUMAN_START,
  choices: BASE_STORY.HUMAN_START.choices
    .filter((choice) => choice.id !== "human_report")
    .map((choice) => {
      if (choice.id === "human_investigate") {
        return {
          ...choice,
          nextSceneId: "HUMAN_RELAY_TRIP_PREPARATION",
          effects: [...(choice.effects ?? []), { type: "flag", key: "reported_relay_findings", value: false }]
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
      effects: [{ type: "flag", key: "relay_trip_carry_choice", value: "pockets" }]
    }
  ]
};

const routeDecepticonResearchToRelay = (
  sceneId: string,
  choiceId: string,
  label: string
): StoryScene => {
  const scene = BASE_STORY[sceneId];

  return {
    ...scene,
    choices: scene.choices.map((choice) =>
      choice.id === choiceId
        ? {
            ...choice,
            label,
            nextSceneId: "HUMAN_RELAY_TRIP_PREPARATION",
            effects: [...(choice.effects ?? []), ...beginRelayInvestigationEffects]
          }
        : choice
    )
  };
};

const researchDecepticons = routeDecepticonResearchToRelay(
  "HUMAN_RESEARCH_DECEPTICONS",
  "human_wait_for_decepticon_attack",
  "Investigate the original power-relay station after the fighting has moved on."
);

const researchBothAutobotFirst = routeDecepticonResearchToRelay(
  "HUMAN_RESEARCH_BOTH_AUTOBOT_FIRST",
  "human_wait_for_decepticons_after_both",
  "Investigate what the Decepticons left at the original power-relay station."
);

const researchBothDecepticonFirst = routeDecepticonResearchToRelay(
  "HUMAN_RESEARCH_BOTH_DECEPTICON_FIRST",
  "human_wait_for_decepticons_after_both_reverse",
  "Investigate what the Decepticons left at the original power-relay station."
);

const homeHub: StoryScene = {
  ...BASE_STORY.HUMAN_HOME_HUB,
  choices: BASE_STORY.HUMAN_HOME_HUB.choices
    .filter((choice) => choice.id !== "human_home_wait_for_event")
    .map((choice) =>
      choice.id === "human_home_search_decepticons"
        ? {
            ...choice,
            label: "Investigate the original power-relay station and look for what the Decepticons left behind.",
            nextSceneId: "HUMAN_RELAY_TRIP_PREPARATION",
            effects: [...(choice.effects ?? []), ...beginRelayInvestigationEffects]
          }
        : choice
    )
};

const relayReturnHome: StoryScene = {
  ...BASE_STORY.HUMAN_RELAY_RETURN_HOME,
  choices: [
    {
      id: "human_report_relay_findings_for_autobots",
      label: "Report what the trio found and ask that the information be passed to the Autobots.",
      nextSceneId: "HUMAN_RELAY_REPORT_FINDINGS",
      timeCostHours: 1,
      requirements: [
        { type: "flag_not", key: "contacted_soundwave_at_relay", equals: true },
        { type: "flag_not", key: "reported_relay_findings", equals: true }
      ],
      effects: [
        { type: "flag", key: "reported_relay_findings", value: true },
        { type: "flag", key: "seeking_faction", value: "autobots" },
        { type: "flag", key: "pivoted_from_decepticon_investigation_to_autobots", value: true },
        { type: "stat", group: "faction", key: "autobot", amount: 1 },
        { type: "stat", group: "personality", key: "honesty", amount: 1 }
      ]
    },
    ...BASE_STORY.HUMAN_RELAY_RETURN_HOME.choices.filter(
      (choice) => choice.id !== "human_wait_for_next_decepticon_operation"
    )
  ]
};

const relayResearchAutobots: StoryScene = {
  ...BASE_STORY.HUMAN_RELAY_RESEARCH_AUTOBOTS,
  choices: BASE_STORY.HUMAN_RELAY_RESEARCH_AUTOBOTS.choices.filter(
    (choice) => choice.id !== "human_return_to_decepticon_search_after_relay"
  )
};

const relayReportFindings: StoryScene = {
  id: "HUMAN_RELAY_REPORT_FINDINGS",
  origin: "human",
  chapter: 1,
  title: "Report From Inside the Perimeter",
  body: `The authorities already know the relay station was attacked.

They do not know everything the three of you found after the fighting moved on.

You call the information number being repeated with the emergency broadcasts. At first, the dispatcher assumes you are reporting something seen on television. That changes when you describe the dark Cybertronian device, its purple pulse, the way it was connected directly to the power equipment, and the evidence the trio brought away from the site.

The call is transferred to someone taking detailed reports about Cybertronian technology.

You explain that the equipment was left by the Decepticons and that the Autobots should be told what remained at the station. The person on the line records the location, the device description, and everything the trio is willing to share. They cannot promise that an Autobot will contact you.

{{friendOne}} looks toward the notes and photographs.

“At least the information is moving toward the people trying to stop them.”

{{friendTwo}} looks at the Autobot sightings already gathered.

“And if we want to make sure the Autobots know, we may still have to find them ourselves.”`,
  choices: [
    {
      id: "human_turn_relay_report_toward_autobots",
      label: "Turn away from the Decepticon trail and begin looking for the Autobots.",
      nextSceneId: "HUMAN_RELAY_RESEARCH_AUTOBOTS",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "researched_autobots", value: true },
        { type: "stat", group: "faction", key: "autobot", amount: 1 }
      ]
    }
  ]
};

const legacyDamRedirect = (id: string): StoryScene => ({
  id,
  origin: "human",
  chapter: 1,
  title: "The Original Power Station",
  body: `There is no second dam attack to follow. The only confirmed Decepticon site available to the trio is the original power-relay station in the American Northwest.

Emergency crews have restricted the roads, but the damaged station may still contain evidence or equipment left behind after the battle.`,
  choices: [
    {
      id: `${id.toLowerCase()}_return_to_relay`,
      label: "Prepare to investigate the original power-relay station.",
      nextSceneId: "HUMAN_RELAY_TRIP_PREPARATION",
      timeCostHours: 0,
      effects: beginRelayInvestigationEffects
    }
  ]
});

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

const soundwaveEscapeWithRelayDevice: StoryScene = {
  ...BASE_STORY.HUMAN_SOUNDWAVE_ESCAPE_WITH_RELAY_DEVICE,
  choices: BASE_STORY.HUMAN_SOUNDWAVE_ESCAPE_WITH_RELAY_DEVICE.choices.map(
    (choice) =>
      choice.id === "human_reach_highway_with_soundwave_device"
        ? {
            ...choice,
            effects: [
              ...(choice.effects ?? []),
              { type: "flag", key: "chapter_one_complete", value: true },
              { type: "flag", key: "completed_decepticon_chapter_one", value: true }
            ]
          }
        : choice
  )
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_START: humanStart,
  HUMAN_RUN: humanRun,
  HUMAN_LEAVE_STATE: humanLeaveState,
  HUMAN_FIND_ARK_MAP: findArkMap,
  HUMAN_RESEARCH_DECEPTICONS: researchDecepticons,
  HUMAN_RESEARCH_BOTH_AUTOBOT_FIRST: researchBothAutobotFirst,
  HUMAN_RESEARCH_BOTH_DECEPTICON_FIRST: researchBothDecepticonFirst,
  HUMAN_HOME_HUB: homeHub,
  HUMAN_RELAY_TRIP_PREPARATION: relayTripPreparation,
  HUMAN_RELAY_RETURN_HOME: relayReturnHome,
  HUMAN_RELAY_RESEARCH_AUTOBOTS: relayResearchAutobots,
  HUMAN_RELAY_REPORT_FINDINGS: relayReportFindings,
  HUMAN_SHERMAN_DAM_NEWS: legacyDamRedirect("HUMAN_SHERMAN_DAM_NEWS"),
  HUMAN_SHERMAN_DAM_DECEPTICON_ROUTE: legacyDamRedirect("HUMAN_SHERMAN_DAM_DECEPTICON_ROUTE"),
  HUMAN_SHERMAN_DAM_AUTOBOT_ROUTE: legacyDamRedirect("HUMAN_SHERMAN_DAM_AUTOBOT_ROUTE"),
  HUMAN_RELAY_SEARCH_SITE: relaySearchSite,
  HUMAN_SOUNDWAVE_RELAY_DEVICE_ALARM: relayDeviceAlarm,
  HUMAN_SOUNDWAVE_ESCAPE_WITH_RELAY_DEVICE: soundwaveEscapeWithRelayDevice
};
