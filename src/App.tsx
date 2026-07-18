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
  const [savedGame, setSavedGame] = useState<GameState | null>(loadNormalizedSave);
  const [gameState, setGameState] = useState<GameState | null>(null);

  const continueSavedGame = () => {
    if (!savedGame) return;

    setGameState(savedGame);
    setHasEntered(true);
  };

  const beginNewGame = () => {
    setGameState(null);
    setHasEntered(true);
  };

  const startGame = (character: PlayerCharacter) => {
    setGameState(createInitialState(withNorthwestHome(character)));
  };

  const restart = () => {
    clearLocalSave();
    setSavedGame(null);
    setGameState(null);
    setHasEntered(false);
  };

  if (!hasEntered) {
    return (
      <IntroPage
        hasSavedGame={savedGame !== null}
        onContinueSavedGame={continueSavedGame}
        onStartNewGame={beginNewGame}
      />
    );
  }

  if (!gameState) {
    return <CharacterCreationWithFriends onComplete={startGame} />;
  }

  return <StoryScreen initialState={gameState} onRestart={restart} />;
}
