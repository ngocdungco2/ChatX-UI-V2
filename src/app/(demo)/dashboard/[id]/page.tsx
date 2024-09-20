import { ContentLayout } from "@/components/admin-panel/content-layout";

import PlaceholderContent1 from "@/components/demo/placeholder-content-test";

export default function DashboardPage({ params }: { params: { id: string } }) {
  return (
    <ContentLayout title="Dashboard">
      {/* <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem> */}
      {/* <BreadcrumbSeparator /> */}
      {/* <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}
      {/* chat here */}
      {/* <PlaceholderContent /> */}
      <PlaceholderContent1 id={params.id} />
      {/* idid */}
    </ContentLayout>
  );
}
