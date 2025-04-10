import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    cardID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: [String], // vorher: String
      required: true,
    },
    attack: {
      type: Number,
      required: true,
    },
    playcost: {
      type: Number,
      required: true,
    },
    imgURL: {
      type: String,
      required: true,
    },
    rarity: {
      type: String,
      required: true,
    },
    cardtype: {
      type: String,
      required: true,
    },
    tribe: {
      type: String,
      required: true,
    },
    flipover: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true, // fügt Zeitstempel hinzu
  }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;
