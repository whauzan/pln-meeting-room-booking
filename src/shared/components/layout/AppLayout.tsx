import Header from "./Header";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({children}: AppLayoutProps) {
  return (
    <div className="bg-background min-h-dvh">
      {/* Header */}
      <Header />

      {/* Main container with sidebar and content */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 min-h-[calc(100dvh-64px)]">{children}</main>
      </div>
    </div>
  );
}
