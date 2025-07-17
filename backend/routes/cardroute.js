import express from "express";
import mongoose from "mongoose";
import Card from "../models/cardmodel.js";
import { createCard, deleteCard, getCards, updateCard } from "../controllers/cardcontroller.js";
import { adminOnly } from "../middleware/admin.js";
import { protect } from "../middleware/userauthMiddleware.js";
import { uploadWithValidation } from "../middleware/uploadWithValidation.js";

const router = express.Router();

router.get("/", getCards);
router.post("/", uploadWithValidation, protect, adminOnly, createCard);
router.delete("/:cardID", protect, adminOnly, deleteCard);
router.put("/:cardID", updateCard, protect, adminOnly);

export default router;
