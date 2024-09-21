import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link";

export default function AboutCard() {
  return (
    <div className="max-w-xl mx-auto mt-10 mb-4">
      <Card>
        <CardHeader>
          <CardTitle>ChatX</CardTitle>
          <CardDescription>Ask me something</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground/90 leading-normal prose">
          <p className="mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
            quibusdam necessitatibus ex ab enim explicabo error adipisci sed
            ipsa fuga, ratione dolore numquam voluptates vitae! Fugit dicta unde
            totam rem!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
