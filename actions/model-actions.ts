"use server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { addMessage, getMessages } from "./firebase-actions";

export const analyzeChatToGet = async (conversationId) => {
  // Step 2: Convert chat history into a suitable format for the AI prompt
  const chatHistory = await getMessages(conversationId);
  const formattedChatHistory = chatHistory
    .map((msg) => {
      return `${msg.sender === "AI" ? "AI" : "User"}: ${msg.message}`;
    })
    .join("\n");

  // Step 3: Define the prompt with the previous chat messages
  const chat = new ChatGoogleGenerativeAI({
    model: "gemini-pro",
    maxOutputTokens: 2048,
    apiKey: process.env.GEMINI_API_KEY,
  });
  console.log("history", formattedChatHistory);
  const prompt = {
    role: "system",
    content: `You are a specialized Next.js project architect assistant. Your purpose is to help users develop their website concepts and create appropriate project structures.
  
  FORMAT FOR ALL RESPONSES:
  {
    "status": "[PHASE_NAME]",
    "message": "Your conversational response here",
    "details": {
      // Additional context-specific information
    }
  }
  
  INTERACTION PHASES:
  1. DISCOVERY
  - Ask focused questions about the website's purpose, target users, and core features
  - Status: "DISCOVERY"
  - Example: What specific problem does your website solve? Who are your target users?
  
  2. REFINEMENT
  - Help clarify and enhance the initial concept
  - Status: "REFINEMENT"
  - Summarize understanding and suggest improvements
  
  3. CONFIRMATION
  - Present final concept for approval
  - Status: "CONFIRMATION"
  - Include complete project summary
  
  4. STRUCTURE
  - Generate Next.js folder structure
  - Status: "STRUCTURE"
  - Include detailed file organization
  
  Previous Chat Context: ${formattedChatHistory}
  
  RULES:
  - Always respond in the specified JSON format
  - Maintain a conversational tone within the "message" field
  - Each response must build upon previous context
  - Include specific Next.js best practices in recommendations
  
  Example Response:
  {
    "status": "DISCOVERY",
    "message": "Let's start by understanding your vision. What type of website are you looking to build? Tell me about its main purpose and key features.",
    "details": {
      "phase": "Initial Contact",
      "next_steps": ["Gather basic requirements", "Identify core features"]
    }
  }`,
  };
  // Step 4: Invoke the AI with the prompt
  const response = await chat.invoke([prompt]);
  const content = JSON.parse(response.content as string) as {
    status: string;
    message: string;
  };
  console.log("AI Response:", content);
  const res = await addMessage(conversationId, "system", content.message);

  console.log("AI Response:", content);
  return JSON.parse(JSON.stringify(content)) as {
    status: string;
    message: string;
  };
};

[
  {
    lc: 1,
    type: "constructor",
    id: ["langchain_core", "messages", "AIMessage"],
    kwargs: {
      content:
        '{\n  "status": "IDEA_CLARIFICATION",\n  "message": "What kind of website do you want to build?"\n}',
      tool_calls: [],
      additional_kwargs: {
        finishReason: "STOP",
        index: 0,
        safetyRatings: [
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            probability: "NEGLIGIBLE",
          },
          { category: "HARM_CATEGORY_HATE_SPEECH", probability: "NEGLIGIBLE" },
          { category: "HARM_CATEGORY_HARASSMENT", probability: "NEGLIGIBLE" },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            probability: "NEGLIGIBLE",
          },
        ],
      },
      usage_metadata: {
        input_tokens: 662,
        output_tokens: 30,
        total_tokens: 692,
      },
      invalid_tool_calls: [],
      response_metadata: {
        finishReason: "STOP",
        index: 0,
        safetyRatings: [
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            probability: "NEGLIGIBLE",
          },
          { category: "HARM_CATEGORY_HATE_SPEECH", probability: "NEGLIGIBLE" },
          { category: "HARM_CATEGORY_HARASSMENT", probability: "NEGLIGIBLE" },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            probability: "NEGLIGIBLE",
          },
        ],
      },
    },
  },
];
