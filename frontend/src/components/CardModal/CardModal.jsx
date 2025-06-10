import "./CardModal.css";
import React, { useEffect, useRef, useState } from "react";
import VanillaTilt from "vanilla-tilt";

const CardModal = ({ card, onClose, onAddToDeck, deck }) => {
  const tiltRef = useRef(null);
  const countInDeck = card ? (deck || []).filter((c) => c.name === card.name).length : 0;

  useEffect(() => {
    if (!tiltRef.current) return;

    // Tilt initialisieren
    VanillaTilt.init(tiltRef.current, {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
    });

    // Optional: destroy on cleanup
    return () => {
      if (tiltRef.current?.vanillaTilt) {
        tiltRef.current.vanillaTilt.destroy();
      }
    };
  }, [card]);

  if (!card) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div ref={tiltRef} className={`img-container ${card.rarity.toLowerCase()}`}>
          <img src={`http://localhost:5000/images/${card.imgURL}`} alt={card.name} className="modal-img" />
          {card.rarity.toLowerCase() === "ultra" && (
            <>
              <div className="ultra-overlay" />
            </>
          )}
        </div>
        <div className="card-details">
          <button className="add-to-deck" onClick={() => onAddToDeck(card)}>
            Add to Deck
          </button>
          <p className="cards-in-deck">{countInDeck}× in Deck</p>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
