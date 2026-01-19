import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <Loader2 className="h-12 w-12 text-primary animate-spin-slow" />
      <p className="text-muted-foreground font-medium animate-pulse-soft">
        Fetching weather data...
      </p>
    </div>
  );
};

export default LoadingSpinner;
