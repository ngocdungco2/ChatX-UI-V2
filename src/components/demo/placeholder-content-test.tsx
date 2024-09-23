"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { act, Suspense, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getHistoryChat, sendMessage } from "@/action/request";
import Loading from "@/app/(demo)/dashboard/loading";
import AboutCard from "../about";
import { getInitials } from "../admin-panel/user-nav";
import Link from "next/link";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { MessSkeleton } from "../message-skeleton";
import { Chat } from "../chat";
import { tree } from "next/dist/build/templates/app-page";
type Props = {
  id?: string;
};

export default function PlaceholderContent1({ id }: Props) {
  // const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [chatId, setChatId] = useState(id || "");
  const [activeBot, setActiveBot] = useState(() => {
    // Khởi tạo từ localStorage
    return localStorage.getItem("activeBot") || "";
  });
  const pathname = usePathname();
  //scroll down when load
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [input, setInput] = useState<string>("");
  const [name, setName] = useState(() => {
    return localStorage.getItem("username") || "US";
  });
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // TODO: handle error
  const handleSubmit = async (e: React.FormEvent) => {
    setIsTyping(true);
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
    setIsTyping(false);
  };
  const getPrevChat = async () => {
    // TODO: handle error
    const history = await getHistoryChat("abc-123", chatId, activeBot);
    if (chatId !== "" && activeBot !== "") {
      const formattedMessages = history.data.flatMap((msg: any) => [
        { role: "user", content: msg.query }, // Tin nhắn của người dùng
        { role: "assistant", content: msg.answer } // Tin nhắn của API
      ]);
      // Cập nhật state messages
      setMessages(formattedMessages);
    } else {
      throw new Error("Can not get old conversation");
    }
  };

  useEffect(() => {
    // get activebot
    const getLocalData = localStorage.getItem("activeBot");
    getLocalData ? setActiveBot(getLocalData) : null;
  }, []);
  useEffect(() => {
    if (chatId) {
      messages.length <= 0 ? getPrevChat() : console.log("khong the lay tin");
    }
  }, [activeBot]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {}, [chatId]);
  return (
    <div className="group w-full overflow-auto min-h-[calc(100vh-56px-64px-20px-24px-56px-48px) ">
      {messages.length <= 0 ? (
        pathname === "/dashboard" ? (
          <AboutCard />
        ) : (
          <Loading />
        )
      ) : (
        <div className="max-w-xl mx-auto mt-10 mb-24">
          {messages.map((message, index) => (
            <div key={index} className="whitespace-pre-wrap flex mb-5 ">
              <div
                className={`${
                  message.role === "user" ? "bg-blue-300 ml-auto" : "bg-white"
                } p-2 rounded-lg`}
              >
                {message.role === "user" ? (
                  <div className="flex justify-center ">
                    {message.content as string}

                    <Avatar className="h-7 w-8 ml-2 ">
                      <AvatarImage src="#" alt="Avatar" />
                      <AvatarFallback className="">
                        {getInitials(name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <div className="flex justify-center">
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
          {isTyping && <MessSkeleton />}
          <div ref={messagesEndRef} />
        </div>
      )}
      <div
        className={cn(
          "inset-x-0 bottom-10 fixed transition-[margin-left] ease-in-out duration-300 ",
          sidebar?.isOpen ? "lg:ml-80 ml-0" : "lg:ml-24 ml-0"
        )}
      >
        <div className="w-full max-w-xl mx-auto">
          <Card className="p-2">
            <form>
              <div className="flex">
                <Input
                  type="text"
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                  }}
                  className="w-[95%] mr-2 border-0 ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:border-none border-transparent focus:border-transparent focus-visible:ring-none mx-auto"
                  placeholder="Ask me anything..."
                />
                <Button
                  // type="submit"
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                  variant={"outline"}
                >
                  <Image
                    src="/sendIcon.png"
                    alt="send icon"
                    height={20}
                    width={20}
                  />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
