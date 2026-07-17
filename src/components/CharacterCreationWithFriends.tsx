import { useMemo, useState, type FormEvent } from "react";
import type {
  CharacterSex,
  CybertronianAppearance,
  HumanAppearance,
  Origin,
  PlayerCharacter
} from "../types/game";

type Props = {
  onComplete: (character: PlayerCharacter) => void;
};

const defaultHumanAppearance: HumanAppearance = {
  hairStyle: "Short",
  hairColor: "Brown",
  eyeColor: "Brown",
  height: "Average",
  build: "Average",
  skinTone: "Medium"
};

const defaultCyberAppearance: CybertronianAppearance = {
  frameHeight: "Average",
  frameBuild: "Balanced",
  primaryColor: "Silver",
  secondaryColor: "Dark blue",
  accentColor: "Gray",
  opticColor: "Blue",
  faceStyle: "Visible mouth",
  helmetShape: "Angular",
  crestStyle: "Central crest",
  shoulderStyle: "Squared",
  chestStyle: "Vehicle-window chest",
  insigniaPlacement: "Chest"
};

const altModeOptions: Record<string, string[]> = {
  Car: ["Compact car", "Sports car", "Sedan", "Cybertronian road vehicle"],
  Truck: ["Pickup", "Transport truck", "Armored truck", "Cybertronian hauler"],
  Motorcycle: ["Street motorcycle", "Off-road motorcycle", "Cybertronian cycle"],
  Construction: ["Excavator", "Crane", "Bulldozer", "Dump truck", "Loader"],
  Emergency: ["Ambulance", "Fire engine", "Rescue vehicle", "Police vehicle"],
  Armored: ["Tank", "Artillery vehicle", "Armored personnel carrier"],
  Jet: ["Fighter jet", "Interceptor", "Bomber", "Cargo aircraft", "VTOL"],
  Helicopter: ["Scout helicopter", "Transport helicopter", "Attack helicopter"],
  Spacecraft: ["Shuttle", "Scout craft", "Transport", "Cybertronian starfighter"],
  Communications: ["Communications vehicle", "Broadcast equipment", "Data station"],
  Scientific: ["Mobile laboratory", "Sensor platform", "Research vehicle"]
};

const humanBackgrounds = [
  "Mechanic",
  "Student",
  "Medic",
  "Engineer",
  "Journalist",
  "Soldier",
  "Office worker",
  "Driver",
  "Unemployed",
  "Other"
];

const cyberFunctions = [
  "Builder",
  "Miner",
  "Medic",
  "Archivist",
  "Communications technician",
  "Transport worker",
  "Scientist",
  "Security officer",
  "Factory worker",
  "Entertainer",
  "Arena worker",
  "Unassigned"
];

export default function CharacterCreationWithFriends({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [origin, setOrigin] = useState<Origin>("human");
  const [sex, setSex] = useState<CharacterSex>("female");
  const [name, setName] = useState("");
  const [friendOneName, setFriendOneName] = useState("");
  const [friendTwoName, setFriendTwoName] = useState("");
  const [humanAppearance, setHumanAppearance] = useState(defaultHumanAppearance);
  const [cyberAppearance, setCyberAppearance] = useState(defaultCyberAppearance);
  const [backgroundOrFunction, setBackgroundOrFunction] = useState("Mechanic");
  const [altCategory, setAltCategory] = useState("Car");
  const [specificForm, setSpecificForm] = useState("Compact car");

  const sexOptions = origin === "human" ? ["male", "female"] : ["mech", "femme"];

  const pronouns = useMemo(() => {
    const masculine = sex === "male" || sex === "mech";
    return masculine
      ? { subject: "he", object: "him", possessive: "his" }
      : { subject: "she", object: "her", possessive: "her" };
  }, [sex]);

  const changeOrigin = (value: Origin) => {
    setOrigin(value);
    if (value === "human") {
      setSex("female");
      setBackgroundOrFunction("Mechanic");
    } else {
      setSex("femme");
      setBackgroundOrFunction("Builder");
    }
  };

  const canContinue =
    step === 2
      ? name.trim().length > 0
      : step === 3
        ? friendOneName.trim().length > 0 && friendTwoName.trim().length > 0
        : true;

  const submit = (event: FormEvent) => {
    event.preventDefault();

    const character: PlayerCharacter = {
      name: name.trim(),
      origin,
      sex,
      pronouns,
      startingEra: origin === "human" ? "earth_1984" : "early_war",
      friends: [
        { id: "friendOne", name: friendOneName.trim() },
        { id: "friendTwo", name: friendTwoName.trim() }
      ],
      backgroundOrFunction,
      ...(origin === "human"
        ? { humanAppearance }
        : {
            cybertronianAppearance: cyberAppearance,
            altMode: {
              category: altCategory,
              specificForm,
              mobilityTags:
                altCategory === "Jet" || altCategory === "Helicopter" || altCategory === "Spacecraft"
                  ? ["flight"]
                  : ["ground"]
            }
          })
    };

    onComplete(character);
  };

  return (
    <main className="screen character-creation">
      <section className="panel">
        <div className="step-marker">Character Creation · Step {step} of 5</div>

        <form onSubmit={submit}>
          {step === 1 && (
            <>
              <h1>Choose Your Origin</h1>
              <p className="lead">Your origin determines when your story begins.</p>

              <div className="choice-grid two">
                <button
                  type="button"
                  className={origin === "human" ? "selection-card selected" : "selection-card"}
                  onClick={() => changeOrigin("human")}
                >
                  <strong>Human</strong>
                  <span>Earth, 1984</span>
                </button>
                <button
                  type="button"
                  className={origin === "cybertronian" ? "selection-card selected" : "selection-card"}
                  onClick={() => changeOrigin("cybertronian")}
                >
                  <strong>Cybertronian</strong>
                  <span>Shortly after the war begins</span>
                </button>
              </div>

              <label>
                {origin === "human" ? "Sex" : "Frame designation"}
                <select value={sex} onChange={(event) => setSex(event.target.value as CharacterSex)}>
                  {sexOptions.map((option) => (
                    <option key={option} value={option}>
                      {option[0].toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          {step === 2 && (
            <>
              <h1>Name and Appearance</h1>

              <label>
                Name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={origin === "human" ? "Character name" : "Cybertronian designation"}
                />
              </label>

              {origin === "human" ? (
                <div className="form-grid">
                  <label>
                    Hair style
                    <input
                      value={humanAppearance.hairStyle}
                      onChange={(event) =>
                        setHumanAppearance({ ...humanAppearance, hairStyle: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Hair color
                    <input
                      value={humanAppearance.hairColor}
                      onChange={(event) =>
                        setHumanAppearance({ ...humanAppearance, hairColor: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Eye color
                    <input
                      value={humanAppearance.eyeColor}
                      onChange={(event) =>
                        setHumanAppearance({ ...humanAppearance, eyeColor: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Height
                    <select
                      value={humanAppearance.height}
                      onChange={(event) =>
                        setHumanAppearance({ ...humanAppearance, height: event.target.value })
                      }
                    >
                      <option>Short</option>
                      <option>Average</option>
                      <option>Tall</option>
                      <option>Very tall</option>
                    </select>
                  </label>
                  <label>
                    Build
                    <select
                      value={humanAppearance.build}
                      onChange={(event) =>
                        setHumanAppearance({ ...humanAppearance, build: event.target.value })
                      }
                    >
                      <option>Slender</option>
                      <option>Average</option>
                      <option>Athletic</option>
                      <option>Broad</option>
                    </select>
                  </label>
                  <label>
                    Skin tone
                    <input
                      value={humanAppearance.skinTone}
                      onChange={(event) =>
                        setHumanAppearance({ ...humanAppearance, skinTone: event.target.value })
                      }
                    />
                  </label>
                </div>
              ) : (
                <div className="form-grid">
                  <label>
                    Frame height
                    <select
                      value={cyberAppearance.frameHeight}
                      onChange={(event) =>
                        setCyberAppearance({ ...cyberAppearance, frameHeight: event.target.value })
                      }
                    >
                      <option>Compact</option>
                      <option>Average</option>
                      <option>Tall</option>
                      <option>Very tall</option>
                    </select>
                  </label>
                  <label>
                    Frame build
                    <select
                      value={cyberAppearance.frameBuild}
                      onChange={(event) =>
                        setCyberAppearance({ ...cyberAppearance, frameBuild: event.target.value })
                      }
                    >
                      <option>Light</option>
                      <option>Balanced</option>
                      <option>Heavy</option>
                      <option>Armored</option>
                    </select>
                  </label>
                  <label>
                    Primary color
                    <input
                      value={cyberAppearance.primaryColor}
                      onChange={(event) =>
                        setCyberAppearance({ ...cyberAppearance, primaryColor: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Secondary color
                    <input
                      value={cyberAppearance.secondaryColor}
                      onChange={(event) =>
                        setCyberAppearance({ ...cyberAppearance, secondaryColor: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Accent color
                    <input
                      value={cyberAppearance.accentColor}
                      onChange={(event) =>
                        setCyberAppearance({ ...cyberAppearance, accentColor: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Optic color
                    <select
                      value={cyberAppearance.opticColor}
                      onChange={(event) =>
                        setCyberAppearance({ ...cyberAppearance, opticColor: event.target.value })
                      }
                    >
                      <option>Blue</option>
                      <option>Red</option>
                      <option>Yellow</option>
                      <option>Violet</option>
                    </select>
                  </label>
                  <label>
                    Face
                    <select
                      value={cyberAppearance.faceStyle}
                      onChange={(event) =>
                        setCyberAppearance({ ...cyberAppearance, faceStyle: event.target.value })
                      }
                    >
                      <option>Visible mouth</option>
                      <option>Faceplate</option>
                    </select>
                  </label>
                  <label>
                    Helmet shape
                    <input
                      value={cyberAppearance.helmetShape}
                      onChange={(event) =>
                        setCyberAppearance({ ...cyberAppearance, helmetShape: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Crest or antenna design
                    <input
                      value={cyberAppearance.crestStyle}
                      onChange={(event) =>
                        setCyberAppearance({ ...cyberAppearance, crestStyle: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Shoulder shape
                    <input
                      value={cyberAppearance.shoulderStyle}
                      onChange={(event) =>
                        setCyberAppearance({ ...cyberAppearance, shoulderStyle: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Chest design
                    <input
                      value={cyberAppearance.chestStyle}
                      onChange={(event) =>
                        setCyberAppearance({ ...cyberAppearance, chestStyle: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Future insignia placement
                    <input
                      value={cyberAppearance.insigniaPlacement}
                      onChange={(event) =>
                        setCyberAppearance({ ...cyberAppearance, insigniaPlacement: event.target.value })
                      }
                    />
                  </label>
                </div>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <h1>Name Your Friends</h1>
              <p className="lead">
                These two friends begin the story beside you. Their trust and reactions will be tracked separately.
              </p>

              <div className="form-grid">
                <label>
                  {origin === "human" ? "First friend's name" : "First friend's designation"}
                  <input
                    value={friendOneName}
                    onChange={(event) => setFriendOneName(event.target.value)}
                    placeholder={origin === "human" ? "Friend's name" : "Cybertronian designation"}
                  />
                </label>
                <label>
                  {origin === "human" ? "Second friend's name" : "Second friend's designation"}
                  <input
                    value={friendTwoName}
                    onChange={(event) => setFriendTwoName(event.target.value)}
                    placeholder={origin === "human" ? "Friend's name" : "Cybertronian designation"}
                  />
                </label>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h1>{origin === "human" ? "Background" : "Function and Alternate Mode"}</h1>

              <label>
                {origin === "human" ? "Human background" : "Original function"}
                <select
                  value={backgroundOrFunction}
                  onChange={(event) => setBackgroundOrFunction(event.target.value)}
                >
                  {(origin === "human" ? humanBackgrounds : cyberFunctions).map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </label>

              {origin === "cybertronian" && (
                <div className="form-grid">
                  <label>
                    Alternate-mode category
                    <select
                      value={altCategory}
                      onChange={(event) => {
                        const category = event.target.value;
                        setAltCategory(category);
                        setSpecificForm(altModeOptions[category][0]);
                      }}
                    >
                      {Object.keys(altModeOptions).map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Specific alternate mode
                    <select value={specificForm} onChange={(event) => setSpecificForm(event.target.value)}>
                      {altModeOptions[altCategory].map((form) => (
                        <option key={form}>{form}</option>
                      ))}
                    </select>
                  </label>
                </div>
              )}
            </>
          )}

          {step === 5 && (
            <>
              <h1>Review Character</h1>
              <div className="review-card">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Origin:</strong> {origin}</p>
                <p><strong>Sex/designation:</strong> {sex}</p>
                <p><strong>Pronouns:</strong> {pronouns.subject}/{pronouns.object}</p>
                <p><strong>Friends:</strong> {friendOneName} and {friendTwoName}</p>
                <p>
                  <strong>{origin === "human" ? "Background" : "Function"}:</strong>{" "}
                  {backgroundOrFunction}
                </p>
                {origin === "cybertronian" && (
                  <p><strong>Alternate mode:</strong> {specificForm}</p>
                )}
              </div>
            </>
          )}

          <div className="button-row">
            {step > 1 && (
              <button type="button" className="secondary-button" onClick={() => setStep(step - 1)}>
                Back
              </button>
            )}
            {step < 5 ? (
              <button
                type="button"
                className="primary-button"
                disabled={!canContinue}
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="primary-button">
                Begin Story
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}