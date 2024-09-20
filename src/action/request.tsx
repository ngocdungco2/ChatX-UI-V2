"use server";
import { ReactNode } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
  display?: ReactNode;
}

// TODO: handle error every request

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
    console.error("Error fetching data:", error);
    throw error; // Ném lỗi nếu có
  }
};

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
          // TODO: replace with dynamic token
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error get history chat:", error);
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
// lịch sử chat
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
    return { message: "Cant get history conversation" };
  }
};
