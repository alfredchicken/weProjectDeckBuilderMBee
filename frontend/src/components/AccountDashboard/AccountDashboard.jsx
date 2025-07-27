import "./AccountDashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import api from "../../api/api";

const AccountDashboard = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate(); 
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleDeleteAccount = async (user) => {
    console.log("Deleting user:", user.name);
    if (!window.confirm("Do you really wanna delete your account?")) return;
    try {
      await api.delete(`/users/${user.name}`);
      console.log("Deleting user:", user.name);
      toast.success("Account deleted successfully!");
      navigate("/login");
    } catch (error) {
      console.log("Error deleting account:", error);
      toast.error("Error deleting account. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Please fill in both fields");
      return;
    }

    try {
      const response = await api.put(`/users/${user.name}`, {
        oldPassword,
        password: newPassword, // send newPassword als 'password'
      });

      toast.success("Password succesfully changed!");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.log("API error:", error.response);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error changing password. Try Again!");
      }
    }
  };

  return (
    <div className="my-account-container">
      <div className="account-dashboard-header">
        <h1>Welcome {user.name}</h1>
        <button onClick={handleLogout} alt="Logout">
          <FontAwesomeIcon icon={faRightFromBracket} /> Logout
        </button>
      </div>
      {user?.role !== "admin" && (
        <div className="account-dashboard-content">
          <div className="change-pw-container">
            <h2>Change Password</h2>
            <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <button onClick={handleChangePassword} alt="change-password">
              Change Password
            </button>
          </div>
          <div className="delete-account-container">
            <h2>Delete Account</h2>
            <button onClick={() => handleDeleteAccount(user)} alt="change-password">
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDashboard;
