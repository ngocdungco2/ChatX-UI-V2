"use client";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getHistoryChat, sendMessage } from "@/action/request";
import Loading from "@/app/(demo)/dashboard/loading";
import AboutCard from "../about";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { MessSkeleton } from "../message-skeleton";

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
  const [file, setFile] = useState(null);
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

    try {
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
    } catch (error) {
      console.error(error);
      throw new Error("Can not send messages");
    }
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
    <div className="group w-full overflow-auto ">
      {messages.length <= 0 ? (
        pathname === "/dashboard" ? (
          <AboutCard />
        ) : (
          <Loading />
        )
      ) : (
        <div className="max-w-xl mx-auto mt-10 mb-24  ">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`flex ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                } items-start max-w-[90%]`}
              >
                <div className="flex-shrink-0">
                  <Image
                    src={
                      message.role === "user"
                        ? "/avataruser.png"
                        : "/chatxavatar.png"
                    }
                    alt={`${
                      message.role === "user" ? "User" : "Assistant"
                    } Avatar`}
                    width={message.role === "user" ? 40 : 35}
                    height={message.role === "user" ? 40 : 35}
                    className="rounded-full "
                  />
                </div>
                <div
                  className={`mx-2 py-3 px-6 rounded-xl ${
                    message.role === "user" ? "bg-white" : "bg-white"
                  } overflow-hidden`}
                >
                  <p className={`font-roboto break-words text-left}`}>
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && <MessSkeleton />}
          <div ref={messagesEndRef} />
        </div>
      )}
      <div
        className={cn(
          "inset-x-0 bottom-10 fixed transition-[margin-left] ease-in-out duration-300 rounded-full ",
          sidebar?.isOpen ? "lg:ml-72 ml-0" : "lg:ml-24 ml-0"
        )}
      >
        <div className="w-full  max-w-xl mx-auto  ">
          <Card className="p-2  border-none rounded-full">
            <form>
              <div className="flex">
                {/* <Input type="file" className="w-[40%]" /> */}
                <Button className="bg-transparent hover:bg-transparent rounded-full shadow-none ">
                  <Image
                    src={"/image.svg"}
                    alt="upimg"
                    height={20}
                    width={20}
                    className="w-auto h-auto"
                  />
                </Button>
                <Input
                  type="text"
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                  }}
                  className="w-[95%] mr-2 border-0 ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:border-none focus:border-transparent focus-visible:ring-none mx-auto  shadow-none "
                  placeholder="Hỏi tôi bất cứ điều gì?"
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                  variant={"ghost"}
                >
                  <Image
                    src="/sent.svg"
                    alt="send icon"
                    height={25}
                    width={25}
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
