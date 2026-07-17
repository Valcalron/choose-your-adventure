import type { StoryChoice, StoryScene } from "../types/game";
import { HUMAN_OPENING } from "./humanOpening";
import { STORY as BASE_STORY } from "./story";

const runChoice: StoryChoice = {
  id: "human_run",
  label: "Get {{friendOne}} and {{friendTwo}} out of the store and run.",
  nextSceneId: "HUMAN_RUN",
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

{{friendOne}} reaches for the car keys.

You stop them.

“No vehicles. You heard the report. They can disguise themselves.”

{{friendTwo}} glances toward the road. “Then we walk.”

The three of you leave the parking lot through the narrow space between the store and the neighboring building.

Behind you, an engine starts.

All three of you run faster.`,
  choices: []
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
  HUMAN_RUN: humanRun
};
