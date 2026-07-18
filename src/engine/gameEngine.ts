import type {
  Effect,
  GameState,
  PlayerCharacter,
  Requirement,
  StoryChoice
} from "../types/game";

type NamedCharacterRoute = "raider" | "prizm" | "juci";

const getNamedCharacterRoute = (
  character: PlayerCharacter
): NamedCharacterRoute | null => {
  const normalizedName = character.name.trim().toLowerCase();

  if (normalizedName === "raider") return "raider";
  if (normalizedName === "prizm") return "prizm";
  if (normalizedName === "juci") return "juci";

  return null;
};

export const applyNamedCharacterRoute = (state: GameState): GameState => {
  const route = getNamedCharacterRoute(state.character);
  if (!route || state.flags.named_character_route === route) return state;

  const sharedFlags = {
    ...state.flags,
    named_character_route: route,
    decepticon_name_affinity: true,
    decepticon_luck_bonus: 1
  };
  const faction = {
    ...state.faction,
    decepticon: Math.max(state.faction.decepticon ?? 0, 1)
  };

  if (route === "raider") {
    return {
      ...state,
      faction,
      flags: {
        ...sharedFlags,
        primary_love_interest: "soundwave",
        soundwave_is_telepath: true,
        soundwave_telepathic_attention: true
      },
      relationships: {
        ...state.relationships,
        soundwave: Math.max(state.relationships.soundwave ?? 0, 2)
      }
    };
  }

  if (route === "prizm") {
    return {
      ...state,
      faction,
      flags: {
        ...sharedFlags,
        primary_love_interest: "megatron",
        megatron_curiosity: true,
        megatron_interest_is_restrained: true
      },
      relationships: {
        ...state.relationships,
        megatron: Math.max(state.relationships.megatron ?? 0, 2)
      }
    };
  }

  return {
    ...state,
    faction,
    flags: {
      ...sharedFlags,
      primary_love_interest: "shockwave",
      shockwave_on_cybertron: true,
      earth_decepticon_connection: "skywarp",
      starscream_rivalry: true
    },
    relationships: {
      ...state.relationships,
      shockwave: Math.max(state.relationships.shockwave ?? 0, 2),
      skywarp: Math.max(state.relationships.skywarp ?? 0, 1),
      starscream: Math.min(state.relationships.starscream ?? 0, -2)
    }
  };
};

export const createInitialState = (character: PlayerCharacter): GameState =>
  applyNamedCharacterRoute({
    currentSceneId: character.origin === "human" ? "HUMAN_START" : "CYBER_START",
    character,
    elapsedHours: 0,
    faction: {
      autobot: 0,
      decepticon: 0,
      independent: 0
    },
    personality: {
      mercy: 0,
      aggression: 0,
      honesty: 0,
      ambition: 0,
      curiosity: 0,
      obedience: 0,
      leadership: 0
    },
    flags: {},
    relationships: { friendOne: 5, friendTwo: 5 },
    inventory: [],
    history: []
  });

export const meetsRequirement = (
  state: GameState,
  requirement: Requirement
): boolean => {
  switch (requirement.type) {
    case "origin":
      return state.character.origin === requirement.value;
    case "sex":
      return state.character.sex === requirement.value;
    case "flag":
      return state.flags[requirement.key] === requirement.equals;
    case "flag_not":
      return state.flags[requirement.key] !== requirement.equals;
    case "inventory":
      return state.inventory.includes(requirement.item);
    case "stat": {
      if (requirement.group === "faction") {
        return (state.faction[requirement.key as keyof typeof state.faction] ?? 0) >= requirement.min;
      }
      if (requirement.group === "personality") {
        return (
          state.personality[
            requirement.key as keyof typeof state.personality
          ] ?? 0
        ) >= requirement.min;
      }
      return (state.relationships[requirement.key] ?? 0) >= requirement.min;
    }
    default:
      return false;
  }
};

export const isChoiceAvailable = (
  state: GameState,
  choice: StoryChoice
): boolean =>
  (choice.requirements ?? []).every((requirement) =>
    meetsRequirement(state, requirement)
  );

const applyEffect = (state: GameState, effect: Effect): GameState => {
  if (effect.type === "flag") {
    return {
      ...state,
      flags: { ...state.flags, [effect.key]: effect.value }
    };
  }

  if (effect.type === "inventory_add") {
    if (state.inventory.includes(effect.item)) return state;
    return { ...state, inventory: [...state.inventory, effect.item] };
  }

  if (effect.type === "inventory_remove") {
    return {
      ...state,
      inventory: state.inventory.filter((item) => item !== effect.item)
    };
  }

  if (effect.type === "stat") {
    if (effect.group === "faction") {
      const key = effect.key as keyof GameState["faction"];
      return {
        ...state,
        faction: {
          ...state.faction,
          [key]: (state.faction[key] ?? 0) + effect.amount
        }
      };
    }

    if (effect.group === "personality") {
      const key = effect.key as keyof GameState["personality"];
      return {
        ...state,
        personality: {
          ...state.personality,
          [key]: (state.personality[key] ?? 0) + effect.amount
        }
      };
    }

    return {
      ...state,
      relationships: {
        ...state.relationships,
        [effect.key]: (state.relationships[effect.key] ?? 0) + effect.amount
      }
    };
  }

  return state;
};

export const choose = (state: GameState, choice: StoryChoice): GameState => {
  if (!isChoiceAvailable(state, choice)) {
    throw new Error("This choice is not available.");
  }

  const withChoiceEffects = (choice.effects ?? []).reduce(applyEffect, state);
  const conditionalRedirect = choice.conditionalRedirects?.find((redirect) =>
    redirect.requirements.every((requirement) =>
      meetsRequirement(withChoiceEffects, requirement)
    )
  );
  const withConditionalEffects = conditionalRedirect
    ? (conditionalRedirect.effects ?? []).reduce(applyEffect, withChoiceEffects)
    : withChoiceEffects;
  const probability = choice.chanceRedirect?.probability ?? 0;
  const chanceRedirected =
    choice.chanceRedirect !== undefined &&
    probability > 0 &&
    Math.random() < Math.min(1, probability);
  const withChanceEffects = chanceRedirected
    ? (choice.chanceRedirect?.effects ?? []).reduce(applyEffect, withConditionalEffects)
    : withConditionalEffects;
  const nextSceneId = chanceRedirected
    ? choice.chanceRedirect!.nextSceneId
    : conditionalRedirect?.nextSceneId ?? choice.nextSceneId;
  const hoursPassed = choice.timeCostHours ?? 1;
  const redirectMarker = chanceRedirected
    ? ":chance"
    : conditionalRedirect
      ? ":conditional"
      : "";

  return {
    ...withChanceEffects,
    currentSceneId: nextSceneId,
    elapsedHours: (withChanceEffects.elapsedHours ?? 0) + hoursPassed,
    history: [
      ...withChanceEffects.history,
      `${state.currentSceneId}:${choice.id}${redirectMarker}`
    ]
  };
};