import { streamText } from "ai";

export async function POST(req) {
  const { messages } = await req.json();

  // Call your LLM provider
  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent" , {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"AIzaSyD7jFfmKhRipZCbCoTHRKMBYPDfrAuEJyc"}`,
    },
    body: JSON.stringify({
      messages,
    }),
  });

  const data = await res.json();

  // Stream response back to UI
  return streamText({
    model: {
      async doStream() {
        return {
          textStream: async function* () {
            yield data.reply || "No response from model";
          },
        };
      },
    },
  });
}
