"use client";

import { Menu } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessageBubble } from "@/components/chat/chat-message-bubble";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { MOCK_SESSIONS } from "@/lib/mock-sessions";
import type { ChatMessage } from "@/types/chat";

function toApiPayload(messages: ChatMessage[]) {
  return messages
    .filter((m) => m.content.trim().length > 0)
    .map((m) => ({ role: m.role, content: m.content }));
}

export function ChatView() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages, scrollToEnd]);

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
    setError(null);
    setStreamingId(null);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setError(null);
    setInput("");

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      createdAt: Date.now(),
    };
    const assistantId = crypto.randomUUID();
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      createdAt: Date.now(),
    };

    const history = [...messages, userMsg];
    setMessages([...history, assistantMsg]);
    setIsSending(true);
    setStreamingId(assistantId);

    const apiMessages = toApiPayload(history);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: full } : m
          )
        );
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setIsSending(false);
      setStreamingId(null);
    }
  };

  return (
    <div className="flex h-[100dvh] bg-page">
      <ChatSidebar
        sessions={MOCK_SESSIONS}
        onNewChat={handleNewChat}
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((o) => !o)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className="flex h-14 shrink-0 items-center gap-3 border-0 px-3 md:hidden"
          style={{
            boxShadow: "0 1px 0 0 var(--ring-color)",
            background: "var(--nav-bg)",
          }}
        >
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink"
            aria-label="Open chat history"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-serif text-lg font-medium text-ink">Chat</span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-6">
            {messages.length === 0 ? (
              <div className="mx-auto flex max-w-3xl flex-col items-center justify-center py-20 text-center">
                <p className="font-serif text-2xl font-medium text-ink">
                  Start a conversation
                </p>
                <p className="mt-2 max-w-md text-body-ui text-ink-secondary">
                  Ask anything — replies stream in real time from the Groq API.
                </p>
              </div>
            ) : (
              <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
                {messages.map((m, i) => {
                  const isLast = i === messages.length - 1;
                  const showTyping =
                    m.role === "assistant" &&
                    m.content === "" &&
                    isSending &&
                    isLast &&
                    streamingId === m.id;
                  return (
                    <ChatMessageBubble
                      key={m.id}
                      message={m}
                      showTyping={showTyping}
                    />
                  );
                })}
                <div ref={endRef} aria-hidden />
              </div>
            )}
            {error ? (
              <div
                className="mx-auto mt-4 max-w-3xl rounded-xl px-4 py-3 font-sans text-body-ui text-error"
                style={{
                  background: "rgba(181, 51, 51, 0.12)",
                  boxShadow: "0px 0px 0px 1px rgba(181,51,51,0.35)",
                }}
                role="alert"
              >
                {error}
              </div>
            ) : null}
          </div>

          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={handleSend}
            disabled={isSending}
          />
        </div>
      </div>
    </div>
  );
}
