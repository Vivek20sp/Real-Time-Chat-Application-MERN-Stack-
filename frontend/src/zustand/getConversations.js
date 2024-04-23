import { create } from "zustand";

const getConversations = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
  messages: [],
  setMessages: (newMessages) => {
    set({ messages: newMessages });
  },
}));

export default getConversations;
