import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cardRoutes from "./routes/cardroute.js";
import deckRoutes from "./routes/deckroute.js";
import userRoutes from "./routes/userroute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);
  socket.on("disconnect", () => {
    console.log("A user disconnected: " + socket.id);
  });
});

app.use(cookieParser());
app.use("/images", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  next();
});
app.use("/images", express.static(path.join(process.cwd(), "backend", "public", "images")));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/cards", cardRoutes);
app.use("/api/decks", deckRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});

export { io };
