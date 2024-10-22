"use client";

import { startConversation } from "@/actions/firebase-actions";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [conversationId, setCoversationId] = useState("");
  const handleStateNewProject = async () => {
    setLoading(true);
    try {
      const userId = "divquan";
      const conversationId = await startConversation(userId);
      router.push(`/discover/${conversationId}`);
    } catch (error) {
      console.error("Error starting conversation: ", error);
    }
  };
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex max-h-screen bg-gray-900 text-gray-300">
      <button>Start a new project</button>
      {loading && <p>Loading...</p>}
      {conversationId && (
        <p>A new conversation was created. ConversationId: {conversationId}</p>
      )}
    </div>
  );
}
