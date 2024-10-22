import { db } from "@/lib/firebase/config";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// Create a new conversation
async function startConversation(userId: string) {
  try {
    // Add a new chat document
    const chatRef = await addDoc(collection(db, "chats"), {
      userId: userId,
      startedAt: serverTimestamp(),
    });

    return chatRef.id; // conversationId
  } catch (e) {
    console.error("Error starting conversation: ", e);
  }
}

// Add a message to a conversation
async function addMessage(
  conversationId,
  sender,
  message,
  messageType = "text"
) {
  try {
    // Add a new message to the messages subcollection
    const messageRef = await addDoc(
      collection(db, "chats", conversationId, "messages"),
      {
        sender: sender,
        message: message,
        timestamp: serverTimestamp(),
        messageType: messageType,
      }
    );

    console.log("Message added with ID: ", messageRef.id);
  } catch (e) {
    console.error("Error adding message: ", e);
  }
}

export { startConversation, addMessage };
