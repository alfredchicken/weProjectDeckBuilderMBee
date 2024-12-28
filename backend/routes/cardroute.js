import express from "express";
import mongoose from "mongoose";
import Card from "../models/cardmodel.js";
import { createCard, deleteCard, getCards, updateCard } from "../controllers/cardcontroller.js";

const router = express.Router();

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardID", deleteCard);
router.put("/:cardID", updateCard);

export default router;
