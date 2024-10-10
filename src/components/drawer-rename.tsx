import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import React from "react";
interface ContentLayoutProps {
  open: Boolean;
  setOpen: any;
  children: React.ReactNode;
}
export const DrawerRename = ({ children }: ContentLayoutProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    // @ts-ignore
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
