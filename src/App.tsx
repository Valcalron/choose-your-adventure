import { useState } from "react";
import CharacterCreationWithFriends from "./components/CharacterCreationWithFriends";
import HumanLocationStep from "./components/HumanLocationStep";
import IntroPage from "./components/IntroPage";
import StoryScreen from "./components/StoryScreen";
import { createInitialState } from "./engine/gameEngine";
import { clearLocalSave, loadLocalSave, saveLocally } from "./services/saveService";
import type { GameState, HumanLocation, PlayerCharacter } from "./types/game";

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [pendingCharacter, setPendingCharacter] = useState<PlayerCharacter | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(() => loadLocalSave());

  const startGame = (character: PlayerCharacter) => {
    if (character.origin === "human" && !character.humanLocation) {
      setPendingCharacter(character);
      return;
    }

    setGameState(createInitialState(character));
  };

  const finishHumanLocation = (location: HumanLocation) => {
    if (!pendingCharacter) return;

    const character = { ...pendingCharacter, humanLocation: location };
    setPendingCharacter(null);
    setGameState(createInitialState(character));
  };

  const addLocationToExistingSave = (location: HumanLocation) => {
    if (!gameState) return;

    const updatedState: GameState = {
      ...gameState,
      character: { ...gameState.character, humanLocation: location }
    };

    setGameState(updatedState);
    saveLocally(updatedState);
  };

  const restart = () => {
    clearLocalSave();
    setPendingCharacter(null);
    setGameState(null);
    setHasEntered(false);
  };

  if (!hasEntered) {
    return <IntroPage onContinue={() => setHasEntered(true)} />;
  }

  if (pendingCharacter) {
    return (
      <HumanLocationStep
        characterName={pendingCharacter.name}
        onComplete={finishHumanLocation}
      />
    );
  }

  if (gameState?.character.origin === "human" && !gameState.character.humanLocation) {
    return (
      <HumanLocationStep
        characterName={gameState.character.name}
        onComplete={addLocationToExistingSave}
      />
    );
  }

  if (!gameState) {
    return <CharacterCreationWithFriends onComplete={startGame} />;
  }

  return <StoryScreen initialState={gameState} onRestart={restart} />;
}
