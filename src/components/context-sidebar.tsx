"use client";
import { deleteChat } from "@/action/request";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
interface ContentLayoutProps {
  children: React.ReactNode;
  apiKey?: string;
  type?: string;
  chatId?: string;
}

export const ContextMenuSidebar = ({
  children,
  apiKey,
  chatId
}: ContentLayoutProps) => {
  const [listBot, setListBot] = useState(() => {
    const data = localStorage.getItem("apiKey");
    if (data) {
      return JSON.parse(data);
    }
  });
  const [activeBot, setActiveBot] = useState(() => {
    const data = localStorage.getItem("activeBot");
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
    if (apiKey) {
      if (!listBot) return;
      if (apiKey === activeBot.key) {
        toast({ description: "Không thể xoá api đang dùng" });
        return null;
      }

      const data = listBot.filter((item: any) => {
        return item.key !== apiKey;
      });
      setListBot(data);
      window.location.reload();
      toast({ description: "Danh sách AI đã được cập nhật!!" });
    } else {
      const cId = chatId?.replace("/dashboard/", "");
      const action = await deleteChat(cId, "abc-123", activeBot.key);
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
