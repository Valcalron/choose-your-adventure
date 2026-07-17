import type { StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyHound";

const waitForOptimus: StoryScene = {
  ...BASE_STORY.HUMAN_WAIT_FOR_OPTIMUS_OPEN,
  choices: [
    {
      id: "human_wait_for_optimus_to_arrive",
      label: "Wait for Optimus Prime to come outside.",
      nextSceneId: "HUMAN_OPTIMUS_ARRIVES",
      timeCostHours: 1
    },
    {
      id: "human_leave_before_optimus_arrives",
      label: "Decide not to push any farther and return home.",
      nextSceneId: "HUMAN_HOME_HUB",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "left_before_meeting_optimus", value: true }]
    }
  ]
};

const optimusArrives: StoryScene = {
  id: "HUMAN_OPTIMUS_ARRIVES",
  origin: "human",
  chapter: 1,
  title: "Optimus Prime",
  speaker: "Optimus Prime",
  body: `Heavy footsteps approach from beyond the concealed route.

Hound and Ironhide shift aside just enough for a red-and-blue Autobot to come forward. He stops several careful steps away from you, {{friendOne}}, and {{friendTwo}}.

“Greetings. I am Optimus Prime.”

His voice is deep but measured.

“Ironhide tells me that you tracked our movements, found this region, and came here because you wish to help.”

You confirm it.

Optimus lowers himself slightly so that he does not tower over the three of you quite as much.

“Your willingness to help is appreciated. But you must understand why we keep our distance from most humans.”

He gestures toward himself, Hound, and Ironhide.

“Even the smallest among us is many times your size and weight. An accident that would cause little harm to a Cybertronian could seriously injure—or kill—a human.”

Ironhide folds his arms. “One wrong step during an alert, and we might not even see you in time.”

“The Ark is not simply our shelter,” Optimus continues. “It is a damaged spacecraft and an active military base. Equipment is being repaired. Weapons are moved. Autobots may be called into battle without warning.”

He looks at all three of you.

“Helping us would require discipline, patience, and obedience to every safety instruction.”`,
  choices: [
    {
      id: "human_agree_to_ark_rules",
      label: "Agree to follow every rule and safety instruction.",
      nextSceneId: "HUMAN_ARK_ENTRY_OPEN",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "accepted_ark_safety_rules", value: true },
        { type: "stat", group: "faction", key: "autobot", amount: 1 }
      ]
    },
    {
      id: "human_ask_what_help_is_needed",
      label: "Ask what kind of help the Autobots actually need from humans.",
      nextSceneId: "HUMAN_OPTIMUS_ALREADY_HAS_HELP",
      timeCostHours: 1
    },
    {
      id: "human_say_accept_the_risk",
      label: "Say that the three of you understand the danger and accept the risk.",
      nextSceneId: "HUMAN_OPTIMUS_SAFETY_Q1",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "claimed_to_accept_ark_risk", value: true }]
    },
    {
      id: "human_leave_after_meeting_optimus",
      label: "Thank Optimus for speaking with you and leave.",
      nextSceneId: "HUMAN_HOME_HUB",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "left_after_meeting_optimus", value: true }]
    }
  ]
};

const optimusAlreadyHasHelp: StoryScene = {
  id: "HUMAN_OPTIMUS_ALREADY_HAS_HELP",
  origin: "human",
  chapter: 1,
  title: "Help Already Given",
  speaker: "Optimus Prime",
  body: `“What could humans realistically do to help you?” you ask.

Optimus answers honestly.

“Spike and Sparkplug have already helped us understand Earth, its people, and many of its machines. Their knowledge has proven valuable.”

He looks from you to your friends.

“At present, we do not require additional human assistance. I will not place you in danger merely to reward your willingness to help.”

The answer is not dismissive. It is simply the truth: the Autobots already have human assistance, and they do not need more people inside an active military base merely because those people volunteered.`,
  choices: [
    {
      id: "human_accept_no_help_needed",
      label: "Accept Prime's answer and return home.",
      nextSceneId: "HUMAN_HOME_HUB",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "accepted_autobots_need_no_more_humans", value: true }]
    }
  ]
};

const optimusSafetyQuestionOne: StoryScene = {
  id: "HUMAN_OPTIMUS_SAFETY_Q1",
  origin: "human",
  chapter: 1,
  title: "The First Condition",
  speaker: "Optimus Prime",
  body: `“Accepting danger is not the same as understanding your responsibility,” Optimus says.

He asks the first question.

“If an Autobot orders you to leave immediately, will you obey—even if you believe you can help?”`,
  choices: [
    {
      id: "human_q1_we_will",
      label: "We will.",
      nextSceneId: "HUMAN_OPTIMUS_SAFETY_Q2",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "optimus_safety_answer_one", value: "yes" }]
    },
    {
      id: "human_q1_no",
      label: "No. Not if we believe leaving would make things worse.",
      nextSceneId: "HUMAN_OPTIMUS_REFUSES_ENTRY",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "optimus_safety_answer_one", value: "no" }]
    },
    {
      id: "human_q1_leave",
      label: "Decide not to accept that condition and leave.",
      nextSceneId: "HUMAN_HOME_HUB",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "left_during_optimus_safety_test", value: true }]
    }
  ]
};

const optimusSafetyQuestionTwo: StoryScene = {
  id: "HUMAN_OPTIMUS_SAFETY_Q2",
  origin: "human",
  chapter: 1,
  title: "The Second Condition",
  speaker: "Optimus Prime",
  body: `Optimus accepts the first answer and continues.

“Will you remain with an escort and stay out of every area declared unsafe?”`,
  choices: [
    {
      id: "human_q2_we_will",
      label: "We will.",
      nextSceneId: "HUMAN_OPTIMUS_SAFETY_Q3",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "optimus_safety_answer_two", value: "yes" }]
    },
    {
      id: "human_q2_no",
      label: "No. We need to be able to decide where we can safely go.",
      nextSceneId: "HUMAN_OPTIMUS_REFUSES_ENTRY",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "optimus_safety_answer_two", value: "no" }]
    },
    {
      id: "human_q2_leave",
      label: "Decide not to accept that condition and leave.",
      nextSceneId: "HUMAN_HOME_HUB",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "left_during_optimus_safety_test", value: true }]
    }
  ]
};

const optimusSafetyQuestionThree: StoryScene = {
  id: "HUMAN_OPTIMUS_SAFETY_Q3",
  origin: "human",
  chapter: 1,
  title: "The Final Condition",
  speaker: "Optimus Prime",
  body: `Optimus asks one final question.

“If helping us places either of your friends in danger, are you prepared to stop rather than press forward?”`,
  choices: [
    {
      id: "human_q3_yes",
      label: "Yes.",
      nextSceneId: "HUMAN_ARK_ENTRY_OPEN",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "optimus_safety_answer_three", value: "yes" },
        { type: "flag", key: "passed_optimus_safety_test", value: true },
        { type: "flag", key: "accepted_ark_safety_rules", value: true },
        { type: "stat", group: "faction", key: "autobot", amount: 1 }
      ]
    },
    {
      id: "human_q3_no",
      label: "No. Each of us should decide what risks to accept.",
      nextSceneId: "HUMAN_OPTIMUS_REFUSES_ENTRY",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "optimus_safety_answer_three", value: "no" }]
    },
    {
      id: "human_q3_leave",
      label: "Decide not to accept that condition and leave.",
      nextSceneId: "HUMAN_HOME_HUB",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "left_during_optimus_safety_test", value: true }]
    }
  ]
};

const optimusRefusesEntry: StoryScene = {
  id: "HUMAN_OPTIMUS_REFUSES_ENTRY",
  origin: "human",
  chapter: 1,
  title: "Not Under Those Conditions",
  speaker: "Optimus Prime",
  body: `Optimus is not angry. His answer is regretful and final.

“I respect your willingness to face danger. But I cannot allow you into the Ark unless all three of you are prepared to follow those conditions.”

He does not question your courage. He refuses because allowing humans into an active Cybertronian base would also make their safety an Autobot responsibility.

Hound prepares to escort the trio back toward the public road.`,
  choices: [
    {
      id: "human_return_home_after_prime_refusal",
      label: "Accept Prime's decision and return home.",
      nextSceneId: "HUMAN_HOME_HUB",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "optimus_refused_ark_entry", value: true }]
    }
  ]
};

const arkEntryOpen: StoryScene = {
  id: "HUMAN_ARK_ENTRY_OPEN",
  origin: "human",
  chapter: 1,
  title: "Allowed Inside",
  speaker: "Optimus Prime",
  body: `Optimus studies the three of you before nodding.

“Then you understand that courage is not enough. Responsibility means knowing when to act—and when to listen.”

He states the rules clearly.

You will remain with an escort or with Spike and Sparkplug. You will not enter damaged, restricted, or unsafe areas. You will not touch Cybertronian equipment without permission. During an alert, you will obey instructions immediately. If ordered to leave, you will leave without argument.

“Under those conditions,” Optimus says, “you may enter the Ark.”

Hound and Ironhide move aside, revealing the route they had been guarding.

The trio has earned supervised access. What they see when they enter the Ark will be developed next.`,
  choices: []
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_WAIT_FOR_OPTIMUS_OPEN: waitForOptimus,
  HUMAN_OPTIMUS_ARRIVES: optimusArrives,
  HUMAN_OPTIMUS_ALREADY_HAS_HELP: optimusAlreadyHasHelp,
  HUMAN_OPTIMUS_SAFETY_Q1: optimusSafetyQuestionOne,
  HUMAN_OPTIMUS_SAFETY_Q2: optimusSafetyQuestionTwo,
  HUMAN_OPTIMUS_SAFETY_Q3: optimusSafetyQuestionThree,
  HUMAN_OPTIMUS_REFUSES_ENTRY: optimusRefusesEntry,
  HUMAN_ARK_ENTRY_OPEN: arkEntryOpen
};
