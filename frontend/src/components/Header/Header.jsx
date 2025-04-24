import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const token = localStorage.getItem("token");
  let user = null;
  const navigate = useNavigate();

  if (token) {
    try {
      const decoded = jwtDecode(token);
      user = decoded;
    } catch (err) {
      console.error("Token ungültig:", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header>
      <nav>
        <Link to="/">DeckBuilder</Link>
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <span>Welcome Back, {user.name}!</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
