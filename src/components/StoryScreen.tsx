import { useMemo, useState } from "react";
import { getLocationLabel, getOutageEffect } from "../data/humanLocation";
import { STORY } from "../data/storySoundwaveDevice";
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
  const metSideswipe =
    state.flags.followed_sideswipe === true &&
    state.flags.first_autobot_contact === "sideswipe";

  const sideswipeRecognition = metSideswipe
    ? `Sideswipe turns from a nearby console and recognizes the trio immediately.

“You.”

His attention shifts to the map.

“You used me to find this place, didn't you?”

“You were one of the routes,” ${friendOneName} admits.

“I tried to lose you.”

Hound answers, “They stopped following individual Autobots and started studying the pattern.”`
    : "";

  const examinedRelayDevice = state.flags.examined_relay_device === true;
  const documentedRelayDevice = state.flags.documented_relay_device === true;
  const searchedRelaySite = state.flags.searched_relay_site === true;
  const hasRecoveredRelayDevice = state.inventory.includes(
    "Recovered Decepticon relay device"
  );
  const completedRelayInvestigations = [
    examinedRelayDevice ? "examined the device" : null,
    documentedRelayDevice ? "documented its construction and connections" : null,
    searchedRelaySite ? "searched the rest of the attack site" : null
  ].filter((item): item is string => item !== null);

  const relayContactPreparation =
    completedRelayInvestigations.length === 3
      ? "You have already examined the device, documented its connections, and searched the surrounding site. This is not an accidental touch. You return to the pulsing section because you believe it is a communicator."
      : completedRelayInvestigations.length > 0
        ? `Before touching the pulsing section, the trio has already ${completedRelayInvestigations.join(" and ")}. You know enough to believe this action may deliberately contact whoever left it behind.`
        : "You have not finished studying the device, but the separate purple pulse looks too deliberate to ignore. You decide to test whether it can reach whoever left it behind.";

  const soundwaveEvidenceNoticeParts: string[] = [];
  if (examinedRelayDevice) {
    soundwaveEvidenceNoticeParts.push("“Manual inspection detected.”");
  }
  if (documentedRelayDevice) {
    soundwaveEvidenceNoticeParts.push("“Visual recording detected.”");
  }
  if (searchedRelaySite) {
    soundwaveEvidenceNoticeParts.push("“Site-survey behavior detected. State what you observed.”");
  }
  if (completedRelayInvestigations.length === 3) {
    soundwaveEvidenceNoticeParts.push(
      "The unit has already told him that the humans did not stumble onto one control. They examined, documented, searched, returned, and then attempted contact."
    );
  }
  const soundwaveEvidenceNotice = soundwaveEvidenceNoticeParts.join("\n\n");

  const relayReturnSummary = state.flags.contacted_soundwave_at_relay === true
    ? "Soundwave answered the instant the communicator activated. Whether you gave him names or fled without answering, he now knows that three humans entered the site and deliberately touched Decepticon technology."
    : hasRecoveredRelayDevice
      ? "The recovered Decepticon device came with you. Its warning tone eventually stopped, but none of you knows whether it transmitted an alert before going quiet."
      : "The Decepticon device remained at the station. Whatever you photographed, sketched, observed, or recovered separately came home with you.";

  const relayEvidenceReviewParts = [
    documentedRelayDevice
      ? "Your photographs and sketches preserve the device's shape, markings, and connection points."
      : null,
    searchedRelaySite
      ? "The discarded Cybertronian component and the track pattern show that one Decepticon remained near the power equipment during the attack."
      : null,
    hasRecoveredRelayDevice
      ? "The recovered relay device is physical proof, but handling or activating it again may reveal where you took it."
      : null,
    state.flags.contacted_soundwave_at_relay === true
      ? "The communication itself confirmed that Soundwave could receive an alert from the unit immediately."
      : null
  ].filter((item): item is string => item !== null);
  const relayEvidenceReview = relayEvidenceReviewParts.length > 0
    ? relayEvidenceReviewParts.join("\n\n")
    : "You left with observations rather than physical proof, but the pattern of damage still confirms that the Decepticons used the station as an energy source.";

  const soundwaveDeceptionDetected =
    state.flags.lied_to_soundwave_at_first_contact === true ||
    state.flags.lied_to_soundwave_about_relay_site === true ||
    state.flags.lied_to_soundwave_about_affiliation === true ||
    state.flags.lied_to_soundwave_about_material === true;
  const soundwaveContactCompromised =
    state.flags.relay_guard_interrupted_soundwave === true ||
    state.flags.relay_worker_witnessed_soundwave === true;
  const soundwaveFutureContact = state.flags.soundwave_future_contact;
  const soundwaveUsefulEvidence =
    state.flags.soundwave_information_shared === "full" ||
    typeof state.flags.soundwave_utility_offer === "string" ||
    state.flags.soundwave_material_status === "offered_return";
  const soundwaveRelationship = state.relationships.soundwave ?? 0;
  const soundwaveDeviceEligible =
    !soundwaveContactCompromised &&
    !soundwaveDeceptionDetected &&
    ((soundwaveFutureContact === "accepted" && soundwaveRelationship >= 3) ||
      ((soundwaveFutureContact === "conditional" ||
        soundwaveFutureContact === "friend_safety_condition" ||
        soundwaveFutureContact === "mutual_value") &&
        soundwaveRelationship >= 2));

  const soundwaveFinalAssessment = soundwaveContactCompromised
    ? `“Classification: compromised contact.”

A human worker witnessed or interrupted the active Decepticon transmission. Soundwave now treats the relay unit, the site, and the trio as exposed variables.

“Human authority awareness: possible. Remote containment required.”`
    : soundwaveDeceptionDetected
      ? `“Classification: deceptive intruders.”

Soundwave has recorded statements contradicted by telemetry, visible evidence, or later admissions.

“Reliability: low. Curiosity: high. Further contact: restricted pending verification.”`
      : soundwaveFutureContact === "refused"
        ? `“Classification: contact refused.”

The trio answered enough to be identified but rejected continued communication.

“Data retained. No invitation extended.”`
        : soundwaveDeviceEligible
          ? `“Classification: potential assets.”

The trio has demonstrated initiative, useful knowledge, and willingness to maintain a controlled channel.

“Trust: unestablished. Utility: possible. Further observation authorized.”`
          : `“Classification: independent observers.”

The trio remains cautious, uncommitted, or not yet useful enough to justify deeper access.

“Hostility: unconfirmed. Utility: possible. Autonomy noted.”`;

  const renderText = (text: string) =>
    text
      .replaceAll("{{player}}", state.character.name)
      .replaceAll("{{friendOne}}", friendOneName)
      .replaceAll("{{friendTwo}}", friendTwoName)
      .replaceAll("{{outageEffect}}", getOutageEffect(state.character.humanLocation))
      .replaceAll("{{sideswipeRecognition}}", sideswipeRecognition)
      .replaceAll("{{relayContactPreparation}}", relayContactPreparation)
      .replaceAll("{{soundwaveEvidenceNotice}}", soundwaveEvidenceNotice)
      .replaceAll("{{relayReturnSummary}}", relayReturnSummary)
      .replaceAll("{{relayEvidenceReview}}", relayEvidenceReview)
      .replaceAll("{{soundwaveFinalAssessment}}", soundwaveFinalAssessment);

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

  const availableChoices = scene.choices.filter((choice) =>
    isChoiceAvailable(state, choice)
  );
  const displayedChapter =
    state.flags.chapter_one_complete === true
      ? Math.max(2, scene.chapter)
      : scene.chapter;
  const bodyParagraphs = renderText(scene.body).split(/\n\s*\n/);

  return (
    <main className="screen story-screen">
      <section className="story-shell">
        <header className="story-header">
          <div>
            <div className="chapter-label">
              Chapter {displayedChapter} · Day {currentDay} · Hour {hourOfDay}
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

        {!scene.isEnding && availableChoices.length > 0 && (
          <div className="story-choices">
            {availableChoices.map((choice) => (
              <button
                key={choice.id}
                className="story-choice"
                onClick={() => handleChoice(choice.id)}
              >
                {renderText(choice.label)}
              </button>
            ))}
          </div>
        )}

        {!scene.isEnding && availableChoices.length === 0 && (
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
