import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";
import "./CardCreateForm.css";

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
  const [fileName, setFileName] = useState(""); //damit der Upload-Button in Englisch und nicht Browser Language abhängig ist

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

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "");
    setForm((f) => ({ ...f, image: file })); // Datei auch im State merken!
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

      const res = await api.post("/cards", formData);
      onAdd(res.data.data);
      toast.success("Card created successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Error creating card");
    }
  };
  return (
    <div className="card-create-form">
      <h3>Create New Card</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="cardID" value={form.cardID} onChange={handleChange} placeholder="CardID" required />
        <input name="type" value={form.type.join(", ")} onChange={handleChange} placeholder="Types (Separate with Comma)" required />
        <div className="card-stats">
          <label htmlFor="attack">Attack:</label>
          <input name="attack" type="number" value={form.attack} onChange={handleChange} placeholder="Attack" required />
          <label htmlFor="attack" className="playcost-label">
            Playcost:
          </label>
          <input name="playcost" type="number" value={form.playcost} onChange={handleChange} placeholder="Playcost" required />
        </div>
        <input name="rarity" value={form.rarity} onChange={handleChange} placeholder="Rarity" required />
        <input name="cardtype" value={form.cardtype} onChange={handleChange} placeholder="Card Type" required />
        <input name="tribe" value={form.tribe} onChange={handleChange} placeholder="Tribe" required />
        <label className="flipover-label">
          Flipover: <input name="flipover" type="checkbox" checked={form.flipover} onChange={handleChange} className="checkbox" />
        </label>
        <div>
          <label htmlFor="card-image" className="custom-file-upload">
            Choose Image
          </label>
          <input id="card-image" name="image" type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
          {fileName && (
            <div className="file-info">
              <span> {fileName}</span>
            </div>
          )}
        </div>
        <button type="submit">Create Card</button>
      </form>
    </div>
  );
};

export default CardCreateForm;
