"use client";
import { isValidKeyAgent, isValidKeyChatBot } from "@/action/request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "./ui/select";
type Props = {
  isOpen: boolean | undefined;
};
export function SheetBot({ isOpen }: Props) {
  const [inputName, setInputName] = useState("");
  const [inputKey, setInputKey] = useState("");
  const [apiKeyData, setApiKeyData] = useState<{ name: string; key: string }[]>(
    []
  );
  const [isValid, setIsValid] = useState(false);
  const [botType, setBotType] = useState("");
  const { toast } = useToast();

  const handleClick = async () => {
    const check =
      botType === "Chatbot"
        ? await isValidKeyChatBot(inputKey)
        : await isValidKeyAgent(inputKey);
    if (!check) {
      setIsValid(false);
      toast({
        variant: "destructive",
        description: "Key bạn vừa nhập không hợp lệ hãy kiểm tra lại"
      });
    } else {
      setIsValid(true);
      toast({
        variant: "default",
        description: "Key hợp lệ AI đã được thêm vào danh sách"
      });
      addToLocal();
      window.location.reload();
    }
  };
  const isDuplicate = () => {
    const data = localStorage.getItem("apiKey");
    if (data) {
      const check = JSON.parse(data).map((item: any) => {
        item.key === inputKey;
      });
      return check ? true : false;
    }
  };
  const addToLocal = () => {
    const localData = localStorage.getItem("apiKey");
    if (localData) {
      const existData: [] = JSON.parse(localData);
      // @ts-ignore
      existData.push({ name: inputName, key: inputKey, type: botType });

      localStorage.setItem("apiKey", JSON.stringify(existData));

      const newState = existData.flatMap((item) => [
        // @ts-ignore
        { name: item.name, key: item.key, type: item.type }
      ]);
      setApiKeyData(newState);
    } else {
      localStorage.setItem(
        "apiKey",
        JSON.stringify([{ name: inputName, key: inputKey, type: botType }])
      );
    }
  };
  const refreshValue = () => {
    setInputKey("");
    setInputName("");
    setIsValid(false);
  };

  useEffect(() => {
    const localData = localStorage.getItem("apiKey");
    localData
      ? setApiKeyData(JSON.parse(localData))
      : console.log("No api key exist");
  }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="sideBtn"
          className="flex justify-between w-[100%]"
          onClick={refreshValue}
        >
          <span className={cn(isOpen === false && "")}>
            <Image
              src="/newbotai.svg"
              alt="logo add ai"
              width={18}
              height={18}
              className="w-[25px] h-[25px] ml-2"
            />
          </span>
          <span
            className={cn(
              "whitespace-nowrap",
              isOpen === false ? "opacity-0 hidden" : "opacity-100"
            )}
          >
            New AI bot
          </span>
          <span>
            <Image
              src="/new.svg"
              alt="logo add ai"
              width={18}
              height={18}
              className="ml-2 w-[25px] h-[25px] "
            />
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a new bot with API-key</SheetTitle>
          <SheetDescription>
            Nhập tên và api key sau đó nhấn check để kiểm tra dữ liệu
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Name:
            </Label>
            <Input
              className="col-span-3"
              onChange={(e) => {
                setInputName(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Api key:
            </Label>
            <Input
              className="col-span-3 "
              onChange={(e) => {
                setInputKey(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Bot type:
            </Label>
            <Select onValueChange={setBotType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select bot type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select bot type</SelectLabel>
                  <SelectItem value="Chatbot">Chatbot</SelectItem>
                  <SelectItem value="Agent">Agent</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          {/* <Button
            onClick={() => handleCheck()}
            disabled={!(inputKey && inputName)}
          >
            Check key
          </Button> */}
          <SheetClose asChild>
            <Button
              type="submit"
              onClick={() => handleClick()}
              disabled={!(inputName && inputKey && botType)}
            >
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
