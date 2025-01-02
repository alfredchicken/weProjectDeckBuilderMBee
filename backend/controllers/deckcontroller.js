import Deck from "../models/deckmodel.js";
import Card from "../models/cardmodel.js";
import mongoose from "mongoose";

export const createDeck = async (req, res) => {
  const { name, cards } = req.body;

  if (!name || !Array.isArray(cards) || cards.length !== 50) {
    return res.status(400).json({
      success: false,
      message: "Name and exactly 50 cards are required for a Deck!",
    });
  }

  try {
    const invalidCards = cards.filter((cardId) => !mongoose.Types.ObjectId.isValid(cardId)); //check if iD is valid

    if (invalidCards.length > 0) {
      return res.status(400).json({
        success: false,
        message: "One or more card ObjectIds are invalid.",
        invalidCardIDs: invalidCards,
      });
    }

    const newDeck = new Deck({ name, cards });
    const savedDeck = await newDeck.save();

    res.status(201).json({
      success: true,
      data: savedDeck,
      message: "Deck successfully saved!",
    });
  } catch (error) {
    console.error("Error saving deck to database:", error);

    res.status(500).json({ success: false, message: "Server error while saving deck." });
  }
};

export const getDecks = async (req, res) => {
  try {
    const decks = await Deck.find({}).populate("cards");
    res.status(200).json({ success: true, data: decks });
  } catch (error) {
    console.error("Error fetching decks from database", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteDeck = async (req, res) => {
  const { _id } = req.params;

  console.log("id", _id);

  try {
    const deletedDeck = await Deck.findByIdAndDelete(_id);

    if (!deletedDeck) {
      return res.status(404).json({ success: false, message: "Deck not found!" });
    }

    res.status(200).json({ success: true, message: "Deck deleted!" });
  } catch (error) {
    console.error("Error deleting deck from database:", error);
    res.status(500).json({ success: false, message: "Server error while deleting deck." });
  }
};

export const updateDeck = async (req, res) => {
  const { id } = req.params;
  const { name, cards } = req.body;

  if (!name || !Array.isArray(cards) || cards.length !== 50) {
    return res.status(400).json({
      success: false,
      message: "Name and exactly 50 cards are required for a Deck!",
    });
  }

  try {
    const invalidCards = cards.filter((cardId) => !mongoose.Types.ObjectId.isValid(cardId));

    if (invalidCards.length > 0) {
      return res.status(400).json({
        success: false,
        message: "One or more card ObjectIds are invalid.",
        invalidCardIDs: invalidCards,
      });
    }

    const updatedDeck = await Deck.findByIdAndUpdate(id, { name, cards }, { new: true }).populate("cards"); // import carddetails from other collection (cards) on mongoDB

    if (!updatedDeck) {
      return res.status(404).json({ success: false, message: "Deck not found!" });
    }

    res.status(200).json({ success: true, data: updatedDeck });
  } catch (error) {
    console.error("Error updating deck in database:", error);

    res.status(500).json({ success: false, message: "Server error while updating deck." });
  }
};
