import type { StoryScene } from "../types/game";

export const STORY: Record<string, StoryScene> = {
  HUMAN_START: {
    id: "HUMAN_START",
    origin: "human",
    chapter: 1,
    title: "Aliens Exist",
    body:
      "—ALIEN ROBOTS ATTACK DESERT POWER CENTER! The headline fills every television in the store. News footage shows jets descending over a remote electrical relay station, transforming before they touch the ground. Three towering machines tear into the power systems while a silver commander with red optics directs the attack. Minutes later, a red transport truck and several ordinary-looking cars arrive—and transform to fight them. Prizm stands rigid beside you. Juci has stopped pretending this might be a hoax. Then the reporter warns that both groups may now be traveling disguised as normal vehicles.",
    choices: [
      {
        id: "human_investigate",
        label: "Tell Prizm and Juci you need to see the attack site for yourselves.",
        nextSceneId: "HUMAN_HELP",
        effects: [
          { type: "stat", group: "personality", key: "curiosity", amount: 1 },
          { type: "stat", group: "personality", key: "leadership", amount: 1 },
          { type: "stat", group: "relationship", key: "prizm", amount: 1 },
          { type: "flag", key: "trio_investigates_relay_attack", value: true }
        ]
      },
      {
        id: "human_cautious",
        label: "Keep the three of you together and learn more before acting.",
        nextSceneId: "HUMAN_HIDE",
        effects: [
          { type: "stat", group: "faction", key: "independent", amount: 1 },
          { type: "stat", group: "relationship", key: "juci", amount: 1 },
          { type: "stat", group: "personality", key: "honesty", amount: 1 }
        ]
      },
      {
        id: "human_report",
        label: "Call someone you trust and report what the news may have missed.",
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
      "\"Do not touch the damaged panel.\" The voice is controlled despite the static cutting through it. \"Remove the debris from the lower hinge. Slowly.\"",
    choices: [
      {
        id: "human_follow_instruction",
        label: "Follow the instructions exactly.",
        nextSceneId: "HUMAN_END_CONTACT",
        effects: [
          { type: "stat", group: "personality", key: "obedience", amount: 1 },
          { type: "stat", group: "relationship", key: "soundwave", amount: 1 },
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
      "The dispatcher never finishes the second question. A yellow compact car rounds the bend far too quickly, brakes hard, and transforms before your eyes.",
    choices: [
      {
        id: "human_stay",
        label: "Stay and explain exactly what happened.",
        nextSceneId: "HUMAN_END_CONTACT",
        effects: [
          { type: "stat", group: "faction", key: "autobot", amount: 1 },
          { type: "stat", group: "personality", key: "honesty", amount: 1 },
          { type: "stat", group: "relationship", key: "bumblebee", amount: 1 }
        ]
      },
      {
        id: "human_leave",
        label: "Leave before either side decides you know too much.",
        nextSceneId: "HUMAN_END_CONTACT",
        effects: [
          { type: "stat", group: "faction", key: "independent", amount: 1 }
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
      "You remain low behind the embankment. Two machines arrive from opposite directions. Neither knows you are there yet, and both are searching for the same damaged device.",
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
        label: "Warn neither. Learn what both sides want.",
        nextSceneId: "HUMAN_END_CONTACT",
        effects: [
          { type: "stat", group: "faction", key: "independent", amount: 2 },
          { type: "stat", group: "personality", key: "ambition", amount: 1 }
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
      "Your first decision has placed you on the board, but it has not decided your loyalty. Both factions now know that a human witnessed something important.",
    choices: [],
    isEnding: true
  },

  CYBER_START: {
    id: "CYBER_START",
    origin: "cybertronian",
    chapter: 1,
    title: "First Light",
    body:
      "Your optics activate beneath emergency lighting. The chamber around you is intact, but the city beyond it is not. Sirens pulse through the walls. Someone is arguing outside about whether newly sparked frames should be moved, armed, or abandoned.",
    choices: [
      {
        id: "cyber_step_out",
        label: "Step out and demand an explanation.",
        nextSceneId: "CYBER_ASSERT",
        effects: [
          { type: "stat", group: "personality", key: "leadership", amount: 1 },
          { type: "stat", group: "personality", key: "ambition", amount: 1 }
        ]
      },
      {
        id: "cyber_listen",
        label: "Remain still and listen before revealing you are awake.",
        nextSceneId: "CYBER_LISTEN",
        effects: [
          { type: "stat", group: "personality", key: "curiosity", amount: 1 },
          { type: "stat", group: "faction", key: "independent", amount: 1 }
        ]
      },
      {
        id: "cyber_help",
        label: "Follow the emergency signal toward the damaged district.",
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
      "The argument stops when you enter. One worker tells you to return to your cradle. Another says no one has the authority to order you anywhere now.",
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
        label: "Tell them you will decide your own function.",
        nextSceneId: "CYBER_END_FIRST_LIGHT",
        effects: [
          { type: "stat", group: "faction", key: "independent", amount: 2 },
          { type: "stat", group: "personality", key: "leadership", amount: 1 }
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
      "You hear enough to understand that the old authority is failing and a new movement is gaining strength. Neither side agrees on whether you are a citizen, a resource, or a recruit.",
    choices: [
      {
        id: "cyber_reveal",
        label: "Reveal yourself and ask to hear both arguments.",
        nextSceneId: "CYBER_END_FIRST_LIGHT",
        effects: [
          { type: "stat", group: "personality", key: "honesty", amount: 1 },
          { type: "stat", group: "faction", key: "independent", amount: 1 }
        ]
      },
      {
        id: "cyber_follow_recruiter",
        label: "Follow the voice speaking about changing Cybertron.",
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
      "The damaged district is full of trapped workers. No one asks what function you were assigned. They only ask whether you can help.",
    choices: [
      {
        id: "cyber_rescue",
        label: "Join the rescue effort.",
        nextSceneId: "CYBER_END_FIRST_LIGHT",
        effects: [
          { type: "stat", group: "faction", key: "autobot", amount: 2 },
          { type: "stat", group: "personality", key: "mercy", amount: 1 }
        ]
      },
      {
        id: "cyber_command",
        label: "Organize the workers before entering the ruins.",
        nextSceneId: "CYBER_END_FIRST_LIGHT",
        effects: [
          { type: "stat", group: "personality", key: "leadership", amount: 2 },
          { type: "stat", group: "faction", key: "independent", amount: 1 }
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
      "You came online after the war began. Your first act has already shaped how others see you, but no insignia has been placed on your frame.",
    choices: [],
    isEnding: true
  }
};
