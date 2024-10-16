"use client";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  getCloudflareIP,
  getHistoryChat,
  sendImageToAgentV2,
  sendMessage,
  sendMessageToAgentV2,
  sendMessageWithPicture
} from "@/action/request";
import Loading from "@/app/(demo)/dashboard/loading";
import { cn } from "@/lib/utils";
import { MessSkeleton } from "../message-skeleton";
import { initialStart } from "@/action/initial";
import { useToast } from "@/hooks/use-toast";
import { MDXEditor } from "@mdxeditor/editor";
import { decrypt } from "@/lib/secretKey";
import PrePrompts from "../pre-promt";
import TextStreaming from "../text-streaming";
import ReactMarkdown from "react-markdown";
import { MarkdownContent } from "../markdown-content";

type Props = {
  id?: string;
};

export default function PlaceholderContent1({ id }: Props) {
  const [messages, setMessages] = useState<
    { role: string; content: string; fileUrl?: any }[]
  >([]);
  const [chatId, setChatId] = useState(id || "");

  const pathname = usePathname();
  const [activeBot, setActiveBot] = useState(() => {
    const data = localStorage.getItem("activeBot");
    return data ? JSON.parse(data) : null;
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const submutButtonRef = useRef(null);
  const inputMessageRef = useRef(null);
  //scroll down when load
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [input, setInput] = useState<string>("");

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isCopy, setIsCopy] = useState<{ index: number; check: boolean }>();
  // luu file
  const [file, setFile] = useState<File | null>(null);
  // luu hinh file de preview
  const [filePreview, setFilePreview] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [latestMessage, setLatestMessage] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    if (!activeBot) return null;
    setIsTyping(true);
    if (input === "") return;

    e.preventDefault();
    const image = isUpload && (await uploadImageToServer());
    setIsUpload(false);
    // const isFirstChat = !chatId;
    let result: any;
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
    result =
      file !== null
        ? activeBot.type === "Chatbot"
          ? await sendMessageWithPicture(
              input,
              chatId,
              decrypt(activeBot.key),
              image.id
            )
          : await sendImageToAgentV2(
              input,
              chatId,
              decrypt(activeBot.key),
              image.id
            )
        : activeBot.type === "Chatbot"
        ? await sendMessage(input, chatId, decrypt(activeBot.key))
        : await sendMessageToAgentV2(input, chatId, decrypt(activeBot.key));
    setChatId(result.conversation_id);
    setFile(null);
    setFilePreview("");

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: result.answer
      }
    ]);
    setIsTyping(false);
    setLatestMessage(result.answer);
  };
  const getPrevChat = async () => {
    // TODO: handle error
    if (!activeBot) return null;
    if (chatId !== "" && activeBot.key !== "") {
      const history = await getHistoryChat(chatId, decrypt(activeBot.key));
      if (!history.data) {
        toast({ description: "trang không hợp lệ vui lòng quay về trang chủ" });
        return null;
      }
      const formattedMessages = history.data.flatMap(
        (msg: any, index: number) => [
          msg.message_files.length > 0
            ? {
                role: "user",
                content: msg.query,
                fileUrl: msg.message_files[0].url
              }
            : { role: "user", content: msg.query, fileUrl: "" }, // Tin nhắn của người dùng
          { role: "assistant", content: msg.answer, fileUrl: "" } // Tin nhắn của API
        ]
      );
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
  const uploadImageToServer = async () => {
    if (!activeBot) return null;
    const username: any = await getCloudflareIP();
    if (!username) return null;
    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
        formData.append("user", username);
      }
      const res = await fetch("https://api.chatx.vn/v1/files/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${decrypt(activeBot.key)}`
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
  const checkIsHtml = (content: string) => {
    const isHtml =
      content.includes("<div") ||
      content.includes("<html") ||
      content.includes("<script");
    return isHtml;
  };

  // check activebot by event
  useEffect(() => {
    const listenStorageChange = () => {
      const data = localStorage.getItem("activeBot");
      if (!data) return null;
      if (data !== activeBot) {
        setActiveBot(JSON.parse(data));
      }
    };
    const listenClearChat = () => {
      setMessages([]);
      setChatId("");
      setLatestMessage("");
    };
    window.addEventListener("storage", listenStorageChange);
    window.addEventListener("clear", listenClearChat);
    window.addEventListener("newChat", listenClearChat);
    return () => {
      window.removeEventListener("storage", listenStorageChange);
      window.removeEventListener("clear", listenClearChat);
      window.removeEventListener("newChat", listenClearChat);
    };
  }, []);
  useEffect(() => {
    // TODO: remove this initial
    if (!activeBot) {
      const getLocalData = localStorage.getItem("activeBot");
      getLocalData ? setActiveBot(JSON.parse(getLocalData)) : initialStart();
    }
  }, []);
  useEffect(() => {
    // router.push(`/dashboard/${chatId}`, { scroll: false });

    if (chatId && messages.length === 0) {
      getPrevChat();
    }
  }, [chatId]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    // @ts-ignore
    inputMessageRef.current.focus();
  }, [isTyping]);
  return (
    <div className="group w-full overflow-auto">
      {messages.length <= 0 ? (
        pathname === "/dashboard" ? (
          // <AboutCard />
          <PrePrompts
            setInput={setInput}
            // @ts-ignore
            handleSubmit={handleSubmit}
          />
        ) : (
          <Loading />
        )
      ) : (
        <div className="max-w-2xl mx-auto mt-10 mb-24 ">
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
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 mt-4">
                    <Image
                      src="/chatxavatar.png"
                      alt="Assistant Avatar"
                      width={35}
                      height={35}
                      className="rounded-full"
                    />
                  </div>
                )}
                <div
                  className={`mx-1 p-2 px-4 rounded-3xl ${
                    message.role === "user" ? "bg-[#f4f4f4]" : "bg-transparent"
                  } overflow-hidden`}
                >
                  {!checkIsHtml(message.content) ? (
                    <>
                      {message.content === latestMessage &&
                      index === messages.length - 1 ? (
                        <TextStreaming text={message.content} />
                      ) : (
                        <MarkdownContent>{message.content}</MarkdownContent>
                      )}
                      {message.fileUrl && message.role === "user" && (
                        <img
                          src={message.fileUrl}
                          alt=""
                          height={150}
                          width={150}
                          className="rounded-3xl pt-[10px]"
                        />
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-grow justify-center items-center">
                      <iframe
                        srcDoc={message.content}
                        className="w-[600px] h-[450px] border-none flex justify-center items-center"
                        sandbox="allow-scripts"
                      />
                    </div>
                  )}

                  {message.role === "assistant" && (
                    <Button
                      className="p-0 my-0 h-2 mt-4"
                      variant={"noOutline"}
                      onClick={() => handleCopy(index, message.content)}
                    >
                      {isCopy?.check && isCopy.index === index ? (
                        <div className="w-20 h-8 bg-white rounded-full flex items-center justify-evenly p-1 opacity-80">
                          <Image
                            src="/copied.svg"
                            alt="Copied"
                            width={15}
                            height={15}
                            className="w-[15px] h-[15px] m-0 p-0 opacity-50"
                          />
                          <p className="opacity-50">Copied</p>
                        </div>
                      ) : (
                        <div className="w-20 h-8 bg-white rounded-full flex items-center justify-evenly p-1 opacity-80">
                          <Image
                            src="/copyI.svg"
                            alt="Copy"
                            width={15}
                            height={15}
                            className="w-[15px] h-[15px] m-0 p-0 opacity-50"
                          />
                          <p className="opacity-50">Copy</p>
                        </div>
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
          // "inset-x-0 z-50 mb-[30px] lg:bottom-3.5 bottom-10 fixed transition-[margin-left] ease-in-out duration-300 rounded-full ",
          // sidebar?.isOpen ? "lg:ml-72 ml-0" : "lg:ml-24 ml-0"
          "inset-x-0 z-50 lg:mb-[30px] mg-0 lg:bottom-3.5 bottom-3.5 fixed transition-[margin-left] ease-in-out duration-300 rounded-full lg:ml-[150px] mx-3 "
        )}
      >
        <div className="w-full  max-w-xl mx-auto ">
          <Card
            className={cn(
              "p-2 border-none transition-[height] delay-100 ease-linear bg-[#f4f4f4] shadow-none lg:w-[650px]",
              isUpload ? "rounded-3xl" : "rounded-full"
            )}
          >
            <form onSubmit={handleSubmit}>
              <div
                className={cn(
                  " w-20 h-20  ml-4  mb-2 border-none shadow-none",
                  !isUpload && "hidden"
                )}
              >
                <img
                  src={filePreview}
                  alt="123"
                  className="w-20 h-20 hover:cursor-pointer rounded-xl"
                  onClick={() => {
                    setFile(null);
                    setIsUpload(false);
                    setFilePreview("");
                  }}
                />
              </div>
              <div className="flex justify-center items-center ">
                <Input
                  type="file"
                  className="hidden"
                  ref={fileRef}
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                  onChange={handleFileChange}
                />
                <Image
                  src={"/image.svg"}
                  alt="upimg"
                  height={15}
                  width={15}
                  className={cn(
                    "w-4 h-4 ml-3 mr-1",
                    isTyping
                      ? "hover:cursor-not-allowed"
                      : "hover:cursor-pointer"
                  )}
                  onClick={(e) => handleUpload(e)}
                />

                <Input
                  // type="text"
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                  }}
                  className="w-[95%] mr-2 border-0 ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:border-none focus:border-transparent focus-visible:ring-none mx-auto shadow-none h-8 resize-none overflow-y-scrollbar no-scrollbar flex justify-center text-base "
                  placeholder="Hỏi tôi bất cứ điều gì?"
                  disabled={isTyping}
                  ref={inputMessageRef}
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
