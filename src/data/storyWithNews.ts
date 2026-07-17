import type { StoryChoice, StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyRuntime";

const redirectChoice = (
  sceneId: string,
  choiceId: string,
  nextSceneId: string
): StoryScene => {
  const scene = BASE_STORY[sceneId];

  return {
    ...scene,
    choices: scene.choices.map((choice) =>
      choice.id === choiceId ? { ...choice, nextSceneId } : choice
    )
  };
};

const OIL_RIG_INTERVIEW = `The covering has barely been pulled away from the front door when the television interrupts the regular broadcast.

A sharp alert tone fills the room.

SPECIAL REPORT

The anchor appears beside two unfamiliar symbols: one red, the other purple.

“We now have the first extended interview with civilians who have survived direct contact with both groups of alien machines.”

The picture changes to footage of an offshore oil platform.

Smoke rises from the shattered upper decks. Part of the drilling structure has collapsed into the ocean. Emergency vessels circle the wreckage while helicopters search the surrounding water.

A caption appears beneath the image:

OFFSHORE OIL RIG ATTACKED BY ALIEN MACHINES

“The platform was attacked earlier today by the group now identified as the Decepticons. Investigators believe they were attempting to seize the oil stored and processed at the facility.”

The report cuts to a temporary medical station near the coast.

A middle-aged oil-rig worker sits beside a younger man. Both still wear parts of their work clothes. The older man has a bandage around one arm. The younger man looks exhausted but uninjured.

The captions identify them:

Sparkplug Witwicky — Oil-Rig Worker

Spike Witwicky — Oil-Rig Worker

The reporter turns toward Sparkplug.

“You and your son were working on the platform when the attack began?”

Sparkplug nods.

“We were below the main deck when the first section went up. At first, we thought there had been an explosion in one of the storage systems. Then we saw those machines walking across the rig.”

“What were they doing?”

“Taking the oil.”

Sparkplug glances toward the footage playing on a monitor beside them.

“They ripped into the pumping equipment and storage lines like the whole platform belonged to them.”

“Did the Decepticons attack the workers?”

“They fired at anyone who got in their way.”

He pauses.

“But mostly, they just didn’t care about us.”

The reporter waits.

Sparkplug continues.

“They knew people were still on that rig. They knew sections were collapsing. It made no difference to them. We were just something standing between them and what they came to take.”

The screen changes to distant footage recorded from a rescue helicopter.

Purple-marked machines move across the burning platform while workers flee along the lower deck. One of the Decepticons tears open an oil line despite the flames spreading around it.

The reporter turns to Spike.

“When did the second group arrive?”

“The Autobots came after the attack had already started.”

“Did you know who they were?”

“No. Not then.”

Spike looks down briefly before continuing.

“We thought they were more of the same.”

The footage changes again.

A red-and-blue robot braces part of the collapsing structure while trapped workers escape beneath it. A yellow robot guides several people toward a rescue launch. Other Autobots place themselves between the workers and incoming Decepticon fire.

Spike watches the recording.

“They could have gone straight after the Decepticons. Instead, they stopped to get us out.”

“Were you personally rescued by them?”

“Yes.”

Spike looks directly at the reporter.

“They knew the rig might collapse. They went in anyway.”

The reporter turns back toward Sparkplug.

“Do you believe the Autobots are friendly?”

Sparkplug takes a moment before answering.

“I believe they saved our lives.”

“That is not quite the same thing.”

“No,” Sparkplug agrees. “They’re giant alien machines fighting a war on Earth. I’m not going to tell anyone that makes them harmless.”

He gestures toward the image of the ruined oil platform.

“But I saw the difference.”

The screen splits between the two faction symbols.

The red face-like symbol appears beneath the word:

AUTOBOTS

The purple angular symbol appears beneath:

DECEPTICONS

Sparkplug points toward the Autobot symbol.

“These machines saw people trapped and stopped to help.”

Then he points toward the Decepticon symbol.

“Those machines saw people trapped and kept taking what they wanted.”

The reporter asks one final question.

“What should someone do if they encounter one of them?”

Sparkplug’s expression tightens.

“Get clear of the fighting.”

Spike adds, “And look for the symbol.”

The picture returns to the studio.

The anchor faces the camera.

“Federal officials have not declared either group safe. However, evidence gathered from the oil-rig attack and several other encounters supports the Witwickys’ account.”

Footage appears beside him of Autobots assisting emergency crews and shielding civilians from falling debris.

“Machines displaying the red Autobot insignia have repeatedly attempted to rescue humans and limit civilian casualties.”

The footage changes to Decepticons removing energy and equipment while nearby structures burn.

“The Decepticons have continued their operations regardless of the danger to human life. Officials say the available evidence suggests that humans are not always their primary targets, but neither are human lives considered an obstacle worth avoiding.”

The anchor looks down at the report in front of him.

“Civilians are still advised not to approach either faction. However, anyone caught near an active confrontation should follow Autobot evacuation instructions when human emergency personnel are unavailable.”

The screen freezes on the two symbols.

{{friendOne}} looks toward the uncovered door.

“So the Autobots are trying to save people.”

{{friendTwo}} watches the oil rig burning behind the Decepticon symbol.

“And the Decepticons couldn’t care less who gets caught underneath them.”

Outside, an engine passes the house.

All three of you turn toward the sound.

A few days ago, every vehicle seemed equally dangerous.

Now you know there is a difference.

You just do not know which symbol the next machine will carry.`;

const continueOutside: StoryChoice = {
  id: "human_continue_after_oil_rig_news",
  label: "Leave the house with {{friendOne}} and {{friendTwo}}.",
  nextSceneId: "HUMAN_LEAVE_HOUSE",
  timeCostHours: 1
};

const continueToMeeting: StoryChoice = {
  id: "human_continue_to_meeting_after_oil_rig_news",
  label: "Leave the house and meet {{friendOne}} and {{friendTwo}}.",
  nextSceneId: "HUMAN_LEAVE_HOUSE_MEETING",
  timeCostHours: 1
};

const oilRigNews: StoryScene = {
  id: "HUMAN_OIL_RIG_NEWS",
  origin: "human",
  chapter: 1,
  title: "The Difference Between Them",
  body: OIL_RIG_INTERVIEW,
  choices: [continueOutside]
};

const oilRigNewsMeeting: StoryScene = {
  id: "HUMAN_OIL_RIG_NEWS_MEETING",
  origin: "human",
  chapter: 1,
  title: "The Difference Between Them",
  body: OIL_RIG_INTERVIEW,
  choices: [continueToMeeting]
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_HOME_FIRST_CONVERSATION: redirectChoice(
    "HUMAN_HOME_FIRST_CONVERSATION",
    "human_agree_leave_house",
    "HUMAN_OIL_RIG_NEWS"
  ),
  HUMAN_HOME_SECOND_CONVERSATION: redirectChoice(
    "HUMAN_HOME_SECOND_CONVERSATION",
    "human_leave_after_second_request",
    "HUMAN_OIL_RIG_NEWS"
  ),
  HUMAN_HOME_ARGUMENT: redirectChoice(
    "HUMAN_HOME_ARGUMENT",
    "human_argument_no_leave",
    "HUMAN_OIL_RIG_NEWS"
  ),
  HUMAN_HOME_CHECKINS: redirectChoice(
    "HUMAN_HOME_CHECKINS",
    "human_meet_friends",
    "HUMAN_OIL_RIG_NEWS_MEETING"
  ),
  HUMAN_OIL_RIG_NEWS: oilRigNews,
  HUMAN_OIL_RIG_NEWS_MEETING: oilRigNewsMeeting
};
