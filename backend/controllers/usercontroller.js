import mongoose from "mongoose";
import User from "../models/usersmodel.js";
import bcrypt from "bcryptjs";

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
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Name and password are required" });
  }

  try {
    // hash password with bcrypt
    const salt = await bcrypt.genSalt(10); // generate a salt > A salt is a random string of characters and is added to a password before it is hashed
    const hashedPassword = await bcrypt.hash(password, salt); // Has password > Hashing means that data (e.g. a password) is converted into a unique, fixed value using a mathematical algorithm

    const newUser = new User({ name, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: "User created!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
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
  const { password, ...rest } = req.body; // exctract password from body

  try {
    const updates = { ...rest };

    // new password?
    if (password) {
      console.log("Hashing new password...");
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }
    const updatedUser = await User.findOneAndUpdate({ name }, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// handling login

export const loginUser = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    console.log("Missing name or password");
    return res.status(400).json({ message: "Name and password are required" });
  }

  try {
    const user = await User.findOne({ name }); // Benutzer suchen
    console.log("User found:", user);

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Passwort überprüfen
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Incorrect password");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Successful Login!" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};
