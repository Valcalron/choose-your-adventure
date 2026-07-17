import type { StoryChoice, StoryScene } from "../types/game";
import { HUMAN_OPENING } from "./humanOpening";
import { STORY as BASE_STORY } from "./story";

const runChoice: StoryChoice = {
  id: "human_run",
  label: "Get {{friendOne}} and {{friendTwo}} out of the store and run.",
  nextSceneId: "HUMAN_RUN",
  timeCostHours: 1,
  effects: [{ type: "flag", key: "chose_to_run", value: true }]
};

const humanStart = BASE_STORY.HUMAN_START;

const humanRun: StoryScene = {
  id: "HUMAN_RUN",
  origin: "human",
  chapter: 1,
  title: "Get Out",
  body: `The frozen image of Ravage remains on every television.

You do not wait for the anchor to say anything else.

“We’re leaving.”

{{friendOne}} turns toward you. “Leaving for where?”

“Anywhere that isn’t here.”

{{friendTwo}} looks through the front windows at the parking lot. Rows of cars sit beneath the afternoon sun. None of them move. That does not make them feel harmless anymore.

{{outageEffect}}

The three of you push toward the exit as the crowd behind you finally begins to break apart. Someone demands that the employees lock the doors. Someone else is already trying to call home. A man near the checkout insists that the broadcast must be a military hoax.

You barely hear any of it.

Your attention stays on the vehicles.

A station wagon. Two pickup trucks. A delivery van near the loading area. Your own ride.

Every machine in the lot suddenly seems capable of watching you.

Behind you, an engine starts.

All three of you run faster.

Once you are far enough from the store to stop and breathe, the same question remains: where do you go now?`,
  choices: [
    {
      id: "human_run_home",
      label: "Go home, lock everything down, and wait for this to pass.",
      nextSceneId: "HUMAN_HOME_ARRIVAL",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "ran_home", value: true }]
    },
    {
      id: "human_run_leave_area",
      label: "Leave the populated area, but remain in the state.",
      nextSceneId: "HUMAN_LEAVE_AREA",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "left_populated_area", value: true }]
    },
    {
      id: "human_run_leave_state",
      label: "Head out of state and put as much distance as possible between you and the attack.",
      nextSceneId: "HUMAN_LEAVE_STATE",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "attempted_to_leave_state", value: true }]
    }
  ]
};

const humanHomeArrival: StoryScene = {
  id: "HUMAN_HOME_ARRIVAL",
  origin: "human",
  chapter: 1,
  title: "Behind a Locked Door",
  body: `Home does not feel as safe as it did that morning.

The doors lock. The curtains close. Every window becomes a weakness, every appliance something that might be listening, and every vehicle outside something that might not be a vehicle at all.

{{friendOne}} and {{friendTwo}} stay with you. Neither of them laughs when you start talking about covering the windows and moving anything unnecessary away from the house.

For now, all three of you agree on one thing: make the house secure before deciding anything else.`,
  choices: [
    {
      id: "human_secure_house",
      label: "Board the windows, gather supplies, and prepare to stay inside.",
      nextSceneId: "HUMAN_HOME_FIRST_DAYS",
      timeCostHours: 3,
      effects: [{ type: "flag", key: "house_secured", value: true }]
    }
  ]
};

const humanHomeFirstDays: StoryScene = {
  id: "HUMAN_HOME_FIRST_DAYS",
  origin: "human",
  chapter: 1,
  title: "Waiting",
  body: `By the time you finish, the house looks less like a home and more like a shelter.

The windows are covered. Food and water are counted. One television or radio remains on whenever the power allows it. Every engine outside makes all three of you stop talking.

At first, hiding feels sensible. The world has changed in a single afternoon, and none of you knows what the machines want or where they may appear next.

So the three of you stay inside and wait.`,
  choices: [
    {
      id: "human_wait_first_days",
      label: "Keep the house sealed while the first days pass.",
      nextSceneId: "HUMAN_HOME_FIRST_CONVERSATION",
      timeCostHours: 48
    }
  ]
};

const humanHomeFirstConversation: StoryScene = {
  id: "HUMAN_HOME_FIRST_CONVERSATION",
  origin: "human",
  chapter: 1,
  title: "They Cannot Stay Forever",
  body: `On the third day, {{friendOne}} finally says what both of them have been thinking.

“We helped make this place as safe as we can. But we have homes too. Families. People who do not know whether we are all right.”

{{friendTwo}} looks toward the covered front window.

“We can stay a little longer if you truly need us. But we cannot live boarded inside forever.”`,
  choices: [
    {
      id: "human_let_friends_go",
      label: "Let both friends return to their own homes. You will remain here.",
      nextSceneId: "ENDING_DOOR_STAYED_CLOSED",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "chose_isolation", value: true }]
    },
    {
      id: "human_ask_friends_stay",
      label: "Ask them to stay a few more days.",
      nextSceneId: "HUMAN_HOME_SECOND_CONVERSATION",
      timeCostHours: 72,
      effects: [{ type: "flag", key: "friends_stayed_once", value: true }]
    },
    {
      id: "human_agree_leave_house",
      label: "Agree to leave the house with them.",
      nextSceneId: "HUMAN_LEAVE_HOUSE",
      timeCostHours: 1,
      effects: [
        { type: "stat", group: "relationship", key: "friendOne", amount: 1 },
        { type: "stat", group: "relationship", key: "friendTwo", amount: 1 }
      ]
    },
    {
      id: "human_control_friends",
      label: "Insist the danger is still outside and that no one should leave.",
      nextSceneId: "HUMAN_HOME_ARGUMENT",
      timeCostHours: 1,
      effects: [
        { type: "stat", group: "relationship", key: "friendOne", amount: -1 },
        { type: "stat", group: "relationship", key: "friendTwo", amount: -1 }
      ]
    },
    {
      id: "human_regular_checkins",
      label: "Let them go home, but establish regular check-ins.",
      nextSceneId: "HUMAN_HOME_CHECKINS",
      timeCostHours: 72,
      effects: [{ type: "flag", key: "regular_checkins", value: true }]
    }
  ]
};

const humanHomeSecondConversation: StoryScene = {
  id: "HUMAN_HOME_SECOND_CONVERSATION",
  origin: "human",
  chapter: 1,
  title: "This Time They Decide",
  body: `They stay because you ask them to.

Three more days pass behind the covered windows. Supplies disappear faster than expected. {{friendOne}} needs to return to people who are waiting. {{friendTwo}} has begun pacing whenever an engine passes outside.

This time, they are not asking permission.

“We stayed because you were scared, and because we were scared too,” {{friendOne}} says. “But we cannot make this house our entire lives.”

They gather their things. They are leaving. The only choice left is whether you remain behind or open the door with them.`,
  choices: [
    {
      id: "human_stay_after_second_request",
      label: "Stay inside. You are not taking the risk.",
      nextSceneId: "ENDING_DOOR_STAYED_CLOSED",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "chose_isolation", value: true }]
    },
    {
      id: "human_leave_after_second_request",
      label: "Go with them.",
      nextSceneId: "HUMAN_LEAVE_HOUSE",
      timeCostHours: 1
    }
  ]
};

const humanHomeArgument: StoryScene = {
  id: "HUMAN_HOME_ARGUMENT",
  origin: "human",
  chapter: 1,
  title: "Not Your Decision",
  body: `“No,” you say. “The danger is still outside. Leaving now would be reckless.”

The room goes still.

{{friendTwo}} is the first to answer.

“This stopped being about keeping us safe. You are trying to make the decision for all three of us.”

The argument grows sharper. {{friendOne}} gathers their belongings while {{friendTwo}} pulls the covering away from the front door.

They are going. You can continue insisting that the house is the only safe place, or admit that they are right and leave with them.`,
  choices: [
    {
      id: "human_argument_yes_stay",
      label: "Yes. Stay inside. The danger is not worth the risk.",
      nextSceneId: "ENDING_DOOR_STAYED_CLOSED",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "chose_isolation", value: true }]
    },
    {
      id: "human_argument_no_leave",
      label: "No. They are right. Leave the house with them.",
      nextSceneId: "HUMAN_LEAVE_HOUSE",
      timeCostHours: 1
    }
  ]
};

const humanHomeCheckins: StoryScene = {
  id: "HUMAN_HOME_CHECKINS",
  origin: "human",
  chapter: 1,
  title: "Scheduled Voices",
  body: `The arrangement works at first.

{{friendOne}} and {{friendTwo}} return to their own homes. The three of you agree on regular times to call. Each successful check-in becomes proof that everyone is still alive and still free.

For several days, you remain inside and mark every call.

Then {{friendTwo}} asks you to meet them somewhere away from the house. {{friendOne}} will be there too.

“We are not asking you to chase the machines,” they say. “We are asking you to open the door.”`,
  choices: [
    {
      id: "human_meet_friends",
      label: "Leave the house and meet them.",
      nextSceneId: "HUMAN_LEAVE_HOUSE_MEETING",
      timeCostHours: 1,
      effects: [
        { type: "stat", group: "relationship", key: "friendOne", amount: 1 },
        { type: "stat", group: "relationship", key: "friendTwo", amount: 1 }
      ]
    },
    {
      id: "human_refuse_meeting",
      label: "Refuse. You are staying inside.",
      nextSceneId: "ENDING_DOOR_STAYED_CLOSED",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "chose_isolation", value: true }]
    }
  ]
};

const humanLeaveHouse: StoryScene = {
  id: "HUMAN_LEAVE_HOUSE",
  origin: "human",
  chapter: 1,
  title: "The Door Opens",
  body: `You remove the barricade from the door.

The outside world is still there. It is louder, less certain, and more dangerous than it was before the broadcast—but it is still there.

{{friendOne}} steps out first. {{friendTwo}} waits beside you until you cross the threshold.

The three of you leave together.

Before long, a new Cybertronian incident will force all three of you to decide whether leaving the house was courage, bad luck, or the beginning of something none of you can yet understand.`,
  choices: []
};

const humanLeaveHouseMeeting: StoryScene = {
  id: "HUMAN_LEAVE_HOUSE_MEETING",
  origin: "human",
  chapter: 1,
  title: "Meet Us Outside",
  body: `You unlock the door and step outside alone.

The trip to meet {{friendOne}} and {{friendTwo}} feels longer than it should. Every parked vehicle catches your attention. Every aircraft makes you look up.

Your friends are waiting where they promised.

You have barely reached them when something nearby changes the day again—a new Cybertronian incident that will be developed from this meeting point.`,
  choices: []
};

const humanLeaveArea: StoryScene = {
  id: "HUMAN_LEAVE_AREA",
  origin: "human",
  chapter: 1,
  title: "Beyond the Crowds",
  body: `The three of you decide to leave the populated area without crossing the state line.

That means choosing how to travel, what supplies to carry, and how much trust to place in any vehicle after what you just watched.

This route will continue once those travel choices are worked through.`,
  choices: []
};

const humanLeaveState: StoryScene = {
  id: "HUMAN_LEAVE_STATE",
  origin: "human",
  chapter: 1,
  title: "State Line",
  body: `The three of you decide that distance is the only answer.

Leaving the state means contacting family, gathering supplies, choosing a destination, and entering roads already filling with frightened people.

This route will continue once the destination and method of travel are worked through.`,
  choices: []
};

const doorStayedClosed: StoryScene = {
  id: "ENDING_DOOR_STAYED_CLOSED",
  origin: "human",
  chapter: 1,
  title: "The Door Stayed Closed",
  body: `You remain inside.

At first, you tell yourself it is temporary.

You keep the curtains drawn and the doors locked. You listen to every engine that passes outside and wait for metal footsteps that never come. You follow the news when the power works and the radio when it does not.

The alien machines continue appearing across the world.

There are battles, disappearances, rescues, warnings, and rumors. Some reports describe machines protecting humans. Others describe cities damaged by their war. You stop trying to decide which stories are true.

Your friends call for a while.

They tell you what is happening outside. They ask whether you need food. They invite you to meet them somewhere safe. They remind you that the three of you survived the first day together.

You always find a reason to remain inside.

Eventually, the calls become less frequent.

Your friends build lives that no longer fit inside your barricaded rooms. They continue caring about you, but they cannot spend every day trying to convince you to open the door.

Years pass.

The world learns to live with Cybertronians.

You learn to live without most of the world.

You remain safe from the war, or as safe as anyone can ever truly be. No Cybertronian discovers your name. Neither faction learns what you might have offered. You never stand beside an Autobot, speak with a Decepticon, or discover where your choices might have taken you.

The door stays closed.

And your part in their story ends before it ever begins.

Ending reached: The Door Stayed Closed`,
  choices: [],
  isEnding: true
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_START: {
    ...humanStart,
    body: HUMAN_OPENING,
    choices: [
      ...humanStart.choices.filter((choice) => choice.id !== runChoice.id),
      runChoice
    ]
  },
  HUMAN_RUN: humanRun,
  HUMAN_HOME_ARRIVAL: humanHomeArrival,
  HUMAN_HOME_FIRST_DAYS: humanHomeFirstDays,
  HUMAN_HOME_FIRST_CONVERSATION: humanHomeFirstConversation,
  HUMAN_HOME_SECOND_CONVERSATION: humanHomeSecondConversation,
  HUMAN_HOME_ARGUMENT: humanHomeArgument,
  HUMAN_HOME_CHECKINS: humanHomeCheckins,
  HUMAN_LEAVE_HOUSE: humanLeaveHouse,
  HUMAN_LEAVE_HOUSE_MEETING: humanLeaveHouseMeeting,
  HUMAN_LEAVE_AREA: humanLeaveArea,
  HUMAN_LEAVE_STATE: humanLeaveState,
  ENDING_DOOR_STAYED_CLOSED: doorStayedClosed
};
