import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/components/ui/select";

interface PeriodSelectorProps {
  currentPeriod: string;
  availablePeriods: string[];
  onPeriodChange: (period: string) => void;
  isLoading?: boolean;
}

export const PeriodSelector = ({
  currentPeriod,
  availablePeriods,
  onPeriodChange,
  isLoading = false,
}: PeriodSelectorProps) => {
  const formatPeriodDisplay = (period: string) => {
    // Convert "Jan-2024" to "Januari 2024"
    const monthMap: Record<string, string> = {
      Jan: "Januari",
      Feb: "Februari",
      Mar: "Maret",
      Apr: "April",
      May: "Mei",
      Jun: "Juni",
      Jul: "Juli",
      Aug: "Agustus",
      Sep: "September",
      Oct: "Oktober",
      Nov: "November",
      Dec: "Desember",
    };

    const [month, year] = period.split("-");
    return `${monthMap[month] || month} ${year}`;
  };

  return (
    <div className="w-48">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Periode
      </label>
      <Select
        value={currentPeriod}
        onValueChange={onPeriodChange}
        disabled={isLoading}
      >
        <SelectTrigger>
          <SelectValue placeholder="Pilih Periode" />
        </SelectTrigger>
        <SelectContent>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          ) : (
            availablePeriods.map((period) => (
              <SelectItem key={period} value={period}>
                {formatPeriodDisplay(period)}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
