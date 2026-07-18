import { useState } from "react";
import CharacterCreationWithFriends from "./components/CharacterCreationWithFriends";
import IntroPage from "./components/IntroPage";
import StoryScreen from "./components/StoryScreen";
import { AMERICAN_NORTHWEST_LOCATION } from "./data/humanLocation";
import { createInitialState } from "./engine/gameEngine";
import { clearLocalSave, loadLocalSave } from "./services/saveService";
import type { GameState, PlayerCharacter } from "./types/game";

const withNorthwestHome = (character: PlayerCharacter): PlayerCharacter =>
  character.origin === "human"
    ? { ...character, humanLocation: AMERICAN_NORTHWEST_LOCATION }
    : character;

const loadNormalizedSave = (): GameState | null => {
  const saved = loadLocalSave();
  if (!saved) return null;

  return {
    ...saved,
    character: withNorthwestHome(saved.character)
  };
};

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(loadNormalizedSave);

  const startGame = (character: PlayerCharacter) => {
    setGameState(createInitialState(withNorthwestHome(character)));
  };

  const restart = () => {
    clearLocalSave();
    setGameState(null);
    setHasEntered(false);
  };

  if (!hasEntered) {
    return <IntroPage onContinue={() => setHasEntered(true)} />;
  }

  if (!gameState) {
    return <CharacterCreationWithFriends onComplete={startGame} />;
  }

  return <StoryScreen initialState={gameState} onRestart={restart} />;
}
