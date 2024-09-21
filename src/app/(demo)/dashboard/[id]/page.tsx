import { ContentLayout } from "@/components/admin-panel/content-layout";
import PlaceholderContent1 from "@/components/demo/placeholder-content-test";
export default function DashboardPage({ params }: { params: { id: string } }) {
  return (
    <ContentLayout title="Dashboard">
      <PlaceholderContent1 id={params.id} />
    </ContentLayout>
  );
}
