export type Origin = "human" | "cybertronian";
export type HumanSex = "male" | "female";
export type CybertronianSex = "mech" | "femme";
export type CharacterSex = HumanSex | CybertronianSex;

export type FactionStanding = {
  autobot: number;
  decepticon: number;
  independent: number;
};

export type PersonalityStats = {
  mercy: number;
  aggression: number;
  honesty: number;
  ambition: number;
  curiosity: number;
  obedience: number;
  leadership: number;
};

export type HumanAppearance = {
  hairStyle: string;
  hairColor: string;
  eyeColor: string;
  height: string;
  build: string;
  skinTone: string;
};

export type CybertronianAppearance = {
  frameHeight: string;
  frameBuild: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  opticColor: string;
  faceStyle: string;
  helmetShape: string;
  crestStyle: string;
  shoulderStyle: string;
  chestStyle: string;
  insigniaPlacement: string;
};

export type AltMode = {
  category: string;
  specificForm: string;
  mobilityTags: string[];
};

export type CompanionId = "friendOne" | "friendTwo";

export type CompanionProfile = {
  id: CompanionId;
  name: string;
};

export type PlayerCharacter = {
  id?: string;
  name: string;
  origin: Origin;
  sex: CharacterSex;
  pronouns: {
    subject: string;
    object: string;
    possessive: string;
  };
  startingEra: "earth_1984" | "early_war";
  friends: [CompanionProfile, CompanionProfile];
  humanAppearance?: HumanAppearance;
  cybertronianAppearance?: CybertronianAppearance;
  altMode?: AltMode;
  backgroundOrFunction: string;
};

export type GameState = {
  currentSceneId: string;
  character: PlayerCharacter;
  faction: FactionStanding;
  personality: PersonalityStats;
  flags: Record<string, boolean | string | number>;
  relationships: Record<string, number>;
  inventory: string[];
  history: string[];
};

export type Requirement =
  | { type: "origin"; value: Origin }
  | { type: "sex"; value: CharacterSex }
  | { type: "flag"; key: string; equals: boolean | string | number }
  | { type: "stat"; group: "faction" | "personality" | "relationship"; key: string; min: number }
  | { type: "inventory"; item: string };

export type Effect =
  | { type: "flag"; key: string; value: boolean | string | number }
  | { type: "stat"; group: "faction" | "personality" | "relationship"; key: string; amount: number }
  | { type: "inventory_add"; item: string }
  | { type: "inventory_remove"; item: string };

export type StoryChoice = {
  id: string;
  label: string;
  nextSceneId: string;
  requirements?: Requirement[];
  effects?: Effect[];
};

export type StoryScene = {
  id: string;
  origin: Origin | "shared";
  chapter: number;
  title: string;
  speaker?: string;
  body: string;
  choices: StoryChoice[];
  isEnding?: boolean;
};