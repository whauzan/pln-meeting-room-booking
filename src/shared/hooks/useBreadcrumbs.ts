import { useRouterState } from "@tanstack/react-router";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface ProcessedBreadcrumbItem extends BreadcrumbItem {
  isCurrent: boolean;
  isNextCurrent: boolean;
}

export function useBreadcrumbs(
  items: BreadcrumbItem[]
): ProcessedBreadcrumbItem[] {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return items.map((item, index) => ({
    ...item,
    isCurrent: currentPath === item.href,
    isNextCurrent: items[index + 1]?.href === currentPath,
  }));
}
