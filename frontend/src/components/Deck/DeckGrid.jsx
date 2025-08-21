import React, { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import "./DeckGrid.css";
import Spinner from "../Spinner/Spinner";

const IMAGE_BASE = import.meta.env.VITE_URL;

const DeckGrid = ({ deck, cardDeckSize, onRemove, removingIndex, setRemovingIndex, onExportReady, sortedDeck, onAddCardToDeck }) => {
  const deckRef = useRef(null);
  const [loadingExport, setLoadingExport] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    if (!onExportReady || !deckRef.current) return;

    const exportFunction = () => {
      const node = deckRef.current;
      if (!node) return;

      setLoadingExport(true);

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
          setLoadingExport(false);
        });
    };

    onExportReady(() => exportFunction);
  }, [onExportReady, deckRef]);

  return (
    <>
      <div
      className={`deck-cards${isDragOver ? " drag-over" : ""}`}
        ref={deckRef}
        style={{ "--card-size": `${cardDeckSize}px` }}
      onDragOver={e => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={e => {
        e.preventDefault();
        setIsDragOver(false);
        const cardData = e.dataTransfer.getData("application/json");
        if (cardData && onAddCardToDeck) {
          const card = JSON.parse(cardData);
          onAddCardToDeck(card);
        }
      }}
        >        {(sortedDeck || []).map((card, index) => (
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
            <img src={`${IMAGE_BASE}/images/${card.imgURL}`} alt={card.name} className="img-pool" style={{ width: "100%" }} />
          </div>
        ))}
      </div>
      {loadingExport && <Spinner />}
    </>
  );
};

export default DeckGrid;
