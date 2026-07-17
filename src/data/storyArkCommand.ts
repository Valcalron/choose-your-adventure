import type { StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyOptimus";

const arkEntryOpen: StoryScene = {
  ...BASE_STORY.HUMAN_ARK_ENTRY_OPEN,
  body: `Optimus studies the three of you before nodding.

“Then you understand that courage is not enough. Responsibility means knowing when to act—and when to listen.”

He states the rules clearly.

You will remain with an escort or with Spike and Sparkplug. You will not enter damaged, restricted, or unsafe areas. You will not touch Cybertronian equipment without permission. During an alert, you will obey instructions immediately. If ordered to leave, you will leave without argument.

“Under those conditions,” Optimus says, “you may enter the Ark.”

Hound and Ironhide move aside, revealing the route they had been guarding.`,
  choices: [
    {
      id: "human_enter_ark_command_area",
      label: "Follow Optimus into the Ark's main command area.",
      nextSceneId: "HUMAN_ARK_COMMAND_AREA",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "entered_ark", value: true }]
    }
  ]
};

const arkCommandArea: StoryScene = {
  id: "HUMAN_ARK_COMMAND_AREA",
  origin: "human",
  chapter: 1,
  title: "The Main Command Area",
  body: `The passage opens into the Ark's main command area.

The chamber was built for Cybertronians. Consoles rise far above the three humans, illuminated displays cover the walls, and Teletraan I dominates the room. The damaged spacecraft functions as the Autobots' headquarters, though scorched metal and unfinished repairs still show what happened to it.

Autobots work at stations, cross the room on assignments, and move around the newcomers with visible care.

Optimus keeps the trio close to the edge of the main walkway.

“Remain together and stay where your escort can see you.”

Hound stays nearby. Ironhide moves ahead to warn the others that humans are entering.

Spike and Sparkplug are already in the command area. Spike notices the newcomers first.

“More humans?”

Sparkplug looks toward Optimus. “They find this place the same way we did?”

“No,” Hound answers. “They tracked us.”

That earns the trio several new looks from around the room.

{{friendOne}} stares up at Teletraan I but does not move toward it.

“I want to see that.”

“We just promised not to wander,” {{friendTwo}} says.

So the three of you remain exactly where Optimus placed you and wait for him to decide what happens next.`,
  choices: [
    {
      id: "human_wait_in_ark_command_area",
      label: "Wait quietly for Optimus's instructions.",
      nextSceneId: "HUMAN_ARK_HUMAN_ORIENTATION",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "waited_for_optimus_inside_ark", value: true },
        { type: "stat", group: "personality", key: "obedience", amount: 1 }
      ]
    }
  ]
};

const arkHumanOrientation: StoryScene = {
  id: "HUMAN_ARK_HUMAN_ORIENTATION",
  origin: "human",
  chapter: 1,
  title: "Human Safety Orientation",
  body: `Optimus notices that the trio has remained exactly where he placed them.

“Thank you for waiting.”

“We did not want to get in trouble five minutes after being allowed inside,” {{friendOne}} says.

“A wise decision,” Optimus replies.

He calls Spike and Sparkplug over and asks them to explain where humans may safely remain and what rules they follow aboard the Ark.

Sparkplug points out the marked human-safe areas along the edge of the command center.

“Stay inside these lanes unless an Autobot tells you otherwise. Do not assume they see you just because you see them.”

Spike continues with the practical rules.

Remain with Spike, Sparkplug, or an assigned Autobot. Stay out of active walkways and never pass directly behind an Autobot's feet. Do not touch consoles, tools, weapons, energon containers, or damaged equipment. Do not enter corridors, repair areas, or side chambers without permission. During an alert, stop moving and listen. If ordered to evacuate, leave immediately. Always tell someone before separating from the group.

Spike gestures toward Teletraan I.

“That includes the computer. Do not touch anything unless somebody tells you exactly what to press.”

“I was not planning to,” {{friendOne}} says.

“You were definitely planning to,” {{friendTwo}} answers.

The unfamiliar humans have attracted attention. Bumblebee approaches first, friendly and curious.

“So you are the humans who found the Ark?”

“The area around it,” Hound corrects.

“Still impressive,” Bumblebee says.

Wheeljack lowers himself to look at the map still held by {{friendOne}}.

“You built this from news reports and roads?”

“News reports, newspapers, roads, and tire tracks,” you answer.

“Not bad.”

{{sideswipeRecognition}}

Ratchet notices the growing cluster and points away from the marked human area.

“Either give them room or move along. Optimus brought in three humans, not three new floor markings.”

For now, the trio's first responsibility is simple: remain with Spike and Sparkplug, observe, ask permission before acting, and learn how to stay alive inside a Cybertronian command center.`,
  choices: []
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_ARK_ENTRY_OPEN: arkEntryOpen,
  HUMAN_ARK_COMMAND_AREA: arkCommandArea,
  HUMAN_ARK_HUMAN_ORIENTATION: arkHumanOrientation
};
