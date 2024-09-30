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

export const isValidKeyChatBot = async (key: string) => {
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
export const isValidKeyAgent = async (key: string) => {
  try {
    const res = await fetch(
      "https://tools.chatx.vn/api/tools/utilities/chat/message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`
        },
        body: JSON.stringify({
          inputs: {},
          query: "alo",
          response_mode: "streaming",
          api_key: "app-tFDgSUm47hDScSPq6psnBz2q",
          conversation_id: "",
          user: "abc-123"
        })
      }
    );
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

export const sendMessageToAgent = async (
  question: string,
  chatId: string,
  token: string
) => {
  try {
    const res = await fetch(
      "https://tools.chatx.vn/api/tools/utilities/chat/message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          inputs: {},
          query: question,
          response_mode: "streaming",
          api_key: token,
          conversation_id: chatId,
          user: "abc-123"
        })
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Caught error when trying connect to agent ");
  }
};

export const sendMessageWithPictureToAgent = async (
  question: string,
  chatId: string,
  token: string,
  file: any
) => {
  try {
    const res = await fetch(
      "https://tools.chatx.vn/api/tools/utilities/chat/message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          inputs: {},
          query: question,
          response_mode: "streaming",
          api_key: token,
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
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error("Cant not upload file");
  }
};
export const sendMessage1 = async (
  question: string,
  chatId: string,
  token: string
): Promise<string> => {
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
        response_mode: "streaming",
        conversation_id: chatId,
        user: "abc-123"
      })
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    if (!res.body) {
      throw new Error("Response body is null");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let fullMessage = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      try {
        const data = JSON.parse(chunk);
        if (data.answer) {
          fullMessage += data.answer;
        }
      } catch (error) {
        console.error("Error parsing chunk:", error);
      }
    }
    // console.log(fullMessage);
    return fullMessage; // Return the complete message
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Cannot send message");
  }
};
