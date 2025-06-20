export interface ConsumptionData {
  name: string;
  totalPackage: string;
  totalPrice: string;
}

export interface RoomSummary {
  roomName: string;
  capacity: string;
  averageOccupancyPerMonth: string;
  totalConsumption: ConsumptionData[];
}

export interface OfficeData {
  officeName: string;
  detailSummary: RoomSummary[];
}

export interface DashboardData {
  createdAt: string;
  period: string;
  data: OfficeData[];
  id: string;
}

export type DashboardResponse = DashboardData[];

// Processed data for UI
export interface ProcessedRoomData {
  unitName: string;
  roomName: string;
  occupancyPercentage: number;
  totalNominalConsumption: number;
  consumptionBreakdown: {
    snackSiang: number;
    makanSiang: number;
    snackSore: number;
  };
}
