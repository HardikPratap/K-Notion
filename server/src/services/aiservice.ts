import axios from "axios";
import { ENV } from "../config/env";

/**
 * Summarize a text or URL content. This is a simple wrapper.
 * Replace body with your desired OpenAI prompt & model.
 */
export async function summarizeText(text: string) {
  if (!ENV.OPENAI_API_KEY) {
    return { summary: "" };
  }

  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini", // replace with available model in your account
        messages: [
          { role: "system", content: "You are a helpful summarizer." },
          { role: "user", content: `Summarize the following text into key bullet points:\n\n${text}` }
        ],
        max_tokens: 400
      },
      {
        headers: {
          Authorization: `Bearer ${ENV.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const summary = res.data?.choices?.[0]?.message?.content || "";
    return { summary };
  } catch (err) {
    return { summary: "" };
  }
}