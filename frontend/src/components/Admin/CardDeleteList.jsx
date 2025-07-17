import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import api from "../../api/api";
import "./CardDeleteList.css";

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
    <div className="card-delete-list">
      <h3>Card Database</h3>
      <ul className="card-list">
        {cards.map((card) => (
          <li key={card._id}>
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
