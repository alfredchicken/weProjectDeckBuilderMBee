import Card from "../models/cardmodel.js";
import mongoose from "mongoose";
import cardSchema from "../models/cardvalidation.js";

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).json({ success: true, data: cards });
  } catch (error) {
    console.log("Error fetching cards from database");
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Post
export const createCard = async (req, res) => {
  // automatische Umwandlung: string -> array, weil ich später zwei farbige Kartentypen erstellt habe
  if (typeof req.body.type === "string") {
    req.body.type = [req.body.type];
  }
  const { error } = cardSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Validation Error",
      details: error.details.map((detail) => detail.message),
    });
  }

  const newCard = new Card(req.body);

  try {
    await newCard.save();
    res.status(201).json({ success: true, data: newCard });
  } catch {
    console.error("Error saving card to database");
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Search for cardID makes more sense for me then to search for ObjectID
export const deleteCard = async (req, res) => {
  const { cardID } = req.params;

  try {
    const result = await Card.deleteOne({ cardID });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Card not found!" });
    }

    res.json({ success: true, message: "Card deleted!" });
  } catch (error) {
    console.error("Error deleting card from database");
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update via cardID makes more sense for me then to update via ObjectID
export const updateCard = async (req, res) => {
  const { cardID } = req.params;
  const card = req.body;

  if (typeof card.type === "string") {
    card.type = [card.type];
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
