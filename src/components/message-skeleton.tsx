import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

export const MessSkeleton = () => {
  return (
    <div className="flex justify-start ">
      <Avatar className="h-6 w-8 mx-2">
        <AvatarImage src="#" alt="Avatar" />
        <AvatarFallback className="">X</AvatarFallback>
      </Avatar>
      <div className="space-y-2 flex flex-col">
        <Skeleton className="w-[500px] h-4" />
        <Skeleton className="w-[500px] h-4" />
        <Skeleton className="w-[500px] h-4" />
      </div>
    </div>
  );
};
