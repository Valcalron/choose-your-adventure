import type { StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyShermanDamBroadcast";

const shermanDamNews: StoryScene = {
  ...BASE_STORY.HUMAN_SHERMAN_DAM_NEWS,
  choices: BASE_STORY.HUMAN_SHERMAN_DAM_NEWS.choices.map((choice) => {
    if (choice.id === "human_go_to_sherman_for_decepticons") {
      return {
        ...choice,
        nextSceneId: "HUMAN_SHERMAN_DAM_TRAVEL_START",
        timeCostHours: 0
      };
    }

    if (choice.id === "human_go_to_sherman_for_autobots") {
      return {
        ...choice,
        timeCostHours: 12
      };
    }

    return choice;
  })
};

const shermanDamTravelStart: StoryScene = {
  id: "HUMAN_SHERMAN_DAM_TRAVEL_START",
  origin: "human",
  chapter: 2,
  title: "Hours Away",
  body: `The decision to go is immediate. Reaching Sherman Dam is not.

The trio gathers the maps, notes, camera, food, water, and every piece of Cybertronian material that might matter. Then you begin the long drive toward the dam.

The breaking-news broadcast follows through the car radio. Closures spread across the highways nearest the river. Evacuation traffic moves in the opposite direction. Each update changes which roads remain open and makes it clearer that the battle may look very different by the time you arrive.

Sherman Dam is still hours away.

{{friendOne}} looks toward the Decepticon communicator.

“Before we drive all that way, should we see whether he answers?”

{{friendTwo}} keeps watching the road ahead.

“If Soundwave is there, he may already know more than the news does.”`,
  choices: [
    {
      id: "human_begin_long_drive_to_sherman",
      label: "Continue the long drive toward Sherman Dam.",
      nextSceneId: "HUMAN_SHERMAN_DAM_TRAVEL_WITHOUT_DEVICE",
      timeCostHours: 4,
      conditionalRedirects: [
        {
          requirements: [{ type: "inventory", item: "Recovered Decepticon relay device" }],
          nextSceneId: "HUMAN_SHERMAN_DAM_CONTACT_ATTEMPT",
          effects: [
            { type: "flag", key: "attempted_soundwave_contact_on_sherman_route", value: true },
            { type: "flag", key: "soundwave_received_sherman_contact_attempt", value: true },
            { type: "flag", key: "soundwave_busy_during_sherman_contact_attempt", value: true }
          ]
        }
      ]
    }
  ]
};

const shermanDamTravelWithoutDevice: StoryScene = {
  id: "HUMAN_SHERMAN_DAM_TRAVEL_WITHOUT_DEVICE",
  origin: "human",
  chapter: 2,
  title: "The Long Drive",
  body: `The trio has no working Decepticon communicator to try.

The radio becomes your only connection to the attack. Reports change as the drive continues: new road closures, expanding power failures, military aircraft, and warnings for civilians to remain away from the river corridor.

There is nothing to do except keep moving and hope the routes ahead remain open long enough to reach the outer emergency perimeter.`,
  choices: [
    {
      id: "human_finish_drive_to_sherman_without_device",
      label: "Continue toward the outer closures.",
      nextSceneId: "HUMAN_SHERMAN_DAM_DECEPTICON_ROUTE",
      timeCostHours: 8
    }
  ]
};

const shermanDamContactAttempt: StoryScene = {
  id: "HUMAN_SHERMAN_DAM_CONTACT_ATTEMPT",
  origin: "human",
  chapter: 2,
  title: "No Answer",
  body: `Several hours into the drive, the trio stops long enough to unwrap the communicator and place it where all three of you can see it.

You activate the same section that opened the channel at the relay station.

The slow purple pulse tightens into a narrow point. A second light travels across the casing, then disappears.

No voice follows.

You wait. {{friendOne}} checks the controls without touching them. {{friendTwo}} listens for the tone that preceded Soundwave's first answer.

Nothing changes.

Far ahead, Soundwave's systems register the contact attempt. He knows that the same three humans have tried to reach him during the Sherman Dam operation. He does not answer. Battlefield communications, command traffic, and the energy operation take priority.

The trio cannot know that. From inside the vehicle, all you know is that the device appeared to transmit something and Soundwave remained silent.

Whether the attempt failed, was ignored, or was merely recorded will have to remain unanswered for now.`,
  choices: [
    {
      id: "human_continue_after_unanswered_soundwave_attempt",
      label: "Put the communicator away and continue toward Sherman Dam.",
      nextSceneId: "HUMAN_SHERMAN_DAM_DECEPTICON_ROUTE",
      timeCostHours: 8
    }
  ]
};

const shermanDamDecepticonRoute: StoryScene = {
  ...BASE_STORY.HUMAN_SHERMAN_DAM_DECEPTICON_ROUTE,
  title: "The Outer Closures",
  body: `Hours after leaving home, the trio reaches the outermost emergency closures surrounding Sherman Dam.

The attack has continued throughout the drive. Radio reports describe changing power failures, military aircraft, Autobot sightings, and repeated warnings for civilians to stay away from the river corridor.

Traffic is being diverted long before the dam comes into view. Police barriers, evacuation vehicles, and blocked access roads make the final approach far more difficult than simply following the highway.

The Decepticons are somewhere beyond the closures. Reaching a place where one of them might notice the trio without mistaking you for an enemy, a hostage, or an obstacle is the next problem.`
};

const shermanDamAutobotRoute: StoryScene = {
  ...BASE_STORY.HUMAN_SHERMAN_DAM_AUTOBOT_ROUTE,
  title: "The Outer Closures",
  body: `Hours after leaving home, the trio reaches the outermost emergency closures surrounding Sherman Dam.

The attack has continued throughout the drive. Radio reports describe changing power failures, military aircraft, and possible Autobot sightings near the river corridor.

Traffic is being diverted long before the dam comes into view. Police barriers, evacuation vehicles, and blocked access roads make the final approach far more difficult than simply following the highway.

The Autobots are somewhere beyond the closures. The next problem is finding a safe place to be noticed without entering the battle itself.`
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_SHERMAN_DAM_NEWS: shermanDamNews,
  HUMAN_SHERMAN_DAM_TRAVEL_START: shermanDamTravelStart,
  HUMAN_SHERMAN_DAM_TRAVEL_WITHOUT_DEVICE: shermanDamTravelWithoutDevice,
  HUMAN_SHERMAN_DAM_CONTACT_ATTEMPT: shermanDamContactAttempt,
  HUMAN_SHERMAN_DAM_DECEPTICON_ROUTE: shermanDamDecepticonRoute,
  HUMAN_SHERMAN_DAM_AUTOBOT_ROUTE: shermanDamAutobotRoute
};
