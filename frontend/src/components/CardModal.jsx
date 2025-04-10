import "./CardModal.css";

const CardModal = ({ card, onClose }) => {
  if (!card) {
    return null; // nicht wird angezeigt, wenn keine Karte übergeben wird
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${card.rarity.toLowerCase()}`}
        // Verhindert, dass bei Klick LightBox(Modal)  geschlossen wird
        onClick={(e) => e.stopPropagation()}
      >
        <img src={card.imgURL} alt={card.name} className="modal-img" />
      </div>
    </div>
  );
};

export default CardModal;
// modal ist wie eine LightBox
