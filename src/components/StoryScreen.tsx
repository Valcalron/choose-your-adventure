import { useMemo, useState } from "react";
import { STORY } from "../data/story";
import { choose, isChoiceAvailable } from "../engine/gameEngine";
import { saveGame } from "../services/saveService";
import type { GameState } from "../types/game";

type Props = {
  initialState: GameState;
  onRestart: () => void;
};

export default function StoryScreen({ initialState, onRestart }: Props) {
  const [state, setState] = useState(initialState);
  const [saveMessage, setSaveMessage] = useState("");

  const scene = STORY[state.currentSceneId];

  const appearanceSummary = useMemo(() => {
    if (state.character.origin === "human" && state.character.humanAppearance) {
      const a = state.character.humanAppearance;
      return `${a.height}, ${a.build}, ${a.hairColor} ${a.hairStyle} hair, ${a.eyeColor} eyes`;
    }

    if (state.character.cybertronianAppearance) {
      const a = state.character.cybertronianAppearance;
      return `${a.frameHeight} ${a.frameBuild} frame, ${a.primaryColor} and ${a.secondaryColor}, ${a.opticColor} optics`;
    }

    return "";
  }, [state.character]);

  const handleChoice = (choiceId: string) => {
    const selected = scene.choices.find((choice) => choice.id === choiceId);
    if (!selected) return;

    const next = choose(state, selected);
    setState(next);
    setSaveMessage("");
  };

  const handleSave = async () => {
    try {
      await saveGame(state);
      setSaveMessage("Game saved.");
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : "Could not save.");
    }
  };

  if (!scene) {
    return (
      <main className="screen">
        <section className="panel">
          <h1>Missing Scene</h1>
          <p>The scene ID “{state.currentSceneId}” does not exist.</p>
          <button className="primary-button" onClick={onRestart}>Restart</button>
        </section>
      </main>
    );
  }

  return (
    <main className="screen story-screen">
      <section className="story-shell">
        <header className="story-header">
          <div>
            <div className="chapter-label">Chapter {scene.chapter}</div>
            <h1>{scene.title}</h1>
          </div>
          <button className="secondary-button compact" onClick={handleSave}>Save</button>
        </header>

        <div className="character-strip">
          <strong>{state.character.name}</strong>
          <span>{appearanceSummary}</span>
          {state.character.altMode && <span>Alt mode: {state.character.altMode.specificForm}</span>}
        </div>

        <article className="story-text">
          {scene.speaker && <div className="speaker">{scene.speaker}</div>}
          <p>{scene.body}</p>
        </article>

        {!scene.isEnding && (
          <div className="story-choices">
            {scene.choices.map((choice) => {
              const available = isChoiceAvailable(state, choice);
              return (
                <button
                  key={choice.id}
                  className="story-choice"
                  disabled={!available}
                  onClick={() => handleChoice(choice.id)}
                >
                  {choice.label}
                </button>
              );
            })}
          </div>
        )}

        {scene.isEnding && (
          <div className="ending-actions">
            <h2>Current Standing</h2>
            <div className="stat-grid">
              <span>Autobot: {state.faction.autobot}</span>
              <span>Decepticon: {state.faction.decepticon}</span>
              <span>Independent: {state.faction.independent}</span>
            </div>
            <button className="primary-button" onClick={onRestart}>Create Another Character</button>
          </div>
        )}

        {saveMessage && <div className="save-message">{saveMessage}</div>}
      </section>
    </main>
  );
}
