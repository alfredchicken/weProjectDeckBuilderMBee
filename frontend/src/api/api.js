const API_URL = "http://localhost:5000/api";

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
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token not set");
  const cardIds = cards.map((card) => card._id);

  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, cards: cardIds }),
  });

  const text = await response.text();
  console.log("Rohantwort vom Server:", text);

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
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Kein Token vorhanden!");

  const response = await fetch(`${API_URL}/decks`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,  
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Fehler beim Laden der Decks");
  }

  const data = await response.json();
  return data.data;
};


export const deleteDeck = async (deckId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Kein Token vorhanden!");

  const response = await fetch(`${API_URL}/decks/${deckId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Fehler beim Löschen des Decks");
  }

  return response.json();
};

// Registrierung
export const registerUser = async (name, password) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Ungültige Antwort vom Server");
  }

  if (!response.ok) {
    throw new Error(data.message || "Fehler bei Registrierung");
  }

  return data;
};

// Login
export const loginUser = async (name, password) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error("Failed to login!");
  return data;
};
