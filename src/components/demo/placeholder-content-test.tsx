"use client";
import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { getHistoryChat, sendMessage } from "@/action/request";
import { SendIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import Loading from "@/app/(demo)/dashboard/loading";
import { cn } from "@/lib/utils";
type Props = {
  id?: string;
};
export default function PlaceholderContent1({ id }: Props) {
  // const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [chatId, setChatId] = useState(id || "");
  const pathname = usePathname();
  //scroll down when load
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [input, setInput] = useState<string>("");

  // const [localApi, setLocalApi] = useState(
  //   localStorage.getItem("activeBot") || null
  // );
  // TODO: handle error
  // if (!localApi) {
  //   throw ErrorBoundary;
  // }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lấy tin nhắn người dùng
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input
      }
    ]);
    setInput("");

    const result = await sendMessage(
      input,
      chatId,
      "app-j53bsW5LjZA7E7O3K5aPWREu"
    );
    setChatId(result.conversation_id);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: result.answer
      }
    ]);
  };
  const getPrevChat = async () => {
    // TODO: remove static data
    const history = await getHistoryChat(
      "abc-123",
      chatId,
      "app-j53bsW5LjZA7E7O3K5aPWREu"
    );
    if (chatId) {
      const formattedMessages = history.data.flatMap((msg: any) => [
        { role: "user", content: msg.query }, // Tin nhắn của người dùng
        { role: "assistant", content: msg.answer } // Tin nhắn của API
      ]);
      // Cập nhật state messages
      setMessages(formattedMessages);
    }
  };
  useEffect(() => {
    if (chatId) {
      messages.length <= 0 ? getPrevChat() : 123;
    }
    // const getLocal = localStorage.getItem("activeBot");
    // getLocal ? setLocalApi(getLocal) : 123;
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="group w-full overflow-auto  min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)">
      {messages.length <= 0 ? (
        pathname === "/dashboard" ? (
          // <AboutCard />
          <h1>main page</h1>
        ) : (
          <Loading />
          // <h1>Loading</h1>
        )
      ) : (
        // <h1>Type something</h1>
        <div className="max-w-xl mx-auto mt-10 mb-24 ">
          {messages.map((message, index) => (
            <div key={index} className="whitespace-pre-wrap flex mb-5 ">
              <div
                className={`${
                  message.role === "user"
                    ? "bg-transparent ml-auto"
                    : "bg-transparent"
                } p-2 rounded-lg`}
              >
                {message.role === "user" ? (
                  <div className="flex justify-center ">
                    {message.content as string}

                    <Avatar className="h-7 w-8 mx-2 ">
                      <AvatarImage src="#" alt="Avatar" />
                      <AvatarFallback className="">R</AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <div className="flex justify-center ">
                    <Avatar className="h-6 w-8 mx-2">
                      <AvatarImage src="#" alt="Avatar" />
                      <AvatarFallback className="">X</AvatarFallback>
                    </Avatar>
                    {message.content as string}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
      {/* remove fixed */}
      <div className="inset-x-0 bottom-10  mx-auto">
        <div className="w-full max-w-xl mx-auto">
          <Card className="p-2">
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <Input
                  type="text"
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                  }}
                  className="w-[95%] mr-2 border-0 ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:border-none border-transparent focus:border-transparent focus-visible:ring-none "
                  placeholder="Ask me anything..."
                />
                <Button disabled={!input.trim()}>
                  <SendIcon />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
