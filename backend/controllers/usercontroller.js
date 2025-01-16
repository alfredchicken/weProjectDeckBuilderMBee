import mongoose from "mongoose";
import User from "../models/usersmodel.js";

// handling Users
export const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("Error fetching users from database");
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;

  if (!user.name || !user.password) {
    return res.status(400).json({ message: "All Fields are required" });
  }

  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch {
    console.error("Error saving User to database");
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { name } = req.params;

  try {
    const result = await User.deleteOne({ name });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    res.json({ success: true, message: "User deleted!" });
  } catch (error) {
    console.error("Error deleting User from database");
    res.status(500).json({ success: false, message: "Server Error Ui Ui" });
  }
};

export const updateUser = async (req, res) => {
  const { name } = req.params;
  const user = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ name }, user, { new: true });

    if (!updateUser) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    res.status(200).json({ success: true, data: updateUser });
  } catch (error) {
    console.error("Error updating user in database");
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// User login
export const loginUser = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Name and password are required." });
  }

  try {
    const user = await User.findOne({ name });
    console.log("User found:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    if (user.password === password) {
      return res.status(200).json({ message: "Successful Login!" });
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error in Userlogin.", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
