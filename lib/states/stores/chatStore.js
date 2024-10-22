import { create } from "zustand";

const useChatStore = create((set) => ({
  chats: [],
  addChat: ({ id, by, message, createdAt }) =>
    set((state) => ({
      chats: [...state.chats, { id, by, message, createdAt }],
    })),
}));

export default useChatStore;
