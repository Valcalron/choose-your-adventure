import type { StoryScene } from "../types/game";
import { STORY as BASE_STORY } from "./storyRelayApproach";

const relayReviewEvidence: StoryScene = {
  ...BASE_STORY.HUMAN_RELAY_REVIEW_EVIDENCE,
  choices: [
    ...BASE_STORY.HUMAN_RELAY_REVIEW_EVIDENCE.choices,
    {
      id: "human_search_decepticons_after_relay_review",
      label: "Use the relay evidence to continue searching for Decepticon activity.",
      nextSceneId: "HUMAN_DECEPTICON_SEARCH_AFTER_RELAY",
      timeCostHours: 1,
      effects: [
        { type: "flag", key: "seeking_faction", value: "decepticons" },
        { type: "flag", key: "continued_decepticon_search_after_relay", value: true },
        { type: "stat", group: "faction", key: "decepticon", amount: 1 }
      ]
    }
  ]
};

const decepticonSearchAfterRelay: StoryScene = {
  id: "HUMAN_DECEPTICON_SEARCH_AFTER_RELAY",
  origin: "human",
  chapter: 2,
  title: "Follow the Energy Trail",
  body: `The relay station gives the trio one reliable starting point: the Decepticons came for energy.

You spread out regional maps, newspaper reports, television notes, and lists of unexplained outages. Any future operation may leave the same signs—damaged power equipment, sudden losses across the grid, unusual aircraft near energy sites, or witnesses describing machines that transform.

That does not reveal where the Decepticons are based. It does give the three of you something more useful than waiting without a plan.

{{friendOne}} begins marking power stations, fuel depots, and major transmission routes.

{{friendTwo}} starts a separate list for reports that authorities dismiss as mechanical failure or panic.

If Soundwave contacts the trio again, the communicator may become the direct route. Until then, the energy pattern is the best trail you have.`,
  choices: [
    {
      id: "human_monitor_decepticon_energy_targets",
      label: "Monitor outages, power facilities, and reports of unidentified transforming machines.",
      nextSceneId: "HUMAN_DECEPTICON_CHAPTER_TWO_WAITING",
      timeCostHours: 24,
      effects: [
        { type: "flag", key: "monitoring_decepticon_energy_targets", value: true },
        { type: "flag", key: "decepticon_chapter_two_plan_complete", value: true }
      ]
    },
    {
      id: "human_return_to_soundwave_contact_plan_from_search",
      label: "Keep the search going, but first decide what to do if Soundwave contacts the trio again.",
      nextSceneId: "HUMAN_RELAY_SOUNDWAVE_CONTACT_PLAN",
      timeCostHours: 1,
      requirements: [
        { type: "flag", key: "contacted_soundwave_at_relay", equals: true },
        { type: "inventory", item: "Recovered Decepticon relay device" }
      ]
    },
    {
      id: "human_switch_from_decepticon_search_to_autobots",
      label: "Set the Decepticon search aside and begin researching the Autobots instead.",
      nextSceneId: "HUMAN_RELAY_RESEARCH_AUTOBOTS",
      timeCostHours: 1,
      effects: [{ type: "flag", key: "seeking_faction", value: "autobots" }]
    }
  ]
};

export const STORY: Record<string, StoryScene> = {
  ...BASE_STORY,
  HUMAN_RELAY_REVIEW_EVIDENCE: relayReviewEvidence,
  HUMAN_DECEPTICON_SEARCH_AFTER_RELAY: decepticonSearchAfterRelay
};