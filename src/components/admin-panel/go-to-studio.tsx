import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function GoToStudio() {
  return (
    <Link href="https://app.chatx.vn" target="_blank">
      <Button
        variant={"active"}
        className="flex items-center justify-around text-white rounded-full py-2 px-4 w-[190px] hover:bg-[#1d0c32] "
      >
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
    </Link>
  );
}
