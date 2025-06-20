import { Link, useRouterState } from "@tanstack/react-router";
import { FileText, Home } from "lucide-react";
import { cn } from "../../lib/utils";

const navigationItems = [
  {
    to: "/dashboard",
    icon: Home,
    label: "Dashboard",
  },
  {
    to: "/meeting",
    icon: FileText,
    label: "Meeting",
  },
];

export default function Sidebar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  return (
    <aside className="fixed left-0 top-16 z-40 w-[72px] bg-white shadow-sidebar h-[calc(100vh-4rem)]">
      <nav className="px-4 py-5">
        <ul className="flex flex-col gap-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath.startsWith(item.to);

            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex items-center justify-center size-[42px] rounded-lg transition-colors group relative",
                    isActive
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-primary-hover hover:text-white"
                  )}
                  title={item.label}
                >
                  <Icon size={18} />

                  {/* Tooltip */}
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
