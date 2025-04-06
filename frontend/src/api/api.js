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

export default fetchCards;
