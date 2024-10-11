import React from "react";
import { Hand, ShieldQuestion, Clock } from "lucide-react";
import Image from "next/image";

const prePrompts = [
  {
    icon: <Hand className="w-6 h-6 text-blue-400" />,
    title: "Nói lời chào",
    description: "Xin chào"
  },
  {
    icon: <ShieldQuestion className="w-6 h-6 text-green-400" />,
    title: "Thắc mắc",
    description: "Bạn có thể làm được gì"
  },
  {
    icon: <Clock className="w-6 h-6 text-purple-400" />,
    title: "Cần trợ giúp",
    description: "Hãy giúp tôi làm 1 việc"
  },
  {
    icon: <ShieldQuestion className="w-6 h-6 text-yellow-400" />,
    title: "Tìm trợ giúp",
    description: "Tôi có 1 câu hỏi"
  }
];

type Props = {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
};

export default function PrePrompts({ setInput, handleSubmit }: Props) {
  const sendPrePrompt = (description: string) => {
    setInput(description);
    // @ts-ignore
    // handleSubmit(new Event("submit"));
  };

  return (
    <div className="inset-0 flex flex-col items-center justify-center h-dvh absolute lg:left-[10%] left-[5%]">
      <Image
        src={"/logopurple.svg"}
        alt="logo"
        width={0}
        height={0}
        className="w-[150px] h-auto opacity-80 lg:block hidden"
        priority={true}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {prePrompts.map((prompt, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center p-4 bg-transparent h-32 hover:bg-blue-100 transition-colors duration-200 rounded-2xl"
            onClick={() => sendPrePrompt(prompt.description)}
          >
            {prompt.icon}
            <h3 className="mt-2 text-lg font-semibold text-gray-800">
              {prompt.title}
            </h3>
            <p className="text-sm text-gray-600">{prompt.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
