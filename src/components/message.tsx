// components/Message.tsx
import Image from "next/image";
import MarkDownContent from "react-markdown";
import TextStreaming from "./text-streaming";
import { Button } from "./ui/button";

type MessageProps = {
  message: { role: string; content: string; fileUrl?: string };
  isCopy: { index: number; check: boolean } | undefined;
  index: number;
  handleCopy: (index: number, text: string) => Promise<void>;
  latestMessage: string;
};

const Message: React.FC<MessageProps> = ({
  message,
  isCopy,
  index,
  handleCopy,
  latestMessage
}) => {
  const checkIsHtml = (content: string) => {
    return (
      content.includes("<div") ||
      content.includes("<html") ||
      content.includes("<script")
    );
  };

  return (
    <div
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
              message.role === "user" ? "/avataruser.png" : "/chatxavatar.png"
            }
            alt={`${message.role === "user" ? "User" : "Assistant"} Avatar`}
            width={message.role === "user" ? 40 : 35}
            height={message.role === "user" ? 40 : 35}
            className="rounded-full"
          />
        </div>
        <div className={`mx-1 p-2 px-4 rounded-xl bg-white overflow-hidden`}>
          {!checkIsHtml(message.content) ? (
            <>
              {message.role === "assistant" &&
              message.content === latestMessage ? (
                <TextStreaming text={message.content} />
              ) : (
                <MarkDownContent className="font-roboto text-left w-full whitespace-pre-wrap">
                  {message.content}
                </MarkDownContent>
              )}
              {message.fileUrl && message.role === "user" && (
                <img src={message.fileUrl} alt="" height={150} width={150} />
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-grow justify-center items-center">
              <iframe
                srcDoc={message.content}
                className="w-[600px] h-[450px] border-none flex justify-center items-centers"
                sandbox="allow-scripts"
              />
            </div>
          )}
          {message.role === "assistant" && (
            <Button
              className="p-0 my-0 h-2 mt-3"
              variant={"noOutline"}
              onClick={() => handleCopy(index, message.content)}
            >
              {isCopy?.check && isCopy.index === index ? (
                <Image src="/copied.svg" alt="Copied" width={15} height={15} />
              ) : (
                <Image src="/copyI.svg" alt="Copy" width={15} height={15} />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
