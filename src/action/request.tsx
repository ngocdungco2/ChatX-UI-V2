"use server";
import { ReactNode } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
  display?: ReactNode;
}

// TODO: handle error every request

// Send message
export const sendMessage = async (
  question: string,
  chatId: string,
  token: string
) => {
  try {
    const res = await fetch("https://api.chatx.vn/v1/chat-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // TODO: replace with dynamic token
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        inputs: {},
        query: question,
        response_mode: "blocking",
        conversation_id: chatId,
        user: "abc-123"
      })
    });

    const data = await res.json();
    return data; // Trả về kết quả
  } catch (error) {
    throw new Error("Cant not send message");
  }
};

// Previus chat
export const getHistoryChat = async (
  userId: string,
  conversationId: string,
  token: string
) => {
  try {
    const res = await fetch(
      `https://api.chatx.vn/v1/messages?user=${userId}&conversation_id=${conversationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    // console.error("Error get history chat:", error);
    throw new Error("Cant not fetch previus chat with Bot");
  }
};

// Chat history for sidebar
export const getHistoryConversation = async (name: string, token: string) => {
  try {
    const res = await fetch(
      `https://api.chatx.vn/v1/conversations?user=${name}&limit=7`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );
    const data = res.json();
    return data;
  } catch (error) {
    // console.error("get history chat: ", error);
    throw new Error("History conversation fetch failed");
  }
};

// decrapated
// export const continueMessage = async (
//   question: string,
//   conversationId: string,
//   token: string
// ) => {
//   try {
//     const res = await fetch("https://api.chatx.vn/v1/chat-messages", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         inputs: {},
//         query: question,
//         response_mode: "blocking",
//         conversation_id: conversationId,
//         user: "abc-123",
//       }),
//     });
//   } catch (error) {
//     console.error("Error while continue to chat:", error);
//   }
// };

export const sendMessageStreaming = () => {};
