import { Bell, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background-nav text-white px-6 py-2 flex justify-between items-center h-16 shadow-sm">
      {/* Left side - Logo and app name */}
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center w-[38px] h-[52px]">
          <img src="/logo.png" alt="Logo PLN" />
        </div>
        <h1 className="text-base font-bold">iMeeting</h1>
      </div>

      {/* Right side - Notifications and user */}
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-teal-700 rounded-full transition-colors">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-3">
          <img
            src="https://ui-avatars.com/api/?name=John+Doe&background=0ea5e9&color=fff"
            alt="John Doe"
            className="size-10 rounded-full"
          />
          <span className="font-medium text-sm">John Doe</span>
          <ChevronDown size={18} className="opacity-70" />
        </div>
      </div>
    </header>
  );
}
