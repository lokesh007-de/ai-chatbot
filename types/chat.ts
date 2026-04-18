export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: number;
}

export interface ChatSession {
  id: string;
  title: string;
  updatedAt: number;
}
