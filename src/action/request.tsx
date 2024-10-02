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
    throw new Error("Can not fetch previous chat with Bot");
  }
};

// Chat history for sidebar
export const getHistoryConversation = async (name: string, token: string) => {
  try {
    const res = await fetch(
      `https://api.chatx.vn/v1/conversations?user=${name}&limit=5`,
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
    throw new Error("Can not upload file");
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

// export const sendMessageToAgent = async (
//   question: string,
//   chatId: string,
//   token: string
// ) => {
//   try {
//     const res = await fetch(
//       "https://tools.chatx.vn/api/tools/utilities/chat/message",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           inputs: {},
//           query: question,
//           response_mode: "streaming",
//           api_key: token,
//           conversation_id: chatId,
//           user: "abc-123"
//         })
//       }
//     );
//     const data = await res.json();
//     return data;
//   } catch (e) {
//     console.error(e);
//     throw new Error("Caught error when trying connect to agent ");
//   }
// };

// export const sendMessageWithPictureToAgent = async (
//   question: string,
//   chatId: string,
//   token: string,
//   file: any
// ) => {
//   try {
//     const res = await fetch(
//       "https://tools.chatx.vn/api/tools/utilities/chat/message",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           inputs: {},
//           query: question,
//           response_mode: "streaming",
//           api_key: token,
//           conversation_id: chatId,
//           user: "abc-123",
//           files: [
//             {
//               type: "image",
//               transfer_method: "local_file",
//               upload_file_id: file
//             }
//           ]
//         })
//       }
//     );
//     const data = await res.json();
//     return data;
//   } catch (e) {
//     throw new Error("Cant not upload file");
//   }
// };
export const deleteChat = async (
  chatId: string | undefined,
  user: string,
  token: string
) => {
  try {
    const res = await fetch(`https://api.chatx.vn/v1/conversations/${chatId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user: user
      })
    });
    if (!res.ok) {
      throw new Error("something bad with delete message");
    }
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error("Can not delete chat");
  }
};
function decodeUnicode(str: any) {
  return str.replace(/\\u[\dA-F]{4}/gi, (match: any) => {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
  });
}
export const sendMessageToAgentV2 = async (
  question: string,
  chatId: string,
  token: string
) => {
  try {
    const apiUrl = "https://api.chatx.vn/v1/chat-messages";
    const res = await fetch(apiUrl, {
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

    const reader = res.body?.getReader();
    if (!reader) {
      throw new Error("Failed to get response reader");
    }

    let result = "";
    let conversation_id = "";
    let buffer = "";
    let messageEndReceived = false;

    while (true) {
      const { done, value } = await reader.read();

      if (done && messageEndReceived) break;

      if (value) {
        buffer += new TextDecoder().decode(value);
        let newlineIndex;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.event === "agent_message") {
                result += decodeUnicode(data.answer);
              } else if (data.event === "message_end") {
                conversation_id = data.conversation_id;
                messageEndReceived = true;
              }
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        }
      }

      // Đợi thêm một khoảng thời gian ngắn để đảm bảo nhận được tất cả dữ liệu
      if (done) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    const answer = result.trim();
    return { answer, conversation_id };
  } catch (e) {
    console.error("Error in sendMessageToAgentV2:", e);
    throw new Error("Cannot send message to agent");
  }
};

export const sendImageToAgentV2 = async (
  question: string,
  chatId: string,
  token: string,
  file: any
) => {
  try {
    const apiUrl = "https://api.chatx.vn/v1/chat-messages";
    const res = await fetch(apiUrl, {
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
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const reader = res.body?.getReader();
    if (!reader) {
      throw new Error("Failed to get response reader");
    }

    let result = "";
    let conversation_id = "";
    let buffer = "";
    let messageEndReceived = false;

    while (true) {
      const { done, value } = await reader.read();

      if (done && messageEndReceived) break;

      if (value) {
        buffer += new TextDecoder().decode(value);
        let newlineIndex;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.event === "agent_message") {
                result += decodeUnicode(data.answer);
              } else if (data.event === "message_end") {
                conversation_id = data.conversation_id;
                messageEndReceived = true;
              }
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        }
      }

      // Đợi thêm một khoảng thời gian ngắn để đảm bảo nhận được tất cả dữ liệu
      if (done) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    const answer = result.trim();
    return { answer, conversation_id };
  } catch (e) {
    console.error("Error in sendMessageToAgentV2:", e);
    throw new Error("Cannot send message to agent");
  }
};
