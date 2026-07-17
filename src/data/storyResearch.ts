import type { StoryChoice, StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyWithNews";

const stayHomeChoice: StoryChoice = {
  id: "human_research_stay_home",
  label: "Remain inside after all. You are not ready to look for either faction.",
  nextSceneId: "ENDING_DOOR_STAYED_CLOSED",
  timeCostHours: 1,
  effects: [{ type: "flag", key: "chose_isolation", value: true }]
};

const learnMoreChoice: StoryChoice = {
  id: "human_learn_more_after_oil_rig_news",
  label: "Learn more before leaving.",
  nextSceneId: "HUMAN_LEARN_MORE",
  timeCostHours: 1
};

const learnMoreMeetingChoice: StoryChoice = {
  id: "human_learn_more_before_meeting",
  label: "Learn more before leaving to meet {{friendOne}} and {{friendTwo}}.",
  nextSceneId: "HUMAN_LEARN_MORE",
  timeCostHours: 1,
  effects: [{ type: "flag", key: "friends_waiting_at_meeting", value: true }]
};

const oilRigNews: StoryScene = {
  ...BASE_STORY.HUMAN_OIL_RIG_NEWS,
  choices: [learnMoreChoice]
};

const oilRigNewsMeeting: StoryScene = {
  ...BASE_STORY.HUMAN_OIL_RIG_NEWS_MEETING,
  choices: [learnMoreMeetingChoice]
};

const learnMore: StoryScene = {
  id: "HUMAN_LEARN_MORE",
  origin: "human",
  chapter: 1,
  title: "What Do We Need to Know?",
  body: `The interview ends, but none of you moves toward the door yet.

The television keeps cycling between the red Autobot symbol and the purple Decepticon symbol. Reports repeat what is already known, contradict one another, and fill the gaps with guesses.

You explain that leaving without knowing more would be foolish.

{{friendOne}} nods. “Then decide what matters first.”

{{friendTwo}} looks from one symbol to the other. “Whichever one you choose, we stay together.”

They do not need to agree on every reason. They trust you to explain why one faction should be the first one the three of you try to understand—and possibly find.`,
  choices: [
    {
      id: "human_explain_autobot_reason",
      label: "Explain why the Autobots are worth finding.",
      nextSceneId: "HUMAN_RESEARCH_AUTOBOTS",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "first_researched_faction", value: "autobots" }]
    },
    {
      id: "human_explain_decepticon_reason",
      label: "Explain why the Decepticons are worth finding.",
      nextSceneId: "HUMAN_RESEARCH_DECEPTICONS",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "first_researched_faction", value: "decepticons" }]
    },
    stayHomeChoice
  ]
};

const researchAutobots: StoryScene = {
  id: "HUMAN_RESEARCH_AUTOBOTS",
  origin: "human",
  chapter: 1,
  title: "About the Autobots",
  body: `You explain why the Autobots are the faction worth finding first.

{{friendOne}} accepts your reasoning because the Autobots have already risked themselves to save people they did not know.

{{friendTwo}} reaches the same decision for a different reason: a faction willing to speak to humans, help emergency workers, and appear in public is at least possible to approach.

Neither of them argues against your choice. They go with you.

Finding useful information in 1984 is slow. There is no internet to search. The three of you change television channels, tune through radio reports, check newspapers, and make calls that lead mostly to busy signals or people repeating the same eyewitness accounts.

What you can confirm is limited:

The Autobots use the red insignia shown during the interview. Optimus Prime appears to lead them. They have repeatedly stopped to protect civilians. They disguise themselves as vehicles just as the Decepticons do. They are most often seen near rescues, damaged infrastructure, or places the Decepticons have already attacked.

That makes the Autobots easier to find than the Decepticons—but not easy, and not safe.`,
  choices: [
    {
      id: "human_seek_autobots",
      label: "Leave and follow the latest credible report of Autobot activity.",
      nextSceneId: "HUMAN_SEEK_AUTOBOTS",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "researched_autobots", value: true },
        { type: "flag", key: "seeking_faction", value: "autobots" }
      ]
    },
    {
      id: "human_research_decepticons_second",
      label: "Spend another hour learning about the Decepticons before leaving.",
      nextSceneId: "HUMAN_RESEARCH_BOTH_AUTOBOT_FIRST",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "researched_autobots", value: true },
        { type: "flag", key: "researched_decepticons", value: true }
      ]
    },
    stayHomeChoice
  ]
};

const researchDecepticons: StoryScene = {
  id: "HUMAN_RESEARCH_DECEPTICONS",
  origin: "human",
  chapter: 1,
  title: "About the Decepticons",
  body: `You explain why the Decepticons are the faction worth understanding—and finding—first.

{{friendOne}} accepts your reasoning because knowing what the attackers want may be the best way to survive them.

{{friendTwo}} is more uneasy, but still agrees to follow your lead. “Then we do this together, and we do not get between them and whatever they came to take.”

Neither friend abandons you because of the choice.

Research is difficult in 1984. There is no central source of information and no internet to search. The three of you work through television reports, radio broadcasts, newspapers, emergency bulletins, and whatever eyewitness accounts reporters have managed to collect.

What you can confirm is limited:

The Decepticons use the purple insignia shown during the interview. Megatron appears to command them. They target oil, electricity, communications, transportation, and other strategic resources. Soundwave can deploy smaller machines, including Ravage and Rumble. They rarely remain anywhere the public can approach them peacefully.

You cannot simply look up where the Decepticons are.

The only reliable way to find them is during an active attack.`,
  choices: [
    {
      id: "human_wait_for_decepticon_attack",
      label: "Keep watching for the next confirmed Decepticon attack.",
      nextSceneId: "HUMAN_SHERMAN_DAM_NEWS",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "researched_decepticons", value: true },
        { type: "flag", key: "seeking_faction", value: "decepticons" }
      ]
    },
    {
      id: "human_research_autobots_second",
      label: "Spend another hour learning about the Autobots before leaving.",
      nextSceneId: "HUMAN_RESEARCH_BOTH_DECEPTICON_FIRST",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "researched_decepticons", value: true },
        { type: "flag", key: "researched_autobots", value: true }
      ]
    },
    stayHomeChoice
  ]
};

const researchBothAutobotFirst: StoryScene = {
  id: "HUMAN_RESEARCH_BOTH_AUTOBOT_FIRST",
  origin: "human",
  chapter: 1,
  title: "Both Symbols",
  body: `After learning what little the public knows about the Autobots, you spend another hour gathering reports about the Decepticons.

The information is incomplete, but the difference between the factions is clearer.

The Autobots can sometimes be found through rescue reports and public sightings. The Decepticons can usually be found only when they attack something they want.

{{friendOne}} and {{friendTwo}} still support your decision. They are ready to follow whichever path you choose next.`,
  choices: [
    {
      id: "human_seek_autobots_after_both",
      label: "Follow the latest credible report of Autobot activity.",
      nextSceneId: "HUMAN_SEEK_AUTOBOTS",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "seeking_faction", value: "autobots" }]
    },
    {
      id: "human_wait_for_decepticons_after_both",
      label: "Watch for the next Decepticon attack and go there.",
      nextSceneId: "HUMAN_SHERMAN_DAM_NEWS",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "seeking_faction", value: "decepticons" }]
    },
    stayHomeChoice
  ]
};

const researchBothDecepticonFirst: StoryScene = {
  id: "HUMAN_RESEARCH_BOTH_DECEPTICON_FIRST",
  origin: "human",
  chapter: 1,
  title: "Both Symbols",
  body: `After learning what little the public knows about the Decepticons, you spend another hour gathering reports about the Autobots.

The information is incomplete, but the difference between the factions is clearer.

The Autobots can sometimes be found through rescue reports and public sightings. The Decepticons can usually be found only when they attack something they want.

{{friendOne}} and {{friendTwo}} still support your decision. They are ready to follow whichever path you choose next.`,
  choices: [
    {
      id: "human_seek_autobots_after_both_reverse",
      label: "Follow the latest credible report of Autobot activity.",
      nextSceneId: "HUMAN_SEEK_AUTOBOTS",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "seeking_faction", value: "autobots" }]
    },
    {
      id: "human_wait_for_decepticons_after_both_reverse",
      label: "Watch for the next Decepticon attack and go there.",
      nextSceneId: "HUMAN_SHERMAN_DAM_NEWS",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "seeking_faction", value: "decepticons" }]
    },
    stayHomeChoice
  ]
};

const seekAutobots: StoryScene = {
  id: "HUMAN_SEEK_AUTOBOTS",
  origin: "human",
  chapter: 1,
  title: "Looking for the Ones Who Help",
  body: `Finding the Autobots is easier than finding the Decepticons, but only by comparison.

The three of you follow the latest credible reports: emergency crews describing strange vehicles, witnesses claiming that enormous machines helped clear debris, and radio stations trying to separate real sightings from panic.

{{friendOne}} reminds you that the Autobots may move before you arrive.

{{friendTwo}} reminds you that any place the Autobots appear may also attract Decepticons.

Neither turns back.

The trio leaves to find the Autobots. The exact encounter will depend on which report proves real.`,
  choices: [
    {
      id: "human_continue_autobot_search",
      label: "Continue following the Autobot reports.",
      nextSceneId: "HUMAN_AUTOBOT_SEARCH_OPEN",
      timeCostHours: 1
    },
    stayHomeChoice
  ]
};

const autobotSearchOpen: StoryScene = {
  id: "HUMAN_AUTOBOT_SEARCH_OPEN",
  origin: "human",
  chapter: 1,
  title: "A Credible Sighting",
  body: `One report finally sounds credible enough to follow.

The source, location, and Autobot the trio encounters will be developed next.`,
  choices: []
};

const shermanDamNews: StoryScene = {
  id: "HUMAN_SHERMAN_DAM_NEWS",
  origin: "human",
  chapter: 1,
  title: "Sherman Dam Under Attack",
  body: `The next confirmed Decepticon attack is impossible to miss.

Every television station cuts to live footage of Sherman Dam. Sirens echo across the broadcast while cameras struggle to hold the distant shapes moving over the hydroelectric complex.

The Decepticon insignia appears beside the headline:

SHERMAN DAM UNDER ATTACK

Reporters warn that the attackers are attempting to seize the dam’s energy. Roads are being closed. Emergency crews are pulling back. The attack is being televised widely enough that anyone looking for the Decepticons now knows exactly where they are.

{{friendOne}} looks at you. “There they are.”

{{friendTwo}} reaches for what they are taking with them. “Then we go together.”

The Autobots are expected to respond. Sherman Dam could lead the trio to either faction—but the player’s reason for going will matter once they arrive.`,
  choices: [
    {
      id: "human_go_to_sherman_for_decepticons",
      label: "Go to Sherman Dam to find the Decepticons.",
      nextSceneId: "HUMAN_SHERMAN_DAM_DECEPTICON_ROUTE",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "sherman_dam_goal", value: "decepticons" }]
    },
    {
      id: "human_go_to_sherman_for_autobots",
      label: "Go to Sherman Dam because the Autobots are likely to respond.",
      nextSceneId: "HUMAN_SHERMAN_DAM_AUTOBOT_ROUTE",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "sherman_dam_goal", value: "autobots" }]
    },
    stayHomeChoice
  ]
};

const shermanDamDecepticonRoute: StoryScene = {
  id: "HUMAN_SHERMAN_DAM_DECEPTICON_ROUTE",
  origin: "human",
  chapter: 1,
  title: "Toward Sherman Dam",
  body: `The trio heads toward Sherman Dam intending to find the Decepticons during the only kind of opportunity they provide: an active attack.

How close the player is willing to get, and which Decepticon they encounter first, will be developed next.`,
  choices: []
};

const shermanDamAutobotRoute: StoryScene = {
  id: "HUMAN_SHERMAN_DAM_AUTOBOT_ROUTE",
  origin: "human",
  chapter: 1,
  title: "Toward Sherman Dam",
  body: `The trio heads toward Sherman Dam expecting the Autobots to respond to the attack.

The player is not approaching the Decepticons as an ally. The goal is to find the faction already known to protect humans.

How the trio reaches the area and which Autobot they encounter first will be developed next.`,
  choices: []
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_OIL_RIG_NEWS: oilRigNews,
  HUMAN_OIL_RIG_NEWS_MEETING: oilRigNewsMeeting,
  HUMAN_LEARN_MORE: learnMore,
  HUMAN_RESEARCH_AUTOBOTS: researchAutobots,
  HUMAN_RESEARCH_DECEPTICONS: researchDecepticons,
  HUMAN_RESEARCH_BOTH_AUTOBOT_FIRST: researchBothAutobotFirst,
  HUMAN_RESEARCH_BOTH_DECEPTICON_FIRST: researchBothDecepticonFirst,
  HUMAN_SEEK_AUTOBOTS: seekAutobots,
  HUMAN_AUTOBOT_SEARCH_OPEN: autobotSearchOpen,
  HUMAN_SHERMAN_DAM_NEWS: shermanDamNews,
  HUMAN_SHERMAN_DAM_DECEPTICON_ROUTE: shermanDamDecepticonRoute,
  HUMAN_SHERMAN_DAM_AUTOBOT_ROUTE: shermanDamAutobotRoute
};