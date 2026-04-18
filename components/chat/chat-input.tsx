"use client";

import { motion } from "framer-motion";
import { Paperclip, Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export function ChatInput({ value, onChange, onSubmit, disabled }: Props) {
  const ta = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ta.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  return (
    <div
      className="mx-auto w-full max-w-3xl px-3 pb-4 pt-2 sm:px-4"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, var(--page) 35%)",
      }}
    >
      <div className="relative rounded-2xl bg-[var(--chat-input-bg)] p-2 shadow-whisper-dark ring-hairline">
        <textarea
          ref={ta}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!disabled && value.trim()) onSubmit();
            }
          }}
          placeholder="Message Claude..."
          className="max-h-40 min-h-[44px] w-full resize-none bg-transparent px-3 py-2.5 font-sans text-body-ui text-ink placeholder:text-ink-tertiary focus:outline-none"
          disabled={disabled}
          aria-label="Message input"
        />
        <div className="flex items-center justify-end gap-1 border-t border-transparent px-1.5 pb-1 pt-0.5 dark:border-dark-surface/50">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-tertiary transition-colors hover:bg-dark-surface/40 hover:text-warm-silver"
            aria-label="Attach file (placeholder)"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={onSubmit}
            disabled={disabled || !value.trim()}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-xl text-ivory transition-opacity",
              (!value.trim() || disabled) && "cursor-not-allowed opacity-40"
            )}
            style={{
              background: "#c96442",
              boxShadow: "0px 0px 0px 1px #c96442",
            }}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
