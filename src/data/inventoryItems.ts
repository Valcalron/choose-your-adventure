import type { GameState } from "../types/game";

export type InventoryAction = {
  id: string;
  label: string;
  resultText: string;
  confirmText?: string;
};

export type InventoryItemView = {
  name: string;
  description: string;
  status: string;
  actions: InventoryAction[];
};

const relayReviewScenes = new Set([
  "HUMAN_RELAY_RETURN_HOME",
  "HUMAN_RELAY_REVIEW_EVIDENCE",
  "HUMAN_RELAY_RESEARCH_AUTOBOTS"
]);

const relayDeviceActivationScenes = new Set([
  "HUMAN_RELAY_RETURN_HOME",
  "HUMAN_RELAY_REVIEW_EVIDENCE"
]);

export const getInventoryItemView = (
  item: string,
  state: GameState,
  currentSceneId: string
): InventoryItemView => {
  switch (item) {
    case "Backpack":
      return {
        name: item,
        description:
          "A normal backpack chosen before the trio left for the relay station. It protects notes and small recovered objects and can hold the contracted relay unit.",
        status: "Equipped. Its carrying benefit is automatic.",
        actions: []
      };

    case "Relay device photographs and sketches":
      return {
        name: item,
        description:
          "Photographs, measurements, and sketches showing the Decepticon relay device, its markings, and how it connected to the human power equipment.",
        status: "Evidence retained by the trio.",
        actions: relayReviewScenes.has(currentSceneId)
          ? [
              {
                id: "review-relay-evidence",
                label: "Review evidence",
                resultText:
                  "The images preserve the device's shape, connection points, separate communication section, and the damage surrounding it. They prove the Decepticons left working technology attached to the station."
              }
            ]
          : []
      };

    case "Discarded Cybertronian component":
      return {
        name: item,
        description:
          "A small piece of dark Cybertronian metal recovered near a collapsed support at the relay site. It appears to have broken from a larger assembly.",
        status: state.inventory.includes("Backpack")
          ? "Wrapped and stored in the backpack."
          : "Wrapped and carried in a pocket.",
        actions: relayReviewScenes.has(currentSceneId)
          ? [
              {
                id: "examine-cybertronian-component",
                label: "Examine",
                resultText:
                  "The fragment is too damaged to identify precisely, but its edges and mounting points confirm that it belonged to Cybertronian machinery rather than the human relay station."
              }
            ]
          : []
      };

    case "Recovered Decepticon relay device": {
      const actions: InventoryAction[] = [
        {
          id: "examine-recovered-relay-device",
          label: "Examine",
          resultText:
            "The casing remains contracted around the damaged components. A slow purple pulse confirms that the unit still has power and remains capable of communication."
        }
      ];

      if (
        state.flags.soundwave_authorized_relay_device === true &&
        relayDeviceActivationScenes.has(currentSceneId)
      ) {
        actions.push({
          id: "activate-recovered-relay-device",
          label: "Activate device",
          confirmText:
            "Activating the Decepticon relay device may transmit information or reveal its location. Activate it anyway?",
          resultText:
            "The purple pulse brightens and a narrow tone confirms that the relay unit is ready to transmit. You close the control before opening a live channel."
        });
      }

      return {
        name: item,
        description:
          "A Decepticon monitoring, measurement, and communication unit removed from the damaged relay station. Soundwave may still be able to reach it.",
        status: state.flags.soundwave_authorized_relay_device === true
          ? "Active. Soundwave authorized the trio to retain it."
          : "Active. Possession was not authorized.",
        actions
      };
    }

    default:
      return {
        name: item,
        description: "An item carried by the player.",
        status: "Stored in inventory.",
        actions: []
      };
  }
};
