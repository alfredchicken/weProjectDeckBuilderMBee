import express from "express";
import { createDeck, getDecks, deleteDeck, updateDeck } from "../controllers/deckcontroller.js";
import { protect } from "../middleware/userauthMiddleware.js";

const router = express.Router();

router.get("/", protect, getDecks);
router.post("/", protect, createDeck);
router.delete("/:deckId", protect, deleteDeck);
router.put("/:id", protect, updateDeck);

export default router;
