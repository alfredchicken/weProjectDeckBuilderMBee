import React, { useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import "./DeckGrid.css";

const DeckGrid = ({ deck, cardDeckSize, onRemove, removingIndex, setRemovingIndex, onExportReady }) => {
  const deckRef = useRef(null);

  useEffect(() => {
    if (!onExportReady || !deckRef.current) return;

    const exportFunction = () => {
      const node = deckRef.current;
      if (!node) return;

      const originalOverflow = node.style.overflow;
      const originalHeight = node.style.height;

      node.style.overflow = "visible";
      node.style.height = "auto";

      toPng(node, {
        cacheBust: true,
        width: node.scrollWidth,
        height: node.scrollHeight,
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "my-deck.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Fehler beim Exportieren:", err);
        })
        .finally(() => {
          node.style.overflow = originalOverflow;
          node.style.height = originalHeight;
        });
    };

    onExportReady(() => exportFunction);
  }, [onExportReady, deckRef]);

  return (
    <>
      <div className="deck-cards" ref={deckRef} style={{ "--card-size": `${cardDeckSize}px` }}>
        {deck.map((card, index) => (
          <div
            key={`${card.cardID}-${index}`}
            className={`card ${removingIndex === index ? "fade-out" : ""}`}
            onClick={() => {
              setRemovingIndex(index);
              setTimeout(() => {
                onRemove(index);
                setRemovingIndex(null);
              }, 300);
            }}
          >
            <img src={card.imgURL} alt={card.name} className="img-pool" style={{ width: "100%" }} />
          </div>
        ))}
      </div>
    </>
  );
};

export default DeckGrid;
