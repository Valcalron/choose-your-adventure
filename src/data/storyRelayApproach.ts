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

const relayReturnHome: StoryScene = {
  ...BASE_STORY.HUMAN_RELAY_RETURN_HOME,
  title: "What You Brought Home",
  body: `The three of you make it back without being stopped by the roadblocks.

{{relayReturnSummary}}

The relay station is behind you. The evidence is not.

Before deciding what comes next, the trio needs to place everything together, separate what is known from what is only suspected, and agree on what to do if Soundwave ever speaks through the communicator again.`
};

const relayReviewEvidence: StoryScene = {
  id: "HUMAN_RELAY_REVIEW_EVIDENCE",
  origin: "human",
  chapter: 2,
  title: "What the Site Confirmed",
  body: `The trio clears the table and lays out every photograph, sketch, note, and piece of Cybertronian material that made it home.

You begin with what is certain.

The Decepticons targeted the relay station for energy. They attached Cybertronian equipment directly to human infrastructure. The device could monitor, measure, and communicate.

{{relayEvidenceReview}}

Then you write down what remains uncertain.

You do not know where the Decepticons are based. You do not know what they plan to attack next. Even with the communicator in front of you, none of you knows what it does while untouched or what Soundwave may still be able to do from his side.

The facts are organized. Now the trio has to decide how to respond to them.`,
  choices: [
    {
      id: "human_discuss_future_soundwave_contact",
      label: "Decide what the trio will do if Soundwave contacts you again.",
      nextSceneId: "HUMAN_RELAY_SOUNDWAVE_CONTACT_PLAN",
      timeCostHours: 1,
      requirements: [
        { type: "flag", key: "contacted_soundwave_at_relay", equals: true },
        { type: "inventory", item: "Recovered Decepticon relay device" }
      ]
    },
    {
      id: "human_report_relay_findings_after_review",
      label: "Report the findings and ask that they be passed to the Autobots.",
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
    {
      id: "human_research_autobots_after_relay_review",
      label: "Use what you learned to begin researching the Autobots.",
      nextSceneId: "HUMAN_RELAY_RESEARCH_AUTOBOTS",
      timeCostHours: 1
    },
    {
      id: "human_stop_after_relay_review",
      label: "Put everything away and stop looking for either faction.",
      nextSceneId: "ENDING_DOOR_STAYED_CLOSED",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "chose_isolation_after_relay", value: true }]
    }
  ]
};

const relaySoundwaveContactPlan: StoryScene = {
  id: "HUMAN_RELAY_SOUNDWAVE_CONTACT_PLAN",
  origin: "human",
  chapter: 2,
  title: "Before He Speaks Again",
  body: `The communicator sits in the middle of the table.

The three of you know that Soundwave answered when the unit was activated. You know he could hear through it, receive information from it, and keep a record of the conversation.

You do not know whether the communicator is doing anything now.

You do not know whether Soundwave can open the channel from his side, what the device transmits while no one is speaking, or whether it can reveal where it has been taken. None of you has the knowledge to answer those questions safely.

{{friendOne}} looks at the slow purple pulse.

“If there is a next conversation, nobody answers alone.”

{{friendTwo}} pulls the notes closer.

“And we decide what we are willing to tell him before he asks.”

The three of you begin setting rules for the next contact—if there is one.`,
  choices: [
    {
      id: "human_plan_answer_soundwave_together",
      label: "Agree to answer only when all three of you are present, using prepared questions and limits.",
      nextSceneId: "HUMAN_DECEPTICON_CHAPTER_TWO_WAITING",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "soundwave_next_contact_plan", value: "answer_together" },
        { type: "flag", key: "decepticon_chapter_two_plan_complete", value: true },
        { type: "stat", group: "relationship", key: "friendOne", amount: 1 },
        { type: "stat", group: "relationship", key: "friendTwo", amount: 1 }
      ]
    },
    {
      id: "human_plan_wait_for_soundwave",
      label: "Do not activate the communicator again; wait to see whether Soundwave opens the channel first.",
      nextSceneId: "HUMAN_DECEPTICON_CHAPTER_TWO_WAITING",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "soundwave_next_contact_plan", value: "wait_for_soundwave" },
        { type: "flag", key: "decepticon_chapter_two_plan_complete", value: true }
      ]
    },
    {
      id: "human_plan_refuse_soundwave_and_seek_autobots",
      label: "Decide not to answer Soundwave again and begin looking for the Autobots instead.",
      nextSceneId: "HUMAN_RELAY_RESEARCH_AUTOBOTS",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "soundwave_next_contact_plan", value: "refuse_and_seek_autobots" },
        { type: "flag", key: "seeking_faction", value: "autobots" },
        { type: "stat", group: "faction", key: "autobot", amount: 1 }
      ]
    }
  ]
};

const decepticonChapterTwoWaiting: StoryScene = {
  id: "HUMAN_DECEPTICON_CHAPTER_TWO_WAITING",
  origin: "human",
  chapter: 2,
  title: "Waiting for the Channel",
  body: `The decision is made.

The communicator is stored where none of you will touch it casually. The trio keeps the notes, questions, and agreed limits beside it so no one has to improvise if the purple light changes or Soundwave's voice returns.

You still do not know whether the device can reveal where it is, whether Soundwave can activate it remotely, or whether he intends to contact the three of you again.

Until the communicator answers one of those questions, the trio waits together.`,
  choices: []
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_RELAY_APPROACH: relayApproach,
  HUMAN_RELAY_ROADBLOCK: relayRoadblock,
  HUMAN_RELAY_TURN_BACK: relayTurnBack,
  HUMAN_RELAY_DEVICE_HUB: relayDeviceHub,
  HUMAN_RELAY_RETURN_HOME: relayReturnHome,
  HUMAN_RELAY_REVIEW_EVIDENCE: relayReviewEvidence,
  HUMAN_RELAY_SOUNDWAVE_CONTACT_PLAN: relaySoundwaveContactPlan,
  HUMAN_DECEPTICON_CHAPTER_TWO_WAITING: decepticonChapterTwoWaiting
};