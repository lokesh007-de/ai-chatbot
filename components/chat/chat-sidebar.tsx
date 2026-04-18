"use client";

import { MessageSquarePlus, PanelLeftClose, User } from "lucide-react";
import Link from "next/link";
import type { ChatSession } from "@/types/chat";
import { formatMessageTime } from "@/lib/format-time";
import { cn } from "@/lib/cn";

type Props = {
  sessions: ChatSession[];
  onNewChat: () => void;
  mobileOpen: boolean;
  onToggleMobile: () => void;
};

export function ChatSidebar({
  sessions,
  onNewChat,
  mobileOpen,
  onToggleMobile,
}: Props) {
  const sorted = [...sessions].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-full max-h-[100dvh] w-[min(100%,280px)] -translate-x-full flex-col bg-[var(--sidebar-bg)] transition-transform duration-300 md:relative md:z-0 md:w-72 md:translate-x-0",
          mobileOpen && "translate-x-0"
        )}
        style={{
          boxShadow: "4px 0 32px rgba(0,0,0,0.12), 0px 0px 0px 1px var(--ring-color)",
        }}
      >
        <div className="flex items-center justify-between gap-2 border-0 p-3">
          <Link
            href="/"
            className="font-serif text-lg font-medium text-ink md:hidden"
          >
            Salon
          </Link>
          <button
            type="button"
            onClick={onToggleMobile}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-secondary md:hidden"
            aria-label="Close sidebar"
          >
            <PanelLeftClose className="h-5 w-5" />
          </button>
        </div>
        <div className="px-3">
          <button
            type="button"
            onClick={() => {
              onNewChat();
              onToggleMobile();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-warm-sand py-3 font-sans text-body-ui font-medium text-charcoal-warm transition-opacity hover:opacity-95 dark:bg-dark-surface dark:text-warm-silver"
            style={{
              boxShadow: "0px 0px 0px 1px #d1cfc5",
            }}
          >
            <MessageSquarePlus className="h-4 w-4" />
            New Chat
          </button>
        </div>
        <div className="mt-4 flex-1 overflow-y-auto px-2 pb-4">
          <p className="px-2 pb-2 font-sans text-overline uppercase tracking-wide text-ink-tertiary">
            History
          </p>
          <ul className="space-y-1">
            {sorted.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  className="flex w-full flex-col rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-ivory/60 dark:hover:bg-dark-surface"
                  style={{
                    boxShadow: "inset 0px 0px 0px 1px transparent",
                  }}
                >
                  <span className="truncate font-sans text-body-ui text-ink">
                    {s.title}
                  </span>
                  <span className="mt-0.5 font-sans text-caption text-ink-tertiary">
                    {formatMessageTime(s.updatedAt)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="mt-auto flex items-center gap-3 px-3 py-4"
          style={{
            boxShadow: "inset 0 1px 0 0 var(--ring-color)",
          }}
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ivory"
            style={{
              background: "#30302e",
              boxShadow: "0px 0px 0px 1px #30302e",
            }}
            aria-hidden
          >
            <User className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <p className="truncate font-sans text-body-ui font-medium text-ink">
              Alex Rivers
            </p>
            <p className="truncate font-sans text-caption text-ink-tertiary">
              Salon member
            </p>
          </div>
        </div>
      </aside>
      {mobileOpen ? (
        <button
          type="button"
          aria-hidden
          className="fixed inset-0 z-30 bg-near-black/50 backdrop-blur-sm md:hidden"
          onClick={onToggleMobile}
        />
      ) : null}
    </>
  );
}
