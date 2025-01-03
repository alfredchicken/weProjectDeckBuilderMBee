import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cardRoutes from "./routes/cardroute.js";
import deckRoutes from "./routes/deckroute.js";

dotenv.config();

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/cards", cardRoutes);
app.use("/api/decks", deckRoutes);

app.listen(`${PORT}`, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
