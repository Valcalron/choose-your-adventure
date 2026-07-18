import type { HumanLocation } from "../types/game";

export const AMERICAN_NORTHWEST_LOCATION: HumanLocation = {
  state: "American Northwest"
};

export const getLocationLabel = (_location?: HumanLocation): string =>
  "American Northwest";

export const getOutageEffect = (_location?: HumanLocation): string =>
  "Before you reach the doors, the lights flicker hard enough to make everyone look up. Several televisions restart in static, and an emergency bulletin warns that damage at the attacked power-relay station is destabilizing parts of the regional grid across the American Northwest.";
