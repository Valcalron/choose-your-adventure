import type { StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyShermanDamTravel";

const shermanDamDecepticonRoute: StoryScene = {
  ...BASE_STORY.HUMAN_SHERMAN_DAM_DECEPTICON_ROUTE,
  title: "The Outer Emergency Perimeter",
  body: `Hours after leaving home, the trio reaches the first closure connected to the Sherman Dam emergency.

It is not the only one.

State police are turning ordinary traffic away miles from the river. Emergency vehicles have priority in every open lane. Farther ahead, military and federal checkpoints control the roads that still lead toward the dam. Bridges, service roads, overlooks, and access routes shown on the map have all been closed.

The airspace is restricted. Aircraft move overhead. Evacuation traffic continues in the opposite direction while radio reports warn that the fighting has not stopped.

This is nothing like slipping into the relay station after the Decepticons had already left. Sherman Dam is an active battle surrounding one of the most important infrastructure sites in the country. There is no neglected maintenance entrance waiting to be found, and being caught beyond these barriers could mean arrest, injury, or being trapped between Cybertronians.

{{friendOne}} looks toward the distant smoke.

“We came because we wanted answers.”

{{friendTwo}} looks at the checkpoints ahead.

“That does not mean we should walk into this.”

The question can no longer be avoided: should the three of you really go any farther?`,
  choices: [
    {
      id: "human_turn_back_from_sherman_decepticon_perimeter",
      label: "Turn back before the trio crosses into the active emergency zone.",
      nextSceneId: "HUMAN_SHERMAN_DAM_TURN_BACK",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "turned_back_at_sherman_perimeter", value: true }]
    },
    {
      id: "human_observe_sherman_decepticon_perimeter",
      label: "Remain outside the closures and watch for a safe chance to contact the Decepticons.",
      nextSceneId: "HUMAN_SHERMAN_DAM_OBSERVE_FROM_DISTANCE",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "sherman_perimeter_plan", value: "observe_for_decepticons" }]
    },
    {
      id: "human_study_sherman_decepticon_access",
      label: "Study the closures for another route, but do not cross until all three agree.",
      nextSceneId: "HUMAN_SHERMAN_DAM_ACCESS_MAP",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "sherman_perimeter_plan", value: "study_access" }]
    }
  ]
};

const shermanDamAutobotRoute: StoryScene = {
  ...BASE_STORY.HUMAN_SHERMAN_DAM_AUTOBOT_ROUTE,
  title: "The Outer Emergency Perimeter",
  body: `Hours after leaving home, the trio reaches the first closure connected to the Sherman Dam emergency.

It is not the only one.

State police are turning ordinary traffic away miles from the river. Emergency vehicles have priority in every open lane. Farther ahead, military and federal checkpoints control the roads that still lead toward the dam. Bridges, service roads, overlooks, and access routes shown on the map have all been closed.

The airspace is restricted. Aircraft move overhead. Evacuation traffic continues in the opposite direction while radio reports warn that the fighting has not stopped.

This is nothing like approaching an Autobot on an open road after a rescue. Sherman Dam is an active battle surrounding one of the most important infrastructure sites in the country. There is no safe public route to the dam, and being caught beyond these barriers could mean arrest, injury, or being trapped between Cybertronians.

{{friendOne}} looks toward the distant smoke.

“We came because the Autobots might listen.”

{{friendTwo}} looks at the checkpoints ahead.

“That does not mean we should walk into this.”

The question can no longer be avoided: should the three of you really go any farther?`,
  choices: [
    {
      id: "human_turn_back_from_sherman_autobot_perimeter",
      label: "Turn back before the trio crosses into the active emergency zone.",
      nextSceneId: "HUMAN_SHERMAN_DAM_TURN_BACK",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "turned_back_at_sherman_perimeter", value: true }]
    },
    {
      id: "human_observe_sherman_autobot_perimeter",
      label: "Remain outside the closures and watch for a safe chance to contact the Autobots.",
      nextSceneId: "HUMAN_SHERMAN_DAM_OBSERVE_FROM_DISTANCE",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "sherman_perimeter_plan", value: "observe_for_autobots" }]
    },
    {
      id: "human_study_sherman_autobot_access",
      label: "Study the closures for another route, but do not cross until all three agree.",
      nextSceneId: "HUMAN_SHERMAN_DAM_ACCESS_MAP",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "sherman_perimeter_plan", value: "study_access" }]
    }
  ]
};

const shermanDamTurnBack: StoryScene = {
  id: "HUMAN_SHERMAN_DAM_TURN_BACK",
  origin: "human",
  chapter: 2,
  title: "Far Enough",
  body: `The trio turns away from the outer emergency perimeter.

You came far enough to understand that reaching Sherman Dam would require more than determination. It would require crossing a national disaster response while an alien battle is still underway.

Turning back does not erase the communicator, the relay evidence, or Soundwave's unanswered signal. It only means the three of you refuse to gamble your lives on reaching the dam tonight.

The radio continues reporting the attack as you begin the long drive home.`,
  choices: [
    {
      id: "human_return_home_after_sherman_turnback",
      label: "Return home and continue following the crisis from a distance.",
      nextSceneId: "HUMAN_SHERMAN_DAM_HOME_WATCH",
      timeCostHours: 12,
      effects: [{ type: "flag", key: "followed_sherman_crisis_from_home", value: true }]
    }
  ]
};

const shermanDamHomeWatch: StoryScene = {
  id: "HUMAN_SHERMAN_DAM_HOME_WATCH",
  origin: "human",
  chapter: 2,
  title: "Watching From Home",
  body: `By the time the trio reaches home, the Sherman Dam crisis has changed again.

The television remains on. The communicator is placed nearby. News reports, emergency maps, and official warnings become the only safe connection to what is happening at the dam.

The three of you did not reach either faction tonight. You also did not become casualties inside a battle none of you understands.

For now, watching and waiting is the choice you made together.`,
  choices: []
};

const shermanDamObserveFromDistance: StoryScene = {
  id: "HUMAN_SHERMAN_DAM_OBSERVE_FROM_DISTANCE",
  origin: "human",
  chapter: 2,
  title: "Outside the Line",
  body: `The trio stays outside the marked closure and searches for a legal place to stop.

From this distance, the dam itself remains hidden by terrain, smoke, and the emergency perimeter. You can see aircraft, hear distant impacts, and follow changing reports over the radio, but no safe path leads directly into the operation.

Remaining here may provide a chance to see one of the factions moving beyond the main battle. It also means accepting that the trio may wait for hours and see nothing useful.`,
  choices: [
    {
      id: "human_continue_observing_sherman_perimeter",
      label: "Keep watching from outside the emergency line.",
      nextSceneId: "HUMAN_SHERMAN_DAM_PERIMETER_WATCH",
      timeCostHours: 2,
      effects: [{ type: "flag", key: "continued_sherman_perimeter_watch", value: true }]
    },
    {
      id: "human_reconsider_and_leave_sherman_perimeter",
      label: "Reconsider and begin the drive home.",
      nextSceneId: "HUMAN_SHERMAN_DAM_TURN_BACK",
      timeCostHours: 1
    }
  ]
};

const shermanDamPerimeterWatch: StoryScene = {
  id: "HUMAN_SHERMAN_DAM_PERIMETER_WATCH",
  origin: "human",
  chapter: 2,
  title: "Waiting Beyond the Barricades",
  body: `The trio remains beyond the emergency line while the battle continues somewhere ahead.

Every passing emergency vehicle reinforces how serious the situation is. The safest possible contact would have to happen here, outside the secured zone, with a Cybertronian who leaves the main operation long enough to notice three humans waiting beside the road.

Whether that opportunity appears depends on what happens next at Sherman Dam.`,
  choices: []
};

const shermanDamAccessMap: StoryScene = {
  id: "HUMAN_SHERMAN_DAM_ACCESS_MAP",
  origin: "human",
  chapter: 2,
  title: "No Easy Way Around",
  body: `The trio studies every route on the map against what you can see and what the radio reports.

The main highways are blocked. Service roads feed into controlled checkpoints. Roads near the river are being used by emergency crews. The remaining terrain would require leaving the vehicle and crossing unfamiliar ground while military aircraft and Cybertronians move overhead.

A route around the first barricade may exist. A safe route to the dam does not.

{{friendOne}} folds the map back to the outer roads.

“Getting around one checkpoint is not the same as getting through all of this.”

{{friendTwo}} looks at you.

“So we decide together. No one pushes ahead because we already drove this far.”`,
  choices: [
    {
      id: "human_return_to_sherman_observation_after_map",
      label: "Stay outside the closures and watch from a safe distance.",
      nextSceneId: "HUMAN_SHERMAN_DAM_OBSERVE_FROM_DISTANCE",
      timeCostHours: 1
    },
    {
      id: "human_turn_back_after_sherman_access_map",
      label: "Accept that there is no safe route and turn back.",
      nextSceneId: "HUMAN_SHERMAN_DAM_TURN_BACK",
      timeCostHours: 1
    }
  ]
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_SHERMAN_DAM_DECEPTICON_ROUTE: shermanDamDecepticonRoute,
  HUMAN_SHERMAN_DAM_AUTOBOT_ROUTE: shermanDamAutobotRoute,
  HUMAN_SHERMAN_DAM_TURN_BACK: shermanDamTurnBack,
  HUMAN_SHERMAN_DAM_HOME_WATCH: shermanDamHomeWatch,
  HUMAN_SHERMAN_DAM_OBSERVE_FROM_DISTANCE: shermanDamObserveFromDistance,
  HUMAN_SHERMAN_DAM_PERIMETER_WATCH: shermanDamPerimeterWatch,
  HUMAN_SHERMAN_DAM_ACCESS_MAP: shermanDamAccessMap
};