import { useState } from "react";
import CharacterCreationWithFriends from "./components/CharacterCreationWithFriends";
import IntroPage from "./components/IntroPage";
import StoryScreen from "./components/StoryScreen";
import { createInitialState } from "./engine/gameEngine";
import { clearLocalSave, loadLocalSave } from "./services/saveService";
import type { GameState, PlayerCharacter } from "./types/game";

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(() => loadLocalSave());

  const startGame = (character: PlayerCharacter) => {
    setGameState(createInitialState(character));
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
