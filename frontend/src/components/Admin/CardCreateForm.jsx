import { useState } from "react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const CardCreateForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    cardID: "",
    type: [],
    attack: 0,
    playcost: 0,
    rarity: "",
    cardtype: "",
    tribe: "",
    flipover: false,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "type") {
      setForm((f) => ({ ...f, type: value.split(",").map((t) => t.trim()) }));
    } else if (name === "flipover") {
      setForm((f) => ({ ...f, flipover: checked }));
    } else if (name === "image") {
      setForm((f) => ({ ...f, image: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "image" && value) {
          formData.append("image", value);
        } else if (key === "type") {
          value.forEach((v) => formData.append("type", v));
        } else {
          formData.append(key, value);
        }
      });

      const res = await fetch(`${API_URL}/cards`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error creating card");
      const data = await res.json();
      onAdd(data.data);
      toast.success("Card created successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Card</h3>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="cardID" value={form.cardID} onChange={handleChange} placeholder="CardID" required />
      <input name="type" value={form.type.join(", ")} onChange={handleChange} placeholder="Typen (Separate with Comma)" required />
      <input name="attack" type="number" value={form.attack} onChange={handleChange} placeholder="Attack" required />
      <input name="playcost" type="number" value={form.playcost} onChange={handleChange} placeholder="Playcost" required />
      <input name="rarity" value={form.rarity} onChange={handleChange} placeholder="Rarity" required />
      <input name="cardtype" value={form.cardtype} onChange={handleChange} placeholder="Card Type" required />
      <input name="tribe" value={form.tribe} onChange={handleChange} placeholder="Tribe" required />
      <label>
        Flipover: <input name="flipover" type="checkbox" checked={form.flipover} onChange={handleChange} />
      </label>
      <input name="image" type="file" accept="image/*" onChange={handleChange} />
      <button type="submit">Create Card</button>
    </form>
  );
};

export default CardCreateForm;
