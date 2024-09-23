import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="inset-0 flex items-center justify-center min-h-screen">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
    </div>
  );
};

export default Loading;
