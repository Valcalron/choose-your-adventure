import type {
  Effect,
  GameState,
  PlayerCharacter,
  Requirement,
  StoryChoice
} from "../types/game";

export const createInitialState = (character: PlayerCharacter): GameState => ({
  currentSceneId: character.origin === "human" ? "HUMAN_START" : "CYBER_START",
  character,
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

  const withEffects = (choice.effects ?? []).reduce(applyEffect, state);

  return {
    ...withEffects,
    currentSceneId: choice.nextSceneId,
    history: [...withEffects.history, `${state.currentSceneId}:${choice.id}`]
  };
};