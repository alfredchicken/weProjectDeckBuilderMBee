import mongoose from "mongoose";

const deckSchema = new mongoose.Schema(
  {
    name: {
      type: String, // name of the deck
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
      type: String, // name of user
      required: false,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt fields
  }
);

const Deck = mongoose.model("Deck", deckSchema);

export default Deck;
