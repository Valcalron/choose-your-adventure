import type { StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyChapters";

const humanStart: StoryScene = {
  ...BASE_STORY.HUMAN_START,
  choices: BASE_STORY.HUMAN_START.choices.map((choice) =>
    choice.id === "human_investigate"
      ? {
          ...choice,
          nextSceneId: "HUMAN_RELAY_APPROACH",
          effects: [
            ...(choice.effects ?? []),
            { type: "flag", key: "examined_relay_device", value: false },
            { type: "flag", key: "documented_relay_device", value: false },
            { type: "flag", key: "searched_relay_site", value: false },
            { type: "flag", key: "contacted_soundwave_at_relay", value: false }
          ]
        }
      : choice
  )
};

const relayApproach: StoryScene = {
  id: "HUMAN_RELAY_APPROACH",
  origin: "human",
  chapter: 1,
  title: "Past the Roadblocks",
  body: `Emergency crews and police have blocked the main roads leading toward the damaged power-relay center.

That stops most civilians.

It does not stop the three of you.

{{friendOne}} studies the roadblock from a distance.

“They are watching the highway. Not the maintenance roads.”

{{friendTwo}} looks toward the smoke still rising beyond the hills.

“That does not make this a good idea.”

“No,” you say. “It makes it possible.”

The trio leaves the main road and follows an old utility route. You abandon the vehicle before reaching the damaged perimeter and continue on foot, using drainage channels, gaps in fencing, and the relay structures themselves to remain out of sight.

You stop whenever emergency workers pass and move only when machinery or distant sirens cover the sound.

The three of you are not cautious enough to stay away.

You are careful enough to get inside.`,
  choices: [
    {
      id: "human_enter_damaged_relay_site",
      label: "Continue into the damaged relay yard.",
      nextSceneId: "HUMAN_RELAY_DEVICE_HUB",
      timeCostHours: 2,
      effects: [
        { type: "stat", group: "personality", key: "curiosity", amount: 1 },
        { type: "stat", group: "personality", key: "ambition", amount: 1 }
      ]
    }
  ]
};

const relayDeviceHub: StoryScene = {
  id: "HUMAN_RELAY_DEVICE_HUB",
  origin: "human",
  chapter: 1,
  title: "The Device They Left Behind",
  body: `The Decepticons are gone. The Autobots and most emergency crews have moved on.

What remains is scorched ground, torn power lines, collapsed equipment, and enormous footprints pressed into the dirt.

Then you notice something attached beneath one of the damaged transformer housings.

It does not belong to the power station.

The device is built from dark Cybertronian metal. Narrow connections have been driven directly into the relay equipment, and a faint purple light pulses beneath its casing.

Most of the device appears connected to the damaged power system. One pulsing section is separate from the energy-transfer components.

The Decepticons did not remove everything when they left.

The device may be damaged.

It may also still be active.`,
  choices: [
    {
      id: "human_examine_relay_device",
      label: "Examine the device without touching it.",
      nextSceneId: "HUMAN_RELAY_EXAMINE_DEVICE",
      timeCostHours: 1,
      requirements: [{ type: "flag", key: "examined_relay_device", equals: false }],
      effects: [
        { type: "flag", key: "examined_relay_device", value: true },
        { type: "stat", group: "personality", key: "curiosity", amount: 1 }
      ]
    },
    {
      id: "human_document_relay_device",
      label: "Photograph and sketch the device and its connections.",
      nextSceneId: "HUMAN_RELAY_DOCUMENT_DEVICE",
      timeCostHours: 1,
      requirements: [{ type: "flag", key: "documented_relay_device", equals: false }],
      effects: [
        { type: "flag", key: "documented_relay_device", value: true },
        { type: "inventory_add", item: "Relay device photographs and sketches" }
      ]
    },
    {
      id: "human_search_relay_site",
      label: "Search the rest of the relay site, then return to the device.",
      nextSceneId: "HUMAN_RELAY_SEARCH_SITE",
      timeCostHours: 2,
      requirements: [{ type: "flag", key: "searched_relay_site", equals: false }],
      effects: [
        { type: "flag", key: "searched_relay_site", value: true },
        { type: "inventory_add", item: "Discarded Cybertronian component" }
      ]
    },
    {
      id: "human_activate_relay_communicator",
      label: "Activate the section that may be a communicator.",
      nextSceneId: "HUMAN_RELAY_SOUNDWAVE_CONTACT",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "contacted_soundwave_at_relay", value: true },
        { type: "flag", key: "first_decepticon_contact", value: "soundwave" },
        { type: "stat", group: "faction", key: "decepticon", amount: 1 },
        { type: "stat", group: "relationship", key: "soundwave", amount: 1 }
      ]
    },
    {
      id: "human_remove_relay_device",
      label: "Try to remove the entire device from the relay equipment.",
      nextSceneId: "HUMAN_RELAY_REMOVE_DEVICE",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "removed_relay_device", value: true },
        { type: "inventory_add", item: "Recovered Decepticon relay device" }
      ]
    },
    {
      id: "human_leave_relay_site",
      label: "Leave the device alone and escape with whatever evidence you collected.",
      nextSceneId: "HUMAN_RELAY_RETURN_HOME",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "left_relay_site_without_contact", value: true }]
    }
  ]
};

const relayExamineDevice: StoryScene = {
  id: "HUMAN_RELAY_EXAMINE_DEVICE",
  origin: "human",
  chapter: 1,
  title: "A Separate Pulse",
  body: `The three of you study the device without touching it.

Most of its connections were driven into the station to measure, collect, or redirect energy. Several are burned out. A few are still drawing a small amount of power.

One pulsing section does not appear to control the transfer equipment.

{{friendOne}} follows the narrow line leading away from it.

“That part is separate.”

{{friendTwo}} watches the regular purple pulse.

“A transmitter?”

“Or a receiver,” you say.

You cannot read the Cybertronian markings, but you now know which part of the device is most likely to communicate with something beyond the relay yard.

Nothing forces you to activate it yet.`,
  choices: [
    {
      id: "human_return_to_relay_device_after_examining",
      label: "Return to the other investigation options.",
      nextSceneId: "HUMAN_RELAY_DEVICE_HUB",
      timeCostHours: 1
    }
  ]
};

const relayDocumentDevice: StoryScene = {
  id: "HUMAN_RELAY_DOCUMENT_DEVICE",
  origin: "human",
  chapter: 1,
  title: "Evidence",
  body: `You document everything you can without disturbing it.

The trio photographs the full device, each connection point, the Cybertronian markings, and the way the casing has been fitted beneath the damaged transformer housing.

{{friendOne}} sketches the parts that are difficult to capture from a single angle.

{{friendTwo}} records where the device was found and which sections of the relay station were damaged around it.

The evidence is not proof of what every component does.

It is proof that the Decepticons attached something unfamiliar to the power station and left it operating after the attack.

You keep the photographs and notes. The device remains where it was.`,
  choices: [
    {
      id: "human_return_to_relay_device_after_documenting",
      label: "Return to the device and continue investigating.",
      nextSceneId: "HUMAN_RELAY_DEVICE_HUB",
      timeCostHours: 1
    }
  ]
};

const relaySearchSite: StoryScene = {
  id: "HUMAN_RELAY_SEARCH_SITE",
  origin: "human",
  chapter: 1,
  title: "What the Attack Left Behind",
  body: `You leave the device untouched and search the rest of the relay yard.

Deep Cybertronian footprints cross the scorched ground. Transformation marks cut into the road where enormous bodies shifted between vehicle and robot modes.

Burned channels run through equipment that was never designed to carry so much energy at once.

Near a collapsed support, {{friendOne}} finds a small piece of dark metal unlike anything used at the station. It appears to have broken from a larger Cybertronian assembly.

{{friendTwo}} studies the positions of the tracks.

“One of them stayed near the relay equipment while the others moved around the site.”

The damage supports that conclusion. Someone operated the equipment while the attack continued around them.

You take the discarded component and return to the pulsing device.`,
  choices: [
    {
      id: "human_return_to_relay_device_after_searching",
      label: "Return to the device with what you found.",
      nextSceneId: "HUMAN_RELAY_DEVICE_HUB",
      timeCostHours: 1
    }
  ]
};

const relaySoundwaveContact: StoryScene = {
  id: "HUMAN_RELAY_SOUNDWAVE_CONTACT",
  origin: "human",
  chapter: 1,
  title: "The Answer Is Immediate",
  body: `{{relayContactPreparation}}

You press the section pulsing separately from the energy-transfer components.

The purple light stops.

For half a second, the entire device appears dead.

Then every light on it activates at once.

{{friendOne}} steps back.

“That was not what it was doing before.”

{{friendTwo}} looks toward the utility road.

“Then we should probably leave.”

Before anyone moves, a narrow tone sounds from the device.

Somewhere beyond the relay site, the alert reaches Soundwave instantly.

The unit reports that it has been manually accessed. It identifies three nearby organic life-signs and begins transmitting everything its damaged sensors can still collect.

{{soundwaveEvidenceNotice}}

A voice comes through the device, flattened by the small damaged speaker.

“Unauthorized access detected.”

The trio freezes.

“Identify yourselves.”`,
  choices: [
    {
      id: "human_tell_soundwave_truth",
      label: "Give your names and admit that you deliberately came to investigate.",
      nextSceneId: "HUMAN_SOUNDWAVE_TRUTH",
      timeCostHours: 1,
      effects: [{ type: "stat", group: "personality", key: "honesty", amount: 1 }]
    },
    {
      id: "human_ask_soundwave_identity",
      label: "Refuse to identify yourselves until the speaker does.",
      nextSceneId: "HUMAN_SOUNDWAVE_IDENTITY",
      timeCostHours: 1,
      effects: [{ type: "stat", group: "personality", key: "leadership", amount: 1 }]
    },
    {
      id: "human_lie_to_soundwave",
      label: "Claim to be workers assigned to inspect the damaged relay station.",
      nextSceneId: "HUMAN_SOUNDWAVE_LIE",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "lied_to_soundwave_at_first_contact", value: true }]
    },
    {
      id: "human_demand_answers_from_soundwave",
      label: "Demand to know why the Decepticons attacked and what the device was doing.",
      nextSceneId: "HUMAN_SOUNDWAVE_DEMAND",
      timeCostHours: 1,
      effects: [{ type: "stat", group: "personality", key: "aggression", amount: 1 }]
    },
    {
      id: "human_cut_soundwave_connection",
      label: "Break the connection and run.",
      nextSceneId: "HUMAN_SOUNDWAVE_CUT_AND_RUN",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "cut_first_soundwave_contact_short", value: true }]
    },
    {
      id: "human_stay_silent_with_soundwave",
      label: "Stay silent and see what the speaker reveals.",
      nextSceneId: "HUMAN_SOUNDWAVE_SILENCE",
      timeCostHours: 1,
      effects: [{ type: "stat", group: "personality", key: "curiosity", amount: 1 }]
    }
  ]
};

const soundwaveTruth: StoryScene = {
  id: "HUMAN_SOUNDWAVE_TRUTH",
  origin: "human",
  chapter: 1,
  title: "Names Recorded",
  speaker: "Unknown Decepticon",
  body: `You give your name, then identify {{friendOne}} and {{friendTwo}}.

You admit that the three of you crossed the roadblocks deliberately, entered the relay yard, found the device, and activated what you believed was its communication system.

The answer comes without hesitation.

“Identities recorded.”

The words make it clear that the speaker is not merely listening. He is storing everything.

“Purpose?”`,
  choices: [
    {
      id: "human_explain_soundwave_understanding",
      label: "Say you want to understand what the Decepticons want and why they came to Earth.",
      nextSceneId: "HUMAN_SOUNDWAVE_PURPOSE_UNDERSTAND",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_contact_purpose", value: "understanding" }]
    },
    {
      id: "human_offer_soundwave_help",
      label: "Say that humans may be useful and ask whether the Decepticons need help on Earth.",
      nextSceneId: "HUMAN_SOUNDWAVE_PURPOSE_USEFULNESS",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "soundwave_contact_purpose", value: "usefulness" },
        { type: "stat", group: "faction", key: "decepticon", amount: 1 }
      ]
    },
    {
      id: "human_admit_soundwave_curiosity",
      label: "Admit that you wanted to know whether the device would answer.",
      nextSceneId: "HUMAN_SOUNDWAVE_PURPOSE_CURIOSITY",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_contact_purpose", value: "curiosity" }]
    },
    {
      id: "human_end_soundwave_after_truth",
      label: "End the connection and leave before the conversation goes farther.",
      nextSceneId: "HUMAN_SOUNDWAVE_CUT_AND_RUN",
      timeCostHours: 1
    }
  ]
};

const soundwaveIdentity: StoryScene = {
  id: "HUMAN_SOUNDWAVE_IDENTITY",
  origin: "human",
  chapter: 1,
  title: "Soundwave",
  speaker: "Soundwave",
  body: `“Identify yourself first,” you say.

The pause lasts less than a second.

“Soundwave.”

The name means nothing to the three of you yet, but the way he gives it makes clear that he expects it to matter.

“Your identities remain unconfirmed.”`,
  choices: [
    {
      id: "human_tell_truth_after_soundwave_identity",
      label: "Give your names and explain why you entered the site.",
      nextSceneId: "HUMAN_SOUNDWAVE_TRUTH",
      timeCostHours: 1,
      effects: [{ type: "stat", group: "personality", key: "honesty", amount: 1 }]
    },
    {
      id: "human_demand_answers_after_soundwave_identity",
      label: "Ask Soundwave why the Decepticons attacked the relay station.",
      nextSceneId: "HUMAN_SOUNDWAVE_DEMAND",
      timeCostHours: 1
    },
    {
      id: "human_cut_connection_after_soundwave_identity",
      label: "End the connection now that you have his name.",
      nextSceneId: "HUMAN_SOUNDWAVE_CUT_AND_RUN",
      timeCostHours: 1
    }
  ]
};

const soundwaveLie: StoryScene = {
  id: "HUMAN_SOUNDWAVE_LIE",
  origin: "human",
  chapter: 1,
  title: "Statement Inconsistent",
  speaker: "Unknown Decepticon",
  body: `You claim that the three of you are workers assigned to inspect the damage.

The answer is immediate.

“Statement inconsistent.”

The device has already identified three organic life-signs moving through a restricted site without the equipment, vehicles, or communication traffic used by the official crews.

“No authorized inspection team matches observed behavior.”

{{friendOne}} looks at you.

{{friendTwo}} whispers, “He knew before we finished saying it.”

The speaker asks again.

“Identify yourselves.”`,
  choices: [
    {
      id: "human_admit_lie_to_soundwave",
      label: "Admit the lie and give your real names.",
      nextSceneId: "HUMAN_SOUNDWAVE_TRUTH",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "admitted_lie_to_soundwave", value: true }]
    },
    {
      id: "human_maintain_lie_to_soundwave",
      label: "Maintain the story and refuse to provide anything else.",
      nextSceneId: "HUMAN_SOUNDWAVE_LIE_MAINTAINED",
      timeCostHours: 1
    },
    {
      id: "human_run_after_soundwave_detects_lie",
      label: "Cut the connection and run.",
      nextSceneId: "HUMAN_SOUNDWAVE_CUT_AND_RUN",
      timeCostHours: 1
    }
  ]
};

const soundwaveLieMaintained: StoryScene = {
  id: "HUMAN_SOUNDWAVE_LIE_MAINTAINED",
  origin: "human",
  chapter: 1,
  title: "Deception Inefficient",
  speaker: "Unknown Decepticon",
  body: `You repeat the claim and refuse to provide names.

“Deception: inefficient.”

Soundwave does not argue. He does not need to.

The device has your voices, approximate sizes, movement patterns, and the fact that three humans entered the site deliberately.

“Information already acquired.”

The channel remains open, but he offers nothing further.`,
  choices: [
    {
      id: "human_leave_after_maintaining_lie",
      label: "End the connection and get out of the relay yard.",
      nextSceneId: "HUMAN_SOUNDWAVE_CUT_AND_RUN",
      timeCostHours: 1
    },
    {
      id: "human_change_to_truth_after_maintaining_lie",
      label: "Change course and identify yourselves truthfully.",
      nextSceneId: "HUMAN_SOUNDWAVE_TRUTH",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "admitted_lie_to_soundwave", value: true }]
    }
  ]
};

const soundwaveDemand: StoryScene = {
  id: "HUMAN_SOUNDWAVE_DEMAND",
  origin: "human",
  chapter: 1,
  title: "Minimal Answers",
  speaker: "Unknown Decepticon",
  body: `“Why did you attack this station?” you ask. “What was this device doing?”

The reply is precise and almost insultingly brief.

“Energy acquisition.”

A second light on the device pulses.

“Unit function: monitoring, measurement, communication.”

That confirms more than the public reports could have told you. The Decepticons came for energy, and the device was capable of reporting back after they left.

“Your authority to demand information: none.”

The speaker returns to his own question.

“Identify yourselves.”`,
  choices: [
    {
      id: "human_identify_after_soundwave_answers",
      label: "Give your names now that he answered.",
      nextSceneId: "HUMAN_SOUNDWAVE_TRUTH",
      timeCostHours: 1
    },
    {
      id: "human_ask_name_after_soundwave_answers",
      label: "Ask who is speaking before saying anything else.",
      nextSceneId: "HUMAN_SOUNDWAVE_IDENTITY",
      timeCostHours: 1
    },
    {
      id: "human_leave_after_soundwave_answers",
      label: "Take the answers and cut the connection.",
      nextSceneId: "HUMAN_SOUNDWAVE_CUT_AND_RUN",
      timeCostHours: 1
    }
  ]
};

const soundwaveSilence: StoryScene = {
  id: "HUMAN_SOUNDWAVE_SILENCE",
  origin: "human",
  chapter: 1,
  title: "Silence Is Still Information",
  speaker: "Unknown Decepticon",
  body: `None of you answers.

The device continues its faint electronic tone.

Then the speaker states what he already knows.

“Three organic life-signs confirmed.”

A brief pause follows.

“Silence does not prevent observation.”

He does not fill the quiet with explanations. He waits to see which of you breaks first.`,
  choices: [
    {
      id: "human_identify_after_silence",
      label: "Break the silence and identify the trio.",
      nextSceneId: "HUMAN_SOUNDWAVE_TRUTH",
      timeCostHours: 1
    },
    {
      id: "human_ask_identity_after_silence",
      label: "Ask who is watching you.",
      nextSceneId: "HUMAN_SOUNDWAVE_IDENTITY",
      timeCostHours: 1
    },
    {
      id: "human_remain_silent_and_run",
      label: "Reveal nothing, break the connection, and run.",
      nextSceneId: "HUMAN_SOUNDWAVE_CUT_AND_RUN",
      timeCostHours: 1
    }
  ]
};

const soundwavePurposeUnderstand: StoryScene = {
  id: "HUMAN_SOUNDWAVE_PURPOSE_UNDERSTAND",
  origin: "human",
  chapter: 1,
  title: "Understanding Must Be Earned",
  speaker: "Soundwave",
  body: `You explain that the Decepticons appeared on Earth without warning, attacked a power station, and vanished before anyone could ask what they wanted.

You came because you wanted answers from the faction responsible.

“Objective understood,” Soundwave says.

He does not reward the honesty with trust.

“Information is acquired through utility, leverage, or observation. Curiosity alone establishes none.”

The answer is not an invitation.

It is also not a refusal to remember you.`,
  choices: [
    {
      id: "human_finish_soundwave_understanding_contact",
      label: "Listen as Soundwave concludes the exchange.",
      nextSceneId: "HUMAN_SOUNDWAVE_CONTACT_END",
      timeCostHours: 1
    }
  ]
};

const soundwavePurposeUsefulness: StoryScene = {
  id: "HUMAN_SOUNDWAVE_PURPOSE_USEFULNESS",
  origin: "human",
  chapter: 1,
  title: "Utility Unproven",
  speaker: "Soundwave",
  body: `You point out that the Decepticons are operating on an unfamiliar planet.

Humans know the roads, power systems, institutions, and habits of the people living here. That knowledge might be useful.

Soundwave processes the offer without visible reaction through the tiny device.

“Utility: possible.”

Then comes the qualification.

“Loyalty: unverified. Competence: partially demonstrated. Risk tolerance: excessive.”

{{friendOne}} looks offended by the last assessment.

{{friendTwo}} quietly says, “He is not wrong.”

“Offer recorded,” Soundwave finishes.`,
  choices: [
    {
      id: "human_finish_soundwave_usefulness_contact",
      label: "Let Soundwave record the offer and end the exchange.",
      nextSceneId: "HUMAN_SOUNDWAVE_CONTACT_END",
      timeCostHours: 1,
      effects: [{ type: "stat", group: "relationship", key: "soundwave", amount: 1 }]
    }
  ]
};

const soundwavePurposeCuriosity: StoryScene = {
  id: "HUMAN_SOUNDWAVE_PURPOSE_CURIOSITY",
  origin: "human",
  chapter: 1,
  title: "You Wanted an Answer",
  speaker: "Soundwave",
  body: `You admit the simplest truth.

You found something the Decepticons left behind. You believed part of it could communicate. You wanted to know whether anyone would answer.

“Curiosity confirmed.”

The reply carries no approval.

“Behavior resulted in entry to a restricted disaster site, exposure to damaged alien technology, and direct contact with an unknown military force.”

{{friendOne}} glances at you.

{{friendTwo}} exhales slowly.

“Survival probability reduced,” Soundwave concludes.

He still does not disconnect immediately. The fact that the three of you did all of that and remained on the channel has made you worth recording.`,
  choices: [
    {
      id: "human_finish_soundwave_curiosity_contact",
      label: "Accept the assessment and wait for the channel to close.",
      nextSceneId: "HUMAN_SOUNDWAVE_CONTACT_END",
      timeCostHours: 1
    }
  ]
};

const soundwaveContactEnd: StoryScene = {
  id: "HUMAN_SOUNDWAVE_CONTACT_END",
  origin: "human",
  chapter: 1,
  title: "Recorded",
  speaker: "Soundwave",
  body: `“Data retained,” Soundwave says.

The purple lights contract into a single narrow point.

“Further contact: possible.”

The channel closes.

The device returns to its slow pulse, but the three of you now understand what that pulse means.

It was never abandoned in the ordinary sense.

It was still connected to someone.

Soundwave received the alert the instant you activated it, listened to every answer, and kept whatever the device could learn about you.`,
  choices: [
    {
      id: "human_leave_after_soundwave_contact",
      label: "Leave the relay site before anyone else arrives.",
      nextSceneId: "HUMAN_RELAY_RETURN_HOME",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "completed_first_soundwave_contact", value: true }]
    }
  ]
};

const soundwaveCutAndRun: StoryScene = {
  id: "HUMAN_SOUNDWAVE_CUT_AND_RUN",
  origin: "human",
  chapter: 1,
  title: "Too Late to Be Unknown",
  body: `You break the connection and pull your hand away from the device.

The lights go dark for an instant, then resume their slow purple pulse.

The three of you run.

You do not know whether Soundwave can reactivate the channel from his side. You do know that ending the conversation did not erase what happened before it.

The device already reported three organic life-signs. It transmitted your voices if any of you spoke. Its sensors observed your movement through the site.

Cutting the connection prevents Soundwave from learning more right now.

It does not make the trio unknown again.`,
  choices: [
    {
      id: "human_escape_relay_after_cutting_contact",
      label: "Use the maintenance route to escape and return home.",
      nextSceneId: "HUMAN_RELAY_RETURN_HOME",
      timeCostHours: 2
    }
  ]
};

const relayRemoveDevice: StoryScene = {
  id: "HUMAN_RELAY_REMOVE_DEVICE",
  origin: "human",
  chapter: 1,
  title: "Take It With You",
  body: `You decide not to leave the Decepticon device attached to the station.

The first connection resists. The second releases with a metallic snap. When the final clamp comes free, the casing contracts around its remaining components as though protecting itself.

Every purple light flashes once.

A warning tone begins.

No voice answers. You do not know whether the signal stayed local or was transmitted elsewhere.

What you do know is that the device is no longer hidden beneath the transformer housing, and the warning tone is loud enough to attract the emergency crews if it continues.

The three of you carry it out together.`,
  choices: [
    {
      id: "human_escape_with_relay_device",
      label: "Escape with the recovered device before the crews find you.",
      nextSceneId: "HUMAN_RELAY_RETURN_HOME",
      timeCostHours: 3,
      effects: [{ type: "flag", key: "escaped_with_relay_device", value: true }]
    }
  ]
};

const relayReturnHome: StoryScene = {
  id: "HUMAN_RELAY_RETURN_HOME",
  origin: "human",
  chapter: 1,
  title: "What Followed You Home",
  body: `The three of you make it back without being stopped by the roadblocks.

{{relayReturnSummary}}

The damaged relay station is behind you, but the investigation is not finished simply because you left the site.

You now have evidence, observations, and possibly something built by the Decepticons themselves.

More importantly, you have made a choice most people would never consider.

Rather than wait for the alien war to explain itself, the three of you went looking for answers.`,
  choices: [
    {
      id: "human_review_relay_evidence",
      label: "Review everything collected at the relay site.",
      nextSceneId: "HUMAN_RELAY_REVIEW_EVIDENCE",
      timeCostHours: 1
    },
    {
      id: "human_wait_for_next_decepticon_operation",
      label: "Watch for the next confirmed Decepticon attack.",
      nextSceneId: "HUMAN_SHERMAN_DAM_NEWS",
      timeCostHours: 2,
      effects: [
        { type: "flag", key: "researched_decepticons", value: true },
        { type: "flag", key: "seeking_faction", value: "decepticons" }
      ]
    },
    {
      id: "human_investigate_autobots_after_relay",
      label: "Research the Autobots before deciding which faction to approach next.",
      nextSceneId: "HUMAN_RELAY_RESEARCH_AUTOBOTS",
      timeCostHours: 1
    },
    {
      id: "human_stop_after_relay_investigation",
      label: "Put the evidence away and stop searching for either faction.",
      nextSceneId: "ENDING_DOOR_STAYED_CLOSED",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "chose_isolation_after_relay", value: true }]
    }
  ]
};

const relayReviewEvidence: StoryScene = {
  id: "HUMAN_RELAY_REVIEW_EVIDENCE",
  origin: "human",
  chapter: 1,
  title: "What the Site Confirmed",
  body: `The trio separates what you know from what you only suspect.

The Decepticons targeted the relay station for energy. They attached Cybertronian equipment directly to human infrastructure. At least one unit remained near the power systems while the others moved through the attack site.

The device could monitor, measure, and communicate.

{{relayEvidenceReview}}

None of this tells you where the Decepticons are based or what they plan to attack next.

It does give you a better idea of what to watch for.`,
  choices: [
    {
      id: "human_return_after_relay_evidence_review",
      label: "Decide what the trio should do next.",
      nextSceneId: "HUMAN_RELAY_RETURN_HOME",
      timeCostHours: 1
    }
  ]
};

const relayResearchAutobots: StoryScene = {
  id: "HUMAN_RELAY_RESEARCH_AUTOBOTS",
  origin: "human",
  chapter: 1,
  title: "The Other Symbol",
  body: `After entering the site attacked by the Decepticons, the three of you turn to the reports about the machines opposing them.

The Autobots use the red insignia shown in the broadcasts. Optimus Prime appears to lead them. They have repeatedly stopped during battles to protect civilians, assist emergency workers, and limit the damage caused by Decepticon attacks.

That does not make approaching them safe.

It does make them easier to find. Autobots are often reported near rescues and damaged infrastructure, and many of them travel by road rather than disappearing into the air.

{{friendOne}} looks between the notes about the two factions.

“We know how the Decepticons answer when somebody touches their equipment.”

{{friendTwo}} points to the latest credible rescue report.

“Now we could find out how the Autobots answer when somebody approaches them.”`,
  choices: [
    {
      id: "human_seek_autobots_after_relay_research",
      label: "Follow the latest credible report of Autobot activity.",
      nextSceneId: "HUMAN_SEEK_AUTOBOTS",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "researched_autobots", value: true },
        { type: "flag", key: "seeking_faction", value: "autobots" }
      ]
    },
    {
      id: "human_return_to_decepticon_search_after_relay",
      label: "Keep watching for the next Decepticon attack instead.",
      nextSceneId: "HUMAN_SHERMAN_DAM_NEWS",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "seeking_faction", value: "decepticons" }]
    },
    {
      id: "human_return_home_after_relay_research",
      label: "Return to the evidence before deciding.",
      nextSceneId: "HUMAN_RELAY_RETURN_HOME",
      timeCostHours: 1
    }
  ]
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_START: humanStart,
  HUMAN_RELAY_APPROACH: relayApproach,
  HUMAN_RELAY_DEVICE_HUB: relayDeviceHub,
  HUMAN_RELAY_EXAMINE_DEVICE: relayExamineDevice,
  HUMAN_RELAY_DOCUMENT_DEVICE: relayDocumentDevice,
  HUMAN_RELAY_SEARCH_SITE: relaySearchSite,
  HUMAN_RELAY_SOUNDWAVE_CONTACT: relaySoundwaveContact,
  HUMAN_SOUNDWAVE_TRUTH: soundwaveTruth,
  HUMAN_SOUNDWAVE_IDENTITY: soundwaveIdentity,
  HUMAN_SOUNDWAVE_LIE: soundwaveLie,
  HUMAN_SOUNDWAVE_LIE_MAINTAINED: soundwaveLieMaintained,
  HUMAN_SOUNDWAVE_DEMAND: soundwaveDemand,
  HUMAN_SOUNDWAVE_SILENCE: soundwaveSilence,
  HUMAN_SOUNDWAVE_PURPOSE_UNDERSTAND: soundwavePurposeUnderstand,
  HUMAN_SOUNDWAVE_PURPOSE_USEFULNESS: soundwavePurposeUsefulness,
  HUMAN_SOUNDWAVE_PURPOSE_CURIOSITY: soundwavePurposeCuriosity,
  HUMAN_SOUNDWAVE_CONTACT_END: soundwaveContactEnd,
  HUMAN_SOUNDWAVE_CUT_AND_RUN: soundwaveCutAndRun,
  HUMAN_RELAY_REMOVE_DEVICE: relayRemoveDevice,
  HUMAN_RELAY_RETURN_HOME: relayReturnHome,
  HUMAN_RELAY_REVIEW_EVIDENCE: relayReviewEvidence,
  HUMAN_RELAY_RESEARCH_AUTOBOTS: relayResearchAutobots
};
