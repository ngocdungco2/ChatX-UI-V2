"use client";

import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import { SheetName } from "../nameSheet";
import { SheetBot } from "../bot-sheet";
import Image from "next/image";
import { useState } from "react";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);
  const router = useRouter();

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus, tag }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={active ? "active" : "sideBtn"}
                              className="w-full flex justify-start h-10 "
                              // onClick={() => {
                              //   // @ts-ignore
                              //   window.location.replace(href);
                              // }}
                              asChild
                            >
                              <Link href={href} scroll={false}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  {/* dùng như này vì chỉ đang có 2 button sau phải sửa lại */}
                                  {tag === "NewChat" ? (
                                    <Image
                                      src="/newchat.svg"
                                      alt="icon new chat"
                                      width={18}
                                      height={18}
                                    />
                                  ) : (
                                    tag === "Explore" && (
                                      <Image
                                        src="/home.svg"
                                        alt="icon new chat"
                                        width={18}
                                        height={18}
                                      />
                                    )
                                  )}
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate font-bold",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
          {/* <SheetBot isOpen={isOpen} /> */}

          {/* <li className="w-full grow flex items-end border-none">
            <div className="flex flex-col w-full justify-between ">
              <TooltipProvider disableHoverableContent>
                <Tooltip>
                  <SheetBot isOpen={isOpen} />
                  {isOpen === false && (
                    <TooltipContent side="right">New AI bot</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </li> */}
        </ul>
      </nav>
    </ScrollArea>
  );
}
