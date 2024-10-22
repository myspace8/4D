"use client";

import { startConversation } from "@/actions/firebase-actions";
import { useRouter } from "next/navigation";
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
      setCoversationId(conversationId);
      router.push(`/discover/${conversationId}`);
    } catch (error) {
      console.error("Error starting conversation: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex min-h-screen bg-gray-900 text-gray-300 items-center justify-center flex-col gap-6">
      <button
        className="px-6 py-4 bg-white rounded-md h-fit text-gray-800"
        onClick={handleStateNewProject}
      >
        Start a new project
      </button>
      {loading && <p>Creating new project...</p>}
      {conversationId && (
        <p>A new conversation was created. ConversationId: {conversationId}</p>
      )}
    </div>
  );
}
