import type { StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyResearch";

const credibleSideswipeSighting: StoryScene = {
  id: "HUMAN_AUTOBOT_SEARCH_OPEN",
  origin: "human",
  chapter: 1,
  title: "A Credible Sighting",
  body: `One report finally sounds credible enough to follow.

Emergency crews describe a red sports car arriving near a damaged roadway shortly before an enormous red Autobot helped move wreckage and clear a path for trapped motorists.

By the time you, {{friendOne}}, and {{friendTwo}} reach the area, the rescue is nearly over.

A red Lamborghini pulls away from the scene.

The Autobot insignia is visible on it.

Unlike the Decepticons, who usually leave an attack by flying too fast to follow or disappearing out over the ocean, this Autobot is using the road.

{{friendOne}} points after it. “We can actually follow that one.”

{{friendTwo}} is already moving. “Then we had better not lose him.”`,
  choices: [
    {
      id: "human_follow_sideswipe",
      label: "Follow the red Lamborghini.",
      nextSceneId: "HUMAN_FOLLOW_SIDESWIPE",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "followed_sideswipe", value: true }]
    }
  ]
};

const followSideswipe: StoryScene = {
  id: "HUMAN_FOLLOW_SIDESWIPE",
  origin: "human",
  chapter: 1,
  title: "He Notices",
  body: `The red Lamborghini notices you almost immediately.

At first, he seems willing to believe that your vehicle simply happens to be traveling the same direction. Then you remain behind him through one turn, another, and a third.

He accelerates.

You keep following.

{{friendOne}} watches the distance between the vehicles widen. “He is testing us.”

{{friendTwo}} grips the seat. “No. He is trying to lose us.”

The Lamborghini leaves the main road and takes a route toward an isolated stretch where there are no pedestrians and few other vehicles.

Then he stops.

The doors open. Red body panels separate and shift. The car rises, transforms, and turns to face all three of you.

Sideswipe folds his arms.

“You have been following me for miles.”

{{friendOne}} says quietly, “At least we found one.”

{{friendTwo}} answers, “That does not mean he is happy about it.”

“I noticed,” Sideswipe says.

His irritation is obvious, but he has chosen to confront you rather than abandon you on the road.`,
  choices: [
    {
      id: "human_explain_to_sideswipe",
      label: "Admit following him was reckless, then explain that the Autobots seem to care about people.",
      nextSceneId: "HUMAN_SIDESWIPE_CONTACT",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "first_autobot_contact", value: "sideswipe" },
        { type: "stat", group: "faction", key: "autobot", amount: 1 },
        { type: "stat", group: "relationship", key: "sideswipe", amount: 1 }
      ]
    }
  ]
};

const sideswipeContact: StoryScene = {
  id: "HUMAN_SIDESWIPE_CONTACT",
  origin: "human",
  chapter: 1,
  title: "The Autobot You Found",
  speaker: "Sideswipe",
  body: `You admit that following him without knowing where he was going was reckless.

Then you explain why you did it.

“The Autobots seem to care about people.”

Sideswipe's expression eases, though the irritation does not disappear.

“We do.”

He glances back toward the road before looking down at the three of you again.

“But following an Autobot is a good way to end up wherever the Decepticons are headed next.”

You tell him about the interview with Spike and Sparkplug and the oil-rig attack.

“The Witwickys told you the truth,” Sideswipe says. “The Decepticons want Earth's energy. Humans matter to them when you are useful, in the way, or making noise.”

{{friendOne}} asks whether he can take you to the other Autobots.

Sideswipe does not answer immediately.

“You followed me without knowing whether I was alone or whether anyone was following me.”

{{friendTwo}} exhales. “So it was a bad idea.”

“Very.”

He looks at you again.

“But you managed to keep up, and you did not turn around when I noticed you.”

The approval is reluctant, but it is there.

Sideswipe is willing to help. He simply does not look pleased about becoming responsible for three humans who decided to follow him.

“So,” he says, “what exactly do you want from the Autobots?”`,
  choices: []
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_AUTOBOT_SEARCH_OPEN: credibleSideswipeSighting,
  HUMAN_FOLLOW_SIDESWIPE: followSideswipe,
  HUMAN_SIDESWIPE_CONTACT: sideswipeContact
};
