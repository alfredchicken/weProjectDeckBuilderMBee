import Card from "../models/cardmodel.js";
import mongoose from "mongoose";

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).json({ success: true, data: cards });
  } catch (error) {
    console.log("Error fetching cards from database");
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createCard = async (req, res) => {
  const card = req.body;

  if (
    !card.name ||
    !card.cardID ||
    !card.type ||
    !card.attack ||
    !card.playcost ||
    !card.imgURL ||
    !card.cardclass ||
    !card.rarity ||
    !card.cardtype
  ) {
    return res.status(400).json({ message: "All Fields are requirde" });
  }

  const newCard = new Card(card);

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
