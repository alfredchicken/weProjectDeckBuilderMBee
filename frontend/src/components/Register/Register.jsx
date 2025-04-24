import { useState } from "react";
import { registerUser } from "../../api/api.js";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(name, password);
      toast.success("Register successfully!");
    } catch (error) {
      if (error.message.includes("existiert bereits")) {
        toast.error("Username already exists!");
      } else {
        toast.error("Registration failed!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrieren</h2>
      <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Registrieren</button>
    </form>
  );
};

export default Register;
