export const LoadingSpinner = ({
  message = "Loading...",
}: {
  message?: string;
}) => (
  <div className="flex items-center justify-center p-12">
    <div className="flex items-center gap-3">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      <span className="text-gray-600 font-medium">{message}</span>
    </div>
  </div>
);
