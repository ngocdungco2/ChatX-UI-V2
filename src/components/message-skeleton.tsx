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
        <Skeleton className="h-4 w-[400px]" /> {/* First line of text */}
        <Skeleton className="h-4 w-[300px]" /> {/* Second line of text */}
        <Skeleton className="h-4 w-[250px]" /> {/* Third line of text */}
      </div>
    </div>
  );
};
