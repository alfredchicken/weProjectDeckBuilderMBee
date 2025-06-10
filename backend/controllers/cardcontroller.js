import Card from "../models/cardmodel.js";
import mongoose from "mongoose";
import cardSchema from "../models/cardvalidation.js";

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).json({ success: true, data: cards });
  } catch (error) {
    console.log("Fehler beim Laden der Karten von der Datenbank");
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Post - Karte erstellen
export const createCard = async (req, res) => {
  // automatische Umwandlung: string zu array, weil ich später mehr als nur einfarbige Kartentypen erstellt habe.
  if (typeof req.body.type === "string") {
    req.body.type = req.body.type.split(",").map((t) => t.trim());
  }

  // Bild-URL einfügen (vor Validation!)
  let imgURL = req.body.imgURL || "";
  if (req.file) {
    imgURL = req.file.filename;
  }
  req.body.imgURL = imgURL; // <-- HIER: imgURL in req.body setzen

  console.log("New Card Request:", req.body, req.file);

  // Jetzt validieren!
  const { error } = cardSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Validation Error",
      details: error.details.map((detail) => detail.message),
    });
  }

  const newCard = new Card({ ...req.body, imgURL });

  try {
    await newCard.save();
    res.status(201).json({ success: true, data: newCard });
  } catch (e) {
    console.error("Fehler beim speichern der Karte auf die Datenbank", e);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Karte löschen
export const deleteCard = async (req, res) => {
  const { cardID } = req.params; // Suche nach Karten ID macht mehr Sinn als nach MongoDB ObjectID

  try {
    const result = await Card.deleteOne({ cardID });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Karte wurde in der DB nicht gefunden!" });
    }

    res.json({ success: true, message: "Karte erfolgreich gelöscht!" });
  } catch (error) {
    console.error("Fehler beim Löschen der Karte aus der Datenbank");
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Karte aktualisieren
export const updateCard = async (req, res) => {
  const { cardID } = req.params; // Update via CardID macht mehr Sinn als MongoDB ObjectID
  const card = req.body;

  if (typeof card.type === "string") {
    card.type = card.type.split(",").map((t) => t.trim());
  }

  const { error } = cardSchema.validate(card, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Validation Error",
      details: error.details.map((detail) => detail.message),
    });
  }

  try {
    const updatedCard = await Card.findOneAndUpdate({ cardID }, card, { new: true });

    if (!updatedCard) {
      return res.status(404).json({ success: false, message: "Card not found!" });
    }

    res.status(200).json({ success: true, data: updatedCard });
  } catch (error) {
    console.error("Error updating card in database");
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
