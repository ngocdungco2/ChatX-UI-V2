import { getHistoryConversation } from "@/action/request";
import { LayoutGrid, LucideIcon, HistoryIcon, List } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decrypt } from "./secretKey";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  key?: string;
  tag?: string;
  setActiveKey?: any;
  botActive?: any;
};

type Menu = {
  href?: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
  tag?: any;
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  const [history, setHistory] = useState<{ id: string; name: string }[]>([]);

  const [activeBot, setActiveBot] = useState(() => {
    const data = localStorage.getItem("activeBot");
    return data && JSON.parse(data);
  });
  const [listBot, setListBot] = useState<
    { name: string; key: string; type: string }[]
  >([]);
  const router = useRouter();
  const [isRefresh, setIsRefresh] = useState(false);

  const getHistory = async () => {
    if (!activeBot) return null;
    const get = await getHistoryConversation(decrypt(activeBot.key));
    if (get.data === undefined) {
      return null;
    } else {
      const formattedData = get.data.flatMap((msg: any) => [
        { id: msg.id, name: msg.name }
      ]);
      setHistory(formattedData);
    }
  };

  const getListBot = () => {
    const data = localStorage.getItem("apiKey");
    if (data) {
      setListBot(JSON.parse(data));
    }
  };
  const path = usePathname();
  const setActiveKey = (key: string | undefined, tag: string) => {
    if (key) {
      localStorage.setItem(
        "activeBot",
        JSON.stringify({ key: key, type: tag })
      );
      // setActiveBotLocal(key, tag);
      setIsRefresh(!isRefresh);
      path.endsWith("/dashboard") && window.dispatchEvent(new Event("clear"));
    } else {
      return null;
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("activeBot");
    data ? setActiveBot(JSON.parse(data)) : console.log("Khong co activebot");
    getListBot();
  }, []);

  useEffect(() => {
    getHistory();
    // console.log("menu-list: ", activeBot);
  }, [activeBot]);
  // mỗi lần thông báo refresh thì lấy lại state
  useEffect(() => {
    const data = localStorage.getItem("activeBot");
    data ? setActiveBot(JSON.parse(data)) : console.log("Khong co activebot");
    getListBot();
  }, [isRefresh]);

  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Khám phá",
          active: pathname.endsWith("/dashboar"),
          icon: LayoutGrid,
          tag: "Explore",
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Đoạn chat mới",
          active: pathname.endsWith("/dashboar"),
          icon: LayoutGrid,
          tag: "NewChat",
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "#",
          label: "Danh sách AI",
          active: false,
          icon: List,
          submenus: [
            ...listBot.map((item) => ({
              href: "#",
              label: item.name,
              active: item.key === activeBot?.key,
              key: item.key,
              tag: item.type,
              setActiveKey: setActiveKey,
              botActive: activeBot
            }))
          ]
        },
        {
          href: "",
          label: "Lịch sử",
          active: false,
          icon: HistoryIcon,
          tag: "history",
          submenus: [
            ...history.map((item) => ({
              href: `/dashboard/${item.id}`,
              label: item.name,
              active: pathname === `/dashboard/${item.id}`
            }))
          ]
        }
      ]
    }
  ];
}
