"use client";

import { motion } from "framer-motion";
import type { ChatMessage } from "@/types/chat";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { formatMessageTime } from "@/lib/format-time";
import { cn } from "@/lib/cn";

type Props = {
  message: ChatMessage;
  showTyping?: boolean;
};

export function ChatMessageBubble({ message, showTyping }: Props) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[min(100%,32rem)] rounded-2xl px-4 py-3",
          isUser
            ? "text-bubble-user-ink"
            : "text-ink"
        )}
        style={{
          background: isUser ? "var(--bubble-user)" : "var(--bubble-assistant)",
          boxShadow: isUser
            ? "0 12px 32px rgba(201, 100, 66, 0.28), 0px 0px 0px 1px rgba(201,100,66,0.35)"
            : "0px 4px 24px rgba(0,0,0,0.2), 0px 0px 0px 1px #30302e",
        }}
      >
        {showTyping ? (
          <TypingIndicator />
        ) : (
          <p
            className="whitespace-pre-wrap font-sans text-body-ui"
            style={{ lineHeight: 1.6 }}
          >
            {message.content}
          </p>
        )}
        <p
          className={cn(
            "mt-2 text-right font-sans text-label",
            isUser ? "text-ivory/80" : "text-ink-tertiary dark:text-warm-silver/70"
          )}
        >
          {formatMessageTime(message.createdAt)}
        </p>
      </div>
    </motion.div>
  );
}
