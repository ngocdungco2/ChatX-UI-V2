"use client";
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
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
type Props = {
  isOpen: boolean | undefined;
};
export function SheetName({ isOpen }: Props) {
  const [input, setInput] = useState("");
  const handleClick = () => {
    localStorage.setItem("username", input);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <span className={cn(isOpen === false ? "" : "mr-4")}>
            <PlusIcon size={18} />
          </span>
          <span
            className={cn(
              "whitespace-nowrap",
              isOpen === false ? "opacity-0 hidden" : "opacity-100"
            )}
          >
            Username
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit name</SheetTitle>
          <SheetDescription>Make change to your username</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Name:
            </Label>
            <Input
              className="col-span-3"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={() => handleClick()}>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
