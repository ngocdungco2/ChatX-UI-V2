import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

export const MessSkeleton = () => {
  return (
    <div className="flex items-start space-x-4 mb-4">
      <Image
        src="/chatxavatar.png"
        alt="assistant avt"
        width={35}
        height={35}
      />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-[80%]" /> {/* First line of text */}
        <Skeleton className="h-4 w-[75%]" /> {/* Second line of text */}
        <Skeleton className="h-4 w-[65%]" /> {/* Third line of text */}
        <Skeleton className="h-4 w-[55%]" /> {/* Third line of text */}
      </div>
    </div>
  );
};
