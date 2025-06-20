import { apiClient } from "../../../shared/lib/api";
import { env } from "../../../shared/lib/env";
import type { DashboardResponse, ProcessedRoomData } from "../types/api";

export const getDashboardData = async (): Promise<DashboardResponse> => {
  const { data } = await apiClient.get<DashboardResponse>(
    env.VITE_SUMMARY_BOOKING_URL
  );
  return data;
};

export const getAvailablePeriods = async (): Promise<string[]> => {
  const data = await getDashboardData();
  return data.map((item) => item.period);
};

export const getDashboardDataByPeriod = async (
  period: string
): Promise<ProcessedRoomData[]> => {
  const data = await getDashboardData();

  const periodData = data.find((item) => item.period === period);

  if (!periodData) {
    throw new Error(`No data found for period: ${period}`);
  }

  return processDashboardData(periodData);
};

// Helper function to process raw API data into UI-friendly format
const processDashboardData = (
  dashboardData: DashboardResponse[0]
): ProcessedRoomData[] => {
  const processedData: ProcessedRoomData[] = [];

  dashboardData.data.forEach((office) => {
    office.detailSummary.forEach((room) => {
      // Calculate occupancy percentage
      const capacity = parseInt(room.capacity);
      const averageOccupancy = parseInt(room.averageOccupancyPerMonth);
      const occupancyPercentage =
        capacity > 0 ? (averageOccupancy / capacity) * 100 : 0;

      // Calculate consumption breakdown and total
      const snackSiang = room.totalConsumption.find(
        (c) => c.name === "Snack Siang"
      );
      const makanSiang = room.totalConsumption.find(
        (c) => c.name === "Makan Siang"
      );
      const snackSore = room.totalConsumption.find(
        (c) => c.name === "Snack Sore"
      );

      const snackSiangPackages = snackSiang
        ? parseInt(snackSiang.totalPackage)
        : 0;
      const makanSiangPackages = makanSiang
        ? parseInt(makanSiang.totalPackage)
        : 0;
      const snackSorePackages = snackSore
        ? parseInt(snackSore.totalPackage)
        : 0;

      // Calculate total nominal consumption
      const totalNominalConsumption = room.totalConsumption.reduce(
        (total, item) => total + parseInt(item.totalPrice),
        0
      );

      processedData.push({
        unitName: office.officeName,
        roomName: room.roomName,
        occupancyPercentage: Math.round(occupancyPercentage * 100) / 100,
        totalNominalConsumption,
        consumptionBreakdown: {
          snackSiang: snackSiangPackages,
          makanSiang: makanSiangPackages,
          snackSore: snackSorePackages,
        },
      });
    });
  });

  return processedData;
};
