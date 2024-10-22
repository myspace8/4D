import { create } from "zustand";

interface ChatStore {
  chat?: {
    id: string;
    sender: "system" | "user";
    message: string;
    timestamp: string;
  };
  chats: ChatStore["chat"][];
  addChat: (data: ChatStore["chat"]) => void;
  initializeChats: (data: ChatStore["chat"][]) => void;
}
const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  addChat: ({ id, sender, message, timestamp }) => {
    set((state) => ({
      chats: [...state.chats, { id, sender, message, timestamp }],
    }));
  },
  initializeChats: (data) => {
    set((state) => ({
      chats: data,
    }));
  },
}));

export default useChatStore;
