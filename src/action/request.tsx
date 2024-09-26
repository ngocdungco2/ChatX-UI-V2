"use server";
import { url } from "inspector";
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

// Previous chat
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
    throw new Error("Cant not fetch previous chat with Bot");
  }
};

// Chat history for sidebar
export const getHistoryConversation = async (name: string, token: string) => {
  try {
    const res = await fetch(
      `https://api.chatx.vn/v1/conversations?user=${name}&limit=6`,
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

export const isValidKey = async (key: string) => {
  try {
    const res = await fetch("https://api.chatx.vn/v1/chat-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify({
        inputs: {},
        query: "alo",
        response_mode: "blocking",
        conversation_id: "",
        user: "test"
      })
    });
    const data = await res.json();
    return data.answer ? true : false;
  } catch (e) {
    console.error(e);
    throw new Error("Can not valid key");
  }
};
export const sendMessageWithPicture = async (
  question: string,
  chatId: string,
  token: string,
  file: any
) => {
  try {
    const res = await fetch("https://api.chatx.vn/v1/chat-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        inputs: {},
        query: question,
        response_mode: "blocking",
        conversation_id: chatId,
        user: "abc-123",
        files: [
          {
            type: "image",
            transfer_method: "local_file",
            upload_file_id: file
          }
        ]
      })
    });
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error("Cant not upload file");
  }
};
export const uploadImageToServer = async (
  user: string,
  key: string,
  file: File
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", user);
    const res = await fetch("https://api.chatx.vn/v1/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`
      },
      body: formData
    });
    const data = await res.json();
    console.log(data);
    return data.id;
  } catch (e) {
    throw new Error("Can not upload file");
  }
};
