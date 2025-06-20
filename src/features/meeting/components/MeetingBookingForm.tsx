import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  meetingFormSchema,
  type MeetingFormData,
} from "../schemas/meetingFormSchema";
import {
  calculateAutomaticConsumption,
  calculateNominalConsumption,
} from "../utils/consumptionCalculator";
import {
  useMasterUnits,
  useMeetingRoomsByUnit,
  useValidJenisKonsumsi,
} from "../hooks/useMeetingData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/components/ui/select";
import { Input } from "../../../shared/components/ui/input";
import { Button } from "../../../shared/components/ui/button";
import { Checkbox } from "../../../shared/components/ui/checkbox";
import { DatePickerField } from "../../../shared/components/ui/date-picker";
import { cn } from "../../../shared/lib/utils";

export const MeetingBookingForm = () => {
  const form = useForm<MeetingFormData>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      unit: "",
      ruangMeeting: "",
      tanggalRapat: new Date(),
      waktuMulai: "",
      waktuSelesai: "",
      jumlahPeserta: 0,
      jenisKonsumsi: [],
      nominalKonsumsi: 0,
    },
  });

  // Data fetching hooks
  const { data: units, isLoading: unitsLoading } = useMasterUnits();
  const { data: jenisKonsumsiData } = useValidJenisKonsumsi();

  const selectedUnit = form.watch("unit");
  const { data: meetingRooms, isLoading: roomsLoading } =
    useMeetingRoomsByUnit(selectedUnit);

  // Form watchers
  const waktuMulai = form.watch("waktuMulai");
  const waktuSelesai = form.watch("waktuSelesai");
  const jumlahPeserta = form.watch("jumlahPeserta");
  const selectedRoom = form.watch("ruangMeeting");

  // Get room capacity for validation
  const roomCapacity =
    meetingRooms?.find((room) => room.id === selectedRoom)?.capacity || 0;

  // Auto-calculate consumption
  useEffect(() => {
    if (waktuMulai && waktuSelesai && jumlahPeserta > 0 && jenisKonsumsiData) {
      const { consumptionNames } = calculateAutomaticConsumption(
        waktuMulai,
        waktuSelesai,
        jenisKonsumsiData
      );
      const totalNominal = calculateNominalConsumption(
        jumlahPeserta,
        waktuMulai,
        waktuSelesai,
        jenisKonsumsiData
      );

      form.setValue("jenisKonsumsi", consumptionNames);
      form.setValue("nominalKonsumsi", totalNominal);
    }
  }, [waktuMulai, waktuSelesai, jumlahPeserta, jenisKonsumsiData, form]);

  // Capacity validation
  useEffect(() => {
    if (selectedRoom && jumlahPeserta > roomCapacity && roomCapacity > 0) {
      form.setError("jumlahPeserta", {
        type: "manual",
        message: `Jumlah peserta tidak boleh melebihi kapasitas ruangan (${roomCapacity} orang)`,
      });
    } else {
      form.clearErrors("jumlahPeserta");
    }
  }, [jumlahPeserta, roomCapacity, selectedRoom, form]);

  const onSubmit = (data: MeetingFormData) => {
    console.log("Form submitted:", data);
    // TODO: Implement form submission
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col px-7 py-5 gap-9 bg-white border border-[#EEEEEE] shadow-card rounded-lg"
    >
      {/* Informasi Ruang Meeting Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-base font-semibold text-text">
          Informasi Ruang Meeting
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Unit Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text">Unit</label>
            <Select
              value={form.watch("unit")}
              onValueChange={(value) => {
                form.setValue("unit", value);
                form.setValue("ruangMeeting", ""); // Reset room selection
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Unit" />
              </SelectTrigger>
              <SelectContent>
                {unitsLoading ? (
                  <SelectItem value="loading" disabled>
                    Loading...
                  </SelectItem>
                ) : (
                  units?.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.officeName}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {form.formState.errors.unit && (
              <p className="text-sm text-red-600">
                {form.formState.errors.unit.message}
              </p>
            )}
          </div>

          {/* Meeting Room Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text">
              Ruang Meeting
            </label>
            <Select
              value={form.watch("ruangMeeting")}
              onValueChange={(value) => form.setValue("ruangMeeting", value)}
              disabled={!selectedUnit}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Ruang Meeting" />
              </SelectTrigger>
              <SelectContent>
                {roomsLoading ? (
                  <SelectItem value="loading" disabled>
                    Loading...
                  </SelectItem>
                ) : (
                  meetingRooms?.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.roomName}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {form.formState.errors.ruangMeeting && (
              <p className="text-sm text-red-600">
                {form.formState.errors.ruangMeeting.message}
              </p>
            )}
          </div>

          {/* Room Capacity Display */}
          <div className="md:col-span-1">
            <Input disabled value={roomCapacity} />
          </div>
        </div>
      </div>

      <hr className="text-[#EEEEEE]" />

      {/* Informasi Rapat Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-base font-semibold text-text">Informasi Rapat</h2>

        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Date */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text">
              Tanggal Rapat <span className="text-red-500">*</span>
            </label>
            <DatePickerField
              value={form.watch("tanggalRapat")}
              onChange={(date) => {
                if (date) form.setValue("tanggalRapat", date);
              }}
              placeholder="28 Juni 2022"
              minDate={new Date()} // Prevent past dates
              error={form.formState.errors.tanggalRapat?.message}
            />
            {form.formState.errors.tanggalRapat && (
              <p className="text-sm text-red-600">
                {form.formState.errors.tanggalRapat.message}
              </p>
            )}
          </div>

          {/* Start Time */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text">
              Waktu Mulai
            </label>
            <Input type="time" {...form.register("waktuMulai")} />
            {form.formState.errors.waktuMulai && (
              <p className="text-sm text-red-600">
                {form.formState.errors.waktuMulai.message}
              </p>
            )}
          </div>

          {/* End Time */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text">
              Waktu Selesai
            </label>
            <Input type="time" {...form.register("waktuSelesai")} />
            {form.formState.errors.waktuSelesai && (
              <p className="text-sm text-red-600">
                {form.formState.errors.waktuSelesai.message}
              </p>
            )}
          </div>

          {/* Participant Count */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Jumlah Peserta
            </label>
            <Input
              type="number"
              min="1"
              max={roomCapacity || 999}
              {...form.register("jumlahPeserta", {
                valueAsNumber: true,
              })}
              placeholder="Masukkan Jumlah Peserta"
            />
            {form.formState.errors.jumlahPeserta && (
              <p className="text-sm text-red-600">
                {form.formState.errors.jumlahPeserta.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Consumption Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-base font-semibold text-text">Jenis Konsumsi</h2>

        <div className="space-y-3">
          {jenisKonsumsiData && jenisKonsumsiData.length > 0 ? (
            jenisKonsumsiData.map((konsumsi) => {
              const isChecked = form
                .watch("jenisKonsumsi")
                .includes(konsumsi.name);

              return (
                <div
                  key={konsumsi.id}
                  className={cn(
                    "flex w-1/2 items-center justify-between p-3 rounded-lg border transition-all",
                    isChecked
                      ? "bg-primary/5 border-primary/20"
                      : "bg-gray-50 border-gray-200"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={isChecked}
                      disabled={true}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <div className="flex flex-col">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isChecked ? "text-gray-900" : "text-gray-500"
                        )}
                      >
                        {konsumsi.name}
                      </span>
                      {isChecked && (
                        <span className="text-xs text-primary font-medium">
                          Termasuk dalam paket meeting
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isChecked ? "text-gray-900" : "text-gray-500"
                      )}
                    >
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(konsumsi.maxPrice)}
                    </span>
                    <div className="text-xs text-gray-500">per orang</div>
                  </div>
                </div>
              );
            })
          ) : (
            // Fallback for when API data is loading
            <div className="space-y-3">
              {["Snack Siang", "Makan Siang", "Snack Sore"].map(
                (name, index) => {
                  const isChecked = form.watch("jenisKonsumsi").includes(name);
                  const prices = [20000, 30000, 20000]; // Fallback prices

                  return (
                    <div
                      key={name}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border transition-all",
                        isChecked
                          ? "bg-primary/5 border-primary/20"
                          : "bg-gray-50 border-gray-200"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={isChecked}
                          disabled={true}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <div className="flex flex-col">
                          <span
                            className={cn(
                              "text-sm font-medium",
                              isChecked ? "text-gray-900" : "text-gray-500"
                            )}
                          >
                            {name}
                          </span>
                          {isChecked && (
                            <span className="text-xs text-primary font-medium">
                              Termasuk dalam paket meeting
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className={cn(
                            "text-sm font-medium",
                            isChecked ? "text-gray-900" : "text-gray-400"
                          )}
                        >
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(prices[index])}
                        </span>
                        <div className="text-xs text-gray-500">per orang</div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}

          {/* Helper text */}
          <div className="flex items-start gap-2 mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
              <span className="text-white text-xs">i</span>
            </div>
            <div className="text-xs text-blue-700">
              <div className="font-medium mb-1">Aturan Konsumsi:</div>
              <ul className="space-y-0.5">
                <li>• Meeting mulai sebelum jam 11:00 → Snack Siang</li>
                <li>• Meeting jam 11:00 - 14:00 → Makan Siang</li>
                <li>• Meeting mulai jam 14:00 atau setelahnya → Snack Sore</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Nominal Display */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">
              Total Nominal Konsumsi:
            </span>
            <span className="text-xl font-bold text-primary">
              {formatCurrency(form.watch("nominalKonsumsi"))}
            </span>
          </div>

          {form.watch("nominalKonsumsi") > 0 && jumlahPeserta > 0 && (
            <div className="text-xs text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Jumlah Peserta:</span>
                <span>{jumlahPeserta} orang</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya per Orang:</span>
                <span>
                  {formatCurrency(
                    form.watch("nominalKonsumsi") / jumlahPeserta
                  )}
                </span>
              </div>
              <hr className="my-1 border-gray-300" />
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>{formatCurrency(form.watch("nominalKonsumsi"))}</span>
              </div>
            </div>
          )}

          {form.watch("nominalKonsumsi") === 0 && (
            <div className="text-xs text-gray-500 text-center">
              Silakan isi waktu meeting untuk melihat perhitungan konsumsi
            </div>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Batal
        </Button>
        <Button type="submit" variant="primary">
          Simpan
        </Button>
      </div>
    </form>
  );
};
