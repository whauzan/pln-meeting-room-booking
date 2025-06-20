import { Button } from "./button";

interface ErrorMessageProps {
  title?: string;
  message: string;
  retry?: () => void;
}

export const ErrorMessage = ({
  title = "Error",
  message,
  retry,
}: ErrorMessageProps) => (
  <div className="flex flex-col items-center justify-center p-12 text-center">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
      <span className="text-red-600 text-2xl">⚠️</span>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6 max-w-md">{message}</p>
    {retry && (
      <Button onClick={retry} variant="outline">
        Try Again
      </Button>
    )}
  </div>
);
