import { useMemo, useState } from "react";
import { getLocationLabel, getOutageEffect } from "../data/humanLocation";
import { STORY } from "../data/storySideswipe";
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
  const friendOneName = state.character.friends?.[0]?.name ?? "Friend One";
  const friendTwoName = state.character.friends?.[1]?.name ?? "Friend Two";
  const elapsedHours = state.elapsedHours ?? 0;
  const currentDay = Math.floor(elapsedHours / 24) + 1;
  const hourOfDay = elapsedHours % 24;

  const renderText = (text: string) =>
    text
      .replaceAll("{{player}}", state.character.name)
      .replaceAll("{{friendOne}}", friendOneName)
      .replaceAll("{{friendTwo}}", friendTwoName)
      .replaceAll("{{outageEffect}}", getOutageEffect(state.character.humanLocation));

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

  const bodyParagraphs = renderText(scene.body).split(/\n\s*\n/);

  return (
    <main className="screen story-screen">
      <section className="story-shell">
        <header className="story-header">
          <div>
            <div className="chapter-label">
              Chapter {scene.chapter} · Day {currentDay} · Hour {hourOfDay}
            </div>
            <h1>{renderText(scene.title)}</h1>
          </div>
          <button className="secondary-button compact" onClick={handleSave}>Save</button>
        </header>

        <div className="character-strip">
          <strong>{state.character.name}</strong>
          <span>{appearanceSummary}</span>
          {state.character.origin === "human" && (
            <span>Home: {getLocationLabel(state.character.humanLocation)}</span>
          )}
          <span>Friends: {friendOneName} and {friendTwoName}</span>
          {state.character.altMode && <span>Alt mode: {state.character.altMode.specificForm}</span>}
        </div>

        <article className="story-text">
          {scene.speaker && <div className="speaker">{renderText(scene.speaker)}</div>}
          {bodyParagraphs.map((paragraph, index) => (
            <p key={`${scene.id}-paragraph-${index}`}>{paragraph}</p>
          ))}
        </article>

        {!scene.isEnding && scene.choices.length > 0 && (
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
                  {renderText(choice.label)}
                </button>
              );
            })}
          </div>
        )}

        {!scene.isEnding && scene.choices.length === 0 && (
          <div className="save-message">This route is ready for its next story scene.</div>
        )}

        {scene.isEnding && (
          <div className="ending-actions">
            <h2>Current Standing</h2>
            <div className="stat-grid">
              <span>Autobot: {state.faction.autobot}</span>
              <span>Decepticon: {state.faction.decepticon}</span>
              <span>Independent: {state.faction.independent}</span>
              <span>{friendOneName}: {state.relationships.friendOne ?? 0}</span>
              <span>{friendTwoName}: {state.relationships.friendTwo ?? 0}</span>
            </div>
            <button className="primary-button" onClick={onRestart}>Create Another Character</button>
          </div>
        )}

        {saveMessage && <div className="save-message">{saveMessage}</div>}
      </section>
    </main>
  );
}
