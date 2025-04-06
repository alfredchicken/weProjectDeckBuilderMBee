import "./CardModal.css";

const CardModal = ({ card, onClose }) => {
  if (!card) {
    return null; // Don't render anything if no card is selected
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${card.type}`}
        // Prevents, that a click on the modal content closes the modal
        onClick={(e) => e.stopPropagation()}
      >
        <img src={card.imgURL} alt={card.name} className="modal-img" />
      </div>
    </div>
  );
};

export default CardModal;
// modal is like a lightbox
