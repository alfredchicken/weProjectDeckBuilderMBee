import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import api from "../../api/api";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const CardDeleteList = ({ cards, onDelete }) => {
  const handleDelete = async (cardID) => {
    if (!window.confirm("Do you really wanna delete that card?")) return;
    try {
      await api.delete(`/cards/${cardID}`);
      onDelete(cardID);
      toast.success("Card deleted successfully!");
    } catch (error) {
      toast.error("Error deleting card");
    }
  };

  return (
    <div style={{ maxHeight: "350px", overflowY: "auto", border: "1px solid #ccc", padding: "1rem" }}>
      <h3>Card Database</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {cards.map((card) => (
          <li key={card._id} style={{ marginBottom: 10 }}>
            <b>{card.name}</b> ({card.cardID}) [{card.type?.join(", ")}]
            <button style={{ marginLeft: 10 }} onClick={() => handleDelete(card.cardID)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardDeleteList;
