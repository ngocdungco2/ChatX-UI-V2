import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Image from "next/image";

export default function AboutCard() {
  return (
    <div className="max-w-xl mx-auto mt-0">
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle>
            <Image
              src={"/logopurple.svg"}
              alt="123"
              width={0}
              height={0}
              className="w-32 h-auto"
            />
          </CardTitle>
          <CardDescription>Trợ lý AI dành cho doanh nghiệp</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground/90 leading-normal prose lg:block hidden">
          <p className="mb-3">
            ChatX sử dụng các mô hình AI tiên tiến nhất (Gemini, GPT-4o, Claude
            3, v.v.) kết hợp với dữ liệu doanh nghiệp của bạn và CRM để giúp bạn
            tạo ra các Ai Bot thực hiện các nhiệm vụ thay thế con người và nhiều
            hơn nữa.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
