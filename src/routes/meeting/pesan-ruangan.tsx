import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../../shared/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../shared/components/ui/breadcrumb";
import { useBreadcrumbs } from "../../shared/hooks/useBreadcrumbs";
import React from "react";
import { MeetingBookingForm } from "../../features/meeting/components/MeetingBookingForm";

export const Route = createFileRoute("/meeting/pesan-ruangan")({
  component: PesanRuangan,
});

function PesanRuangan() {
  const breadcrumbItems = useBreadcrumbs([
    { label: "Ruang Meeting", href: "/meeting" },
    { label: "Pesan Ruangan", href: "/meeting/pesan-ruangan" },
  ]);

  return (
    <div className="py-6 pl-7 pr-9 flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex items-start gap-4">
        <Link to="/meeting">
          <Button variant="primary" size="icon">
            <ChevronLeft size={18} />
          </Button>
        </Link>
        <div>
          <h1 className="text-text font-bold text-[28px]">Ruang Meeting</h1>
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={item.href}>
                  <BreadcrumbItem>
                    {item.isCurrent ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>

                  {/* Add separator if not the last item */}
                  {index < breadcrumbItems.length - 1 && (
                    <BreadcrumbSeparator isBeforeCurrent={item.isNextCurrent} />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <MeetingBookingForm />
    </div>
  );
}
