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
      type: String,
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
    timestamps: true, // this will add createdAt and updatedAt fields to the schema
  }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;
