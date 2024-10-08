import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="inset-0 flex items-center justify-center h-dvh absolute">
      <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
    </div>
  );
};

export default Loading;
