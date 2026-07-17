import type { StoryScene } from "../types/game";

export const STORY: Record<string, StoryScene> = {
  HUMAN_START: {
    id: "HUMAN_START",
    origin: "human",
    chapter: 1,
    title: "Aliens Exist",
    body:
      "—ALIEN ROBOTS ATTACK DESERT POWER CENTER! The headline fills every television in the store. News footage shows jets descending over a remote electrical relay station, transforming before they touch the ground. Three towering machines tear into the power systems while a silver commander with red optics directs the attack. Minutes later, a red transport truck and several ordinary-looking cars arrive—and transform to fight them. {{friendOne}} stands rigid beside you. {{friendTwo}} has stopped pretending this might be a hoax. Then the reporter warns that both groups may now be traveling disguised as normal vehicles.",
    choices: [
      {
        id: "human_investigate",
        label: "Tell {{friendOne}} and {{friendTwo}} you need to see the attack site for yourselves.",
        nextSceneId: "HUMAN_HELP",
        effects: [
          { type: "stat", group: "personality", key: "curiosity", amount: 1 },
          { type: "stat", group: "personality", key: "leadership", amount: 1 },
          { type: "stat", group: "relationship", key: "friendOne", amount: 1 },
          { type: "flag", key: "trio_investigates_relay_attack", value: true }
        ]
      },
      {
        id: "human_cautious",
        label: "Keep the three of you together and learn more before acting.",
        nextSceneId: "HUMAN_HIDE",
        effects: [
          { type: "stat", group: "faction", key: "independent", amount: 1 },
          { type: "stat", group: "relationship", key: "friendTwo", amount: 1 },
          { type: "stat", group: "personality", key: "honesty", amount: 1 }
        ]
      },
      {
        id: "human_report",
        label: "Ask {{friendOne}} and {{friendTwo}} to stay close while you report what the news may have missed.",
        nextSceneId: "HUMAN_CALL",
        effects: [
          { type: "stat", group: "personality", key: "obedience", amount: 1 },
          { type: "stat", group: "faction", key: "autobot", amount: 1 }
        ]
      }
    ]
  },
  HUMAN_HELP: {
    id: "HUMAN_HELP",
    origin: "human",
    chapter: 1,
    title: "A Calculated Risk",
    speaker: "Unknown Cybertronian",
    body:
      "\"Do not touch the damaged panel.\" The voice is controlled despite the static cutting through it. \"Remove the debris from the lower hinge. Slowly.\" Behind you, {{friendOne}} watches the road while {{friendTwo}} keeps one hand near your shoulder.",
    choices: [
      {
        id: "human_follow_instruction",
        label: "Follow the instructions exactly and keep both friends informed.",
        nextSceneId: "HUMAN_END_CONTACT",
        effects: [
          { type: "stat", group: "personality", key: "obedience", amount: 1 },
          { type: "stat", group: "relationship", key: "soundwave", amount: 1 },
          { type: "stat", group: "relationship", key: "friendTwo", amount: 1 },
          { type: "flag", key: "earned_first_decepticon_trust", value: true }
        ]
      },
      {
        id: "human_question",
        label: "Ask who it is before helping further.",
        nextSceneId: "HUMAN_END_CONTACT",
        effects: [
          { type: "stat", group: "personality", key: "honesty", amount: 1 },
          { type: "stat", group: "personality", key: "leadership", amount: 1 }
        ]
      }
    ]
  },
  HUMAN_CALL: {
    id: "HUMAN_CALL",
    origin: "human",
    chapter: 1,
    title: "The Wrong Kind of Emergency",
    body:
      "The dispatcher never finishes the second question. A yellow compact car rounds the bend far too quickly, brakes hard, and transforms before your eyes. {{friendOne}} pulls {{friendTwo}} back as the machine rises over all three of you.",
    choices: [
      {
        id: "human_stay",
        label: "Stay together and explain exactly what happened.",
        nextSceneId: "HUMAN_END_CONTACT",
        effects: [
          { type: "stat", group: "faction", key: "autobot", amount: 1 },
          { type: "stat", group: "personality", key: "honesty", amount: 1 },
          { type: "stat", group: "relationship", key: "bumblebee", amount: 1 }
        ]
      },
      {
        id: "human_leave",
        label: "Get {{friendOne}} and {{friendTwo}} away before either side decides you know too much.",
        nextSceneId: "HUMAN_END_CONTACT",
        effects: [
          { type: "stat", group: "faction", key: "independent", amount: 1 },
          { type: "stat", group: "relationship", key: "friendOne", amount: 1 }
        ]
      }
    ]
  },
  HUMAN_HIDE: {
    id: "HUMAN_HIDE",
    origin: "human",
    chapter: 1,
    title: "Observer",
    body:
      "The three of you remain low behind the embankment. Two machines arrive from opposite directions. Neither knows you are there yet, and both are searching for the same damaged device. {{friendOne}} looks ready to move. {{friendTwo}} is waiting to see what you decide.",
    choices: [
      {
        id: "human_warn_autobot",
        label: "Warn the one with blue optics.",
        nextSceneId: "HUMAN_END_CONTACT",
        effects: [
          { type: "stat", group: "faction", key: "autobot", amount: 2 },
          { type: "flag", key: "chose_first_warning", value: "autobot" }
        ]
      },
      {
        id: "human_warn_decepticon",
        label: "Warn the one with red optics.",
        nextSceneId: "HUMAN_END_CONTACT",
        effects: [
          { type: "stat", group: "faction", key: "decepticon", amount: 2 },
          { type: "flag", key: "chose_first_warning", value: "decepticon" }
        ]
      },
      {
        id: "human_warn_neither",
        label: "Warn neither. Keep the trio hidden and learn what both sides want.",
        nextSceneId: "HUMAN_END_CONTACT",
        effects: [
          { type: "stat", group: "faction", key: "independent", amount: 2 },
          { type: "stat", group: "personality", key: "ambition", amount: 1 },
          { type: "stat", group: "relationship", key: "friendTwo", amount: 1 }
        ]
      }
    ]
  },
  HUMAN_END_CONTACT: {
    id: "HUMAN_END_CONTACT",
    origin: "human",
    chapter: 1,
    title: "End of Prototype Chapter",
    body:
      "Your first decision has placed all three of you on the board, but it has not decided your loyalty. Both factions now know that {{player}}, {{friendOne}}, and {{friendTwo}} witnessed something important.",
    choices: [],
    isEnding: true
  },

  CYBER_START: {
    id: "CYBER_START",
    origin: "cybertronian",
    chapter: 1,
    title: "First Light",
    body:
      "Your optics activate beneath emergency lighting. {{friendOne}} is already awake in the neighboring berth, and {{friendTwo}} is forcing a damaged restraint open. The chamber around the three of you is intact, but the city beyond it is not. Sirens pulse through the walls. Someone outside is arguing about whether newly sparked frames should be moved, armed, or abandoned.",
    choices: [
      {
        id: "cyber_step_out",
        label: "Lead {{friendOne}} and {{friendTwo}} outside and demand an explanation.",
        nextSceneId: "CYBER_ASSERT",
        effects: [
          { type: "stat", group: "personality", key: "leadership", amount: 1 },
          { type: "stat", group: "personality", key: "ambition", amount: 1 },
          { type: "stat", group: "relationship", key: "friendOne", amount: 1 }
        ]
      },
      {
        id: "cyber_listen",
        label: "Signal both friends to remain still and listen before revealing you are awake.",
        nextSceneId: "CYBER_LISTEN",
        effects: [
          { type: "stat", group: "personality", key: "curiosity", amount: 1 },
          { type: "stat", group: "faction", key: "independent", amount: 1 },
          { type: "stat", group: "relationship", key: "friendTwo", amount: 1 }
        ]
      },
      {
        id: "cyber_help",
        label: "Take your friends toward the emergency signal in the damaged district.",
        nextSceneId: "CYBER_HELP",
        effects: [
          { type: "stat", group: "personality", key: "mercy", amount: 1 },
          { type: "stat", group: "faction", key: "autobot", amount: 1 }
        ]
      }
    ]
  },
  CYBER_ASSERT: {
    id: "CYBER_ASSERT",
    origin: "cybertronian",
    chapter: 1,
    title: "A Place in the Conflict",
    body:
      "The argument stops when the three of you enter. One worker tells you to return to your cradles. Another says no one has the authority to order any of you anywhere now. {{friendOne}} looks toward you; {{friendTwo}} looks toward the exits.",
    choices: [
      {
        id: "cyber_choose_order",
        label: "Ask who is still capable of maintaining order.",
        nextSceneId: "CYBER_END_FIRST_LIGHT",
        effects: [
          { type: "stat", group: "faction", key: "decepticon", amount: 1 },
          { type: "stat", group: "personality", key: "obedience", amount: 1 }
        ]
      },
      {
        id: "cyber_choose_self",
        label: "Tell them the three of you will decide your own functions.",
        nextSceneId: "CYBER_END_FIRST_LIGHT",
        effects: [
          { type: "stat", group: "faction", key: "independent", amount: 2 },
          { type: "stat", group: "personality", key: "leadership", amount: 1 },
          { type: "stat", group: "relationship", key: "friendOne", amount: 1 }
        ]
      }
    ]
  },
  CYBER_LISTEN: {
    id: "CYBER_LISTEN",
    origin: "cybertronian",
    chapter: 1,
    title: "The First Division",
    body:
      "The three of you hear enough to understand that the old authority is failing and a new movement is gaining strength. Neither side agrees on whether newly sparked Cybertronians are citizens, resources, or recruits.",
    choices: [
      {
        id: "cyber_reveal",
        label: "Reveal the trio and ask to hear both arguments.",
        nextSceneId: "CYBER_END_FIRST_LIGHT",
        effects: [
          { type: "stat", group: "personality", key: "honesty", amount: 1 },
          { type: "stat", group: "faction", key: "independent", amount: 1 }
        ]
      },
      {
        id: "cyber_follow_recruiter",
        label: "Lead {{friendOne}} and {{friendTwo}} after the voice speaking about changing Cybertron.",
        nextSceneId: "CYBER_END_FIRST_LIGHT",
        effects: [
          { type: "stat", group: "faction", key: "decepticon", amount: 2 },
          { type: "flag", key: "heard_early_decepticon_recruitment", value: true }
        ]
      }
    ]
  },
  CYBER_HELP: {
    id: "CYBER_HELP",
    origin: "cybertronian",
    chapter: 1,
    title: "Function Through Action",
    body:
      "The damaged district is full of trapped workers. No one asks what functions the three of you were assigned. They only ask whether you can help. {{friendOne}} moves toward the nearest collapse while {{friendTwo}} waits for your direction.",
    choices: [
      {
        id: "cyber_rescue",
        label: "Join the rescue effort together.",
        nextSceneId: "CYBER_END_FIRST_LIGHT",
        effects: [
          { type: "stat", group: "faction", key: "autobot", amount: 2 },
          { type: "stat", group: "personality", key: "mercy", amount: 1 }
        ]
      },
      {
        id: "cyber_command",
        label: "Organize the workers and your friends before entering the ruins.",
        nextSceneId: "CYBER_END_FIRST_LIGHT",
        effects: [
          { type: "stat", group: "personality", key: "leadership", amount: 2 },
          { type: "stat", group: "faction", key: "independent", amount: 1 },
          { type: "stat", group: "relationship", key: "friendTwo", amount: 1 }
        ]
      }
    ]
  },
  CYBER_END_FIRST_LIGHT: {
    id: "CYBER_END_FIRST_LIGHT",
    origin: "cybertronian",
    chapter: 1,
    title: "End of Prototype Chapter",
    body:
      "You, {{friendOne}}, and {{friendTwo}} came online after the war began. Your first act has already shaped how others see your trio, but no insignia has been placed on any of your frames.",
    choices: [],
    isEnding: true
  }
};