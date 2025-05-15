import express from "express";
import { createUser, deleteUser, getUser, loginUser, updateUser } from "../controllers/usercontroller.js";
import { protect } from "../middleware/userauthMiddleware.js";
import mongoose from "mongoose";
import User from "../models/usersmodel.js";

const router = express.Router();

router.get("/me", protect, async (req, res) => {
  res.status(200).json({ name: req.user.name });
});

router.get("/", getUser);
router.post("/", createUser);
router.delete("/:name", deleteUser);
router.put("/:name", updateUser);
router.post("/login", loginUser);

export default router;
