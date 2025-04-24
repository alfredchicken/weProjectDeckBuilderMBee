import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../api/api.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 👈 Hook innerhalb der Komponente

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(name, password); // 👈 API-Call hier!
      localStorage.setItem("token", data.token);
      toast.success("Login successfully!");
      navigate("/");
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
