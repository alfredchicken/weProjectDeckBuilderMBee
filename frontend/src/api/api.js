const API_URL = "http://localhost:5000/api";

// holt die Karten, Decks vom Server

export const fetchCards = async () => {
  try {
    const response = await fetch(`${API_URL}/cards`);
    if (!response.ok) throw new Error("Keine Karten erhalten beim FetchCards");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Keine Karten erhalten bei FetchCards!", error);
    return [];
  }
};

export const saveDeck = async (name, cards) => {
  const cardIds = cards.map((card) => card._id);

  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, cards: cardIds }),
  });

  const text = await response.text();
  console.log("Rohantwort vom Server:", text); // Hilft beim Debuggen

  let data;

  try {
    data = JSON.parse(text);
  } catch (err) {
    throw new Error("Antwort war kein gültiges JSON:\n" + text);
  }

  if (!response.ok) {
    throw new Error(data.message || "Unbekannter Fehler vom Server.");
  }

  return data;
};

export const fetchAllDecks = async () => {
  const response = await fetch(`${API_URL}/decks`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Fehler beim Laden der Decks");
  }
  return data.data;
};
