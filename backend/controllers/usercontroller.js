import mongoose from "mongoose";
import User from "../models/usersmodel.js";
import bcrypt from "bcryptjs";

export const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("Fehler beim laden des Users von der Datenbank");
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createUser = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Name und Passwort nötig" });
  }

  try {
    // hash password with bcrypt
    const salt = await bcrypt.genSalt(10); // generiert ein Salt > A salt is a random string of characters and is added to a password before it is hashed
    const hashedPassword = await bcrypt.hash(password, salt); // Hashiing password > Hashing means that password is converted into a unique, fixed value using a mathematical algorithm

    const newUser = new User({ name, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: "User erstellt!" });
  } catch (error) {
    console.error("Fehler beim Erstellen des Users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { name } = req.params;

  try {
    const result = await User.deleteOne({ name });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "User nicht gefunden!" });
    }

    res.json({ success: true, message: "User gelöscht!" });
  } catch (error) {
    console.error("Fehler beim Löschen des Users von der Datenbank");
    res.status(500).json({ success: false, message: "Server Error Ui Ui" });
  }
};

export const updateUser = async (req, res) => {
  const { name } = req.params;
  const { password, ...rest } = req.body; // Passwort vom Body rausnehmen

  try {
    const updates = { ...rest };

    // neues Passwort?
    if (password) {
      console.log("Hashing neues Passwort...");
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }
    const updatedUser = await User.findOneAndUpdate({ name }, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User nicht gefunden!" });
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Fehler beim Updaten vom User:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// handling login

export const loginUser = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    console.log("Fehlender Name oder Passwort");
    return res.status(400).json({ message: "Name und Passwort sind nötig" });
  }

  try {
    const user = await User.findOne({ name });
    console.log("User gefunden!");

    if (!user) {
      console.log("User nicht gefunden");
      return res.status(401).json({ message: "Ungültiger Username oder Passwort" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("falsches Passwort");
      return res.status(401).json({ message: "Ungültiger Username oder Passwort" });
    }

    res.status(200).json({ message: "Erfolgreich eingeloggt!" });
  } catch (error) {
    console.error("Fehler während dem Einloggen:", error);
    res.status(500).json({ message: "Server error" });
  }
};
