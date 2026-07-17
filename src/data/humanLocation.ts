import type { CaliforniaRegion, HumanLocation } from "../types/game";

export const US_STATES_AND_DC = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "Washington, D.C."
] as const;

export const CALIFORNIA_REGIONS: CaliforniaRegion[] = [
  "Northern California",
  "Central California",
  "Southern California"
];

export const getLocationLabel = (location?: HumanLocation): string => {
  if (!location) return "Location not selected";
  return location.californiaRegion ?? location.state;
};

export const getOutageEffect = (location?: HumanLocation): string => {
  if (!location) {
    return "The power remains on for the moment, but the store has become louder and less orderly with every new report.";
  }

  if (location.state === "Oregon") {
    return "Before you reach the doors, every light in the store dies. The televisions vanish at once, the automatic doors stop halfway open, and the parking lot beyond them falls dark beneath a grid failure spreading outward from the attacked relay center.";
  }

  if (location.state === "Washington") {
    return "The lights stutter hard enough to make everyone look up. Several televisions shut off, the others restart in static, and signs across the parking lot go dark as sections of the regional grid begin failing.";
  }

  if (location.state === "Idaho") {
    return "The lights flicker, recover, and flicker again. An emergency alert warns of unstable power moving east from the attacked relay center while phone lines begin overloading.";
  }

  if (location.state === "California" && location.californiaRegion === "Northern California") {
    return "The store loses power for several long seconds. When the lights return, only half the televisions come back with them, and the news crawl warns that Northern California may face rolling outages as the damaged grid struggles to rebalance.";
  }

  if (location.state === "California" && location.californiaRegion === "Central California") {
    return "The lights hold steady, but a warning crawl reports instability farther north. Phone calls begin failing as people across the state try to reach family at the same time.";
  }

  if (location.state === "California" && location.californiaRegion === "Southern California") {
    return "The power remains steady this far south, though every channel carries warnings about grid trouble in Oregon and Northern California. The danger still feels distant—until you look at the cars outside.";
  }

  if (location.state === "Nevada") {
    return "The lights dim and pulse once before recovering. A radio near the counter reports intermittent disruptions across Nevada as the western grid reacts to the attack.";
  }

  return "The power remains on where you are. The first failures appear confined to Oregon and the surrounding western grid, but telephone lines are already clogging as people try to call home.";
};
