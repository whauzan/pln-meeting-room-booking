import Header from "./Header";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({children}: AppLayoutProps) {
  return (
    <div className="bg-background min-h-dvh flex flex-col">
      {/* Header */}
      <Header />

      {/* Main container with sidebar and content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <main className="ml-[72px] pt-16 min-h-screen flex-1">{children}</main>
      </div>
    </div>
  );
}
