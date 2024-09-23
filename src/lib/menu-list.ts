import { getHistoryConversation } from "@/action/request";
import { Tag, LayoutGrid, LucideIcon, HistoryIcon, List } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  key?: string;
};

type Menu = {
  href?: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  const [history, setHistory] = useState<{ id: string; name: string }[]>([]);

  const [activeBot, setActiveBot] = useState("");
  const [listBot, setListBot] = useState<{ name: string; key: string }[]>([]);

  const router = useRouter();

  const getHistory = async () => {
    const get = await getHistoryConversation("abc-123", activeBot);
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

  useEffect(() => {
    // getHistory();
    const data = localStorage.getItem("activeBot");
    data ? setActiveBot(data) : null;
    // getHistory();
    getListBot();
  }, []);
  useEffect(() => {
    getHistory();
  }, [router]);
  useEffect(() => {
    getHistory();
  }, [activeBot]);
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Home",
          active: pathname.endsWith("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Explore",
      menus: [
        {
          href: "#",
          label: "Bot list",
          active: pathname.includes("/categories"),
          icon: List,
          submenus: [
            ...listBot.map((item) => ({
              href: "#",
              label: item.name,
              active: item.key === activeBot,
              key: item.key
            }))
          ]
        },
        {
          href: "",
          label: "History",
          active: pathname.includes("/posts"),
          icon: HistoryIcon,
          submenus: [
            ...history.map((item) => ({
              href: `/dashboard/${item.id}`,
              label: item.name,
              active: pathname === `/dashboard/${item.id}`
            }))
          ]
        }
        // {
        //   href: "/tags",
        //   label: "Tags",
        //   active: pathname.includes("/tags"),
        //   icon: Tag,
        //   submenus: []
        // }
      ]
    }
    // {
    //   groupLabel: "Settings",
    //   menus: [
    //     {
    //       href: "/users",
    //       label: "Users",
    //       active: pathname.includes("/users"),
    //       icon: Users,
    //       submenus: []
    //     },
    //     {
    //       href: "",
    //       label: "Add bot",
    //       active: pathname.includes("/account"),
    //       icon: PlusIcon,
    //       submenus: []
    //     }
    //   ]
    // }
  ];
}
