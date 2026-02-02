import axios from "axios";

const API_BASE = "http://localhost:5000"; // your Flask backend

export const askCareerCoach = async (question) => {
  try {
    const response = await axios.post(`${API_BASE}/chat`, {
      question,
    });
    return response.data.reply;
  } catch (err) {
    console.error("Error talking to coach:", err);
    return "Sorry, I couldn't reach the coach. Try again later.";
  }
};

