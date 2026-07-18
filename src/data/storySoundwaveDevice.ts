import type { Requirement, StoryChoice, StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storySoundwaveAssessment";

const cleanAssessmentRequirements: Requirement[] = [
  { type: "flag_not", key: "lied_to_soundwave_at_first_contact", equals: true },
  { type: "flag_not", key: "lied_to_soundwave_about_relay_site", equals: true },
  { type: "flag_not", key: "lied_to_soundwave_about_affiliation", equals: true },
  { type: "flag_not", key: "lied_to_soundwave_about_material", equals: true },
  { type: "flag_not", key: "relay_guard_interrupted_soundwave", equals: true },
  { type: "flag_not", key: "relay_worker_witnessed_soundwave", equals: true }
];

const deviceAuthorizationRedirects: NonNullable<StoryChoice["conditionalRedirects"]> = [
  {
    requirements: [
      ...cleanAssessmentRequirements,
      { type: "flag", key: "soundwave_future_contact", equals: "accepted" },
      { type: "stat", group: "relationship", key: "soundwave", min: 3 }
    ],
    nextSceneId: "HUMAN_SOUNDWAVE_TAKE_RELAY_DEVICE",
    effects: [{ type: "flag", key: "soundwave_authorized_relay_device", value: true }]
  },
  {
    requirements: [
      ...cleanAssessmentRequirements,
      { type: "flag", key: "soundwave_future_contact", equals: "conditional" },
      { type: "stat", group: "relationship", key: "soundwave", min: 2 }
    ],
    nextSceneId: "HUMAN_SOUNDWAVE_TAKE_RELAY_DEVICE",
    effects: [{ type: "flag", key: "soundwave_authorized_relay_device", value: true }]
  },
  {
    requirements: [
      ...cleanAssessmentRequirements,
      { type: "flag", key: "soundwave_future_contact", equals: "friend_safety_condition" },
      { type: "stat", group: "relationship", key: "soundwave", min: 2 }
    ],
    nextSceneId: "HUMAN_SOUNDWAVE_TAKE_RELAY_DEVICE",
    effects: [{ type: "flag", key: "soundwave_authorized_relay_device", value: true }]
  },
  {
    requirements: [
      ...cleanAssessmentRequirements,
      { type: "flag", key: "soundwave_future_contact", equals: "mutual_value" },
      { type: "stat", group: "relationship", key: "soundwave", min: 2 }
    ],
    nextSceneId: "HUMAN_SOUNDWAVE_TAKE_RELAY_DEVICE",
    effects: [{ type: "flag", key: "soundwave_authorized_relay_device", value: true }]
  }
];

const finalAssessment: StoryScene = {
  ...BASE_STORY.HUMAN_SOUNDWAVE_FINAL_ASSESSMENT,
  choices: [
    {
      ...BASE_STORY.HUMAN_SOUNDWAVE_FINAL_ASSESSMENT.choices[0],
      label: "Listen as Soundwave concludes the assessment.",
      conditionalRedirects: deviceAuthorizationRedirects
    }
  ]
};

const takeRelayDevice: StoryScene = {
  id: "HUMAN_SOUNDWAVE_TAKE_RELAY_DEVICE",
  origin: "human",
  chapter: 1,
  title: "One Final Instruction",
  speaker: "Soundwave",
  body: `Soundwave does not close the channel.

A sequence of lights travels across the relay unit as though he is checking it one final time.

“Assessment complete.”

The purple pulse steadies.

“Relay unit: no longer required at current location.”

{{friendOne}} looks from the device to the speaker grille.

“You want us to take it?”

“Correct.”

The instruction is direct.

“Remove the unit. Retain it.”`,
  choices: [
    {
      id: "human_remove_relay_device_for_soundwave",
      label: "Follow Soundwave's instruction and remove the device.",
      nextSceneId: "HUMAN_SOUNDWAVE_RELAY_DEVICE_ALARM",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "removed_relay_device", value: true },
        { type: "flag", key: "removed_relay_device_for_soundwave", value: true },
        { type: "inventory_add", item: "Recovered Decepticon relay device" }
      ]
    }
  ]
};

const relayDeviceAlarm: StoryScene = {
  id: "HUMAN_SOUNDWAVE_RELAY_DEVICE_ALARM",
  origin: "human",
  chapter: 1,
  title: "Too Loud",
  body: `You work the first connection free.

The second releases with a metallic snap.

When the final clamp comes loose, the device contracts around its remaining components and every purple light flashes at once.

A warning tone erupts from the casing.

It is not a quiet electronic chirp. The sound is sharp, mechanical, and loud enough to carry across the entire relay yard.

{{friendTwo}} stares at the device in your hands.

“That is going to bring every worker still here.”

{{friendOne}} is already moving toward the maintenance route.

“Run.”

The channel closes, but the warning tone continues.`,
  choices: [
    {
      id: "human_run_with_soundwave_relay_device",
      label: "Run with the device before the workers reach you.",
      nextSceneId: "HUMAN_SOUNDWAVE_ESCAPE_WITH_RELAY_DEVICE",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "completed_first_soundwave_contact", value: true },
        { type: "flag", key: "relay_device_alarm_triggered", value: true }
      ]
    }
  ]
};

const escapeWithRelayDevice: StoryScene = {
  id: "HUMAN_SOUNDWAVE_ESCAPE_WITH_RELAY_DEVICE",
  origin: "human",
  chapter: 1,
  title: "Run for the Highway",
  body: `The three of you run together.

The alarm continues to sound from the Cybertronian device as you cut between damaged structures and drop into the drainage route used to enter the site.

Voices rise behind you. A worker shouts for someone to check the maintenance side of the perimeter.

The trio does not stop.

You carry the device beneath the temporary fencing and climb out beside the highway beyond the final barricade.

Only then does the warning tone finally cut off.

The relay unit is still active. Its purple light returns to a slow, steady pulse in your hands.`,
  choices: [
    {
      id: "human_reach_highway_with_soundwave_device",
      label: "Keep moving toward the vehicle outside the perimeter.",
      nextSceneId: "HUMAN_RELAY_OUTSIDE_PERIMETER",
      timeCostHours: 1
    }
  ]
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_SOUNDWAVE_FINAL_ASSESSMENT: finalAssessment,
  HUMAN_SOUNDWAVE_TAKE_RELAY_DEVICE: takeRelayDevice,
  HUMAN_SOUNDWAVE_RELAY_DEVICE_ALARM: relayDeviceAlarm,
  HUMAN_SOUNDWAVE_ESCAPE_WITH_RELAY_DEVICE: escapeWithRelayDevice
};
