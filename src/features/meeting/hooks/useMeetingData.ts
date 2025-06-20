import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../shared/lib/queryClient";
import {
  getMasterUnits,
  getMasterMeetingRooms,
  getMasterJenisKonsumsi,
  getMeetingRoomsByUnit,
  getValidJenisKonsumsi,
} from "../services/meetingService";

export const useMasterUnits = () => {
  return useQuery({
    queryKey: queryKeys.masterUnits,
    queryFn: getMasterUnits,
    staleTime: 10 * 60 * 1000,
  });
};

export const useMasterMeetingRooms = () => {
  return useQuery({
    queryKey: queryKeys.masterMeetingRooms,
    queryFn: getMasterMeetingRooms,
    staleTime: 10 * 60 * 1000,
  });
};

export const useMeetingRoomsByUnit = (officeId: string) => {
  return useQuery({
    queryKey: queryKeys.meetingRoomsByUnit(officeId),
    queryFn: () => getMeetingRoomsByUnit(officeId),
    enabled: !!officeId,
    staleTime: 10 * 60 * 1000,
  });
};

export const useValidJenisKonsumsi = () => {
  return useQuery({
    queryKey: queryKeys.validJenisKonsumsi,
    queryFn: getValidJenisKonsumsi,
    staleTime: 10 * 60 * 1000,
  });
};

export const useMasterJenisKonsumsi = () => {
  return useQuery({
    queryKey: queryKeys.masterJenisKonsumsi,
    queryFn: getMasterJenisKonsumsi,
    staleTime: 10 * 60 * 1000,
  });
};
