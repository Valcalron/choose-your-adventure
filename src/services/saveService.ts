import type { GameState } from "../types/game";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const LOCAL_SAVE_KEY = "branching_game_save_slot_1";

export const saveLocally = (state: GameState): void => {
  localStorage.setItem(LOCAL_SAVE_KEY, JSON.stringify(state));
};

export const loadLocalSave = (): GameState | null => {
  const raw = localStorage.getItem(LOCAL_SAVE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as GameState;
  } catch {
    return null;
  }
};

export const clearLocalSave = (): void => {
  localStorage.removeItem(LOCAL_SAVE_KEY);
};

export const saveToSupabase = async (state: GameState): Promise<void> => {
  if (!isSupabaseConfigured || !supabase) return;

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase.from("player_saves").upsert(
    {
      user_id: user.id,
      slot_number: 1,
      current_scene_id: state.currentSceneId,
      state
    },
    { onConflict: "user_id,slot_number" }
  );

  if (error) {
    throw new Error(error.message);
  }
};

export const saveGame = async (state: GameState): Promise<void> => {
  saveLocally(state);
  await saveToSupabase(state);
};
