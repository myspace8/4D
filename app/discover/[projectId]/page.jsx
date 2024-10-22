import React from "react";
import Image from "next/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatArea from "@/components/ChatArea";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
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
