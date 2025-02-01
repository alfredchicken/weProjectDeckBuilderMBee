import mongoose from "mongoose";

const deckSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId, // objectID of card to reference to cards database
        ref: "Card",
        required: true,
      },
    ],
    createdBy: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt fields
  }
);

const Deck = mongoose.model("Deck", deckSchema);

export default Deck;
