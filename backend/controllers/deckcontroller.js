import Deck from "../models/deckmodel.js";
import Card from "../models/cardmodel.js";
import mongoose from "mongoose";

export const createDeck = async (req, res) => {
  console.log("POST /api/decks → req.body:", req.body);

  const { name, cards } = req.body;

  if (!name || !Array.isArray(cards) || cards.length !== 50) {
    return res.status(400).json({
      success: false,
      message: "Name and exactly 50 cards are needed!",
    });
  }

  try {
    const invalidCards = cards.filter((cardId) => !mongoose.Types.ObjectId.isValid(cardId)); //prüft, ob die cardId eine gültige ObjectId ist

    if (invalidCards.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Eine oder mehr ObjectIDs sind ungültig.",
        invalidCardIDs: invalidCards,
      });
    }

    const newDeck = new Deck({ name, cards, createdBy: req.user.userId });
    const savedDeck = await newDeck.save();

    res.status(201).json({
      success: true,
      data: savedDeck,
      message: "Deck gespeichert!",
    });
  } catch (error) {
    console.error("Fehler beim speichern des Decks in die Datenbank", error);

    res.status(500).json({ success: false, message: "Server error während dem Deck speichern." });
  }
};

export const getDecks = async (req, res) => {
  try {
    const decks = await Deck.find({ createdBy: req.user.userId }).populate("cards");
    res.status(200).json({ success: true, data: decks });
  } catch (error) {
    console.error("Error while loading Database", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteDeck = async (req, res) => {
  const { deckId } = req.params;

  try {
    const deck = await Deck.findById(deckId);

    if (!deck) {
      return res.status(404).json({ success: false, message: "Deck not found!" });
    }

    // Check if the deck belongs to the logged-in user
    if (deck.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "Not allowed to delete deck!" });
    }

    await deck.deleteOne();

    res.status(200).json({ success: true, message: "Deck deleted!" });
  } catch (error) {
    console.error("Error while deleting deck:", error);
    res.status(500).json({ success: false, message: "Servererror while deleting." });
  }
};

export const updateDeck = async (req, res) => {
  const { id } = req.params;
  const { name, cards } = req.body;

  if (!name || !Array.isArray(cards) || cards.length !== 50) {
    return res.status(400).json({
      success: false,
      message: "Name und exakt 50 Karten sind für ein Deck nötig!",
    });
  }

  try {
    const invalidCards = cards.filter((cardId) => !mongoose.Types.ObjectId.isValid(cardId));

    if (invalidCards.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Eine oder mehr ObjectIDs sind ungültig.",
        invalidCardIDs: invalidCards,
      });
    }

    const updatedDeck = await Deck.findByIdAndUpdate(id, { name, cards }, { new: true }).populate("cards"); // importiert Kartendetails von einer anderen Collection (cards) auf mongoDB

    if (!updatedDeck) {
      return res.status(404).json({ success: false, message: "Deck nicht gefunden!" });
    }

    res.status(200).json({ success: true, data: updatedDeck });
  } catch (error) {
    console.error("Fehler beim Updaten des Decks in der DB:", error);

    res.status(500).json({ success: false, message: "Fehler während dem Updaten vom Deck." });
  }
};
