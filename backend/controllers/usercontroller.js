import User from "../models/usersmodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import userValidationSchema from "../models/uservalidation.js";

export const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("Error loading User from db");
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createUser = async (req, res) => {
  const { error } = userValidationSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map((detail) => detail.message),
    });
  }

  const { name, password, email, recaptchaToken } = req.body;

  const secretKey = process.env.RECAPTCHA_SECRET;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
  const captchaResponse = await fetch(verifyUrl, { method: "POST" });
  const captchaData = await captchaResponse.json();
  console.log("Captcha Data:", captchaData);

  if (!captchaData.success) {
    return res.status(400).json({ message: "Captcha verifikation fehlgeschlagen" });
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
    const hashedPassword = await bcrypt.hash(password, salt); // Hashing password

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
    console.log("Delete request for user:", name);

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
  const { password, oldPassword, ...rest } = req.body; // Passwort vom Body rausnehmen
  console.log("UpdateUser Body:", req.body);
  console.log("UpdateUser Params:", req.params);

  try {
    const updates = { ...rest };

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    // Passwort ändern?
    if (password) {
      // altes mitgeschickt?
      if (!oldPassword) {
        return res.status(400).json({ success: false, message: "Old password is required to change the password." });
      }

      // alter passwort prüfen
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Old password is incorrect." });
      }

      // wenn korrekt: neues hashen
      const salt = await bcrypt.genSalt(10);
      rest.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findOneAndUpdate({ name }, rest, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error while updating user:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// handling login

export const loginUser = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Name und Passwort required." });
  }

  try {
    const user = await User.findOne({ name });

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

    // Access Token
    const accessToken = jwt.sign({ userId: user._id, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // Refresh Token:
    const refreshToken = jwt.sign({ userId: user._id, name: user.name, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    // Cookies
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Tage
    });

    res.status(200).json({ message: "Successfully logged in!", accessToken });
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Erfolgreich ausgeloggt!" });
};

// Refresh Access Token
export const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    // neuen Access Token ausstellen:
    const accessToken = jwt.sign({ userId: decoded.userId, name: decoded.name, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });
    res.status(200).json({ message: "New access token issued" });
  } catch (err) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};
