import type { MasterJenisKonsumsi } from "../types/api";

// Time utility
const timeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

// Business rules for consumption calculation
export const calculateAutomaticConsumption = (
  startTime: string,
  endTime: string,
  jenisKonsumsiData: MasterJenisKonsumsi[]
) => {
  const validKonsumsi = jenisKonsumsiData.filter((item) =>
    ["Snack Siang", "Makan Siang", "Snack Sore"].includes(item.name)
  );

  const applicableConsumptions: MasterJenisKonsumsi[] = [];

  for (const konsumsi of validKonsumsi) {
    let shouldInclude = false;

    if (konsumsi.name === "Snack Siang") {
      // Meeting STARTS before 11:00 gets Snack Siang
      const startMinutes = timeToMinutes(startTime);
      shouldInclude = startMinutes < timeToMinutes("11:00");
    } else if (konsumsi.name === "Makan Siang") {
      // Meeting overlaps with 11:00-14:00 period gets Makan Siang
      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);
      const lunchStart = timeToMinutes("11:00");
      const lunchEnd = timeToMinutes("14:00");

      // Meeting overlaps if: start < lunchEnd AND end > lunchStart
      shouldInclude = startMinutes < lunchEnd && endMinutes > lunchStart;
    } else if (konsumsi.name === "Snack Sore") {
      // Meeting overlaps with or extends past 14:00 gets Snack Sore
      const endMinutes = timeToMinutes(endTime);
      shouldInclude = endMinutes > timeToMinutes("14:00");
    }

    if (shouldInclude) {
      applicableConsumptions.push(konsumsi);
    }
  }

  return {
    consumptionNames: applicableConsumptions.map((c) => c.name),
    totalPricePerPerson: applicableConsumptions.reduce(
      (sum, c) => sum + c.maxPrice,
      0
    ),
    consumptionItems: applicableConsumptions,
  };
};

// Calculate total nominal
export const calculateNominalConsumption = (
  jumlahPeserta: number,
  startTime: string,
  endTime: string,
  jenisKonsumsiData: MasterJenisKonsumsi[]
): number => {
  const { totalPricePerPerson } = calculateAutomaticConsumption(
    startTime,
    endTime,
    jenisKonsumsiData
  );
  return jumlahPeserta * totalPricePerPerson;
};
