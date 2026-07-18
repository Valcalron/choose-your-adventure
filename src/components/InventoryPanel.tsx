import { useEffect, useMemo, useState } from "react";
import { getInventoryItemView, type InventoryAction } from "../data/inventoryItems";
import type { GameState } from "../types/game";

type Props = {
  state: GameState;
  open: boolean;
  onClose: () => void;
};

export default function InventoryPanel({ state, open, onClose }: Props) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<InventoryAction | null>(null);
  const [resultText, setResultText] = useState("");

  useEffect(() => {
    if (!open) {
      setSelectedItem(null);
      setPendingAction(null);
      setResultText("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const itemView = useMemo(
    () =>
      selectedItem
        ? getInventoryItemView(selectedItem, state, state.currentSceneId)
        : null,
    [selectedItem, state]
  );

  if (!open) return null;

  const selectItem = (item: string) => {
    setSelectedItem(item);
    setPendingAction(null);
    setResultText("");
  };

  const runAction = (action: InventoryAction) => {
    if (action.confirmText) {
      setPendingAction(action);
      setResultText("");
      return;
    }

    setResultText(action.resultText);
  };

  const confirmAction = () => {
    if (!pendingAction) return;
    setResultText(pendingAction.resultText);
    setPendingAction(null);
  };

  return (
    <div className="inventory-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="inventory-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inventory-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="inventory-header">
          <div>
            <div className="chapter-label">Carried items</div>
            <h2 id="inventory-title">Inventory</h2>
          </div>
          <button className="secondary-button compact" onClick={onClose}>
            Close
          </button>
        </header>

        {itemView ? (
          <div className="inventory-detail">
            <button
              className="inventory-back-button"
              onClick={() => {
                setSelectedItem(null);
                setPendingAction(null);
                setResultText("");
              }}
            >
              ← Item list
            </button>

            <h3>{itemView.name}</h3>
            <p>{itemView.description}</p>
            <div className="inventory-status">{itemView.status}</div>

            {pendingAction ? (
              <div className="inventory-confirmation">
                <strong>{pendingAction.confirmText}</strong>
                <div className="inventory-action-row">
                  <button className="primary-button" onClick={confirmAction}>
                    Yes
                  </button>
                  <button
                    className="secondary-button"
                    onClick={() => setPendingAction(null)}
                  >
                    No
                  </button>
                </div>
              </div>
            ) : (
              <>
                {itemView.actions.length > 0 ? (
                  <div className="inventory-actions">
                    {itemView.actions.map((action) => (
                      <button
                        key={action.id}
                        className="story-choice"
                        onClick={() => runAction(action)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="inventory-unavailable">
                    No useful action is available here. This item may still affect the story automatically.
                  </p>
                )}
              </>
            )}

            {resultText && <div className="inventory-result">{resultText}</div>}
          </div>
        ) : (
          <div className="inventory-list">
            {state.inventory.length > 0 ? (
              state.inventory.map((item) => {
                const view = getInventoryItemView(item, state, state.currentSceneId);
                return (
                  <button
                    key={item}
                    className="inventory-item"
                    onClick={() => selectItem(item)}
                  >
                    <strong>{view.name}</strong>
                    <span>{view.status}</span>
                  </button>
                );
              })
            ) : (
              <p className="inventory-empty">Your inventory is empty.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
