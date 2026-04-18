import type { ChatSession } from "@/types/chat";

export const MOCK_SESSIONS: ChatSession[] = [
  { id: "1", title: "Product strategy notes", updatedAt: Date.now() - 1000 * 60 * 30 },
  { id: "2", title: "API design feedback", updatedAt: Date.now() - 1000 * 60 * 60 * 2 },
  { id: "3", title: "React performance tips", updatedAt: Date.now() - 1000 * 60 * 60 * 24 },
  { id: "4", title: "Brand copy exploration", updatedAt: Date.now() - 1000 * 60 * 60 * 48 },
];
