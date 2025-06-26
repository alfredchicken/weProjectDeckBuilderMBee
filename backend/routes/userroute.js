import express from "express";
import { createUser, deleteUser, getUser, loginUser, updateUser, logoutUser, refreshAccessToken } from "../controllers/usercontroller.js";
import { protect } from "../middleware/userauthMiddleware.js";

const router = express.Router();

router.get("/me", protect, async (req, res) => {
  res.status(200).json({ name: req.user.name, role: req.user.role });
});

router.get("/", getUser);
router.post("/", createUser);
router.delete("/:name", deleteUser);
router.put("/:name", updateUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshAccessToken);

export default router;
