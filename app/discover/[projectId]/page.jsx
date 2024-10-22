"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatArea from "@/components/ChatArea";
import { getMessages } from "@/actions/firebase-actions";
import useChatStore from "@/lib/states/stores/chatStore";

export default function Home({ params }) {
  const initializeChats = useChatStore((state) => state.initializeChats);

  useEffect(() => {
    (async () => {
      try {
        const messages = await getMessages(params.projectId);
        console.log("messages", messages);
        initializeChats(messages);
      } catch (e) {
        console.log("error getting messages", e);
      }
    })();
  }, []);
  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-gray-900 text-gray-300">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel>
          <ChatArea />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
