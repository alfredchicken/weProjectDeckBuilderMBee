import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const Header = () => {
  const { user, logout } = useAuth(); // useAuth Hook importieren
  const navigate = useNavigate(); // useNavigate Hook importieren

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header>
      <nav>
        <Link to="/">DeckBuilder</Link>
        {user?.role === "admin" && <Link to="/admin">Manage Cards</Link>}
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
