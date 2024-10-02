"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { SheetBot } from "../bot-sheet";
import { ContextMenuSidebar } from "../context-sidebar";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  key?: string;
  tag?: string;
  setActiveKey?: any;
  botActive?: Boolean;
};

interface CollapseMenuButtonProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  submenus: Submenu[];
  isOpen: boolean | undefined;
  // setActiveKey: any;
}

export function CollapseMenuButton({
  icon: Icon,
  label,
  active,
  submenus,
  isOpen
}: // setActiveKey
CollapseMenuButtonProps) {
  const isSubmenuActive = submenus.some((submenu) => submenu.active);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);
  return isOpen ? (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="w-full"
    >
      <CollapsibleTrigger
        className="[&[data-state=open]>div>div>svg]:rotate-180 mb-1"
        asChild
      >
        <Button
          variant={active ? "secondary" : "ghost"}
          className="w-full justify-start h-10"
        >
          <div className="w-full items-center flex justify-between">
            <div className="flex items-center">
              <span className="mr-4">{/* <Icon size={18} /> */}</span>
              <p
                className={cn(
                  "max-w-[150px] truncate font-bold",
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-96 opacity-0"
                )}
              >
                {label}
              </p>
            </div>
            <div
              className={cn(
                "whitespace-nowrap",
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-96 opacity-0"
              )}
            >
              <ChevronDown
                size={18}
                className="transition-transform duration-200"
              />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {submenus.map(
          (
            { href, label, active, key, tag, setActiveKey, botActive },
            index
          ) => (
            // this
            <>
              {index === 0 && key && (
                <SheetBot
                  isOpen={isOpen}
                  refreshList={setActiveKey}
                  botActive={botActive}
                />
              )}

              <ContextMenuSidebar
                apiKey={key}
                chatId={href}
                key={index}
                refreshList={setActiveKey}
                botActive={botActive}
              >
                <Button
                  key={index}
                  variant={active ? "sideBtn" : "ghost"}
                  className={cn(
                    "justify-start h-10 mb-2 mt-1 shadow-none w-full"
                    // active ? "w-[80%]" : "w-full"
                  )}
                  onClick={() => {
                    if (tag) {
                      // @ts-ignore
                      setActiveKey(key, tag);
                      // console.log("click");
                      // updateActiveBot(key, tag);
                    }
                  }}
                  asChild
                >
                  {/* nếu không có key tức là item của lịch sử */}
                  <Link
                    href={key ? "/dashboard" : href}
                    scroll={false}
                    className="flex justify-start"
                  >
                    <span
                      className={cn(
                        "mr-4 ml-2",
                        key &&
                          "flex justify-center items-center w-[35px] h-[30px] rounded-md bg-[#615370]"
                      )}
                    >
                      {key && (
                        <Image
                          src="/bot.svg"
                          alt="boticon"
                          width={18}
                          height={18}
                          className="w-[25px] h-[25px] "
                        />
                      )}
                    </span>
                    <p
                      className={cn(
                        "max-w-[170px] truncate text-left",
                        isOpen
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-96 opacity-0"
                      )}
                    >
                      {label}
                    </p>
                    {/* <span className="ml-2 flex justify-center items-center">
                  {key && (
                    <Image
                      src={"/nextwhite.svg"}
                      alt="iconnext"
                      width={18}
                      height={18}
                      className="w-auto h-auto mr-1"
                    />
                  )}
                </span> */}
                  </Link>
                </Button>
              </ContextMenuSidebar>
            </>
          )
        )}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={active ? "secondary" : "ghost"}
                className="w-full justify-start h-10 mb-1"
              >
                <div className="w-full items-center flex justify-between">
                  <div className="flex items-center">
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <Icon size={18} />
                    </span>
                    <p
                      className={cn(
                        "max-w-[200px] truncate",
                        isOpen === false ? "opacity-0" : "opacity-100"
                      )}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {submenus.map(({ href, label }, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link className="cursor-pointer" href={href}>
              <p className="max-w-[180px] truncate">{label}</p>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
