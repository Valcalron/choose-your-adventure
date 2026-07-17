import { useState } from "react";
import { CALIFORNIA_REGIONS, US_STATES_AND_DC } from "../data/humanLocation";
import type { CaliforniaRegion, HumanLocation } from "../types/game";

type Props = {
  characterName: string;
  onComplete: (location: HumanLocation) => void;
};

export default function HumanLocationStep({ characterName, onComplete }: Props) {
  const [state, setState] = useState("");
  const [californiaRegion, setCaliforniaRegion] = useState<CaliforniaRegion | "">("");

  const canContinue = state.length > 0 && (state !== "California" || californiaRegion.length > 0);

  const continueToStory = () => {
    if (!canContinue) return;

    onComplete({
      state,
      ...(state === "California" && californiaRegion ? { californiaRegion } : {})
    });
  };

  return (
    <main className="screen character-creation">
      <section className="panel">
        <div className="step-marker">Human Starting Location</div>
        <h1>Where Does {characterName} Live?</h1>
        <p className="lead">
          The first Decepticon attack strikes the power grid near the Ark in Oregon. Your location
          determines how quickly the effects reach you.
        </p>

        <label>
          State
          <select
            value={state}
            onChange={(event) => {
              const nextState = event.target.value;
              setState(nextState);
              if (nextState !== "California") setCaliforniaRegion("");
            }}
          >
            <option value="">Choose a state</option>
            {US_STATES_AND_DC.map((stateName) => (
              <option key={stateName} value={stateName}>
                {stateName}
              </option>
            ))}
          </select>
        </label>

        {state === "California" && (
          <label>
            California region
            <select
              value={californiaRegion}
              onChange={(event) => setCaliforniaRegion(event.target.value as CaliforniaRegion)}
            >
              <option value="">Choose a region</option>
              {CALIFORNIA_REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className="button-row">
          <button
            type="button"
            className="primary-button"
            disabled={!canContinue}
            onClick={continueToStory}
          >
            Begin Story
          </button>
        </div>
      </section>
    </main>
  );
}
