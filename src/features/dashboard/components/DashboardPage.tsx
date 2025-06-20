import { useEffect, useState } from "react";
import {
  useAvailablePeriods,
  useDashboardDataByPeriod,
} from "../hooks/useDashboardData";
import { PeriodSelector } from "./PeriodeSelector";
import { MetricCard } from "./MetricCard";
import { LoadingSpinner } from "../../../shared/components/ui/loading-spinner";
import { ErrorMessage } from "../../../shared/components/ui/error-message";
import type { ProcessedRoomData } from "../types/api";

// Helper function to group data by unitName
const groupDataByUnit = (data: ProcessedRoomData[]) => {
  return data.reduce((acc, room) => {
    const unitName = room.unitName;
    if (!acc[unitName]) {
      acc[unitName] = [];
    }
    acc[unitName].push(room);
    return acc;
  }, {} as Record<string, ProcessedRoomData[]>);
};

export const DashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Jan-2024");

  // Fetch available periods
  const {
    data: availablePeriods,
    isLoading: periodsLoading,
    error: periodsError,
  } = useAvailablePeriods();

  // Fetch dashboard data for selected period
  const {
    data: dashboardData,
    isLoading: dataLoading,
    isError: dataError,
    error: dataErrorDetails,
    refetch,
  } = useDashboardDataByPeriod(selectedPeriod);

  // Set default period when periods load
  useEffect(() => {
    if (availablePeriods && availablePeriods.length > 0 && !selectedPeriod) {
      setSelectedPeriod(availablePeriods[0]);
    }
  }, [availablePeriods, selectedPeriod]);

  // Group dashboard data by unit
  const groupedData = dashboardData ? groupDataByUnit(dashboardData) : {};
  const unitNames = Object.keys(groupedData);

  console.log("data", dashboardData);
  console.log("grouped data", groupedData);

  if (periodsError) {
    return (
      <div className="p-6">
        <ErrorMessage
          title="Failed to load dashboard"
          message="Could not fetch available periods. Please try again."
          retry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">DASHBOARD</h1>
          <p className="text-gray-600">
            Overview pemakaian ruang meeting dan konsumsi
          </p>
        </div>

        <PeriodSelector
          currentPeriod={selectedPeriod}
          availablePeriods={availablePeriods || []}
          onPeriodChange={setSelectedPeriod}
          isLoading={periodsLoading}
        />
      </div>

      {/* Dashboard Content */}
      {dataLoading ? (
        <LoadingSpinner message="Loading dashboard data..." />
      ) : dataError ? (
        <ErrorMessage
          title="Failed to load dashboard data"
          message={dataErrorDetails?.message || "Something went wrong"}
          retry={refetch}
        />
      ) : !dashboardData || dashboardData.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No data available
          </h3>
          <p className="text-gray-600">
            No dashboard data found for the selected period.
          </p>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Total Ruangan
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardData.length}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Rata-rata Okupansi
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {(
                  dashboardData.reduce(
                    (sum, room) => sum + room.occupancyPercentage,
                    0
                  ) / dashboardData.length
                ).toFixed(1)}
                %
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Total Konsumsi
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  notation: "compact",
                }).format(
                  dashboardData.reduce(
                    (sum, room) => sum + room.totalNominalConsumption,
                    0
                  )
                )}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Total Unit
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {unitNames.length}
              </p>
            </div>
          </div>

          {/* Dashboard Grid - Grouped by Unit */}
          <div className="space-y-8">
            {unitNames.map((unitName) => (
              <div key={unitName} className="space-y-4">
                {/* Unit Header */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {unitName}
                  </h2>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {groupedData[unitName].length} ruangan
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-w-max">
                  {groupedData[unitName].map((roomData) => (
                    <div
                      key={`${unitName}-${roomData.roomName}`}
                      className="flex-shrink-0"
                    >
                      <MetricCard data={roomData} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
