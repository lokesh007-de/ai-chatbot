import type { Metadata } from "next";
import { ChatView } from "@/components/chat/chat-view";

export const metadata: Metadata = {
  title: "Chat — Salon",
  description: "Streamed AI conversation in a calm, minimal workspace.",
};

export default function ChatPage() {
  return <ChatView />;
}
