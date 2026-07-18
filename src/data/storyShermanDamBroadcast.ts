import type { StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyShermanDam";

const decepticonSecondWeek: StoryScene = {
  ...BASE_STORY.HUMAN_DECEPTICON_SECOND_WEEK,
  body: `During the second week, the communicator becomes part of the room without becoming ordinary.

No one touches it casually. No one forgets what it is. But the three of you learn how to eat, talk, plan, and continue living while it remains silent nearby.

The notebooks grow thicker. The first relay-site sketches are joined by maps, clipped newspaper articles, handwritten broadcast times, and lists of reports that might be real or might be panic.

Twelve days after returning home, the regular evening program disappears in the middle of a sentence.

The screen cuts to a network news desk beneath a red banner:

BREAKING NEWS — DECEPTICON ATTACK IN PROGRESS

The first report is confused. Aircraft have crossed restricted airspace. Emergency calls are coming from a major hydroelectric installation. Power fluctuations are spreading across several states, but officials have not yet named the site.

Then live helicopter footage replaces the anchor. Smoke rises above a massive concrete dam while emergency vehicles race away from the complex.`,
  choices: [
    {
      id: "human_follow_decepticon_breaking_news",
      label: "Listen to the report.",
      nextSceneId: "HUMAN_DECEPTICON_BREAKING_NEWS",
      timeCostHours: 0,
      effects: [{ type: "flag", key: "decepticon_breaking_news_seen", value: true }]
    },
    {
      id: "human_turn_off_decepticon_breaking_news",
      label: "Turn off the television.",
      nextSceneId: "ENDING_DOOR_STAYED_CLOSED",
      timeCostHours: 0,
      effects: [{ type: "flag", key: "turned_off_decepticon_breaking_news", value: true }]
    }
  ]
};

const decepticonBreakingNews: StoryScene = {
  id: "HUMAN_DECEPTICON_BREAKING_NEWS",
  origin: "human",
  chapter: 2,
  title: "A National Emergency",
  body: `Every network has interrupted regular programming.

The anchor repeats that the attackers have been identified as Decepticons. Military aircraft are being redirected. State and federal emergency agencies are closing roads, moving civilians away from the river, and warning nearby communities to prepare for power loss.

The scale of the response makes one thing clear before the location is even confirmed: this is not another isolated relay-station attack.

A map appears beside the live footage. The reporter pauses, listens to someone through an earpiece, and then looks directly into the camera.

“We have now confirmed that the facility under attack is Sherman Dam.”

{{friendOne}} stops writing.

{{friendTwo}} looks from the television to the maps spread across the table.

Sherman Dam is one of the largest hydroelectric and water-control projects in the country. Damage there could affect power, water delivery, transportation, and communities far beyond the immediate battle site.`,
  choices: [
    {
      id: "human_continue_to_sherman_dam_report",
      label: "Listen to the rest of the report.",
      nextSceneId: "HUMAN_SHERMAN_DAM_NEWS",
      timeCostHours: 0,
      effects: [{ type: "flag", key: "sherman_dam_identity_confirmed", value: true }]
    },
    {
      id: "human_turn_off_sherman_dam_confirmation",
      label: "Turn off the television.",
      nextSceneId: "ENDING_DOOR_STAYED_CLOSED",
      timeCostHours: 0,
      effects: [{ type: "flag", key: "turned_off_sherman_dam_confirmation", value: true }]
    }
  ]
};

const shermanDamNews: StoryScene = {
  ...BASE_STORY.HUMAN_SHERMAN_DAM_NEWS,
  title: "Sherman Dam Under Attack",
  body: `The headline fills the screen:

SHERMAN DAM UNDER ATTACK

Live helicopter footage shows the immense hydroelectric complex surrounded by smoke, warning lights, and evacuation traffic. The camera struggles to keep the dam in frame while aircraft cross overhead and enormous figures move between the power structures.

One machine turns far enough for the purple Decepticon insignia on its armor to become visible.

Reporters warn that the attackers have entered the generating complex and that severe disruptions are already spreading through the regional grid. Emergency crews are withdrawing. Roads on both sides of the river are closing. Communities downstream are being warned to monitor evacuation instructions.

Officials emphasize that Sherman Dam is not merely a local power station. It is a major national infrastructure site. A prolonged attack could interrupt electricity and water across a wide area; serious structural damage could turn the battle into a disaster affecting several states.

The Decepticons have chosen a target too important for the country to ignore.

{{friendOne}} looks from the broadcast to the maps accumulated over the last twelve days.

“There they are.”

{{friendTwo}} reaches for the notes and the things the trio agreed would be taken if this happened.

“If we go, we go together.”

The Autobots are almost certain to respond. The reason the trio approaches Sherman Dam will determine which side you try to reach first.`
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_DECEPTICON_SECOND_WEEK: decepticonSecondWeek,
  HUMAN_DECEPTICON_BREAKING_NEWS: decepticonBreakingNews,
  HUMAN_SHERMAN_DAM_NEWS: shermanDamNews
};