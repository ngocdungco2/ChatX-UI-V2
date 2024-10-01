"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function GoToStudio() {
  const router = useRouter();
  return (
    <Button
      variant={"active"}
      className="flex items-center justify-around text-white rounded-full py-2 px-4 w-[190px] hover:bg-[#1d0c32]  "
      onClick={() =>
        router.push("https://app.chatx.vn/apps", { scroll: false })
      }
    >
      {/* <span className="mr-2 font-bold">ChatX</span> */}
      <Image
        src={"/ChatX.png"}
        alt="logo btn"
        height={10}
        width={60}
        className="w-auto h-auto"
        // className="pr-4"
      />
      <span className="text-sm">AI Studio</span>
      <Image
        src={"/nextwhite.svg"}
        alt="nextwhite"
        height={5}
        width={7}
        className="w-auto h-auto"
      />
    </Button>
  );
}
