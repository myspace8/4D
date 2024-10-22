// "use server";
import { db } from "@/lib/firebase/config";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
  getDoc,
  getDocs,
  query,
  orderBy,
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
  conversationId: string,
  sender: "user" | "system",
  message: string
) {
  try {
    // Add a new message to the messages subcollection
    const messageRef = await addDoc(
      collection(db, "chats", conversationId, "messages"),
      {
        sender: sender,
        message: message,
        timestamp: serverTimestamp(),
      }
    );

    console.log("Message added with ID: ", messageRef.id);
  } catch (e) {
    console.error("Error adding message: ", e);
  }
}
async function getMessages(conversationId: string) {
  try {
    // Reference the messages subcollection
    const messagesRef = collection(db, "chats", conversationId, "messages");

    // Query to get all messages ordered by timestamp
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    // Get the documents from the query
    const querySnapshot = await getDocs(q);

    // Extract messages from the snapshot
    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return messages as {
      id: string;
      message: string;
      sender: string;
      timestamp: string;
    }[];
  } catch (e) {
    console.error("Error fetching messages: ", e);
  }
}
export { startConversation, addMessage, getMessages };
