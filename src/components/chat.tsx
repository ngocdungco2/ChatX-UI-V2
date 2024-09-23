import { Suspense, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
type Props = {
  message: { role: string; content: string };
};
export const Chat = async ({ message }: Props) => {
  if (!message) return null;
  return (
    <>
      <div className="flex justify-center">
        <Avatar className="h-6 w-8 mx-2">
          <AvatarImage src="#" alt="Avatar" />
          <AvatarFallback className="">X</AvatarFallback>
        </Avatar>
        {message.role === "assistant" && (message.content as string)}
      </div>
    </>
  );
};
