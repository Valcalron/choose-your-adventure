import type { StoryChoice, StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyInvestigation";

const RELAY_DISCOVERY_CHANCE = 0.15;

const addDiscoveryChance = (
  choice: StoryChoice,
  action: string,
  nextSceneId = "HUMAN_RELAY_CAUGHT_BY_WORKER"
): StoryChoice => ({
  ...choice,
  chanceRedirect: {
    probability: RELAY_DISCOVERY_CHANCE,
    nextSceneId,
    effects: [
      { type: "flag", key: "caught_at_relay_site", value: true },
      { type: "flag", key: "relay_caught_during", value: action }
    ]
  }
});

const humanStart: StoryScene = {
  ...BASE_STORY.HUMAN_START,
  choices: BASE_STORY.HUMAN_START.choices.map((choice) =>
    choice.id === "human_investigate"
      ? {
          ...choice,
          effects: [
            ...(choice.effects ?? []),
            {
              type: "flag",
              key: "relay_guard_interrupted_soundwave",
              value: false
            }
          ]
        }
      : choice
  )
};

const relayDeviceHub: StoryScene = {
  ...BASE_STORY.HUMAN_RELAY_DEVICE_HUB,
  choices: BASE_STORY.HUMAN_RELAY_DEVICE_HUB.choices.map((choice) => {
    switch (choice.id) {
      case "human_examine_relay_device":
        return addDiscoveryChance(choice, "examining the device");
      case "human_document_relay_device":
        return addDiscoveryChance(choice, "documenting the device");
      case "human_search_relay_site":
        return addDiscoveryChance(choice, "searching the relay yard");
      case "human_activate_relay_communicator":
        return {
          ...addDiscoveryChance(
            choice,
            "activating the communicator",
            "HUMAN_RELAY_SOUNDWAVE_GUARD_INTERRUPT"
          ),
          chanceRedirect: {
            probability: RELAY_DISCOVERY_CHANCE,
            nextSceneId: "HUMAN_RELAY_SOUNDWAVE_GUARD_INTERRUPT",
            effects: [
              { type: "flag", key: "caught_at_relay_site", value: true },
              {
                type: "flag",
                key: "relay_caught_during",
                value: "activating the communicator"
              },
              {
                type: "flag",
                key: "relay_guard_interrupted_soundwave",
                value: true
              }
            ]
          }
        };
      case "human_remove_relay_device":
        return addDiscoveryChance(choice, "removing the device");
      case "human_leave_relay_site":
        return addDiscoveryChance(choice, "leaving the relay yard");
      default:
        return choice;
    }
  })
};

const relayCaughtByWorker: StoryScene = {
  id: "HUMAN_RELAY_CAUGHT_BY_WORKER",
  origin: "human",
  chapter: 1,
  title: "Someone Was Still Watching the Site",
  body: `The trio gets no warning beyond the crunch of boots on broken gravel.

“Hey! You three are not supposed to be in here.”

A utility worker steps around the damaged equipment. A temporary security armband is fastened over one sleeve, and a radio is already in his hand.

He has seen enough to understand the problem: three unauthorized civilians inside a closed disaster site, standing near equipment no human crew recognizes.

{{friendOne}} shifts closer to the evidence you collected.

{{friendTwo}} watches the worker's radio.

The worker points toward the maintenance route behind you.

“Step away from that machinery. Now.”`,
  choices: [
    {
      id: "human_cooperate_with_relay_worker",
      label: "Tell the truth, step away, and cooperate.",
      nextSceneId: "HUMAN_RELAY_CAUGHT_COOPERATE",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "cooperated_with_relay_worker", value: true },
        { type: "stat", group: "personality", key: "honesty", amount: 1 },
        { type: "inventory_remove", item: "Recovered Decepticon relay device" }
      ]
    },
    {
      id: "human_bluff_relay_worker",
      label: "Claim that the trio was sent to document the alien damage.",
      nextSceneId: "HUMAN_RELAY_CAUGHT_BLUFF",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "bluffed_relay_worker", value: true },
        { type: "inventory_remove", item: "Recovered Decepticon relay device" }
      ]
    },
    {
      id: "human_run_from_relay_worker",
      label: "Keep the trio together and run for the maintenance route.",
      nextSceneId: "HUMAN_RELAY_CAUGHT_RUN",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "ran_from_relay_worker", value: true },
        { type: "stat", group: "personality", key: "aggression", amount: 1 }
      ]
    }
  ]
};

const relayCaughtCooperate: StoryScene = {
  id: "HUMAN_RELAY_CAUGHT_COOPERATE",
  origin: "human",
  chapter: 1,
  title: "Escorted Out",
  body: `You admit that the three of you slipped past the roadblocks to investigate the attack site.

The worker is angry, but the damaged station concerns him more than punishing three civilians.

He orders all of you away from the unfamiliar machinery and calls for another worker to escort the trio through the damaged yard.

Anything physically removed from the station stays behind. Photographs, sketches, and memories are harder to take away.

The workers walk all three of you past the maintenance gate, through the temporary checkpoint, and beyond the final barricade.

They leave the trio on the shoulder of the highway outside the closed perimeter.

The investigation ends earlier than planned, but it does not end empty-handed.`,
  choices: [
    {
      id: "human_reach_highway_after_relay_worker_cooperation",
      label: "Regroup on the highway outside the perimeter.",
      nextSceneId: "HUMAN_RELAY_OUTSIDE_PERIMETER",
      timeCostHours: 1
    }
  ]
};

const relayCaughtBluff: StoryScene = {
  id: "HUMAN_RELAY_CAUGHT_BLUFF",
  origin: "human",
  chapter: 1,
  title: "Credentials",
  body: `You claim that the trio was sent to document the alien damage.

The worker holds out one hand.

“Identification.”

None of you has any.

The story lasts less than a minute. The worker does not know who you are, but he knows every authorized crew that entered through the roadblocks.

He keeps the trio away from the alien equipment and walks all three of you back toward the closure while reporting the intrusion over his radio.

Another worker meets him at the checkpoint. Together they take you through the gate and past the final barricade.

The bluff does not get you released inside the site. It gets you deposited on the shoulder of the highway outside the perimeter.

You still leave with anything the workers did not see or recognize as part of the station.`,
  choices: [
    {
      id: "human_reach_highway_after_relay_worker_bluff",
      label: "Regroup on the highway outside the perimeter.",
      nextSceneId: "HUMAN_RELAY_OUTSIDE_PERIMETER",
      timeCostHours: 1
    }
  ]
};

const relayCaughtRun: StoryScene = {
  id: "HUMAN_RELAY_CAUGHT_RUN",
  origin: "human",
  chapter: 1,
  title: "Run Before the Radio Answers",
  body: `You do not give the worker time to finish speaking into the radio.

The three of you run together, cutting between damaged structures and dropping into the same drainage channel used to enter the site.

The worker shouts after you. Another voice answers through his radio.

No one follows into the channel quickly enough.

The drainage channel carries the trio beneath the temporary fencing and out beyond the perimeter. You climb back to the surface beside the highway, several hundred yards beyond the roadblock.

You have escaped the worker, but you are still standing outside the closed site with the barricades visible behind you. Whether you escaped with evidence or with alien equipment depends on what you had already taken when the worker appeared.`,
  choices: [
    {
      id: "human_reach_highway_after_running_from_relay_worker",
      label: "Regroup on the highway outside the perimeter.",
      nextSceneId: "HUMAN_RELAY_OUTSIDE_PERIMETER",
      timeCostHours: 1
    }
  ]
};

const relayOutsidePerimeter: StoryScene = {
  id: "HUMAN_RELAY_OUTSIDE_PERIMETER",
  origin: "human",
  chapter: 1,
  title: "Outside the Perimeter",
  body: `The three of you stand on the highway shoulder beyond the final barricade.

The damaged relay station is hidden behind emergency vehicles, temporary fencing, and the rise of the land. Workers move through the checkpoint, but no one allows the trio back through.

Traffic passes slowly in the open lane. Your vehicle is still where you left it farther down the highway.

{{friendOne}} looks back toward the roadblock.

“We are not getting another chance to walk in there.”

{{friendTwo}} checks what evidence remains with the trio.

“Then we leave before somebody decides to ask more questions.”

The relay site is behind the perimeter now. Whatever happens next must begin from outside it.`,
  choices: [
    {
      id: "human_leave_highway_after_relay_catch",
      label: "Return to the vehicle and take the evidence home.",
      nextSceneId: "HUMAN_RELAY_RETURN_HOME",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "returned_to_highway_after_relay_catch", value: true }]
    }
  ]
};

const relaySoundwaveGuardInterrupt: StoryScene = {
  id: "HUMAN_RELAY_SOUNDWAVE_GUARD_INTERRUPT",
  origin: "human",
  chapter: 1,
  title: "Two Voices at Once",
  body: `You press the section pulsing separately from the energy-transfer components.

The purple light stops.

Then every light on the device activates at once.

The alert reaches Soundwave instantly.

A narrow tone sounds from the damaged speaker.

“Unauthorized access detected.”

Before he can ask anything else, a human voice cuts across the relay yard.

“Step away from that equipment!”

A utility worker wearing a temporary security armband has come around the damaged transformer housing. His radio is raised, but the voice coming from the alien device stops him in place.

The speaker continues.

“Three organic life-signs confirmed. Identify yourselves.”

The worker looks from the device to the three of you.

Soundwave already knows someone activated the unit. The only question is how much more he learns before the worker ends the intrusion.`,
  choices: [
    ...BASE_STORY.HUMAN_RELAY_SOUNDWAVE_CONTACT.choices,
    {
      id: "human_end_soundwave_contact_for_worker",
      label: "Warn the worker that the device is live, step away, and cooperate.",
      nextSceneId: "HUMAN_RELAY_CAUGHT_COOPERATE",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "ended_soundwave_contact_for_worker", value: true },
        { type: "inventory_remove", item: "Recovered Decepticon relay device" }
      ]
    }
  ]
};

const soundwaveContactEnd: StoryScene = {
  ...BASE_STORY.HUMAN_SOUNDWAVE_CONTACT_END,
  choices: [
    {
      ...BASE_STORY.HUMAN_SOUNDWAVE_CONTACT_END.choices[0],
      requirements: [
        {
          type: "flag",
          key: "relay_guard_interrupted_soundwave",
          equals: false
        }
      ]
    },
    {
      id: "human_finish_soundwave_contact_with_worker_present",
      label: "Turn back to the worker and cooperate now that the channel is closed.",
      nextSceneId: "HUMAN_RELAY_CAUGHT_COOPERATE",
      timeCostHours: 1,
      requirements: [
        {
          type: "flag",
          key: "relay_guard_interrupted_soundwave",
          equals: true
        }
      ],
      effects: [
        { type: "flag", key: "relay_worker_witnessed_soundwave", value: true },
        { type: "inventory_remove", item: "Recovered Decepticon relay device" }
      ]
    }
  ]
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_START: humanStart,
  HUMAN_RELAY_DEVICE_HUB: relayDeviceHub,
  HUMAN_RELAY_CAUGHT_BY_WORKER: relayCaughtByWorker,
  HUMAN_RELAY_CAUGHT_COOPERATE: relayCaughtCooperate,
  HUMAN_RELAY_CAUGHT_BLUFF: relayCaughtBluff,
  HUMAN_RELAY_CAUGHT_RUN: relayCaughtRun,
  HUMAN_RELAY_OUTSIDE_PERIMETER: relayOutsidePerimeter,
  HUMAN_RELAY_SOUNDWAVE_GUARD_INTERRUPT: relaySoundwaveGuardInterrupt,
  HUMAN_SOUNDWAVE_CONTACT_END: soundwaveContactEnd
};
