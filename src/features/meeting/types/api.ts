export interface MasterUnit {
  id: string;
  officeName: string;
  createdAt: string;
}

export interface MasterMeetingRoom {
  id: string;
  officeId: string;
  officeName: string;
  roomName: string;
  capacity: number;
  createdAt: string;
}

export interface MasterJenisKonsumsi {
  id: string;
  name: string;
  maxPrice: number;
  createdAt: string;
}
