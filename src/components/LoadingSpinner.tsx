import { CloudSun } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        
        {/* Main spinner container */}
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 p-1 animate-spin-slow">
          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
            <CloudSun className="h-10 w-10 text-primary animate-pulse-soft" />
          </div>
        </div>
        
        {/* Floating dots */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary animate-bounce-gentle" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-2 h-2 rounded-full bg-secondary animate-bounce-gentle" style={{ animationDelay: '0.2s' }} />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent animate-bounce-gentle" style={{ animationDelay: '0.4s' }} />
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-bounce-gentle" style={{ animationDelay: '0.6s' }} />
      </div>
      
      <p className="mt-8 text-muted-foreground font-medium text-lg">
        Fetching weather data...
      </p>
      <div className="flex gap-1 mt-3">
        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.1s' }} />
        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
