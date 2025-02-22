const API_URL = "http://localhost:5000/api";

export const fetchCards = async () => {
  try {
    const response = await fetch(`${API_URL}/cards`);
    if (!response.ok) throw new Error("No Cards responded!");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("No Coards loaded!", error);
    return [];
  }
};

export default fetchCards;
