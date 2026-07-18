import type { StoryChoice, StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyInvestigationRisk";

const identifyChoices: StoryChoice[] =
  BASE_STORY.HUMAN_RELAY_SOUNDWAVE_CONTACT.choices;

const relayDeviceHub: StoryScene = {
  ...BASE_STORY.HUMAN_RELAY_DEVICE_HUB,
  choices: BASE_STORY.HUMAN_RELAY_DEVICE_HUB.choices.flatMap((choice) => {
    if (choice.id !== "human_activate_relay_communicator") {
      return [choice];
    }

    return [
      {
        ...choice,
        id: "human_activate_relay_communicator_without_site_search",
        requirements: [
          ...(choice.requirements ?? []),
          { type: "flag", key: "searched_relay_site", equals: false }
        ]
      },
      {
        ...choice,
        id: "human_activate_relay_communicator_after_site_search",
        nextSceneId: "HUMAN_RELAY_SOUNDWAVE_OBSERVATION_QUESTION",
        requirements: [
          ...(choice.requirements ?? []),
          { type: "flag", key: "searched_relay_site", equals: true }
        ]
      }
    ];
  })
};

const observationQuestion: StoryScene = {
  id: "HUMAN_RELAY_SOUNDWAVE_OBSERVATION_QUESTION",
  origin: "human",
  chapter: 1,
  title: "State What You Observed",
  speaker: "Unknown Decepticon",
  body: `You activate the section pulsing separately from the energy-transfer components.

The alert reaches Soundwave instantly.

The unit identifies three organic life-signs, confirms that the surrounding relay yard was searched, and begins transmitting what its damaged sensors can still detect.

“Unauthorized access detected.”

A second tone follows.

“Site-survey behavior detected.”

The voice offers no introduction.

“State what you observed.”`,
  choices: [
    {
      id: "human_report_all_relay_observations",
      label: "Tell him everything the trio observed at the site.",
      nextSceneId: "HUMAN_SOUNDWAVE_OBSERVATION_FULL",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "soundwave_observation_report", value: "full" },
        { type: "stat", group: "personality", key: "honesty", amount: 1 }
      ]
    },
    {
      id: "human_hide_recovered_component_from_soundwave",
      label: "Report the damage and tracks, but conceal the recovered component.",
      nextSceneId: "HUMAN_SOUNDWAVE_OBSERVATION_PARTIAL",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "soundwave_observation_report", value: "partial" },
        { type: "flag", key: "concealed_component_from_soundwave", value: true }
      ]
    },
    {
      id: "human_ask_why_decepticon_stayed_at_relay",
      label: "Ask why one Decepticon remained near the relay equipment.",
      nextSceneId: "HUMAN_SOUNDWAVE_OBSERVATION_QUESTION_BACK",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "asked_soundwave_about_relay_operator", value: true }]
    },
    {
      id: "human_refuse_observation_report",
      label: "Refuse to discuss what the trio found.",
      nextSceneId: "HUMAN_SOUNDWAVE_OBSERVATION_REFUSED",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_observation_report", value: "refused" }]
    },
    {
      id: "human_lie_no_useful_observations",
      label: "Claim that the trio found nothing useful.",
      nextSceneId: "HUMAN_SOUNDWAVE_OBSERVATION_LIE",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "soundwave_observation_report", value: "lied" },
        { type: "flag", key: "lied_to_soundwave_about_relay_site", value: true }
      ]
    }
  ]
};

const observationFull: StoryScene = {
  id: "HUMAN_SOUNDWAVE_OBSERVATION_FULL",
  origin: "human",
  chapter: 1,
  title: "Complete Report",
  speaker: "Unknown Decepticon",
  body: `You describe the Cybertronian footprints, transformation marks, burned power channels, and the pattern showing that one Decepticon remained near the relay machinery while the others moved through the attack.

You also disclose the broken Cybertronian component recovered near the collapsed support.

“Report consistent with unit telemetry.”

The voice pauses only long enough to record it.

“Recovered component: retain temporarily.”

Then he asks the question he would have asked regardless.

“Identify yourselves.”`,
  choices: identifyChoices
};

const observationPartial: StoryScene = {
  id: "HUMAN_SOUNDWAVE_OBSERVATION_PARTIAL",
  origin: "human",
  chapter: 1,
  title: "A Careful Omission",
  speaker: "Unknown Decepticon",
  body: `You report the footprints, transformation marks, damaged equipment, and evidence that one Decepticon remained near the power-transfer machinery.

You do not mention the Cybertronian component now hidden among the trio's belongings.

“Report: incomplete.”

The answer is immediate enough to make {{friendOne}} look down at what you concealed.

Soundwave does not identify the missing detail. He simply records that something was withheld.

“Identify yourselves.”`,
  choices: identifyChoices
};

const observationQuestionBack: StoryScene = {
  id: "HUMAN_SOUNDWAVE_OBSERVATION_QUESTION_BACK",
  origin: "human",
  chapter: 1,
  title: "Operational Supervision",
  speaker: "Unknown Decepticon",
  body: `“Why did one of you stay near the machinery?” you ask.

“Energy-transfer supervision.”

The reply confirms that the track pattern was correctly understood.

“Observation validated.”

He provides no name for the Decepticon who operated the equipment and no explanation of the larger plan.

“Identify yourselves.”`,
  choices: identifyChoices
};

const observationRefused: StoryScene = {
  id: "HUMAN_SOUNDWAVE_OBSERVATION_REFUSED",
  origin: "human",
  chapter: 1,
  title: "Refusal Recorded",
  speaker: "Unknown Decepticon",
  body: `“We are not telling you what we found,” you say.

“Refusal recorded.”

He does not argue or threaten. The device has already observed enough to confirm that the trio searched the site and returned carrying something that was not present when you entered.

“Information withheld. Motivation unknown.”

Then he continues.

“Identify yourselves.”`,
  choices: identifyChoices
};

const observationLie: StoryScene = {
  id: "HUMAN_SOUNDWAVE_OBSERVATION_LIE",
  origin: "human",
  chapter: 1,
  title: "Contradicted",
  speaker: "Unknown Decepticon",
  body: `You claim that the trio found nothing useful.

“Statement contradicted by unit telemetry.”

The device recorded your movement through the site, the time spent near the damaged equipment, and the additional object now carried by one of the three organic life-signs.

“Deception detected.”

{{friendTwo}} lowers their voice.

“He knows we took something.”

The speaker returns to the question he considers more important.

“Identify yourselves.”`,
  choices: identifyChoices
};

const purposeUnderstand: StoryScene = {
  ...BASE_STORY.HUMAN_SOUNDWAVE_PURPOSE_UNDERSTAND,
  body: `You explain that the Decepticons appeared on Earth without warning, attacked a power station, and vanished before anyone could ask what they wanted.

You came because you wanted answers from the faction responsible.

“Objective understood,” Soundwave says.

“Information is acquired through utility, leverage, or observation. Curiosity alone establishes none.”

A brief tone passes through the device.

“Information currently possessed?”`,
  choices: [
    {
      id: "human_share_all_information_with_soundwave",
      label: "Tell Soundwave exactly what the trio learned at the relay site.",
      nextSceneId: "HUMAN_SOUNDWAVE_INFORMATION_FULL",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_information_shared", value: "full" }]
    },
    {
      id: "human_share_only_public_information",
      label: "Give only information already available through public reports.",
      nextSceneId: "HUMAN_SOUNDWAVE_INFORMATION_PUBLIC",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_information_shared", value: "public" }]
    },
    {
      id: "human_ask_what_information_soundwave_wants",
      label: "Ask what information would make the trio useful to him.",
      nextSceneId: "HUMAN_SOUNDWAVE_INFORMATION_REQUEST",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "asked_soundwave_information_value", value: true }]
    },
    {
      id: "human_end_after_understanding_followup",
      label: "Refuse to provide more information and end the exchange.",
      nextSceneId: "HUMAN_SOUNDWAVE_CONTACT_END",
      timeCostHours: 1
    }
  ]
};

const purposeUsefulness: StoryScene = {
  ...BASE_STORY.HUMAN_SOUNDWAVE_PURPOSE_USEFULNESS,
  body: `You point out that the Decepticons are operating on an unfamiliar planet.

Humans know the roads, power systems, institutions, and habits of the people living here.

“Utility: possible.”

“Loyalty: unverified. Competence: partially demonstrated. Risk tolerance: excessive.”

{{friendOne}} looks offended by the final assessment.

{{friendTwo}} quietly says, “He is not wrong.”

Soundwave continues.

“Specify utility.”`,
  choices: [
    {
      id: "human_offer_infrastructure_knowledge",
      label: "Offer knowledge of roads, power systems, and local infrastructure.",
      nextSceneId: "HUMAN_SOUNDWAVE_UTILITY_INFRASTRUCTURE",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_utility_offer", value: "infrastructure" }]
    },
    {
      id: "human_offer_public_observation",
      label: "Offer to watch public reports and identify useful patterns.",
      nextSceneId: "HUMAN_SOUNDWAVE_UTILITY_OBSERVATION",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_utility_offer", value: "observation" }]
    },
    {
      id: "human_offer_intermediary_role",
      label: "Offer to explain human behavior and serve as an intermediary.",
      nextSceneId: "HUMAN_SOUNDWAVE_UTILITY_INTERMEDIARY",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_utility_offer", value: "intermediary" }]
    },
    {
      id: "human_ask_soundwave_requirements",
      label: "Ask what service Soundwave would require from them.",
      nextSceneId: "HUMAN_SOUNDWAVE_UTILITY_REQUIREMENTS",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "asked_soundwave_requirements", value: true }]
    },
    {
      id: "human_withdraw_offer_to_soundwave",
      label: "Withdraw the offer and end the connection.",
      nextSceneId: "HUMAN_SOUNDWAVE_CONTACT_END",
      timeCostHours: 1
    }
  ]
};

const purposeCuriosity: StoryScene = {
  ...BASE_STORY.HUMAN_SOUNDWAVE_PURPOSE_CURIOSITY,
  body: `You admit the simplest truth.

You found something the Decepticons left behind. You believed part of it could communicate. You wanted to know whether anyone would answer.

“Curiosity confirmed.”

“Behavior resulted in entry to a restricted disaster site, exposure to damaged alien technology, and direct contact with an unknown military force.”

“Survival probability reduced.”

He still does not disconnect.

“Expected gain?”`,
  choices: [
    {
      id: "human_expected_proof_of_connection",
      label: "Say you wanted proof that the device was still connected to someone.",
      nextSceneId: "HUMAN_SOUNDWAVE_GAIN_PROOF",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_expected_gain", value: "proof" }]
    },
    {
      id: "human_expected_direct_contact",
      label: "Say you wanted direct contact with a Decepticon.",
      nextSceneId: "HUMAN_SOUNDWAVE_GAIN_CONTACT",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_expected_gain", value: "contact" }]
    },
    {
      id: "human_expected_negotiation_chance",
      label: "Say you hoped contact might create an opportunity to negotiate.",
      nextSceneId: "HUMAN_SOUNDWAVE_GAIN_NEGOTIATION",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_expected_gain", value: "negotiation" }]
    },
    {
      id: "human_expected_nothing_beyond_answer",
      label: "Say you expected nothing beyond learning whether anyone would answer.",
      nextSceneId: "HUMAN_SOUNDWAVE_GAIN_NOTHING",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "soundwave_expected_gain", value: "answer" }]
    },
    {
      id: "human_end_after_curiosity_followup",
      label: "End the exchange without explaining further.",
      nextSceneId: "HUMAN_SOUNDWAVE_CONTACT_END",
      timeCostHours: 1
    }
  ]
};

const endChoice: StoryChoice = {
  id: "human_finish_expanded_soundwave_exchange",
  label: "Listen as Soundwave concludes the exchange.",
  nextSceneId: "HUMAN_SOUNDWAVE_CONTACT_END",
  timeCostHours: 1
};

const answerScene = (
  id: string,
  title: string,
  body: string,
  effects: StoryChoice["effects"] = []
): StoryScene => ({
  id,
  origin: "human",
  chapter: 1,
  title,
  speaker: "Soundwave",
  body,
  choices: [{ ...endChoice, id: `${id.toLowerCase()}_finish`, effects }]
});

const followupScenes: StoryScene[] = [
  answerScene(
    "HUMAN_SOUNDWAVE_INFORMATION_FULL",
    "Useful Detail",
    `You share the complete account available to the trio.

Soundwave compares every statement with the relay unit's telemetry.

“Consistency: high. Information value: limited but verified.”

He records both the facts and the willingness to disclose them.

“Cooperation noted.”`,
    [{ type: "stat", group: "relationship", key: "soundwave", amount: 1 }]
  ),
  answerScene(
    "HUMAN_SOUNDWAVE_INFORMATION_PUBLIC",
    "Nothing He Could Not Hear",
    `You repeat only what public broadcasts have already established.

“Information redundant.”

Soundwave identifies the restriction immediately.

“Private observations withheld. Caution noted.”

He does not gain much, but he learns that the trio understands the value of controlling information.`
  ),
  answerScene(
    "HUMAN_SOUNDWAVE_INFORMATION_REQUEST",
    "What Has Value",
    `“What information would make us useful?” you ask.

“Information unavailable through Decepticon observation.”

He lists no specific target.

“Human access. Local interpretation. Behavioral context. Verification.”

The answer explains the categories without giving the trio an assignment.

“Capability not yet established.”`
  ),
  answerScene(
    "HUMAN_SOUNDWAVE_UTILITY_INFRASTRUCTURE",
    "Local Systems",
    `You offer knowledge of roads, power distribution, maintenance access, and the way human infrastructure is actually used rather than merely how it appears on a map.

“Utility category: logistical.”

“Verification required.”

Soundwave records the offer without accepting it.

“Potential retained.”`,
    [{ type: "stat", group: "relationship", key: "soundwave", amount: 1 }]
  ),
  answerScene(
    "HUMAN_SOUNDWAVE_UTILITY_OBSERVATION",
    "Patterns in Public",
    `You offer to monitor television, radio, newspapers, road closures, and emergency reports for patterns the Decepticons may not immediately recognize.

“Utility category: open-source observation.”

“Risk: misinformation. Advantage: human context.”

He records the proposal.

“Potential retained.”`
  ),
  answerScene(
    "HUMAN_SOUNDWAVE_UTILITY_INTERMEDIARY",
    "Between Two Species",
    `You offer to explain human reactions and communicate with people who might panic or misunderstand Cybertronian intentions.

“Intermediary function: premature.”

The refusal is not absolute.

“Trust insufficient. Access unverified. Communication ability demonstrated.”

He records the possibility for later.`
  ),
  answerScene(
    "HUMAN_SOUNDWAVE_UTILITY_REQUIREMENTS",
    "No Assignment Yet",
    `“What would you require us to do?” you ask.

“No assignment authorized.”

Soundwave will not hand unknown humans a task merely because they volunteered.

“Future contact contingent upon demonstrated competence and controlled risk.”

The relay unit emits a single confirming tone.

“Offer retained.”`
  ),
  answerScene(
    "HUMAN_SOUNDWAVE_GAIN_PROOF",
    "Proof Obtained",
    `You say you wanted proof that the device remained connected to someone.

“Proof acquired.”

Soundwave does not mock the goal.

“Method inefficient. Result conclusive.”

The trio now knows the abandoned-looking unit was still part of an active Decepticon network.`
  ),
  answerScene(
    "HUMAN_SOUNDWAVE_GAIN_CONTACT",
    "Contact Achieved",
    `You admit that reaching a Decepticon directly was the goal.

“Contact achieved.”

The statement sounds less like approval than confirmation of a completed test.

“Consequences not yet determined.”

Soundwave records that the trio approached deliberately rather than by accident.`,
    [{ type: "stat", group: "relationship", key: "soundwave", amount: 1 }]
  ),
  answerScene(
    "HUMAN_SOUNDWAVE_GAIN_NEGOTIATION",
    "Negotiation Requires Leverage",
    `You say that contact might allow negotiation.

“Negotiation requires value, leverage, or mutual need.”

Soundwave has identified none of those yet.

“Current position: inquiry without leverage.”

He does not dismiss negotiation forever. He dismisses the idea that merely opening the channel was enough.`
  ),
  answerScene(
    "HUMAN_SOUNDWAVE_GAIN_NOTHING",
    "The Answer Was Enough",
    `You say you expected nothing beyond an answer.

“Expectation fulfilled.”

Soundwave pauses.

“Continued engagement indicates secondary interest.”

He has already noticed that the trio remained after receiving the answer they claimed was sufficient.

“Interest recorded.”`
  )
];

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_RELAY_DEVICE_HUB: relayDeviceHub,
  HUMAN_RELAY_SOUNDWAVE_OBSERVATION_QUESTION: observationQuestion,
  HUMAN_SOUNDWAVE_OBSERVATION_FULL: observationFull,
  HUMAN_SOUNDWAVE_OBSERVATION_PARTIAL: observationPartial,
  HUMAN_SOUNDWAVE_OBSERVATION_QUESTION_BACK: observationQuestionBack,
  HUMAN_SOUNDWAVE_OBSERVATION_REFUSED: observationRefused,
  HUMAN_SOUNDWAVE_OBSERVATION_LIE: observationLie,
  HUMAN_SOUNDWAVE_PURPOSE_UNDERSTAND: purposeUnderstand,
  HUMAN_SOUNDWAVE_PURPOSE_USEFULNESS: purposeUsefulness,
  HUMAN_SOUNDWAVE_PURPOSE_CURIOSITY: purposeCuriosity,
  ...Object.fromEntries(followupScenes.map((scene) => [scene.id, scene]))
};
