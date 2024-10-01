"use client";
import { getHistoryConversation } from "@/action/request";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import PlaceholderContent1 from "@/components/demo/placeholder-content-test";
import { useCallback, useEffect, useState } from "react";

export default function DashboardPage({ params }: { params: { id: string } }) {
  const [history, setHistory] = useState<{ id: string; name: string }>();
  const [activeBot, setActiveBot] = useState<{ key: string; type: string }>();

  const getHistory = useCallback(
    async (botKey: string) => {
      const get = await getHistoryConversation("abc-123", botKey);
      if (get.data === undefined) {
        return null;
      } else {
        const formattedData = get.data.flatMap((msg: any) => [
          { id: msg.id, name: msg.name }
        ]);
        const data = formattedData.find((item: any) => item.id === params.id);
        setHistory(data || null);
      }
    },
    [params.id]
  );

  useEffect(() => {
    const data = localStorage.getItem("activeBot");
    data ? setActiveBot(JSON.parse(data)) : console.log("Khong co activebot");
  }, []);
  useEffect(() => {
    if (activeBot) {
      getHistory(activeBot.key);
    }
  }, [activeBot, getHistory]);

  return (
    <ContentLayout title={history?.name || "Loading..."}>
      <PlaceholderContent1 id={params.id} />
    </ContentLayout>
  );
}
