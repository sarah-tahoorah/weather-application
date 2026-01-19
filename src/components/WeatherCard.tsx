import WeatherIcon from "./WeatherIcon";
import { Droplets, Wind, Thermometer, Sparkles } from "lucide-react";

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  humidity: number;
  aqi: number;
  condition: string;
  feelsLike: number;
  windSpeed: number;
}

interface WeatherCardProps {
  data: WeatherData;
}

const getAQILabel = (aqi: number): { label: string; color: string; bg: string } => {
  if (aqi <= 50) return { label: "Good", color: "text-emerald-400", bg: "bg-emerald-500/20" };
  if (aqi <= 100) return { label: "Moderate", color: "text-amber-400", bg: "bg-amber-500/20" };
  if (aqi <= 150) return { label: "Unhealthy for Sensitive", color: "text-orange-400", bg: "bg-orange-500/20" };
  if (aqi <= 200) return { label: "Unhealthy", color: "text-red-400", bg: "bg-red-500/20" };
  if (aqi <= 300) return { label: "Very Unhealthy", color: "text-purple-400", bg: "bg-purple-500/20" };
  return { label: "Hazardous", color: "text-rose-400", bg: "bg-rose-500/20" };
};

const getCardGradient = (condition: string): string => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes("rain") || lowerCondition.includes("storm") || lowerCondition.includes("thunder")) {
    return "weather-card-rain";
  }
  if (lowerCondition.includes("cloud") || lowerCondition.includes("overcast")) {
    return "weather-card-cloudy";
  }
  if (lowerCondition.includes("clear") || lowerCondition.includes("sunny")) {
    return "weather-card-clear";
  }
  return "weather-card-default";
};

const WeatherCard = ({ data }: WeatherCardProps) => {
  const aqiInfo = getAQILabel(data.aqi);
  const cardGradient = getCardGradient(data.condition);

  return (
    <div className="animate-fade-in-up space-y-5">
      {/* Main Weather Card */}
      <div className={`${cardGradient} rounded-3xl p-8 text-white shadow-elevated relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-6xl font-bold tracking-tight">
                  {Math.round(data.temperature)}°
                </h2>
                <span className="text-2xl font-medium text-white/70">C</span>
              </div>
              <p className="text-white/80 font-medium capitalize text-lg mt-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                {data.condition}
              </p>
            </div>
            <div className="animate-float">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <WeatherIcon condition={data.condition} size={64} className="text-white drop-shadow-lg" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-5">
            <p className="text-2xl font-bold tracking-wide">{data.city}</p>
            <p className="text-white/60 font-medium">{data.country}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Feels Like */}
        <div className="glass-card-elevated stat-card rounded-2xl p-5 text-center">
          <div className="icon-container w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Thermometer className="h-6 w-6 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">
            {Math.round(data.feelsLike)}°
          </p>
          <p className="text-sm text-muted-foreground font-medium mt-1">Feels Like</p>
        </div>

        {/* Humidity */}
        <div className="glass-card-elevated stat-card rounded-2xl p-5 text-center">
          <div className="icon-container w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Droplets className="h-6 w-6 text-secondary" />
          </div>
          <p className="text-3xl font-bold text-foreground">{data.humidity}%</p>
          <p className="text-sm text-muted-foreground font-medium mt-1">Humidity</p>
        </div>

        {/* Wind */}
        <div className="glass-card-elevated stat-card rounded-2xl p-5 text-center">
          <div className="icon-container w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Wind className="h-6 w-6 text-accent" />
          </div>
          <p className="text-3xl font-bold text-foreground">
            {Math.round(data.windSpeed)}
          </p>
          <p className="text-sm text-muted-foreground font-medium mt-1">m/s Wind</p>
        </div>
      </div>

      {/* AQI Card */}
      <div className="glass-card-elevated rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl ${aqiInfo.bg} flex items-center justify-center`}>
              <span className="text-2xl">🌫</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Air Quality Index</p>
              <p className="font-bold text-foreground text-lg">AQI Level</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-foreground">{data.aqi}</p>
            <p className={`text-sm font-semibold ${aqiInfo.color}`}>{aqiInfo.label}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;