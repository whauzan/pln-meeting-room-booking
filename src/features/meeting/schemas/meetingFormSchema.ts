import { z } from "zod";

const timeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

const createDateTime = (date: Date, timeStr: string): Date => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const dateTime = new Date(date);
  dateTime.setHours(hours, minutes, 0, 0);
  return dateTime;
};

export const meetingFormSchema = z
  .object({
    unit: z.string().min(1, "Unit harus dipilih"),
    ruangMeeting: z.string().min(1, "Ruang meeting harus dipilih"),
    tanggalRapat: z.date({
      required_error: "Tanggal rapat harus diisi",
    }),
    waktuMulai: z.string().min(1, "Waktu mulai harus diisi"),
    waktuSelesai: z.string().min(1, "Waktu selesai harus diisi"),
    jumlahPeserta: z
      .number({required_error: "Jumlah peserga harus diisi"})
      .min(1, "Jumlah peserta minimal 1")
      .int("Jumlah peserta harus berupa angka bulat"),
    jenisKonsumsi: z.array(z.string()),
    nominalKonsumsi: z.number().min(0),
  })
  .refine(
    (data) => {
      // Validate start time < end time
      if (data.waktuMulai && data.waktuSelesai) {
        const startMinutes = timeToMinutes(data.waktuMulai);
        const endMinutes = timeToMinutes(data.waktuSelesai);
        return startMinutes < endMinutes;
      }
      return true;
    },
    {
      message: "Waktu mulai harus lebih kecil dari waktu selesai",
      path: ["waktuSelesai"],
    }
  )
  .refine(
    (data) => {
      // Validate meeting is not in the past (considering both date and time)
      if (data.tanggalRapat && data.waktuMulai) {
        const meetingDateTime = createDateTime(
          data.tanggalRapat,
          data.waktuMulai
        );
        const now = new Date();
        return meetingDateTime > now;
      }
      return true;
    },
    {
      message: "Waktu meeting tidak boleh di masa lalu",
      path: ["waktuMulai"],
    }
  );

export type MeetingFormData = z.infer<typeof meetingFormSchema>;
