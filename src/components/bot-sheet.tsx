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
import { decrypt, encrypt } from "@/lib/secretKey";
type Props = {
  isOpen?: boolean | undefined;
  refreshList?: any;
  botActive?: any;
};

export function SheetBot({ isOpen, refreshList, botActive }: Props) {
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
      if (isDuplicate(inputKey) === false) {
        setIsValid(true);
        toast({
          variant: "default",
          description: "Key hợp lệ AI đã được thêm vào danh sách"
        });
        addToLocal();
        refreshList(botActive.key, botActive.type);

        // window.location.reload();
      } else {
        setIsValid(false);
        toast({
          variant: "destructive",
          description: "Key đã tồn tại trong danh sách AI vui lòng kiểm tra lại"
        });
      }
    }
  };
  const isDuplicate = (key: string) => {
    const oldKey = localStorage.getItem("apiKey");
    if (oldKey) {
      const check = JSON.parse(oldKey).findIndex((item: any) => {
        return decrypt(item.key) === key;
      });
      return check === -1 ? false : true;
    }
  };
  const addToLocal = () => {
    const localData = localStorage.getItem("apiKey");
    if (localData) {
      const existData: [] = JSON.parse(localData);
      // @ts-ignore
      existData.push({
        name: inputName,
        // test
        key: encrypt(inputKey),
        type: botType
      });

      localStorage.setItem("apiKey", JSON.stringify(existData));

      const newState = existData.flatMap((item) => [
        // @ts-ignore
        { name: item.name, key: item.key, type: item.type }
      ]);
      setApiKeyData(newState);
    } else {
      localStorage.setItem(
        "apiKey",
        JSON.stringify([
          // test
          { name: inputName, key: encrypt(inputKey), type: botType }
        ])
      );
    }
  };
  const refreshValue = () => {
    setInputKey("");
    setInputName("");
    setIsValid(false);
    setBotType("");
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
          variant="active"
          className="flex justify-start w-[100%] mb-2"
          onClick={refreshValue}
        >
          <span className={cn(isOpen === false && "")}>
            <Image
              src="/newbotai.svg"
              alt="logo add ai"
              width={18}
              height={18}
              className="w-[27px] h-[27px] ml-3"
            />
          </span>
          <span
            className={cn(
              "whitespace-nowrap ml-4",
              isOpen === false ? "opacity-0 hidden" : "opacity-100"
            )}
          >
            New AI bot
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Thêm Chatbot vào danh sách</SheetTitle>
          <SheetDescription>
            Vào studio chọn Chatbot hoặc Agent bạn cần thêm sau đó lấy apikey và
            điền vào các textbox sau chọn kiểu bot của bạn sau đó Save changes
            để có thể lưu thay đổi
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Tên:
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
              Apikey:
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
              Loại Bot:
            </Label>
            <Select onValueChange={setBotType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select bot type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Lựa chọn loại bot</SelectLabel>
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
              Thêm AI
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
