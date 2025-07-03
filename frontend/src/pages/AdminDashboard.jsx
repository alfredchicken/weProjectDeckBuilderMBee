import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import CardCreateForm from "../components/Admin/CardCreateForm";
import CardDeleteList from "../components/Admin/CardDeleteList";
import api from "../api/api";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .get("/cards")
      .then((res) => setCards(res.data.data || []))
      .catch((err) => {
        console.error("Error fetching cards:", err);
        toast.error("Failed to load cards. Please try again later.");
      });
  }, []);

  const addCard = (newCard) => setCards((prev) => [...prev, newCard]);

  const removeCard = (cardID) => setCards((prev) => prev.filter((card) => card._id !== cardID));

  if (!user || user.role !== "admin") return <div>Nothing to see here...</div>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <CardCreateForm onAdd={addCard} />
      <hr />
      <CardDeleteList
        cards={cards}
        onDelete={(deletedID) => {
          setCards((prev) => prev.filter((card) => card.cardID !== deletedID));
        }}
      />
    </div>
  );
};

export default AdminDashboard;
