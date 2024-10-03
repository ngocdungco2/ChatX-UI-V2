import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="inset-0 flex items-center justify-center h-screen absolute lg:left-[15%] left-[5%]">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
    </div>
  );
};

export default Loading;
