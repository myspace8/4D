"use client";
import useChatStore from "@/lib/states/stores/chatStore";
import { useState } from "react";

const ChatArea = () => {
  return (
    <div className="max-h-screen h-full flex flex-col relative overflow-hidden ">
      <Chats />
      <TextArea />
    </div>
  );
};

export default ChatArea;

const TextArea = () => {
  const addChat = useChatStore((state) => state.addChat);
  const allChat = useChatStore((state) => state.chats);
  const [text, setText] = useState("");
  const conversationId = usePathname().split("/")[2];
  const [modelIsResponding, setModelIsResponding] = useState(false);
  const handleAddChat = async () => {
    if (!text) {
      return;
    }
    setModelIsResponding(true);
    const id = Math.random() * 10;
    const dateNow = new Date().toISOString();
    await addMessage(conversationId, "user", text);
    addChat({ id, by: "user", message: text, timestamp: dateNow });

    setText("");

    const response = await analyzeChatToGet(
      conversationId,
      JSON.stringify([
        allChat,
        { by: "user", message: text, timestamp: dateNow },
      ])
    );
    console.log("response", response);
    addChat({
      id: Math.random() * 10,
      sender: "system",
      message: response.message,
      timestamp: dateNow,
    });
    setModelIsResponding(false);
  };
  return (
    <div className="p-8 w-full">
      <div className="relative w-full">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="w-full max-h-20 h-full outline-none border border-gray-400  rounded-2xl focus:border-gray-600 p-4 bg-transparent"
        ></textarea>
        <button
          disabled={modelIsResponding}
          className="px-2 py-1 absolute right-3 top-1/2 -translate-y-1/2 bg-green-900 text-white rounded-xl"
          onClick={handleAddChat}
        >
          {modelIsResponding ? "our model is responding" : "Send"}
        </button>
      </div>
    </div>
  );
};

import { ScrollArea } from "@/components/ui/scroll-area";
import { addMessage } from "@/actions/firebase-actions";
import { usePathname } from "next/navigation";
import { analyzeChatToGet } from "@/actions/model-actions";
const Chats = () => {
  const chats = useChatStore((state) => state.chats);
  if (chats.length <= 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-center">
        Here, you can explore your idea and build the perfect solution. Let’s
        start by discussing what you’re working on.
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 h-[80vh]">
      <div className="flex-1 flex flex-col gap-6 p-4">
        {chats.map((item, index) => {
          return (
            <div key={index}>
              <Chatbox
                message={item.message}
                timestamp={item.timestamp}
                messageBy={item.sender}
              />
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

const Chatbox = ({ message, timestamp, messageBy }) => {
  return (
    <div className={`flex ${messageBy === "system" ? " " : " justify-end "}`}>
      <div
        className={`text-gray-900 w-2/3 p-2  rounded-lg ${
          messageBy === "system" ? "bg-blue-300" : "bg-green-300"
        }`}
      >
        <p className="w-full">{message}</p>
        {/* <div>{`${timestamp}`}</div> */}
      </div>
    </div>
  );
};
