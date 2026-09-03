import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    console.log("Received messages:", messages);

    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      messages,
    });

    return result.toUIMessageStreamResponse();

  } catch (error) {
    console.error("AI ROUTE ERROR:", error);

    return new Response(
      JSON.stringify({
        error: "AI request failed",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}