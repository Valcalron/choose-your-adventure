import type { StoryChoice, StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyArkCommand";

const markChapterOneComplete = (choice: StoryChoice): StoryChoice => ({
  ...choice,
  effects: [
    ...(choice.effects ?? []),
    { type: "flag", key: "chapter_one_complete", value: true }
  ]
});

const houndInterception: StoryScene = {
  ...BASE_STORY.HUMAN_HOUND_INTERCEPTION,
  choices: BASE_STORY.HUMAN_HOUND_INTERCEPTION.choices.map(markChapterOneComplete)
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_HOUND_INTERCEPTION: houndInterception
};
