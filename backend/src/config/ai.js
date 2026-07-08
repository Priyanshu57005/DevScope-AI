const { GoogleGenerativeAI } = require("@google/generative-ai");

let genAI = null;

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} else {
  console.warn("GEMINI_API_KEY is not set in env. AI features will be bypassed.");
}

const getGeminiModel = (modelName = "gemini-1.5-flash") => {
  if (!genAI) return null;
  return genAI.getGenerativeModel({ model: modelName });
};

module.exports = {
  genAI,
  getGeminiModel
};