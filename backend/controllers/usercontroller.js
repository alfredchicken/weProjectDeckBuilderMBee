import mongoose from "mongoose";
import User from "../models/usersmodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";

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
  const { name, password, email, recaptchaToken } = req.body;

  const secretKey = process.env.RECAPTCHA_SECRET;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
  const captchaResponse = await fetch(verifyUrl, { method: "POST" });
  const captchaData = await captchaResponse.json();
  console.log("Captcha Data:", captchaData);

  if (!captchaData.success) {
    return res.status(400).json({ message: "Captcha verification failed!" });
  }

  if (!name || !password || !email) {
    return res.status(400).json({ message: "Name und Passwort sowie eMail nötig" });
  }

  // Email format prüfen
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Please use a valid Mailadress." });
  }

  try {
    // gibt es diese Mailadresse oder den User bereits?
    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: "Username or Mail already exist!" });
    }

    // hash password with bcrypt
    const salt = await bcrypt.genSalt(10); // generiert ein Salt > A salt is a random string of characters and is added to a password before it is hashed
    const hashedPassword = await bcrypt.hash(password, salt); // Hashiing password > Hashing means that password is converted into a unique, fixed value using a mathematical algorithm

    const newUser = new User({ name, password: hashedPassword, email });
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
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Account gesperrt wegen zuvielen Login attempts?
    if (user.lockUntil && user.lockUntil > Date.now()) {
      const minutes = Math.ceil((user.lockUntil - Date.now()) / (60 * 1000));
      return res.status(403).json({ message: `Account locked. Please wait ${minutes} Minutes.` });
    }

    // Passwort vergleichen
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;

      // Bei zu vielen Fehlversuchen: Account sperren
      if (user.failedLoginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 10 * 60 * 1000); // 10 Minuten
        await user.save();
        return res.status(403).json({ message: "Account locked due to too many login attempts. Try again in 10 Minutes." });
      }

      await user.save();
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Erfolgreicher Login: Login versuche zurücksetzen
    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, name: user.name, role: user.role }, // Infos, die im Token stehen
      process.env.JWT_SECRET, // Geheimes Passwort aus .env
      { expiresIn: "1h" } // Token läuft nach 1 Stunde ab
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Erfolgreich eingeloggt!", token });
  } catch (error) {
    console.error("Fehler während dem Einloggen:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Erfolgreich ausgeloggt!" });
};
