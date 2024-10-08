"use client";
import { deleteChat } from "@/action/request";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import useLocalStorage from "@/hooks/use-localstorage";
import { useToast } from "@/hooks/use-toast";
import { use, useEffect, useState } from "react";
interface ContentLayoutProps {
  children: React.ReactNode;
  apiKey?: string;
  type?: string;
  chatId?: string;
  refreshList?: any;
  botActive?: any;
}

export const ContextMenuSidebar = ({
  children,
  apiKey,
  chatId,
  // Cập nhật lại
  refreshList,
  botActive
}: // nhận biết để lấy lại bot active
// isUpdate
ContentLayoutProps) => {
  const [listBot, setListBot] = useState(() => {
    const data = localStorage.getItem("apiKey");
    if (data) {
      return JSON.parse(data);
    }
  });

  // chatbot have key || conversation have chatId
  // rename bot
  // rename conversation
  // remove botx
  // remove conversation

  const { toast } = useToast();

  const handleRemove = async () => {
    if (!botActive) return null;
    if (apiKey) {
      if (!listBot) return;
      if (apiKey === botActive.key) {
        toast({
          description: "Không thể xoá Chatbot đang sử dụng",
          variant: "destructive"
        });
        return null;
      }

      const data = listBot.filter((item: any) => {
        return item.key !== apiKey;
      });
      setListBot(data);
      refreshList(botActive.key, botActive.type);
      toast({ description: "Danh sách AI đã được cập nhật!!" });
    } else {
      const cId = chatId?.replace("/dashboard/", "");
      const action = await deleteChat(cId, "abc-123", botActive.key);
      console.log(action);
    }
  };
  useEffect(() => {
    localStorage.setItem("apiKey", JSON.stringify(listBot));
  }, [listBot]);
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          {/* <ContextMenuItem onSelect={handleRename}>Rename</ContextMenuItem> */}
          <ContextMenuItem onSelect={handleRemove}>Remove</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
};
