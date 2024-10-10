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
import { cn } from "@/lib/utils";
import { list } from "postcss";
import { use, useEffect, useState } from "react";
import { DrawerRename } from "./drawer-rename";
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
      if (chatId) {
        console.log("Loading...");
        return null;
      }
      const cId = chatId?.replace("/dashboard/", "");
      const action = await deleteChat(cId, "abc-123", botActive.key);
      console.log(action);
    }
  };

  useEffect(() => {
    localStorage.setItem("apiKey", JSON.stringify(listBot));
  }, [listBot]);
  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          {/* @ts-ignore */}
          {/* <DrawerRename> */}
          {/* <ContextMenuItem>Rename</ContextMenuItem> */}
          {/* </DrawerRename> */}
          <ContextMenuItem onSelect={handleRemove}>Remove</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};
