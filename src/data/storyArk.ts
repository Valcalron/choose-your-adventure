import type { StoryChoice, StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storySideswipe";

const returnToSideswipe: StoryChoice = {
  id: "human_return_to_sideswipe_questions",
  label: "Ask Sideswipe another question.",
  nextSceneId: "HUMAN_SIDESWIPE_CONTACT",
  timeCostHours: 1
};

const goHomeFromSideswipe: StoryChoice = {
  id: "human_leave_sideswipe_and_go_home",
  label: "Thank Sideswipe and go home with {{friendOne}} and {{friendTwo}}.",
  nextSceneId: "HUMAN_HOME_HUB",
  timeCostHours: 1,
  effects: [{ type: "flag", key: "left_sideswipe_safely", value: true }]
};

const followSideswipeWithQuestionFlags: StoryScene = {
  ...BASE_STORY.HUMAN_FOLLOW_SIDESWIPE,
  choices: BASE_STORY.HUMAN_FOLLOW_SIDESWIPE.choices.map((choice) =>
    choice.id === "human_explain_to_sideswipe"
      ? {
          ...choice,
          effects: [
            ...(choice.effects ?? []),
            { type: "flag", key: "asked_sideswipe_origin", value: false },
            { type: "flag", key: "asked_sideswipe_leaving", value: false },
            { type: "flag", key: "asked_sideswipe_decepticons", value: false }
          ]
        }
      : choice
  )
};

const sideswipeContact: StoryScene = {
  ...BASE_STORY.HUMAN_SIDESWIPE_CONTACT,
  choices: [
    {
      id: "human_ask_sideswipe_origin",
      label: "Ask where the Autobots came from, why they are here, and what their goal is.",
      nextSceneId: "HUMAN_SIDESWIPE_ORIGIN_ANSWER",
      timeCostHours: 1,
      requirements: [{ type: "flag", key: "asked_sideswipe_origin", equals: false }],
      effects: [{ type: "flag", key: "asked_sideswipe_origin", value: true }]
    },
    {
      id: "human_ask_sideswipe_leaving",
      label: "Ask whether the Autobots are planning to leave Earth.",
      nextSceneId: "HUMAN_SIDESWIPE_LEAVING_ANSWER",
      timeCostHours: 1,
      requirements: [{ type: "flag", key: "asked_sideswipe_leaving", equals: false }],
      effects: [{ type: "flag", key: "asked_sideswipe_leaving", value: true }]
    },
    {
      id: "human_ask_sideswipe_decepticons",
      label: "Ask what the Decepticons want from Earth.",
      nextSceneId: "HUMAN_SIDESWIPE_DECEPTICON_ANSWER",
      timeCostHours: 1,
      requirements: [{ type: "flag", key: "asked_sideswipe_decepticons", equals: false }],
      effects: [{ type: "flag", key: "asked_sideswipe_decepticons", value: true }]
    },
    goHomeFromSideswipe
  ]
};

const sideswipeOriginAnswer: StoryScene = {
  id: "HUMAN_SIDESWIPE_ORIGIN_ANSWER",
  origin: "human",
  chapter: 1,
  title: "A War From Cybertron",
  speaker: "Sideswipe",
  body: `“Cybertron,” Sideswipe answers. “That is where we are from.”

He explains that the Autobots and Decepticons were already at war long before either faction appeared on Earth. The conflict followed them here after the Decepticons attacked the Autobots' ship and both sides were brought down on this planet.

“Earth was not the reason the war started,” he says. “But Megatron is using your planet's energy to keep fighting it.”

The Autobots' immediate goal is to stop the Decepticons from stripping away Earth's energy, prevent their attacks, and protect the people caught in the conflict.

{{friendOne}} looks relieved to finally hear a direct answer.

{{friendTwo}} studies Sideswipe. “So you did not choose Earth. But you are choosing to defend it.”

Sideswipe nods once. “That is the idea.”`,
  choices: [returnToSideswipe, goHomeFromSideswipe]
};

const sideswipeLeavingAnswer: StoryScene = {
  id: "HUMAN_SIDESWIPE_LEAVING_ANSWER",
  origin: "human",
  chapter: 1,
  title: "Not While Megatron Is Here",
  speaker: "Sideswipe",
  body: `Sideswipe does not pretend the answer is simple.

“Eventually? Maybe. Right now? No.”

He explains that the Autobots cannot leave Earth while Megatron and the Decepticons are still attacking it. Even if the Autobots found a way to depart immediately, doing so would leave humans facing a war they did not begin and cannot fight alone.

“We are not abandoning your planet to Megatron,” he says.

He does not promise how long the Autobots will remain. He only makes it clear that their departure is not close enough for the trio to wait for everything to return to normal.`,
  choices: [returnToSideswipe, goHomeFromSideswipe]
};

const sideswipeDecepticonAnswer: StoryScene = {
  id: "HUMAN_SIDESWIPE_DECEPTICON_ANSWER",
  origin: "human",
  chapter: 1,
  title: "What Megatron Wants",
  speaker: "Sideswipe",
  body: `“Energy,” Sideswipe says. “Oil, electricity, fuel—anything they can convert and use.”

The Decepticons need power for themselves, their weapons, and their war. Megatron intends to take Earth's resources, strengthen the Decepticons, and use that strength to continue his conquest.

Humans are not always the target of an attack. That does not make the attacks safe.

“If people are standing between the Decepticons and what they want,” Sideswipe says, “Megatron expects the people to move. He does not care what happens when they cannot.”

That matches what Spike and Sparkplug described. The Decepticons may not arrive intending to kill humans, but they will not protect anyone from the damage they cause.`,
  choices: [returnToSideswipe, goHomeFromSideswipe]
};

const homeHub: StoryScene = {
  id: "HUMAN_HOME_HUB",
  origin: "human",
  chapter: 1,
  title: "Back Home",
  body: `The three of you return home with more answers than you had before and more questions than the television could have answered.

You know the Autobots came from Cybertron. You know their war followed them to Earth. You know they intend to stop Megatron and protect the people caught in the conflict.

You also know that meeting one Autobot does not make the situation safe.

The house is still here. Food, rest, news, and the map on the table are all waiting. For the moment, the next decision belongs to the three of you.`,
  choices: [
    {
      id: "human_home_eat",
      label: "Eat together and talk while things are quiet.",
      nextSceneId: "HUMAN_HOME_EAT",
      timeCostHours: 1
    },
    {
      id: "human_home_sleep",
      label: "Rest and get several hours of sleep.",
      nextSceneId: "HUMAN_HOME_REST",
      timeCostHours: 8
    },
    {
      id: "human_home_watch_news",
      label: "Watch the news for new attacks, rescues, and sightings.",
      nextSceneId: "HUMAN_HOME_WATCH_NEWS",
      timeCostHours: 1
    },
    {
      id: "human_home_discuss_sideswipe",
      label: "Discuss Sideswipe and what each of you thinks about the Autobots.",
      nextSceneId: "HUMAN_HOME_DISCUSS",
      timeCostHours: 1
    },
    {
      id: "human_home_review_information",
      label: "Review everything the trio has confirmed so far.",
      nextSceneId: "HUMAN_HOME_REVIEW",
      timeCostHours: 1
    },
    {
      id: "human_home_wait_for_event",
      label: "Wait for the next major event.",
      nextSceneId: "HUMAN_SHERMAN_DAM_NEWS",
      timeCostHours: 6
    },
    {
      id: "human_home_search_autobots",
      label: "Search for the Autobots again and try to find where they come from.",
      nextSceneId: "HUMAN_FIND_ARK_MAP",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "searching_for_ark", value: true }]
    },
    {
      id: "human_home_search_decepticons",
      label: "Watch for the next active Decepticon attack and go there.",
      nextSceneId: "HUMAN_SHERMAN_DAM_NEWS",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "seeking_faction", value: "decepticons" }]
    },
    {
      id: "human_home_withdraw_after_sideswipe",
      label: "Stay home and stop looking for either faction.",
      nextSceneId: "ENDING_DOOR_STAYED_CLOSED_AFTER_AUTOBOT",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "chose_isolation_after_autobot_contact", value: true }]
    }
  ]
};

const eatAtHome: StoryScene = {
  id: "HUMAN_HOME_EAT",
  origin: "human",
  chapter: 1,
  title: "Something Ordinary",
  body: `The three of you make something to eat and sit together.

For one hour, the conversation is allowed to become ordinary again. Sideswipe's answers still come up, but so do practical matters: supplies, family, work, and how long any of you can keep living around emergency broadcasts.

The meal does not solve anything. It does remind all three of you that fear is not the only thing left in the world.`,
  choices: [{ id: "human_return_home_after_eating", label: "Return to the map and the television.", nextSceneId: "HUMAN_HOME_HUB", timeCostHours: 1 }]
};

const restAtHome: StoryScene = {
  id: "HUMAN_HOME_REST",
  origin: "human",
  chapter: 1,
  title: "A Few Hours of Sleep",
  body: `The three of you take turns keeping the television low and finally sleep.

Nothing reaches the house while you rest. When everyone wakes, the Cybertronian war is still on Earth and the same decisions are waiting. At least now you are making them without exhaustion deciding for you.`,
  choices: [{ id: "human_return_home_after_rest", label: "Get up and decide what comes next.", nextSceneId: "HUMAN_HOME_HUB", timeCostHours: 1 }]
};

const watchNewsAtHome: StoryScene = {
  id: "HUMAN_HOME_WATCH_NEWS",
  origin: "human",
  chapter: 1,
  title: "Watching for Patterns",
  body: `The news repeats old footage, adds several uncertain sightings, and corrects details that other stations reported incorrectly.

You now recognize enough to separate some facts from panic. A red insignia near a rescue is likely meaningful. A purple insignia near an energy site is a warning. Reports of ordinary vehicles behaving strangely may be useful, but many are only frightened guesses.

{{friendOne}} writes down the most credible Autobot sightings.

{{friendTwo}} notes where Decepticon attacks have targeted energy and infrastructure.`,
  choices: [
    { id: "human_return_home_after_news", label: "Return to the other options.", nextSceneId: "HUMAN_HOME_HUB", timeCostHours: 1 },
    { id: "human_use_news_to_find_ark", label: "Start plotting the Autobot sightings on a map.", nextSceneId: "HUMAN_FIND_ARK_MAP", timeCostHours: 1 }
  ]
};

const discussAtHome: StoryScene = {
  id: "HUMAN_HOME_DISCUSS",
  origin: "human",
  chapter: 1,
  title: "What the Three of You Think",
  body: `{{friendOne}} believes Sideswipe was irritated because following him was dangerous, not because he wanted to abandon you.

{{friendTwo}} agrees that the Autobots seem to care about humans, but points out that every Autobot sighting may still bring the Decepticons close behind.

Neither friend regrets supporting the decision to find him.

They still support you now. The question is whether the trio has learned enough to stop searching—or enough to search more carefully.`,
  choices: [{ id: "human_return_home_after_discussion", label: "Return to the other options.", nextSceneId: "HUMAN_HOME_HUB", timeCostHours: 1 }]
};

const reviewAtHome: StoryScene = {
  id: "HUMAN_HOME_REVIEW",
  origin: "human",
  chapter: 1,
  title: "What Is Confirmed",
  body: `The trio separates confirmed information from rumor.

The Autobots and Decepticons are from Cybertron. Their war began before they reached Earth. Optimus Prime leads the Autobots, and Megatron commands the Decepticons.

The Autobots have repeatedly protected humans. The Decepticons are taking Earth's energy and do not protect the people caught around their operations.

Autobots can often be followed by road. Decepticons usually leave too quickly by air or disappear out over the ocean.

That final difference may make finding the Autobots' base possible.`,
  choices: [
    { id: "human_return_home_after_review", label: "Return to the other options.", nextSceneId: "HUMAN_HOME_HUB", timeCostHours: 1 },
    { id: "human_begin_ark_search_after_review", label: "Get out a map and begin tracing the Autobots.", nextSceneId: "HUMAN_FIND_ARK_MAP", timeCostHours: 1 }
  ]
};

const doorStayedClosedAfterAutobot: StoryScene = {
  id: "ENDING_DOOR_STAYED_CLOSED_AFTER_AUTOBOT",
  origin: "human",
  chapter: 1,
  title: "The Door Stayed Closed",
  body: `You know more now than you did when the first broadcast interrupted the day.

You met Sideswipe. You know the Autobots came from Cybertron, that their war followed them to Earth, and that they have chosen to protect humans from the Decepticons.

You know the Decepticons want Earth's energy and do not care enough about the people caught in their way to stop taking it.

You still choose not to become involved.

News reports continue showing Autobots at disasters and Decepticons at energy sites. Sometimes you recognize a symbol before the reporter identifies it. Sometimes you understand what is happening better than the people speaking on television.

{{friendOne}} and {{friendTwo}} continue asking you to come outside, meet them, or help them investigate.

You keep declining.

Eventually, they stop asking as often. They continue living in a world that now includes Cybertronians while you watch that world through locked doors and covered windows.

You know the Autobots might have helped you.

You simply never went looking again.

ENDING: THE DOOR STAYED CLOSED`,
  choices: [],
  isEnding: true
};

const findArkMap: StoryScene = {
  id: "HUMAN_FIND_ARK_MAP",
  origin: "human",
  chapter: 1,
  title: "Find the Ark",
  body: `The three of you spread a road map across the table.

Sideswipe gave you no clue about where the Autobots are based. He did not need to.

The Autobots you have seen are ground vehicles. They do not fly away after every mission, and they do not disappear beyond the coastline. Wherever they are staying, they must reach it by road.

The trio gathers every credible report available from television, radio, newspapers, and eyewitness calls. Information is slow and incomplete in 1984, but there is enough to begin plotting a pattern.

{{friendOne}} marks where Autobots have been seen and when each sighting occurred.

{{friendTwo}} traces the direction they arrived from and the roads they used when leaving.

You compare the reports, cross out obvious mistakes, and watch for the places where several routes begin pointing toward the same broad region.

The Autobots sometimes travel alone and sometimes leave together. Either way, they must be coming from somewhere.`,
  choices: [
    {
      id: "human_collect_more_ark_sightings",
      label: "Keep collecting sightings before choosing an area to search.",
      nextSceneId: "HUMAN_FIND_ARK_REFINED_MAP",
      timeCostHours: 4,
      effects: [{ type: "flag", key: "ark_search_map_refined", value: true }]
    },
    {
      id: "human_follow_strongest_ark_route",
      label: "Follow the strongest route on the map now.",
      nextSceneId: "HUMAN_FIND_ARK_SEARCH_AREA",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "ark_search_left_early", value: true }]
    },
    {
      id: "human_give_up_ark_search",
      label: "Put the map away and remain home.",
      nextSceneId: "HUMAN_HOME_HUB",
      timeCostHours: 1
    }
  ]
};

const findArkRefinedMap: StoryScene = {
  id: "HUMAN_FIND_ARK_REFINED_MAP",
  origin: "human",
  chapter: 1,
  title: "The Roads Begin to Converge",
  body: `More reports add more confusion at first.

Then the pattern sharpens.

Several Autobots have appeared in different places but arrived from similar directions. After rescues and battles, separate vehicles have been seen joining the same highways, leaving populated areas, and continuing toward the same remote region.

The trio cannot identify an exact location. You can isolate an area.

{{friendOne}} circles it on the map.

{{friendTwo}} studies the roads leading in. “That is where they keep disappearing.”

The next step cannot be solved from the house.`,
  choices: [
    {
      id: "human_head_to_refined_ark_area",
      label: "Travel together to the area marked on the map.",
      nextSceneId: "HUMAN_FIND_ARK_SEARCH_AREA",
      timeCostHours: 2
    },
    {
      id: "human_pause_refined_ark_search",
      label: "Keep the map but return to the home decisions for now.",
      nextSceneId: "HUMAN_HOME_HUB",
      timeCostHours: 1
    }
  ]
};

const findArkSearchArea: StoryScene = {
  id: "HUMAN_FIND_ARK_SEARCH_AREA",
  origin: "human",
  chapter: 1,
  title: "Somewhere in This Region",
  body: `The three of you travel into the region isolated on the map.

You do not know that a Cybertronian ship is hidden inside a mountain. You only know the Autobots must be coming from somewhere nearby.

The search becomes physical now.

You track repeated tire marks along roads that should see little traffic. You note damaged shoulders broad enough for heavy vehicles, places where unusually large tracks leave the pavement, and routes that appear useless until compared with the directions Autobots have taken after public sightings.

{{friendOne}} watches for vehicles matching known Autobots.

{{friendTwo}} compares every turn with the marked map.

The clues pull the trio away from ordinary traffic and toward rougher ground.

You are getting close enough that someone is going to notice.`,
  choices: [
    {
      id: "human_continue_ark_search_until_caught",
      label: "Continue toward the place the tracks seem to lead.",
      nextSceneId: "HUMAN_HOUND_INTERCEPTION",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "found_ark_region", value: true }]
    },
    {
      id: "human_turn_back_before_ark",
      label: "Turn back before getting any closer.",
      nextSceneId: "HUMAN_HOME_HUB",
      timeCostHours: 2
    }
  ]
};

const houndInterception: StoryScene = {
  id: "HUMAN_HOUND_INTERCEPTION",
  origin: "human",
  chapter: 1,
  title: "Caught Before the Entrance",
  speaker: "Hound",
  body: `You never see the Ark's entrance.

A military-green vehicle appears on the route ahead before the trio can follow the tracks any farther. It stops across the path, transforms, and rises between you and whatever lies beyond.

The Autobot insignia is visible.

Hound studies the vehicle, the three humans inside it, and the folded map covered in marks.

“You are a long way from the nearest town,” he says.

{{friendOne}} looks down at the sightings plotted across the map.

“We may have figured out where the Autobots are coming from.”

Hound's attention settles on the circled region and the routes converging toward it. He looks back toward the concealed approach behind him.

“That,” he says, “is exactly what worries me.”

He is not openly hostile, but he is a scout protecting something the Autobots never intended the public to find.

The trio successfully found the area containing the Ark.

Hound caught all three of you before you could reach its entrance.

“Why were you searching for our base?”`,
  choices: []
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_FOLLOW_SIDESWIPE: followSideswipeWithQuestionFlags,
  HUMAN_SIDESWIPE_CONTACT: sideswipeContact,
  HUMAN_SIDESWIPE_ORIGIN_ANSWER: sideswipeOriginAnswer,
  HUMAN_SIDESWIPE_LEAVING_ANSWER: sideswipeLeavingAnswer,
  HUMAN_SIDESWIPE_DECEPTICON_ANSWER: sideswipeDecepticonAnswer,
  HUMAN_HOME_HUB: homeHub,
  HUMAN_HOME_EAT: eatAtHome,
  HUMAN_HOME_REST: restAtHome,
  HUMAN_HOME_WATCH_NEWS: watchNewsAtHome,
  HUMAN_HOME_DISCUSS: discussAtHome,
  HUMAN_HOME_REVIEW: reviewAtHome,
  ENDING_DOOR_STAYED_CLOSED_AFTER_AUTOBOT: doorStayedClosedAfterAutobot,
  HUMAN_FIND_ARK_MAP: findArkMap,
  HUMAN_FIND_ARK_REFINED_MAP: findArkRefinedMap,
  HUMAN_FIND_ARK_SEARCH_AREA: findArkSearchArea,
  HUMAN_HOUND_INTERCEPTION: houndInterception
};
