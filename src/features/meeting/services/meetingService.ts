import { apiClient } from "../../../shared/lib/api";
import { env } from "../../../shared/lib/env";
import type {
  MasterJenisKonsumsi,
  MasterMeetingRoom,
  MasterUnit,
} from "../types/api";

export const getMasterUnits = async (): Promise<MasterUnit[]> => {
  const { data } = await apiClient.get<MasterUnit[]>(env.VITE_MASTER_UNIT_URL);
  return data;
};

export const getMasterMeetingRooms = async (): Promise<MasterMeetingRoom[]> => {
  const { data } = await apiClient.get<MasterMeetingRoom[]>(
    env.VITE_MASTER_MEETING_ROOMS_URL
  );
  return data;
};

export const getMasterJenisKonsumsi = async (): Promise<
  MasterJenisKonsumsi[]
> => {
  const { data } = await apiClient.get<MasterJenisKonsumsi[]>(
    env.VITE_MASTER_JENIS_KONSUMSI_URL
  );
  return data;
};

// Helper functions
export const getMeetingRoomsByUnit = async (
  officeId: string
): Promise<MasterMeetingRoom[]> => {
  const allRooms = await getMasterMeetingRooms();
  return allRooms.filter((room) => room.officeId === officeId);
};

export const getValidJenisKonsumsi = async (): Promise<
  MasterJenisKonsumsi[]
> => {
  const allKonsumsi = await getMasterJenisKonsumsi();
  const validNames = ["Snack Siang", "Makan Siang", "Snack Sore"];
  return allKonsumsi.filter((item) => validNames.includes(item.name));
};
