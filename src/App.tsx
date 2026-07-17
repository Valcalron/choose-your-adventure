import { useState } from "react";
import CharacterCreation from "./components/CharacterCreation";
import StoryScreen from "./components/StoryScreen";
import { createInitialState } from "./engine/gameEngine";
import { clearLocalSave, loadLocalSave } from "./services/saveService";
import type { GameState, PlayerCharacter } from "./types/game";

export default function App() {
  const [gameState, setGameState] = useState<GameState | null>(() => loadLocalSave());

  const startGame = (character: PlayerCharacter) => {
    setGameState(createInitialState(character));
  };

  const restart = () => {
    clearLocalSave();
    setGameState(null);
  };

  if (!gameState) {
    return <CharacterCreation onComplete={startGame} />;
  }

  return <StoryScreen initialState={gameState} onRestart={restart} />;
}
