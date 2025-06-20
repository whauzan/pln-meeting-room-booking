import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Query key factory
export const queryKeys = {
  // Master data
  masterUnits: ["master-units"] as const,
  masterMeetingRooms: ["master-meeting-rooms"] as const,
  masterJenisKonsumsi: ["master-jenis-konsumsi"] as const,

  // Filtered data
  meetingRoomsByUnit: (unitId: string) =>
    ["meeting-rooms", "by-unit", unitId] as const,
  validJenisKonsumsi: ["valid-jenis-konsumsi"] as const,

  // Dashboard
  dashboard: ["dashboard"] as const,
  dashboardByPeriod: (period: string) =>
    ["dashboard", "by-period", period] as const,
} as const;
