import mongoose from "mongoose";

const deckSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
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
    timestamps: true, 
  }
);

const Deck = mongoose.model("Deck", deckSchema);

export default Deck;
