import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const CardDeleteList = ({ cards, onDelete }) => {


  const handleDelete = async (cardID) => {
    if (!window.confirm("Do you really wanna delete that card?")) return;
    try {
      const res = await fetch(`${API_URL}/cards/${cardID}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error deleting card");
      onDelete(cardID);
      toast.success("Card deleted successfully!");
    } catch {
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
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardDeleteList;
