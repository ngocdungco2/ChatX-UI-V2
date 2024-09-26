"use client";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  getHistoryChat,
  sendMessage,
  sendMessageWithPicture,
  uploadImageToServer
} from "@/action/request";
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
  const [messages, setMessages] = useState<
    { role: string; content: string; fileUrl?: any }[]
  >([]);
  const [chatId, setChatId] = useState(id || "");
  const [activeBot, setActiveBot] = useState(() => {
    // Khởi tạo từ localStorage
    return localStorage.getItem("activeBot") || "";
  });
  const pathname = usePathname();
  const fileRef = useRef<HTMLInputElement>(null);
  const submutButtonRef = useRef(null);
  //scroll down when load
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [input, setInput] = useState<string>("");

  const sidebar = useStore(useSidebarToggle, (state) => state);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isCopy, setIsCopy] = useState<{ index: number; check: boolean }>();
  const handleSubmit = async (e: React.FormEvent) => {
    setIsTyping(true);
    if (input === "") return;
    e.preventDefault();
    const image = isUpload && (await uploadImageToServer());
    // Lấy tin nhắn người dùng
    if (file === null) {
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: input
        }
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: input,
          fileUrl: filePreview
        }
      ]);
    }

    setInput("");
    const result =
      file !== null
        ? await sendMessageWithPicture(input, chatId, activeBot, image.id)
        : await sendMessage(input, chatId, activeBot);

    setChatId(result.conversation_id);
    setFile(null);
    setFilePreview("");
    setIsUpload(false);

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
        msg.message_files.length > 0
          ? {
              role: "user",
              content: msg.query,
              fileUrl: msg.message_files[0].url
            }
          : { role: "user", content: msg.query, fileUrl: "" }, // Tin nhắn của người dùng
        { role: "assistant", content: msg.answer, fileUrl: "" } // Tin nhắn của API
      ]);
      // Cập nhật state messages
      setMessages(formattedMessages);
    } else {
      throw new Error("Can not get old conversation");
    }
  };
  const handleCopy = async (index: number, text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopy({ index: index, check: true });
  };
  // luu file
  const [file, setFile] = useState<File | null>(null);
  // luu hinh file de preview
  const [filePreview, setFilePreview] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const uploadImageToServer = async () => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
        formData.append("user", "abc-123");
      }
      const res = await fetch("https://api.chatx.vn/v1/files/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${activeBot}`
        },
        body: formData
      });
      const data = res.json();
      return data;
    } catch (e) {
      throw new Error("Can not upload file");
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setIsUpload(true);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
    }
  };
  const handleUpload = (e: any) => {
    fileRef.current?.click();
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
  useEffect(() => {}, [filePreview]);
  return (
    <div className="group w-full overflow-auto">
      {messages.length <= 0 ? (
        pathname === "/dashboard" ? (
          <AboutCard />
        ) : (
          <Loading />
        )
      ) : (
        <div className="max-w-5xl mx-auto mt-10 mb-24  ">
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
                  } overflow-hidden `}
                >
                  <pre
                    className={`font-roboto text-left w-full whitespace-pre-wrap`}
                  >
                    {message.content as string}
                    {message.fileUrl && message.role === "user" ? (
                      <img
                        src={message.fileUrl}
                        alt=""
                        height={150}
                        width={150}
                      />
                    ) : (
                      ""
                    )}
                  </pre>
                  {message.role === "assistant" && (
                    <Button
                      className="mt-2"
                      variant={"outline"}
                      onClick={() => handleCopy(index, message.content)}
                    >
                      {isCopy?.check && isCopy.index === index ? (
                        <Image
                          src="/copied.svg"
                          alt="st"
                          width={15}
                          height={15}
                          className="w-[15px] h-[15px]"
                        />
                      ) : (
                        <Image
                          src="/copyI.svg"
                          alt="st"
                          width={15}
                          height={15}
                          className="w-[15px] h-[15px]"
                        />
                      )}
                    </Button>
                  )}
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
          "inset-x-0 z-50 mb-[30px] bottom-0 fixed transition-[margin-left] ease-in-out duration-300 rounded-full ",
          sidebar?.isOpen ? "lg:ml-72 ml-0" : "lg:ml-24 ml-0"
        )}
      >
        <div className="w-full  max-w-xl mx-auto  ">
          <Card className="p-2  border-none rounded-full">
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <Input
                  type="file"
                  className="hidden"
                  ref={fileRef}
                  onChange={handleFileChange}
                />
                <Image
                  src={"/image.svg"}
                  alt="upimg"
                  height={20}
                  width={20}
                  className="w-auto h-auto ml-4 hover:cursor-pointer"
                  onClick={(e) => handleUpload(e)}
                />

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
                  // type="submit"
                  // onClick={handleSubmit}
                  disabled={!input.trim()}
                  variant={"ghost"}
                  ref={submutButtonRef}
                >
                  <Image
                    src="/sent.svg"
                    alt="send icon"
                    height={30}
                    width={30}
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
