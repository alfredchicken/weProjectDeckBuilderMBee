import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { user, logout } = useAuth(); // useAuth Hook importieren
  const navigate = useNavigate(); // useNavigate Hook importieren

  return (
    <header>
      <nav>
        <div className="nav-left">
          <Link to="/">
            <img className="logo" src="../../../src/assets/Logo_EverythingCardGame.webp" alt="Logo" />
          </Link>
          <Link to="/">Deck Builder</Link>
          {user?.role === "admin" && <Link to="/admin">Manage Cards</Link>}
        </div>
        <div className="nav-login">
          {!user ? (
            <Link to="/login">Login</Link>
          ) : (
            <>
              <Link to="/my-account">My Account</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
