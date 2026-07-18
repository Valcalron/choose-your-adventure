import type { StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyNamedRoutes";

const decepticonWaiting: StoryScene = {
  ...BASE_STORY.HUMAN_DECEPTICON_CHAPTER_TWO_WAITING,
  title: "The First Quiet Days",
  body: `The first night, none of you sleeps well.

The communicator is wrapped, stored, and left where all three of you can see whether its purple light changes. Every sound in the room draws attention back to it.

By morning, it has done nothing.

The second day is the same. The three of you compare notes, repeat the limits you agreed on, and avoid touching the controls.

By the third day, ordinary life begins pressing back in. There are meals to eat, obligations to meet, errands to finish, and people who know nothing about the Decepticon device hidden in the room.

Soundwave does not speak. The communicator continues its slow pulse as though waiting costs it nothing.`,
  choices: [
    {
      id: "human_keep_rotating_communicator_watch",
      label: "Set a rotating watch schedule and continue with ordinary life.",
      nextSceneId: "HUMAN_DECEPTICON_QUIET_WEEK",
      timeCostHours: 168,
      effects: [
        { type: "flag", key: "communicator_watch_plan", value: "rotating_watch" },
        { type: "stat", group: "relationship", key: "friendOne", amount: 1 },
        { type: "stat", group: "relationship", key: "friendTwo", amount: 1 }
      ]
    },
    {
      id: "human_check_communicator_twice_daily",
      label: "Keep it out of sight and check it only every morning and evening.",
      nextSceneId: "HUMAN_DECEPTICON_QUIET_WEEK",
      timeCostHours: 168,
      effects: [{ type: "flag", key: "communicator_watch_plan", value: "twice_daily" }]
    },
    {
      id: "human_research_energy_sites_while_waiting",
      label: "Use spare time to organize reports about power stations, fuel depots, and unexplained outages.",
      nextSceneId: "HUMAN_DECEPTICON_QUIET_WEEK",
      timeCostHours: 168,
      effects: [
        { type: "flag", key: "researched_energy_targets_while_waiting", value: true },
        { type: "stat", group: "personality", key: "curiosity", amount: 1 }
      ]
    }
  ]
};

const decepticonQuietWeek: StoryScene = {
  id: "HUMAN_DECEPTICON_QUIET_WEEK",
  origin: "human",
  chapter: 2,
  title: "A Week Without an Answer",
  body: `By the end of the first week, the damaged relay station is no longer the first story on every broadcast.

Repair crews continue working behind the roadblocks. Officials repeat that the investigation is ongoing. Newspapers print grainy photographs of the attack beside guesses about where the alien machines went.

For everyone else, the event begins becoming something that happened last week.

For the three of you, it remains present every day.

You return to familiar routines. Conversations begin including ordinary things again. Someone makes a joke without forcing it. An evening passes in which the communicator is not the first subject discussed.

Still, every meeting ends with the same check: the purple light has not changed, and Soundwave has not returned.

The silence gives the trio time to become more organized, but it provides no answer about whether you are being ignored, tested, or simply remembered for later.`,
  choices: [
    {
      id: "human_continue_life_and_monitor_news",
      label: "Continue your normal routines while monitoring television, radio, and newspapers together.",
      nextSceneId: "HUMAN_DECEPTICON_SECOND_WEEK",
      timeCostHours: 120,
      effects: [{ type: "flag", key: "maintained_normal_routines", value: true }]
    },
    {
      id: "human_build_energy_target_map_during_week",
      label: "Spend the evenings building a map of major energy sites and suspicious outages.",
      nextSceneId: "HUMAN_DECEPTICON_SECOND_WEEK",
      timeCostHours: 120,
      effects: [
        { type: "flag", key: "built_decepticon_energy_target_map", value: true },
        { type: "stat", group: "faction", key: "decepticon", amount: 1 }
      ]
    },
    {
      id: "human_study_first_soundwave_conversation",
      label: "Review every word Soundwave said and prepare better questions for another conversation.",
      nextSceneId: "HUMAN_DECEPTICON_SECOND_WEEK",
      timeCostHours: 120,
      effects: [
        { type: "flag", key: "prepared_second_soundwave_questions", value: true },
        { type: "stat", group: "personality", key: "curiosity", amount: 1 }
      ]
    }
  ]
};

const decepticonSecondWeek: StoryScene = {
  id: "HUMAN_DECEPTICON_SECOND_WEEK",
  origin: "human",
  chapter: 2,
  title: "The Twelfth Day",
  body: `During the second week, the communicator becomes part of the room without becoming ordinary.

No one touches it casually. No one forgets what it is. But the three of you learn how to eat, talk, plan, and continue living while it remains silent nearby.

The notebooks grow thicker. The first relay-site sketches are joined by maps, clipped newspaper articles, handwritten broadcast times, and lists of reports that might be real or might be panic.

Twelve days after returning home, the regular evening program disappears in the middle of a sentence.

The screen changes to an emergency bulletin. A map appears beside live helicopter footage of a hydroelectric complex.

The words beneath it make all three of you stop:

SHERMAN DAM — ALIEN ACTIVITY REPORTED`,
  choices: [
    {
      id: "human_turn_up_sherman_dam_report",
      label: "Turn up the television and listen to the Sherman Dam report.",
      nextSceneId: "HUMAN_SHERMAN_DAM_NEWS",
      timeCostHours: 0,
      effects: [{ type: "flag", key: "sherman_dam_news_breaks_after_wait", value: true }]
    }
  ]
};

const shermanDamNews: StoryScene = {
  id: "HUMAN_SHERMAN_DAM_NEWS",
  origin: "human",
  chapter: 2,
  title: "Sherman Dam Under Attack",
  body: `Every television station has broken into regular programming.

Live footage shows Sherman Dam surrounded by emergency vehicles, warning lights, and smoke rising from the hydroelectric complex. The camera cannot hold steady. Aircraft cross the frame too quickly, and enormous figures move between the power structures.

Then one of the machines turns far enough for the purple insignia on its armor to become visible.

The headline changes:

SHERMAN DAM UNDER ATTACK

Reporters warn that unidentified alien machines have entered the dam complex and that severe power disruptions are spreading through the surrounding grid. Roads are closing. Emergency crews are withdrawing civilians from the area. Another tremor passes through the structure while the helicopter pulls farther back.

The Decepticons have appeared at another major energy site.

{{friendOne}} looks from the broadcast to the maps accumulated over the last twelve days.

“There they are.”

{{friendTwo}} reaches for the notes and the things the trio agreed would be taken if this happened.

“If we go, we go together.”

The Autobots may respond, but the reason the trio approaches Sherman Dam will determine which side you try to find first.`,
  choices: [
    {
      id: "human_go_to_sherman_for_decepticons",
      label: "Go to Sherman Dam to find the Decepticons.",
      nextSceneId: "HUMAN_SHERMAN_DAM_DECEPTICON_ROUTE",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "sherman_dam_goal", value: "decepticons" },
        { type: "flag", key: "seeking_faction", value: "decepticons" }
      ]
    },
    {
      id: "human_go_to_sherman_for_autobots",
      label: "Go to Sherman Dam because the Autobots are likely to respond.",
      nextSceneId: "HUMAN_SHERMAN_DAM_AUTOBOT_ROUTE",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "sherman_dam_goal", value: "autobots" },
        { type: "flag", key: "seeking_faction", value: "autobots" }
      ]
    },
    {
      id: "human_abandon_search_after_sherman_news",
      label: "Stay home and stop pursuing either faction.",
      nextSceneId: "ENDING_DOOR_STAYED_CLOSED",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "chose_isolation_after_sherman_news", value: true }]
    }
  ]
};

const shermanDamDecepticonRoute: StoryScene = {
  id: "HUMAN_SHERMAN_DAM_DECEPTICON_ROUTE",
  origin: "human",
  chapter: 2,
  title: "Toward Sherman Dam",
  body: `The trio gathers the maps, notes, camera, and any Cybertronian material still in your possession.

You leave for Sherman Dam intending to find the Decepticons during the only kind of opportunity they reliably provide: an active operation.

Police closures and evacuation traffic will make the final approach difficult. Getting close enough to observe is one problem. Reaching a Decepticon without being mistaken for an enemy, a hostage, or an obstacle will be another.`,
  choices: []
};

const shermanDamAutobotRoute: StoryScene = {
  id: "HUMAN_SHERMAN_DAM_AUTOBOT_ROUTE",
  origin: "human",
  chapter: 2,
  title: "Toward Sherman Dam",
  body: `The trio gathers the maps, notes, camera, and anything that may help explain what happened at the relay station.

You leave for Sherman Dam expecting the Autobots to respond to the Decepticon attack.

Police closures and evacuation traffic will make the final approach difficult. The goal is not to enter the battle. It is to find the faction already known to protect humans and convince one of them to listen.`,
  choices: []
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_DECEPTICON_CHAPTER_TWO_WAITING: decepticonWaiting,
  HUMAN_DECEPTICON_QUIET_WEEK: decepticonQuietWeek,
  HUMAN_DECEPTICON_SECOND_WEEK: decepticonSecondWeek,
  HUMAN_SHERMAN_DAM_NEWS: shermanDamNews,
  HUMAN_SHERMAN_DAM_DECEPTICON_ROUTE: shermanDamDecepticonRoute,
  HUMAN_SHERMAN_DAM_AUTOBOT_ROUTE: shermanDamAutobotRoute
};