import Groq from "groq-sdk";

export const runtime = "nodejs";

const MODEL = "llama-3.3-70b-versatile";

type IncomingMessage = { role: string; content: string };

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Missing GROQ_API_KEY" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const raw = body.messages ?? [];
  const messages = raw
    .filter((m) => typeof m.content === "string" && m.content.trim().length > 0)
    .map((m) => {
      const role =
        m.role === "assistant"
          ? "assistant"
          : m.role === "system"
            ? "system"
            : "user";
      return { role, content: m.content } as Groq.Chat.Completions.ChatCompletionMessageParam;
    });

  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: "No messages provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const groq = new Groq({ apiKey });

  let stream: AsyncIterable<Groq.Chat.Completions.ChatCompletionChunk>;
  try {
    stream = await groq.chat.completions.create({
      model: MODEL,
      messages,
      stream: true,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Groq request failed";
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
