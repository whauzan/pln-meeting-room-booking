import type { ProcessedRoomData } from "../types/api";

interface MetricCardProps {
  data: ProcessedRoomData;
}

export const MetricCard = ({ data }: MetricCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Create a circular progress component
  const CircularProgress = ({ percentage }: { percentage: number }) => {
    const radius = 45;
    const strokeWidth = 8;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-24 h-24">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            stroke="#E5E7EB"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            stroke="#3B82F6"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{
              transition: "stroke-dashoffset 0.5s ease-in-out",
            }}
          />
        </svg>
      </div>
    );
  };

  const MetricBar = ({
    label,
    value,
    totalValue,
  }: {
    label: string;
    value: number;
    totalValue: number;
  }) => {
    const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0;

    return (
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">{label}</span>
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-900 w-8 text-right">
            {value}
          </span>
        </div>
      </div>
    );
  };

  // Calculate total consumption for proportional bar scaling
  const totalConsumption =
    data.consumptionBreakdown.snackSiang +
    data.consumptionBreakdown.makanSiang +
    data.consumptionBreakdown.snackSore;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900">{data.roomName}</h4>
      </div>

      {/* Occupancy Percentage */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">Persentase Pemakaian</p>
          <p className="text-2xl font-bold text-gray-900">
            {data.occupancyPercentage.toFixed(2)}%
          </p>
        </div>
        <CircularProgress percentage={data.occupancyPercentage} />
      </div>

      {/* Nominal Consumption */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-1">Nominal Konsumsi</p>
        <p className="text-lg font-semibold text-gray-900">
          {formatCurrency(data.totalNominalConsumption)}
        </p>
      </div>

      {/* Consumption Breakdown */}
      <div className="space-y-3">
        <MetricBar
          label="Snack Siang"
          value={data.consumptionBreakdown.snackSiang}
          totalValue={totalConsumption}
        />
        <MetricBar
          label="Makan Siang"
          value={data.consumptionBreakdown.makanSiang}
          totalValue={totalConsumption}
        />
        <MetricBar
          label="Snack Sore"
          value={data.consumptionBreakdown.snackSore}
          totalValue={totalConsumption}
        />
      </div>
    </div>
  );
};
