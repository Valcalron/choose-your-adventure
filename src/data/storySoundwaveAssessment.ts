import type { StoryChoice, StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storySoundwaveQuestions";

const assessmentStartChoice: StoryChoice = {
  id: "human_continue_to_soundwave_assessment",
  label: "Remain on the channel while Soundwave continues assessing the trio.",
  nextSceneId: "HUMAN_SOUNDWAVE_INITIATOR",
  timeCostHours: 1
};

const followupSceneIds = [
  "HUMAN_SOUNDWAVE_INFORMATION_FULL",
  "HUMAN_SOUNDWAVE_INFORMATION_PUBLIC",
  "HUMAN_SOUNDWAVE_INFORMATION_REQUEST",
  "HUMAN_SOUNDWAVE_UTILITY_INFRASTRUCTURE",
  "HUMAN_SOUNDWAVE_UTILITY_OBSERVATION",
  "HUMAN_SOUNDWAVE_UTILITY_INTERMEDIARY",
  "HUMAN_SOUNDWAVE_UTILITY_REQUIREMENTS",
  "HUMAN_SOUNDWAVE_GAIN_PROOF",
  "HUMAN_SOUNDWAVE_GAIN_CONTACT",
  "HUMAN_SOUNDWAVE_GAIN_NEGOTIATION",
  "HUMAN_SOUNDWAVE_GAIN_NOTHING"
] as const;

const continuedFollowupScenes = Object.fromEntries(
  followupSceneIds.map((id) => [
    id,
    {
      ...BASE_STORY[id],
      choices: [{ ...assessmentStartChoice, id: `${id.toLowerCase()}_assessment` }]
    }
  ])
) as Record<string, StoryScene>;

const purposeUsefulness: StoryScene = {
  ...BASE_STORY.HUMAN_SOUNDWAVE_PURPOSE_USEFULNESS,
  body: `You point out that the Decepticons are operating on an unfamiliar planet.

Humans know the roads, power systems, institutions, and habits of the people living here. That knowledge might be useful.

“Utility: possible.”

“Loyalty: unverified. Competence: partially demonstrated. Risk tolerance: excessive.”

{{friendOne}} leans closer to the device.

“The Autobots have humans helping them. Why don't you?”

Soundwave answers without hesitation.

“Autobot precedent: irrelevant.”

A second tone passes through the speaker.

“Assistance does not equal utility.”

Then he returns to the point he considers measurable.

“Specify utility.”`
};

const initiator: StoryScene = {
  id: "HUMAN_SOUNDWAVE_INITIATOR",
  origin: "human",
  chapter: 1,
  title: "Initiator",
  speaker: "Soundwave",
  body: `The channel remains open.

Soundwave has recorded what the trio wants, what you claim to offer, and how much information you are willing to provide.

His next question is only one word.

“Initiator?”

He wants to know who made the decision to activate the Decepticon unit.`,
  choices: [
    {
      id: "human_claim_soundwave_initiator_player",
      label: "Say that activating the device was your decision.",
      nextSceneId: "HUMAN_SOUNDWAVE_AFFILIATION",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "soundwave_contact_initiator", value: "player" },
        { type: "stat", group: "personality", key: "leadership", amount: 1 }
      ]
    },
    {
      id: "human_claim_soundwave_initiator_trio",
      label: "Say that all three of you decided together.",
      nextSceneId: "HUMAN_SOUNDWAVE_AFFILIATION",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "soundwave_contact_initiator", value: "trio" },
        { type: "stat", group: "relationship", key: "friendOne", amount: 1 },
        { type: "stat", group: "relationship", key: "friendTwo", amount: 1 }
      ]
    },
    {
      id: "human_claim_soundwave_initiator_friend_one",
      label: "Say that {{friendOne}} first suggested testing the device.",
      nextSceneId: "HUMAN_SOUNDWAVE_AFFILIATION",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_contact_initiator", value: "friendOne" }]
    },
    {
      id: "human_claim_soundwave_initiator_friend_two",
      label: "Say that {{friendTwo}} first suggested testing the device.",
      nextSceneId: "HUMAN_SOUNDWAVE_AFFILIATION",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_contact_initiator", value: "friendTwo" }]
    },
    {
      id: "human_refuse_soundwave_initiator",
      label: "Tell Soundwave that it is not relevant.",
      nextSceneId: "HUMAN_SOUNDWAVE_AFFILIATION",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_contact_initiator", value: "withheld" }]
    }
  ]
};

const affiliation: StoryScene = {
  id: "HUMAN_SOUNDWAVE_AFFILIATION",
  origin: "human",
  chapter: 1,
  title: "Affiliation",
  speaker: "Soundwave",
  body: `Soundwave records the answer without comment.

“Affiliation?”

The question is broader than employment. He wants to know whether the trio answers to a human authority, another organization, the Autobots, or only yourselves.`,
  choices: [
    {
      id: "human_soundwave_affiliation_independent",
      label: "Say that the trio is acting independently.",
      nextSceneId: "HUMAN_SOUNDWAVE_INFORMATION_EXPOSURE",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "soundwave_affiliation", value: "independent" },
        { type: "stat", group: "faction", key: "independent", amount: 1 }
      ]
    },
    {
      id: "human_soundwave_affiliation_none_yet",
      label: "Say that none of you has chosen an allegiance.",
      nextSceneId: "HUMAN_SOUNDWAVE_INFORMATION_EXPOSURE",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_affiliation", value: "unaligned" }]
    },
    {
      id: "human_soundwave_affiliation_both_factions",
      label: "Say that the trio is trying to understand both factions.",
      nextSceneId: "HUMAN_SOUNDWAVE_INFORMATION_EXPOSURE",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_affiliation", value: "investigating_both" }]
    },
    {
      id: "human_soundwave_affiliation_autobot_interest",
      label: "Admit that the trio may also seek contact with the Autobots.",
      nextSceneId: "HUMAN_SOUNDWAVE_INFORMATION_EXPOSURE",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_affiliation", value: "autobot_interest" }]
    },
    {
      id: "human_soundwave_affiliation_government_lie",
      label: "Claim that the trio is working with a human government agency.",
      nextSceneId: "HUMAN_SOUNDWAVE_INFORMATION_EXPOSURE",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "soundwave_affiliation", value: "false_government_claim" },
        { type: "flag", key: "lied_to_soundwave_about_affiliation", value: true }
      ]
    },
    {
      id: "human_refuse_soundwave_affiliation",
      label: "Refuse to name any affiliation.",
      nextSceneId: "HUMAN_SOUNDWAVE_INFORMATION_EXPOSURE",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_affiliation", value: "withheld" }]
    }
  ]
};

const informationExposure: StoryScene = {
  id: "HUMAN_SOUNDWAVE_INFORMATION_EXPOSURE",
  origin: "human",
  chapter: 1,
  title: "Who Else Knows",
  speaker: "Soundwave",
  body: `Soundwave does not ask whether the trio trusts one another.

He asks the operational question.

“Information exposure?”

Then he clarifies.

“Who else knows of your destination, observations, or contact?”`,
  choices: [
    {
      id: "human_soundwave_exposure_trio_only",
      label: "Say that only the three of you know what happened here.",
      nextSceneId: "HUMAN_SOUNDWAVE_MATERIAL_GATE",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_information_exposure", value: "trio_only" }]
    },
    {
      id: "human_soundwave_exposure_families",
      label: "Say that family may know where you went, but not what you found.",
      nextSceneId: "HUMAN_SOUNDWAVE_MATERIAL_GATE",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_information_exposure", value: "families_destination_only" }]
    },
    {
      id: "human_soundwave_exposure_worker",
      label: "Admit that a worker caught the trio inside the perimeter.",
      nextSceneId: "HUMAN_SOUNDWAVE_MATERIAL_GATE",
      timeCostHours: 1,
      requirements: [{ type: "flag", key: "caught_at_relay_site", equals: true }],
      effects: [{ type: "flag", key: "soundwave_information_exposure", value: "worker_witness" }]
    },
    {
      id: "human_soundwave_exposure_documented",
      label: "Admit that the trio documented the device and may show the evidence to others.",
      nextSceneId: "HUMAN_SOUNDWAVE_MATERIAL_GATE",
      timeCostHours: 1,
      requirements: [{ type: "flag", key: "documented_relay_device", equals: true }],
      effects: [{ type: "flag", key: "soundwave_information_exposure", value: "documented_for_possible_release" }]
    },
    {
      id: "human_refuse_soundwave_exposure",
      label: "Refuse to tell him who else may know.",
      nextSceneId: "HUMAN_SOUNDWAVE_MATERIAL_GATE",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_information_exposure", value: "withheld" }]
    }
  ]
};

const materialGate: StoryScene = {
  id: "HUMAN_SOUNDWAVE_MATERIAL_GATE",
  origin: "human",
  chapter: 1,
  title: "Material Status",
  speaker: "Soundwave",
  body: `The unit emits another confirming tone while Soundwave compares the conversation with its sensor record.`,
  choices: [
    {
      id: "human_soundwave_material_gate_has_component",
      label: "Continue.",
      nextSceneId: "HUMAN_SOUNDWAVE_RECOVERED_MATERIAL",
      timeCostHours: 1,
      requirements: [{ type: "inventory", item: "Discarded Cybertronian component" }]
    },
    {
      id: "human_soundwave_material_gate_no_component",
      label: "Continue.",
      nextSceneId: "HUMAN_SOUNDWAVE_FUTURE_CONTACT",
      timeCostHours: 1,
      requirements: [{ type: "flag", key: "searched_relay_site", equals: false }]
    }
  ]
};

const recoveredMaterial: StoryScene = {
  id: "HUMAN_SOUNDWAVE_RECOVERED_MATERIAL",
  origin: "human",
  chapter: 1,
  title: "Recovered Material",
  speaker: "Soundwave",
  body: `“Recovered material: status?”

The question confirms that the relay unit detected the broken Cybertronian component carried back from the damaged section of the site.`,
  choices: [
    {
      id: "human_admit_recovered_component",
      label: "Admit that the trio has the component.",
      nextSceneId: "HUMAN_SOUNDWAVE_FUTURE_CONTACT",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_material_status", value: "admitted" }]
    },
    {
      id: "human_offer_return_component",
      label: "Offer to return it if Soundwave arranges a safe exchange.",
      nextSceneId: "HUMAN_SOUNDWAVE_FUTURE_CONTACT",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "soundwave_material_status", value: "offered_return" },
        { type: "stat", group: "relationship", key: "soundwave", amount: 1 }
      ]
    },
    {
      id: "human_keep_recovered_component",
      label: "Tell him the trio intends to keep it.",
      nextSceneId: "HUMAN_SOUNDWAVE_FUTURE_CONTACT",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_material_status", value: "retained_openly" }]
    },
    {
      id: "human_ask_why_soundwave_wants_component",
      label: "Ask why the broken component matters to him.",
      nextSceneId: "HUMAN_SOUNDWAVE_FUTURE_CONTACT",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_material_status", value: "questioned_value" }]
    },
    {
      id: "human_conceal_recovered_component",
      label: "Claim that the trio recovered nothing portable.",
      nextSceneId: "HUMAN_SOUNDWAVE_FUTURE_CONTACT",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "soundwave_material_status", value: "concealed" },
        { type: "flag", key: "lied_to_soundwave_about_material", value: true }
      ]
    },
    {
      id: "human_refuse_recovered_component_answer",
      label: "Refuse to discuss the component.",
      nextSceneId: "HUMAN_SOUNDWAVE_FUTURE_CONTACT",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_material_status", value: "withheld" }]
    }
  ]
};

const futureContact: StoryScene = {
  id: "HUMAN_SOUNDWAVE_FUTURE_CONTACT",
  origin: "human",
  chapter: 1,
  title: "Further Contact",
  speaker: "Soundwave",
  body: `Soundwave has enough information to classify the trio, but he asks one final question before closing the channel.

“Future contact accepted?”`,
  choices: [
    {
      id: "human_accept_future_soundwave_contact",
      label: "Accept future contact.",
      nextSceneId: "HUMAN_SOUNDWAVE_FINAL_ASSESSMENT",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "soundwave_future_contact", value: "accepted" },
        { type: "stat", group: "relationship", key: "soundwave", amount: 1 }
      ]
    },
    {
      id: "human_future_contact_requires_information",
      label: "Accept only when Soundwave has useful information to offer.",
      nextSceneId: "HUMAN_SOUNDWAVE_FINAL_ASSESSMENT",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_future_contact", value: "mutual_value" }]
    },
    {
      id: "human_future_contact_trio_initiates",
      label: "Say that only the trio will decide when to contact him again.",
      nextSceneId: "HUMAN_SOUNDWAVE_FINAL_ASSESSMENT",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_future_contact", value: "trio_initiated_only" }]
    },
    {
      id: "human_future_contact_friend_safety",
      label: "Accept only if neither friend is endangered by the contact.",
      nextSceneId: "HUMAN_SOUNDWAVE_FINAL_ASSESSMENT",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "soundwave_future_contact", value: "friend_safety_condition" },
        { type: "stat", group: "relationship", key: "friendOne", amount: 1 },
        { type: "stat", group: "relationship", key: "friendTwo", amount: 1 }
      ]
    },
    {
      id: "human_refuse_future_soundwave_contact",
      label: "Refuse. This was a one-time exchange.",
      nextSceneId: "HUMAN_SOUNDWAVE_FINAL_ASSESSMENT",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_future_contact", value: "refused" }]
    },
    {
      id: "human_ask_future_contact_requirements",
      label: "Ask what future contact would require.",
      nextSceneId: "HUMAN_SOUNDWAVE_FUTURE_REQUIREMENTS",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_future_contact", value: "requirements_requested" }]
    }
  ]
};

const futureRequirements: StoryScene = {
  id: "HUMAN_SOUNDWAVE_FUTURE_REQUIREMENTS",
  origin: "human",
  chapter: 1,
  title: "Conditions",
  speaker: "Soundwave",
  body: `“What would future contact require?” you ask.

“Controlled exposure. Verifiable information. Demonstrated competence.”

Soundwave does not promise protection, access, or trust.

“Contact remains conditional.”`,
  choices: [
    {
      id: "human_accept_soundwave_contact_conditions",
      label: "Accept those conditions for now.",
      nextSceneId: "HUMAN_SOUNDWAVE_FINAL_ASSESSMENT",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_future_contact", value: "conditional" }]
    },
    {
      id: "human_reject_soundwave_contact_conditions",
      label: "Reject the conditions and end future contact.",
      nextSceneId: "HUMAN_SOUNDWAVE_FINAL_ASSESSMENT",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_future_contact", value: "refused" }]
    }
  ]
};

const finalAssessment: StoryScene = {
  id: "HUMAN_SOUNDWAVE_FINAL_ASSESSMENT",
  origin: "human",
  chapter: 1,
  title: "Assessment",
  speaker: "Soundwave",
  body: `{{soundwaveFinalAssessment}}

Every answer remains stored. Whatever classification Soundwave assigns, the trio is no longer merely three unidentified humans who entered the wrong place.`,
  choices: [
    {
      id: "human_complete_soundwave_assessment",
      label: "Listen as Soundwave closes the exchange.",
      nextSceneId: "HUMAN_SOUNDWAVE_CONTACT_END",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "completed_soundwave_assessment", value: true }]
    }
  ]
};

const cutAndRun: StoryScene = {
  ...BASE_STORY.HUMAN_SOUNDWAVE_CUT_AND_RUN,
  title: "Unknown Humans",
  body: `You break the connection and pull your hand away from the device.

The lights go dark for an instant, then resume their slow purple pulse.

The three of you run.

Soundwave received confirmation of three organic life-signs, your movement through the site, and any voices transmitted before the connection ended.

He cannot yet attach confirmed identities to all of it.

Classification: unknown humans. Deliberate contact. Further observation warranted.

Cutting the connection prevents him from learning more right now. It does not erase the contact.`
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  ...continuedFollowupScenes,
  HUMAN_SOUNDWAVE_PURPOSE_USEFULNESS: purposeUsefulness,
  HUMAN_SOUNDWAVE_INITIATOR: initiator,
  HUMAN_SOUNDWAVE_AFFILIATION: affiliation,
  HUMAN_SOUNDWAVE_INFORMATION_EXPOSURE: informationExposure,
  HUMAN_SOUNDWAVE_MATERIAL_GATE: materialGate,
  HUMAN_SOUNDWAVE_RECOVERED_MATERIAL: recoveredMaterial,
  HUMAN_SOUNDWAVE_FUTURE_CONTACT: futureContact,
  HUMAN_SOUNDWAVE_FUTURE_REQUIREMENTS: futureRequirements,
  HUMAN_SOUNDWAVE_FINAL_ASSESSMENT: finalAssessment,
  HUMAN_SOUNDWAVE_CUT_AND_RUN: cutAndRun
};
