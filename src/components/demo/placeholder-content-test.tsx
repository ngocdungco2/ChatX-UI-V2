"use client";
import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { act, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { getHistoryChat, sendMessage } from "@/action/request";
import { SendIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import Loading from "@/app/(demo)/dashboard/loading";
import { cn } from "@/lib/utils";
import AboutCard from "../about";
type Props = {
  id?: string;
};
export default function PlaceholderContent1({ id }: Props) {
  // const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [chatId, setChatId] = useState(id || "");
  const [activeBot, setActiveBot] = useState("");
  const pathname = usePathname();
  //scroll down when load
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [input, setInput] = useState<string>("");

  // TODO: handle error
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

    const result = await sendMessage(input, chatId, activeBot);
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
    // TODO: handle error
    const history = await getHistoryChat("abc-123", chatId, activeBot);
    console.log(history);
    if (chatId !== "" && activeBot !== "") {
      const formattedMessages = history.data.flatMap((msg: any) => [
        { role: "user", content: msg.query }, // Tin nhắn của người dùng
        { role: "assistant", content: msg.answer } // Tin nhắn của API
      ]);
      // Cập nhật state messages
      setMessages(formattedMessages);
    } else {
      console.log("Khong co chatid");
    }
  };
  useEffect(() => {}, []);
  useEffect(() => {
    const getLocalData = localStorage.getItem("activeBot");
    getLocalData ? setActiveBot(getLocalData) : null;
    if (chatId) {
      messages.length <= 0 ? getPrevChat() : console.log("khong the lay tin");
    }
  }, [activeBot]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="group w-full overflow-auto  min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)">
      {messages.length <= 0 ? (
        pathname === "/dashboard" ? (
          <AboutCard />
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
      <div className="inset-x-0 bottom-10 mx-auto">
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
