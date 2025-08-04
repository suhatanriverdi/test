import axios from "axios";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
      role: string;
    };
    finishReason: string;
    safetyRatings: {
      category: string;
      probability: string;
    }[];
  }[];
  promptFeedback: {
    safetyRatings: {
      category: string;
      probability: string;
    }[];
  };
}

export const geminiApi = {
  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await axios.post<GeminiResponse>(
        GEMINI_API_URL,
        {
          contents: {
            role: "user",
            parts: [
              {
                text: `You are an AI assistant specializing in oil drilling operations and analysis. 
              Help the user with their drilling-related questions. Current question: ${prompt}`,
              },
            ],
          },
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY,
          },
        }
      );

      if (
        response.data.candidates &&
        response.data.candidates[0]?.content?.parts[0]?.text
      ) {
        return response.data.candidates[0].content.parts[0].text;
      }

      throw new Error("Invalid response format from Gemini API");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Gemini API Error: ${
            error.response?.data?.error?.message || error.message
          }`
        );
      }
      throw error;
    }
  },
};
