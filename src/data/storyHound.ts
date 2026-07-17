import type { StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyArk";

const houndInterception: StoryScene = {
  ...BASE_STORY.HUMAN_HOUND_INTERCEPTION,
  choices: [
    {
      id: "human_tell_hound_more_information",
      label: "Tell Hound you want more information—and explain how easily the trio tracked the Autobots.",
      nextSceneId: "HUMAN_HOUND_SECURITY_WARNING",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "warned_autobots_about_tracking", value: true }]
    },
    {
      id: "human_tell_hound_want_to_help",
      label: "Tell Hound the three of you want to help.",
      nextSceneId: "HUMAN_HOUND_HELP_INTENT",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "offered_to_help_autobots", value: true }]
    },
    {
      id: "human_tell_hound_wanted_proof",
      label: "Admit that you wanted to see whether the Autobots really had a base here.",
      nextSceneId: "HUMAN_HOUND_PROOF_ANSWER",
      timeCostHours: 1,
      effects: [
        { type: "stat", group: "personality", key: "honesty", amount: 1 },
        { type: "stat", group: "personality", key: "curiosity", amount: 1 }
      ]
    },
    {
      id: "human_leave_hound_immediately",
      label: "Tell Hound you will leave.",
      nextSceneId: "HUMAN_HOME_HUB",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "left_ark_region_when_asked", value: true }]
    }
  ]
};

const houndSecurityWarning: StoryScene = {
  id: "HUMAN_HOUND_SECURITY_WARNING",
  origin: "human",
  chapter: 1,
  title: "The Pattern on the Map",
  body: `You do not accept Hound's attempt to send the three of you away.

“We found this area using television reports, newspapers, a road map, and tire tracks,” you tell him. “We are not investigators. We do not have special equipment. If we could find you, other people can too.”

{{friendOne}} unfolds the map across the hood of the vehicle.

“We marked every reliable Autobot sighting we could find.”

{{friendTwo}} points to the lines crossing the paper.

“Then we tracked which direction they arrived from and which roads they used when they left. After enough sightings, the routes started pointing toward the same area.”

Hound leans closer to examine the markings.

“You followed public reports until they formed a pattern.”

“Yes,” you say. “Then we followed the roads and tracks.”

Hound glances toward the concealed route behind him.

“You did not find the entrance.”

“We got close enough for you to stop us.”

Before Hound can answer, the sound of a heavy vehicle approaches from behind him.

A red van comes into view, slows, and transforms.

Ironhide rises beside Hound and looks between the scout, the three humans, and the marked map.

“What’s takin’ so long?”`,
  choices: [
    {
      id: "human_continue_with_ironhide",
      label: "Explain the map and why you came.",
      nextSceneId: "HUMAN_IRONHIDE_ARRIVES",
      timeCostHours: 1
    }
  ]
};

const houndHelpIntent: StoryScene = {
  id: "HUMAN_HOUND_HELP_INTENT",
  origin: "human",
  chapter: 1,
  title: "Too Small for the Battlefield",
  speaker: "Hound",
  body: `You tell Hound that the Autobots are protecting people and that the three of you want to know whether there is anything humans can do to help.

Hound does not dismiss the intention, but he tries to make the danger plain.

“You are thinking of us as people you can walk up to. We are people—but we are also several tons each.”

He explains that an active Cybertronian base is full of large machines, damaged equipment, weapons, repairs, and Autobots moving quickly during emergencies.

“You are small enough to disappear behind one of our feet. During an alert, someone could hurt you without ever knowing you were there.”

Before the argument can go farther, a heavy vehicle approaches from the concealed route.

A red van slows, transforms, and rises beside Hound.

“What’s takin’ so long?” Ironhide asks.`,
  choices: [
    {
      id: "human_repeat_help_to_ironhide",
      label: "Tell Ironhide the same thing: you want to help.",
      nextSceneId: "HUMAN_IRONHIDE_ARRIVES",
      timeCostHours: 1
    },
    {
      id: "human_leave_after_hound_warning",
      label: "Accept Hound's warning and leave.",
      nextSceneId: "HUMAN_HOME_HUB",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "left_after_hound_warning", value: true }]
    }
  ]
};

const houndProofAnswer: StoryScene = {
  id: "HUMAN_HOUND_PROOF_ANSWER",
  origin: "human",
  chapter: 1,
  title: "You Proved It",
  speaker: "Hound",
  body: `You admit that the three of you wanted to see whether the stories were true—whether the Autobots really had a hidden base somewhere in the region.

Hound looks at the folded map and then at the route behind him.

“You proved it,” he says. “You followed enough of us home to find the right area.”

He is not impressed by the risk you took merely to satisfy your curiosity.

“You also proved that looking for something hidden can bring you close enough to become part of its problems.”

He answers what little he safely can, but he does not reveal the entrance or invite the trio farther in.`,
  choices: [
    {
      id: "human_leave_after_proving_ark",
      label: "Accept that answer and return home.",
      nextSceneId: "HUMAN_HOME_HUB",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "proved_ark_region_true", value: true }]
    },
    {
      id: "human_change_answer_to_help",
      label: "Tell Hound that now you know it is true, you want to help.",
      nextSceneId: "HUMAN_HOUND_HELP_INTENT",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "offered_to_help_autobots", value: true }]
    }
  ]
};

const ironhideArrives: StoryScene = {
  id: "HUMAN_IRONHIDE_ARRIVES",
  origin: "human",
  chapter: 1,
  title: "What Do You Really Want?",
  speaker: "Ironhide",
  body: `Hound gestures toward the map.

“They were looking for us.”

Ironhide's expression hardens.

“And they found us?”

“They found the region,” Hound corrects. “By tracking our public sightings and the roads we use.”

Ironhide looks down at the trio.

“You three followed Autobots all the way out here?”

“Not one Autobot,” {{friendOne}} says. “Several.”

{{friendTwo}} taps the map. “We followed the pattern.”

Ironhide studies the routes drawn across it.

“We’d better take a closer look at that map.”

{{friendOne}} shuffles the map to the side and folds part of it over.

“Wait a minute. You can’t just take it.”

Ironhide looks at the map, then back at {{friendOne}}.

“Wasn’t planning to.”

He opens a communication channel.

“Ironhide to Prime. We’ve got three humans out here with Hound. They tracked our movements close enough to find the area.”

There is a brief pause while Optimus answers through the private channel.

Ironhide turns his attention back to you.

“You came all this way, mapped our routes, and kept going after you knew you were getting close.”

His optics settle on you.

“So what do you really want?”`,
  choices: [
    {
      id: "human_tell_ironhide_want_to_help",
      label: "Tell Ironhide the three of you want to help.",
      nextSceneId: "HUMAN_IRONHIDE_HELP_ARGUMENT",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "offered_to_help_autobots", value: true },
        { type: "stat", group: "faction", key: "autobot", amount: 1 }
      ]
    },
    {
      id: "human_leave_when_ironhide_asks",
      label: "Tell Ironhide you will leave.",
      nextSceneId: "HUMAN_HOME_HUB",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "left_after_ironhide_question", value: true }]
    }
  ]
};

const ironhideHelpArgument: StoryScene = {
  id: "HUMAN_IRONHIDE_HELP_ARGUMENT",
  origin: "human",
  chapter: 1,
  title: "Then Give Us Rules",
  speaker: "Ironhide",
  body: `“The Autobots are protecting people,” you say. “You are fighting on a planet that is not yours, and we want to know whether there is something we can do to help.”

Ironhide remains skeptical.

“Helpin’ sounds good right up until somebody gets stepped on. Humans don’t belong underfoot in an active Cybertronian base.”

{{friendOne}} looks past him toward the route Hound is guarding.

“But I saw that you have Spike and Sparkplug in there.”

Ironhide pauses.

Hound glances toward him.

“They were interviewed after the oil-rig attack,” {{friendOne}} continues. “We recognized them. If it is too dangerous for humans, why are they allowed inside?”

Ironhide does not deny it.

“They didn’t track us down and show up uninvited.”

“No,” you say. “But they are helping.”

That is harder for him to dismiss.

“Spike and Sparkplug know when to listen,” Ironhide says. “They stay with an escort, and even then, it ain’t safe.”

“Then give us rules,” {{friendTwo}} says. “We are not asking you to put us in the middle of a battle.”

Ironhide reopens the communication channel.

“Ironhide to Prime. There’s more to this than three humans wanderin’ too close. They know about the Witwickys, they say they want to help, and they’re not takin’ ‘go home’ for an answer.”

He keeps his optics on you while he waits.

“Prime’s decision. Not mine.”`,
  choices: [
    {
      id: "human_wait_for_optimus",
      label: "Wait for Optimus Prime's decision.",
      nextSceneId: "HUMAN_WAIT_FOR_OPTIMUS_OPEN",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "waiting_for_optimus", value: true }]
    },
    {
      id: "human_leave_before_optimus",
      label: "Decide not to push farther and leave.",
      nextSceneId: "HUMAN_HOME_HUB",
      timeCostHours: 2
    }
  ]
};

const waitForOptimusOpen: StoryScene = {
  id: "HUMAN_WAIT_FOR_OPTIMUS_OPEN",
  origin: "human",
  chapter: 1,
  title: "Prime's Decision",
  body: `Hound and Ironhide remain between the trio and the concealed route.

The map stays with {{friendOne}}.

Somewhere beyond them, Optimus Prime is deciding whether three humans who tracked the Autobots' movements, refused to surrender their map, and asked to help should be sent home or heard out.

What Optimus decides—and whether he comes outside to meet them—will be developed next.`,
  choices: []
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_HOUND_INTERCEPTION: houndInterception,
  HUMAN_HOUND_SECURITY_WARNING: houndSecurityWarning,
  HUMAN_HOUND_HELP_INTENT: houndHelpIntent,
  HUMAN_HOUND_PROOF_ANSWER: houndProofAnswer,
  HUMAN_IRONHIDE_ARRIVES: ironhideArrives,
  HUMAN_IRONHIDE_HELP_ARGUMENT: ironhideHelpArgument,
  HUMAN_WAIT_FOR_OPTIMUS_OPEN: waitForOptimusOpen
};
