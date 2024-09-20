import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import PlaceholderContent1 from "@/components/demo/placeholder-content-test";

export default function DashboardPage() {
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
      <PlaceholderContent1 />
    </ContentLayout>
  );
}
