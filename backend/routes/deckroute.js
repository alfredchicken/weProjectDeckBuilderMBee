import express from "express";
import mongoose from "mongoose";
import Deck from "../models/deckmodel.js";
import { createDeck, getDecks, deleteDeck, updateDeck } from "../controllers/deckcontroller.js";

const router = express.Router();

router.get("/", getDecks);
router.post("/", createDeck);
router.delete("/:_id", deleteDeck);
router.put("/:id", updateDeck);

export default router;
