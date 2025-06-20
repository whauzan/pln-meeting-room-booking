import { useQuery } from "@tanstack/react-query";
import {
  getDashboardData,
  getAvailablePeriods,
  getDashboardDataByPeriod,
} from "../services/dashboardService";

export const useDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAvailablePeriods = () => {
  return useQuery({
    queryKey: ["dashboard-periods"],
    queryFn: getAvailablePeriods,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useDashboardDataByPeriod = (period: string) => {
  return useQuery({
    queryKey: ["dashboard", "by-period", period],
    queryFn: () => getDashboardDataByPeriod(period),
    enabled: !!period,
    staleTime: 5 * 60 * 1000,
  });
};
