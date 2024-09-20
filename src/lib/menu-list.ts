import { getHistoryConversation } from "@/action/request";
import {
  Tag,
  Users,
  LayoutGrid,
  LucideIcon,
  HistoryIcon,
  List,
  PlusIcon
} from "lucide-react";
import { useEffect, useState } from "react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
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

  const [localApi, setLocalApi] = useState("app-j53bsW5LjZA7E7O3K5aPWREu");
  // TODO: handle error

  const getHistory = async () => {
    const get = await getHistoryConversation("abc-123", localApi);
    if (history) {
      const formattedData = get.data.flatMap((msg: any) => [
        { id: msg.id, name: msg.name }
      ]);
      setHistory(formattedData);
    }
  };
  useEffect(() => {
    getHistory();
  }, []);
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
      groupLabel: "Contents",
      menus: [
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
        },
        {
          href: "/categories",
          label: "Bot list",
          active: pathname.includes("/categories"),
          icon: List,
          submenus: [
            {
              href: "/tags",
              label: "Bot 1",
              active: pathname.includes("/tags")
            }
          ]
        },
        {
          href: "/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag,
          submenus: []
        }
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
