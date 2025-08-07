import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Axios-Client
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Interceptor für Auth-Refresh (Tokens erneuern)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/users/login") &&
      !originalRequest.url.includes("/users/refresh")
    ) {
      originalRequest._retry = true;
      try {
        await api.post("/users/refresh");
        return api(originalRequest); // Request nochmal probieren
      } catch {
        const customError = new Error("Session expired. Please log in again.");
        customError.isAuthSessionExpired = true;
        return Promise.reject(customError);
      }
    }
    return Promise.reject(error);
  }
);

export const fetchCards = async () => {
  try {
    const response = await api.get("/cards");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Cards could not be loaded.");
  }
};

export const saveDeck = async (name, cards) => {
  const cardIds = cards.map((card) => card._id);
  try {
    const response = await api.post("/decks", { name, cards: cardIds });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Unknown error while saving deck");
  }
};

export const fetchAllDecks = async () => {
  try {
    const response = await api.get("/decks");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to load decks");
  }
};

export const deleteDeck = async (deckId) => {
  try {
    const response = await api.delete(`/decks/${deckId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error deleting Deck");
  }
};

export const registerUser = async (name, email, password, recaptchaToken) => {
  try {
    const response = await api.post("/users", { name, email, password, recaptchaToken });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error while register user");
  }
};

export const loginUser = async (name, password) => {
  try {
    const response = await api.post("/users/login", { name, password });
    return response.data;
  } catch (error) {
    throw new Error("Failed to login!");
  }
};

export default api;
